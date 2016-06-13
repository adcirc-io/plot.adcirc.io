
function Plotter () {

    // Scoping
    var self = this;

    // Variables
    this.active_plot = null;
    this.data_manager = new DataManager();
    this.inactive_plots = [];
    this.sidebar = new Sidebar( 'sidebar' );

    // Page elements
    this.button_add_plot = $( '#plot-placeholder' )[0];
    this.picker_fort_63 = $( '#fort63_picker' )[0];

    
    this.add_plot = function () {
        
        // Create the plot
        var plot = new Plot( '#plotting-area' );
        var element = $( '#' + plot.id )[0];

        element.addEventListener( 'click', self.on_click );
        element.addEventListener( 'mouseenter', self.on_mouse_enter );
        element.addEventListener( 'mouseleave', self.on_mouse_leave );
        
        return plot;
        
    };

    this.initialize = function () {

        self.active_plot = self.add_plot();

        // Event listeners
        self.data_manager.addEventListener( 'new_data', self.on_new_data );
        self.button_add_plot.addEventListener( 'click', self.on_add_plot );
        self.picker_fort_63.addEventListener( 'change', self.on_fort_63_picked );

    };
    
    
    // Event handlers
    this.on_add_plot = function () {

        var plot = self.add_plot();
        
        self.inactive_plots.push( plot );

    };

    this.on_click = function ( event ) {

        // The parent level plot is bound to this when the event is fired
        var plot = $( '#' + this.id );

        plot.removeClass( 'plot-hover' );
        plot.addClass( 'plot-active' );

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

        plot.addClass( 'plot-hover' );
        
    };

    this.on_mouse_leave = function ( event ) {

        var plot = $( '#' + event.target.id );

        plot.removeClass( 'plot-hover' );

    };
    
    this.on_new_data = function ( event ) {

        // Get the dataset
        var dataset = event.dataset;

        // Add a controller for the active plot
        var active_controller = dataset.get_controller();
        self.active_plot.add_controller( active_controller );
        
        // Add controllers to the inactive plots
        for ( var i=0; i<self.inactive_plots.length; ++i ) {
            
            self.inactive_plots[i].add_controller( dataset.get_controller() );
            
        }
        
        // Add the active controller to the sidebar
        self.sidebar.add_controller( active_controller );

    };

    this.on_resize = function () {

        self.active_plot.resize();

        for ( var i=0; i<self.inactive_plots.length; ++i ) {

            self.inactive_plots[i].resize();

        }

    };


    self.initialize();

}


Object.assign( Plotter.prototype, EventDispatcher.prototype );