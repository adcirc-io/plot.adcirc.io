function Fort63Controller ( fort63 ) {
    
    // Scoping
    var self = this;

    // The controller connects the data to the displays
    // The data
    this.data = fort63;

    // The options display
    this.display = fort63.get_display();

    // The plotting layers
    this.background = null;
    this.midground = null;
    this.foreground = null;

    // The axis
    this.axis = null;
    this.x_values = null;

    // The plottables generated from this controller
    this.plottables = {};

    // Callback queue
    this.queue = [];


    // Functions
    this.defer = function ( callback ) {

        if ( self.data.status === 'ready' ) {
            callback();
        } else {
            self.queue.push( callback );
        }

    };

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
        self.display.addEventListener( 'change_color', self.on_change_color );
        self.display.addEventListener( 'change_node', self.on_change_node );
        self.display.addEventListener( 'change_nodes', self.on_change_nodes );
        self.display.addEventListener( 'change_thickness', self.on_change_thickness );
        self.display.addEventListener( 'remove', self.on_remove );

        // Start listening for events from the data
        self.data.addEventListener( 'header', self.on_data_header );
        self.data.addEventListener( 'progress', self.on_data_progress );
        self.data.addEventListener( 'ready', self.on_data_ready );

    };
    
    this.on_add_min_max = function ( event ) {
      
        var id = event.id;
        
        self.data.get_min_max_timeseries( id, function ( id, data ) {
            
            // Check if area already exists
            if ( !( id in self.plottables ) ) {

                self.plottables[ id ] = new Area( self.midground, self.axis );
                self.plottables[ id ].set_x_values( self.x_values );

            }

            self.plottables[ id ].set_y_values( data.min, data.max );
            
        });
        
    };

    this.on_change_color = function ( event ) {

        var id = event.id;
        var attr = event.attr;
        var hex = event.hex;
        var alpha = event.alpha;

        if ( self.plottables[ id ] ) {

            if ( attr === 'stroke' ) {

                self.plottables[ id ].set_stroke_color( hex, alpha );

            } else if ( attr === 'fill' ) {

                self.plottables[ id ].set_fill_color( hex, alpha );

            }

        }

    };

    this.on_change_node = function ( event ) {

        var node_id = event.id;
        var node_number = event.node;

        self.data.get_nodal_timeseries( node_id, node_number, function ( id, node_number, data ) {
            
            // Check if the line already exists
            if ( !( id in self.plottables ) ) {

                self.plottables[ id ] = new Line( self.foreground, self.axis );
                self.plottables[ id ].set_x_values( self.x_values );
                
            }

            self.plottables[ id ].set_y_values( [data] );

        });

    };

    this.on_change_nodes = function ( event ) {

        var node_id = event.id;
        var node_list = event.nodes;
        var node_string = event.string;
        var all_data = [];

        _.each ( node_list, function ( node ) {

            self.data.get_nodal_timeseries( node_id, node, function ( id, node_number, data ) {

                // Add dataset
                all_data.push( data );

                // Check if this was the last dataset to load
                if ( all_data.length == node_list.length ) {

                    // Check if the line already exists
                    if ( !( id in self.plottables) ) {

                        // It doesn't, so create a new line
                        self.plottables[ id ] = new Line( self.foreground, self.axis );
                        self.plottables[ id ].set_x_values( self.x_values );

                    }

                    self.plottables[ id ].set_y_values( all_data );

                }

            });

        });

    };

    this.on_change_thickness = function ( event ) {

        var id = event.id;
        var thickness = event.thickness;

        if ( self.plottables[ id ] ) {

            self.plottables[ id ].set_thickness( thickness );

        }

    };

    this.on_data_header = function ( event ) {

        self.display.set_num_nodes( event.num_nodes );
        self.display.set_num_timesteps( event.num_timesteps );

    };

    this.on_data_progress = function ( event ) {

        self.display.set_progress( event.progress );

    };

    this.on_data_ready = function ( event ) {

        // Show the data view
        self.display.set_view_data();

        // Check for queued callbacks
        _.each( self.queue, function ( callback ) {

            callback();

        });

    };
    
    this.on_remove = function ( event ) {
        
        var id = event.id;

        if ( self.plottables[ id ] ) {

            self.plottables[ id ].remove();

        }
        
    };

    this.redraw = function () {

        _.each( self.plottables, function ( plottable ) {

            plottable.redraw();

        });

    };

    this.set_axis = function ( axis ) {

        self.axis = axis;

    };
    
    this.set_layers = function ( background, midground, foreground ) {
        
        self.background = background;
        self.midground = midground;
        self.foreground = foreground;
        
    };

    this.set_x_units = function ( units ) {

        var on_new_domain = function ( data ) {

            self.x_values = data;

            _.each( self.plottables, function ( plottable ) {

                plottable.set_x_values( self.x_values );

            });

        };

        switch ( units ) {

            case 'time':

                self.defer( function () {
                    self.data.get_seconds_domain( on_new_domain );
                });

                break;

            case 'timestep':

                break;

            case 'record':

                break;

        }

    };

    this.show_display = function () {

        self.display.show();

    };
    
}

Object.assign( Fort63Controller.prototype, EventDispatcher.prototype );