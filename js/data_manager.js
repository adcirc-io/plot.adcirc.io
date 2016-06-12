function DataManager () {
    
    // Scoping
    var self = this;

    
    // Data cache
    this.datasets = {};

    
    // Public Functions
    this.open_fort_63 = function ( file ) {
        
        // Create the dataset
        var fort63 = new Fort63( file );

        // Cache the dataset
        self._add_dataset( fort63 );

        // Start loading
        fort63.load();

    };
    
    
    // Private Functions
    this._add_dataset = function ( dataset ) {

        // Create a unique id for the dataset
        var id = guid();

        // Cache the dataset
        self.datasets[ id ] = dataset;

        // Let everyone know there's more data available
        self.dispatchEvent( { type: 'new_data', dataset: dataset } );

    };
    
}

Object.assign( DataManager.prototype, EventDispatcher.prototype );