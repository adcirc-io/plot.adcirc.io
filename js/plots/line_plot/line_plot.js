function LinePlot( parent ) {

    // Scoping
    var self = this;

    // Save reference to parent plot
    this.parent = parent;

    // Variables
    this.id = guid();
    this.current_node = 1;
    this.datasets = [];

    // Functions
    this.add_dataset = function ( dataset ) {

        // Add dataset to list of datasets
        self.datasets.push( dataset );
        
        // Listen for dataset events
        dataset.addEventListener( 'timeseries', function () {
            
            self.set_data( dataset.timeseries );
            
        });

        dataset.set_node( self.current_node );

    };

    // Event handlers
    this.on_height_change = function ( event ) {

        var height = event.height;
        var current_width = self.chart.width + self.chart.margin.left + self.chart.margin.right;

        self.chart.resize( current_width, height );

    };

    this.on_node_change = function ( event ) {

        var node_number = event.node_number;

        for ( var i=0; i<self.datasets.length; ++i ) {

            self.datasets[i].set_node( node_number );

        }

    };

    this.on_width_change = function ( event ) {

        var percent = event.width / 100.0;
        var container_width = $( '#' + self.parent.chart_id ).width();
        var current_height = self.chart.height + self.chart.margin.top + self.chart.margin.bottom;

        self.chart.resize( percent * container_width, current_height );

    };

    // Private Functions
    this._initialize = function () {

        // Create the options controller
        self.options = new LinePlotOptions( self.parent.options_id );
        
        // Create the chart
        self.chart = new LinePlotChart( self.parent.chart_id );

        // Inherit some functions
        self.set_data = self.chart.set_data;
        self.resize = self.chart.resize;

        // Add event listeners
        self.options.addEventListener( 'height', self.on_height_change );
        self.options.addEventListener( 'node', self.on_node_change );
        self.options.addEventListener( 'width', self.on_width_change );

    };

    self._initialize();

}


Object.assign( LinePlot.prototype, EventDispatcher.prototype );