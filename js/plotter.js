
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

        // Create the plot
        var plot = new AreaPlot( 1200, 300 );

        // Listen to the dataset for events
        fort63.addEventListener( 'ready', function () {

            fort63.set_node( 1 );

        });

        fort63.addEventListener( 'timeseries', function () {

            plot.set_data( fort63.timeseries );

        });

        // Load the data
        fort63.load();

        // Store the data and plot
        self.datasets.push( fort63 );
        self.plots.push( plot );

    };

    this.open_fort_64 = function ( file ) {

        console.log( file );

    };
    
}


Object.assign( Plotter.prototype, EventDispatcher.prototype );