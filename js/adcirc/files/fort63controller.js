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

        // Add the display HTML to the container
        container.append( self.display.html );

        // Notify the display that the HTML is now on the page
        self.display.initialize( self.data.status, self.data.num_nodes, self.data.num_timesteps );

        // Start listening for events from the display
        self.display.addEventListener( 'add_node', self.on_add_node );
        self.display.addEventListener( 'change_node', self.on_change_node );
        self.display.addEventListener( 'remove_node', self.on_remove_node );
        
        // Start listening for events from the data
        self.data.addEventListener( 'header', self.on_data_header );
        self.data.addEventListener( 'progress', self.on_data_progress );
        self.data.addEventListener( 'ready', self.on_data_ready );

    };
    
    this.show_display = function () {
        
        self.display.show();
        
    };


    // Event Handlers
    this.on_add_node = function ( event ) {

        // A new node has been added. Request the data and send it to the plot
        var node_id = event.id;
        var node_number = event.node;
        
        self.data.get_nodal_timeseries( node_id, node_number, function ( id, node_number, data ) {

            // Tell the plot to plot the node
            self.dispatchEvent({

                type: 'timeseries',
                id: id,
                title: 'Node ' + node_number,
                data: data

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
                data: data

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

    this.on_remove_node = function ( event ) {

        // Tell the plot to remove the node
        self.dispatchEvent({

            type: 'remove',
            id: event.id

        });

    }
    
}

Object.assign( Fort63Controller.prototype, EventDispatcher.prototype );