
function Plotter () {

    // Scoping
    var self = this;


    // Variables
    this.datasets = [];


    // Functions
    this.open_fort_63 = function ( file ) {

        self.datasets.push( new Fort63( file ) );

    };

    this.open_fort_64 = function ( file ) {

        console.log( file );

    };
    
}