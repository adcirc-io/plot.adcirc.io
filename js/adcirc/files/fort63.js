
function Fort63 ( file ) {

    // Scoping
    var self = this;


    // Variables
    this.file = file;
    this.timeseries = [];
    this.worker = new Worker( 'js/adcirc/files/fort63worker.js' );


    // Events
    var error_event = { type: 'error' };
    var ready_event = { type: 'ready' };
    var timeseries_event = { type: 'timeseries' };


    // Functions
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
    
    
    this.on_data_ready = function ( num_nodes, num_timesteps ) {
        
        self.num_nodes = num_nodes;
        self.num_timesteps = num_timesteps;

        self.dispatchEvent( ready_event );
        
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