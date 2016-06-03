
function Fort63 ( file ) {

    // Scoping
    var self = this;


    // Variables
    this.file = file;
    this.callbacks = {};
    this.timeseries = {};
    this.worker = new Worker( 'js/adcirc/files/fort63worker.js' );


    // Events
    var error_event = { type: 'error' };
    var ready_event = { type: 'ready' };
    var timeseries_event = { type: 'timeseries' };


    // Functions
    this.get_controller = function () {
        
        return new Fort63Controller( self );
        
    };

    this.get_display = function () {

        return new Fort63Display( self.file.name, self.num_nodes, self.num_timesteps );

    };

    this.get_nodal_timeseries = function ( id, node_number, callback ) {

        var node_number_str = node_number.toString();

        // Check cache for data
        if ( self.timeseries[ node_number_str ] ) {

            // We've already got the data, so send it to the callback
            callback( id, node_number, self.timeseries[ node_number_str ] );

        } else {

            // We don't have the data yet, so load it
            self.load_nodal_timeseries( id, node_number, callback );

        }

    };
    
    this.load = function () {

        // Start listening to the worker before we tell it to load anything
        self.worker.addEventListener( 'message', self.on_worker_event );
        
        // Build the message that will tell the worker to start loading data
        var loadmessage = {
            action: 'load',
            file: self.file
        };

        // Send the message
        self.worker.postMessage( loadmessage );

    };


    this.load_nodal_timeseries = function ( id, node_number, callback ) {

        var node_number_str = node_number.toString();

        // Build the load message
        var loadmessage = {
            action: 'get_nodal_timeseries',
            node: node_number_str
        };

        // Build the callback object
        var cb = {
            id: id,
            node_number: node_number,
            callback: callback
        };

        // If there queue for this node exists, we're already loading the data
        if ( self.callbacks[ node_number_str ] ) {

            self.callbacks[ node_number_str ].push( cb );

        } else {

            self.callbacks[ node_number_str ] = [];
            self.callbacks[ node_number_str ].push( cb );

            // Start loading the data
            self.worker.postMessage( loadmessage );

        }

    };
    
    
    this.on_data_ready = function ( num_nodes, num_timesteps ) {
        
        self.num_nodes = num_nodes;
        self.num_timesteps = num_timesteps;

        self.dispatchEvent( ready_event );
        
    };


    this.on_nodal_timeseries = function ( node, data_buffer ) {

        // Cache the data
        self.timeseries[ node ] = new Float32Array( data_buffer );

        // Check for callbacks waiting for this node
        if ( self.callbacks[ node ] ) {

            for ( var i=0; i<self.callbacks[ node ].length; ++i ) {

                // Get the callback object
                var cb = self.callbacks[ node ][ i ];

                // Call the callback
                cb.callback( cb.id, cb.node_number, self.timeseries[ node ] );

            }

        }

    };


    this.on_timeseries = function ( data_buffer ) {

        self.timeseries = new Float32Array( data_buffer );
        self.dispatchEvent( timeseries_event );

    };

    
    this.on_worker_event = function ( event ) {
        
        // The full message received from the worker
        var message = event.data;
        
        // Check the message type
        switch ( message.type ) {

            case 'error':
                console.log( 'ERROR: ' + message.message );
                self.dispatchEvent( error_event );
                break;

            case 'data_ready':
                
                self.on_data_ready( message.num_nodes, message.num_timesteps );
                break;

            case 'timeseries':

                self.on_timeseries( message.timeseries );
                break;

            case 'nodal_timeseries':

                self.on_nodal_timeseries( message.node, message.timeseries );
                break;

            
        }
        
    };


    this.set_node = function ( node ) {

        var loadmessage = {
            action: 'get_timeseries',
            node: node.toString()
        };

        self.worker.postMessage( loadmessage );

    };

}

Object.assign( Fort63.prototype, EventDispatcher.prototype );