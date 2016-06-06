function Plot( container ) {
    
    // Scoping
    var self = this;
    
    // Parent container
    this.parent = $( container );
    
    // ID
    this.id = guid();
    
    // Add the plot to the container
    this.parent.append(
        adcirc.templates.plot(
            {
                id: self.id
            }
        )
    );

    // Add the line plot
    this.line_plot = new LinePlotChart( self.id );
    
    this.add_controller = function ( controller ) {

        // Listen to the controller for plottable data
        controller.addEventListener( 'remove', self.on_remove );
        controller.addEventListener( 'timeseries', self.on_timeseries );
        
    };
    
    this.resize = function () {
        
        self.line_plot.resize();
        
    };

    this.on_remove = function ( event ) {

        var id = event.id;
        self.line_plot.remove( id );

    };

    this.on_timeseries = function ( event ) {

        var id = event.id;
        var title = event.title;
        var data = event.data;

        self.line_plot.set_data( id, title, data );

    };
    
}

Object.assign( Plot.prototype, EventDispatcher.prototype );