
function Plotter () {

    // Scoping
    var self = this;

    this.active_plot = new Plot( '#plotting-area' );
    this.inactive_plots = [];
    
    // Data Manager
    this.data_manager = new DataManager();

    // Sidebar
    this.sidebar = new Sidebar( 'sidebar' );

    // Page elements
    this.add_plot = $( '#plot-placeholder' )[0];
    this.fort_63_picker = $( '#fort63_picker' )[0];

    // Event handlers
    this.on_add_plot = function () {

        self.inactive_plots.push( new Plot( '#plotting-area' ) );

    };

    this.on_fort_63_picked = function () {

        // Get the file
        var file = self.fort_63_picker.files[0];

        // Tell data manager to open it
        self.data_manager.open_fort_63( file );

        // Reset the picker
        self.fort_63_picker.value = null;

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

    // Event listeners
    self.data_manager.addEventListener( 'new_data', self.on_new_data );

    self.add_plot.addEventListener( 'click', self.on_add_plot );
    self.fort_63_picker.addEventListener( 'change', self.on_fort_63_picked );

}


Object.assign( Plotter.prototype, EventDispatcher.prototype );