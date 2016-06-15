
function Plotter () {

    // Scoping
    var self = this;

    // Variables
    this.active_plot = null;
    this.data_manager = new DataManager();
    this.plots = {};
    this.sidebar = new Sidebar( 'sidebar' );

    // Page elements
    this.button_add_plot = $( '#add-plot-button' )[0];
    this.picker_fort_63 = $( '#fort63_picker' )[0];

    
    this.add_plot = function () {
        
        // Create the plot
        var plot = new Plot( '#plotting-area' );
        var element = $( '#' + plot.id )[0];

        // Add controllers
        self.data_manager.generate_controllers( function ( controller ) {

            plot.add_controller( controller );
            self.sidebar.add_controller( controller );

        });
        
        // Add event listeners
        element.addEventListener( 'click', self.on_click );
        element.addEventListener( 'mouseenter', self.on_mouse_enter );
        element.addEventListener( 'mouseleave', self.on_mouse_leave );

        self.plots[ plot.id ] = plot;
        
        return plot.id;
        
    };

    this.initialize = function () {

        self.set_active_plot( self.add_plot() );

        // Event listeners
        self.data_manager.addEventListener( 'new_data', self.on_new_data );
        self.button_add_plot.addEventListener( 'click', self.on_add_plot );
        self.picker_fort_63.addEventListener( 'change', self.on_fort_63_picked );

    };
    
    
    // Event handlers
    this.on_add_plot = function () {

        // Create the new plot
        var new_plot = self.add_plot();

        // Make the new plot active
        self.set_active_plot( new_plot );

    };

    this.on_click = function ( event ) {

        // The parent level plot is bound to this when the event is fired
        var plot = $( '#' + this.id );

        if ( !plot.hasClass( 'plot-active' ) ) {

            plot.removeClass( 'plot-hover' );
            plot.addClass( 'plot-active' );

        }

        // Make plot active
        self.set_active_plot( this.id );


    };

    this.on_fort_63_picked = function () {

        // Get the file
        var file = self.picker_fort_63.files[0];

        // Tell data manager to open it
        self.data_manager.open_fort_63( file );

        // Reset the picker
        self.picker_fort_63.value = null;

    };

    this.on_mouse_enter = function ( event ) {
        
        var plot = $( '#' + event.target.id );

        if ( !plot.hasClass( 'plot-active' ) ) {

            plot.addClass( 'plot-hover' );

        }
        
    };

    this.on_mouse_leave = function ( event ) {

        var plot = $( '#' + event.target.id );

        plot.removeClass( 'plot-hover' );

    };
    
    this.on_new_data = function ( event ) {

        // Get the dataset
        var dataset = event.dataset;

        // Add a controller for all plots
        for ( var id in self.plots ) {

            if ( self.plots.hasOwnProperty( id ) ) {

                var controller = dataset.get_controller();
                self.plots[ id ].add_controller( controller );
                self.sidebar.add_controller( controller );


            }

        }

        // Make sure the active plot has everything displayed
        self.plots[ self.active_plot ].set_active();

    };

    this.on_resize = function () {

        for ( var id in self.plots ) {

            if ( self.plots.hasOwnProperty( id ) ) {

                self.plots[ id ].resize();

            }

        }

    };

    this.set_active_plot = function ( id ) {

        // Check if this plot is already active
        if ( self.active_plot === id ) return;

        // If there is an active plot, deactivate it
        if ( self.active_plot ) {

            var e_active = $( '#' + self.active_plot );
            var plot_active = self.plots[ self.active_plot ];

            // Make the page element inactive
            e_active.removeClass( 'plot-active' );

            // Deactivate current plot
            plot_active.removeEventListener( 'controller_added', self.sidebar.on_controller_added );
            plot_active.set_inactive();

        }

        // It's not, so get the plot
        var e = $( '#' + id );
        var plot = self.plots[ id ];

        // Make the new plot active
        if ( plot ) {

            // Make the page element active
            e.removeClass( 'plot-hover' );
            e.addClass( 'plot-active' );

            // Activate new plot
            self.active_plot = id;

            plot.addEventListener( 'controller_added', self.sidebar.on_controller_added );
            plot.set_active();

        }

    };


    self.initialize();

}


Object.assign( Plotter.prototype, EventDispatcher.prototype );