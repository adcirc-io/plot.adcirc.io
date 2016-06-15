
function Fort63 ( file ) {

    // Scoping
    var self = this;


    // Variables
    this.file = file;
    this.callbacks = {};
    this.info = '';
    this.num_nodes = 0;
    this.num_timesteps = 0;
    this.status = 'loading';
    this.timeseries = {};
    this.worker = new Worker( 'js/adcirc/files/fort63worker.js' );


    // Events
    var error_event = { type: 'error' };
    var header_event = { type: 'header' };
    var progress_event = { type: 'progress' };
    var ready_event = { type: 'ready' };


    // Functions
    this.get_controller = function () {
        
        return new Fort63Controller( self );
        
    };


    this.get_display = function () {

        return new Fort63Display();

    };


    this.get_min_max_timeseries = function ( id, callback ) {

        // Check cache for data
        if ( self.timeseries[ 'minmax' ] ) {

            // We've already got the data, so send it to the callback
            callback( id, self.timeseries[ 'minmax' ] );

        } else {

            // We don't have the data yet, so load it
            self.load_min_max_timeseries( id, callback );

        }

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
        self.status = 'loading';
        self.worker.postMessage( loadmessage );

    };


    this.load_min_max_timeseries = function ( id, callback ) {

        // Build the callback object
        var cb = {
            id: id,
            callback: callback
        };

        // If minmax is already in the queue, we're already loading the data
        if ( self.callbacks[ 'minmax' ] ) {

            self.callbacks[ 'minmax' ].push( cb );

        } else {

            self.callbacks[ 'minmax' ] = [ cb ];

            // Start loading the data
            self.worker.postMessage({
                action: 'get_min_max_timeseries'
            });

        }

    };


    this.load_nodal_timeseries = function ( id, node_number, callback ) {

        var node_number_str = node_number.toString();

        // Build the callback object
        var cb = {
            id: id,
            node_number: node_number,
            callback: callback
        };

        // If the node is in the queue, we're already loading the data
        if ( self.callbacks[ node_number_str ] ) {

            self.callbacks[ node_number_str ].push( cb );

        } else {

            self.callbacks[ node_number_str ] = [ cb ];

            // Start loading the data
            self.worker.postMessage({
                action: 'get_nodal_timeseries',
                node: node_number_str
            });

        }

    };
    
    
    this.on_data_ready = function () {

        self.status = 'ready';
        self.dispatchEvent( ready_event );
        
    };


    this.on_header = function ( info, num_nodes, num_timesteps ) {

        self.info = info;
        self.num_nodes = num_nodes;
        self.num_timesteps = num_timesteps;

        header_event.info = info;
        header_event.num_nodes = num_nodes;
        header_event.num_timesteps = num_timesteps;

        self.dispatchEvent( header_event );
        
    };


    this.on_min_max_timeseries = function ( min_buffer, max_buffer ) {

        // Cache the data
        self.timeseries[ 'minmax' ] = {
            min: new Float32Array( min_buffer ),
            max: new Float32Array( max_buffer )
        };

        // Check for callbacks waiting for this dataset
        if ( self.callbacks [ 'minmax' ] ) {

            // For each callback object, pass the data to the callback function
            _.each( self.callbacks[ 'minmax' ], function ( cb ) {

                cb.callback( cb.id, self.timeseries[ 'minmax' ] );

            });

        }

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


    this.on_progress = function ( progress ) {

        progress_event.progress = progress;
        self.dispatchEvent( progress_event );

    };

    
    this.on_worker_event = function ( event ) {
        
        // The full message received from the worker
        var message = event.data;
        
        // Check the message type
        switch ( message.type ) {

            case 'data_ready':

                self.on_data_ready();
                break;

            case 'error':

                console.log( 'ERROR: ' + message.message );
                self.dispatchEvent( error_event );
                break;

            case 'header':

                self.on_header( message.info, message.num_nodes, message.num_timesteps );
                break;

            case 'min_max_timeseries':

                self.on_min_max_timeseries( message.min, message.max );
                break;

            case 'nodal_timeseries':

                self.on_nodal_timeseries( message.node, message.timeseries );
                break;

            case 'progress':

                self.on_progress( message.progress );
                break;

            
        }
        
    };


}

Object.assign( Fort63.prototype, EventDispatcher.prototype );