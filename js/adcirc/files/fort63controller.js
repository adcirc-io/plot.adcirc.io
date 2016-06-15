function Fort63Controller ( fort63 ) {

    // Scoping
    var self = this;

    // The controller connects the data to the display (hey that's MVC!)
    this.data = fort63;
    this.display = fort63.get_display();


    // Functions
    this.hide_display = function () {
        
        self.display.hide();
        
    };
    
    this.initialize_display = function ( container ) {

        // Initialize the display
        self.display.initialize( container, self.data.status );
        self.display.set_num_nodes( self.data.num_nodes );
        self.display.set_num_timesteps( self.data.num_timesteps );

        // Start listening for events from the display
        self.display.addEventListener( 'add_min_max', self.on_add_min_max );
        self.display.addEventListener( 'change_node', self.on_change_node );
        self.display.addEventListener( 'change_nodes', self.on_change_nodes );
        self.display.addEventListener( 'remove_min_max', self.on_remove );
        self.display.addEventListener( 'remove_node', self.on_remove );
        self.display.addEventListener( 'remove_nodes', self.on_remove );
        
        // Start listening for events from the data
        self.data.addEventListener( 'header', self.on_data_header );
        self.data.addEventListener( 'progress', self.on_data_progress );
        self.data.addEventListener( 'ready', self.on_data_ready );

    };
    
    this.show_display = function () {
        
        self.display.show();
        
    };


    // Event Handlers
    this.on_add_min_max = function ( event ) {
        
        var id = event.id;
        
        self.data.get_min_max_timeseries( id, function ( id, data ) {

            self.dispatchEvent({

                type: 'area',
                id: id,
                title: 'Min/Max',
                data: {
                    lower_bound: data.min,
                    upper_bound: data.max
                }

            });

        });
        
    };
    
    this.on_change_node = function ( event ) {
        
        // An existing node has been changed. Request the data and send it to the plot
        var node_id = event.id;
        var node_number = event.node;

        self.data.get_nodal_timeseries( node_id, node_number, function ( id, node_number, data ) {

            // Tell the plot to plot the node
            self.dispatchEvent({

                type: 'timeseries',
                id: id,
                title: 'Node ' + node_number,
                data: [data]

            });

        });
        
    };

    this.on_change_nodes = function ( event ) {

        var node_id = event.id;
        var node_list = event.nodes;
        var node_string = event.string;
        var alldata = [];

        _.each( node_list, function ( node ) {

            self.data.get_nodal_timeseries( node_id, node, function ( id, node_number, data ) {

                alldata.push( data );

                if ( alldata.length == node_list.length ) {

                    self.dispatchEvent({

                        type: 'timeseries',
                        id: id,
                        title: 'Nodes ' + node_string,
                        data: alldata

                    });

                }

            });

        });

    };
    
    this.on_data_header = function ( event ) {
        
        self.display.set_num_nodes( event.num_nodes );
        self.display.set_num_timesteps( event.num_timesteps );
        
    };

    this.on_data_progress = function ( event ) {

        self.display.set_progress( event.progress );

    };
    
    this.on_data_ready = function ( event ) {
        
        self.display.set_view_data();
        
    };

    this.on_remove = function ( event ) {

        // Tell the plot to remove the node
        self.dispatchEvent({

            type: 'remove',
            id: event.id

        });

    }
    
}

Object.assign( Fort63Controller.prototype, EventDispatcher.prototype );