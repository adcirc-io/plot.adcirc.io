function Fort63Controller ( fort63 ) {

    // Scoping
    var self = this;

    // The controller connects the data to the display (hey that's MVC!)
    this.data = fort63;
    this.display = fort63.get_display();


    // Functions
    this.initialize_display = function ( container ) {

        // Add the display HTML to the container
        container.append( self.display.html );

        // Notify the display that the HTML is now on the page
        self.display.initialize();

        // Start listening for events from the display
        self.display.addEventListener( 'add_node', self.on_add_node );
        self.display.addEventListener( 'change_node', self.on_change_node );

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
        
    }
    
}

Object.assign( Fort63Controller.prototype, EventDispatcher.prototype );