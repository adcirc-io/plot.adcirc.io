function LinePlot( container ) {

    // Scoping
    var self = this;

    // Save reference to container
    this.parent = $( container );

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
    this.on_node_change = function () {

        var node_number = self.node_number_picker.val();

        for ( var i=0; i<self.datasets.length; ++i ) {

            self.datasets[i].set_node( node_number );

        }

    };

    // Private Functions
    this._initialize = function () {

        // Create defaults for new plot
        var defaults = {
            id: self.id,
            node_picker: self.id + 'np'
        };
        
        // Add the line plot template to the container
        self.parent.append( adcirc.templates.line_plot( defaults ) );

        // Get the options and plot areas
        self.options_div = $( '#' + defaults.id + ' > .options' )[0];
        self.chart_div = $( '#' + defaults.id + ' > .chart' )[0];

        // Get the options interface
        self.node_number_picker = $( '#' + defaults.node_picker );
        
        // Create the options and chart objects
        self.chart = new LinePlotChart( self.chart_div );

        // Inherit some functions
        self.set_data = self.chart.set_data;
        self.resize = self.chart.resize;

        // Add event listeners
        self.node_number_picker[0].addEventListener( 'change', self.on_node_change );

    };

    self._initialize();

}