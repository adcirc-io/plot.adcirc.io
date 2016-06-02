
function Plotter () {

    // Scoping
    var self = this;


    // Variables
    this.datasets = [];
    this.plots = [];


    // Functions
    this.set_node = function ( node ) {

        for ( var i=0; i<self.datasets.length; ++i ) {

            self.datasets[i].set_node( node );

        }

    };

    this.open_fort_63 = function ( file ) {

        // Create the dataset
        var fort63 = new Fort63( file );

        // Add a plot row
        var plot = new Plot( '.plotting-area' );
        var line_plot = new LinePlot( plot );

        // Listen to the dataset for events
        fort63.addEventListener( 'ready', function () {

            line_plot.add_dataset( fort63 );

        });

        // Load the data
        fort63.load();

        // Store the data and plot
        self.datasets.push( fort63 );
        self.plots.push( line_plot );

    };

    this.open_fort_64 = function ( file ) {

        console.log( file );

    };
    
    this.on_resize = function () {
        
        for ( var i=0; i<self.plots.length; ++i ) {

            self.plots[i].resize();

        }
        
    };
    
}


Object.assign( Plotter.prototype, EventDispatcher.prototype );