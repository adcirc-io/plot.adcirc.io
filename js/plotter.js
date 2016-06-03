
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
    this.fort_63_picker = $( '#fort63_picker' )[0];

    // Event handlers
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

    this.on_fort_63_picked = function () {

        // Get the file
        var file = self.fort_63_picker.files[0];

        // Tell data manager to open it
        self.data_manager.open_fort_63( file );

        // Reset the picker
        self.fort_63_picker.value = null;

    };

    // Event listeners
    self.data_manager.addEventListener( 'new_data', self.on_new_data );
    self.fort_63_picker.addEventListener( 'change', self.on_fort_63_picked );

}

// function Plotter () {
//
//     // Scoping
//     var self = this;
//
//
//     // Variables
//     this.datasets = [];
//     this.plots = [];
//
//
//     // Functions
//     this.set_node = function ( node ) {
//
//         for ( var i=0; i<self.datasets.length; ++i ) {
//
//             self.datasets[i].set_node( node );
//
//         }
//
//     };
//
//     this.open_fort_63 = function ( file ) {
//
//         // Create the dataset
//         var fort63 = new Fort63( file );
//
//         // Add a plot row
//         var plot = new Plot( '.plotting-area' );
//         var line_plot = new LinePlot( plot );
//
//         // Listen to the dataset for events
//         fort63.addEventListener( 'ready', function () {
//
//             line_plot.add_dataset( fort63 );
//
//         });
//
//         // Load the data
//         fort63.load();
//
//         // Store the data and plot
//         self.datasets.push( fort63 );
//         self.plots.push( line_plot );
//
//     };
//
//     this.open_fort_64 = function ( file ) {
//
//         console.log( file );
//
//     };
//
//     this.on_resize = function () {
//
//         for ( var i=0; i<self.plots.length; ++i ) {
//
//             self.plots[i].resize();
//
//         }
//
//     };
//
// }


Object.assign( Plotter.prototype, EventDispatcher.prototype );