function Plot( container ) {
    
    // Scoping
    var self = this;
    
    // Parent container
    this.parent = $( container );
    
    // ID
    this.id = guid();

    // Controllers
    this.controllers = [];
    
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
        controller.addEventListener( 'area', self.on_area );
        controller.addEventListener( 'change_thickness', self.on_change_thickness );
        controller.addEventListener( 'remove', self.on_remove );
        controller.addEventListener( 'timeseries', self.on_timeseries );

        // Save the controller
        self.controllers.push( controller );
        
    };
    
    this.resize = function () {
        
        self.line_plot.resize();
        
    };
    
    this.set_active = function () {
      
        for ( var i=0; i<self.controllers.length; ++i  ) {

            self.controllers[i].show_display();

        }
        
    };
    
    this.set_inactive = function () {

        for ( var i=0; i<self.controllers.length; ++i )  {

            self.controllers[i].hide_display();

        }
        
    };

    this.on_remove = function ( event ) {

        var id = event.id;
        self.line_plot.remove( id );

    };

    this.on_area = function ( event ) {

        var id = event.id;
        var title = event.title;
        var data = event.data;

        self.line_plot.set_area( id, title, data );

    };

    this.on_change_thickness = function ( event ) {

        var id = event.id;
        var thickness = event.thickness;
        self.line_plot.set_thickness( id, thickness );

    };

    this.on_timeseries = function ( event ) {

        var id = event.id;
        var title = event.title;
        var data = event.data;

        self.line_plot.set_data( id, title, data );

    };
    
}

Object.assign( Plot.prototype, EventDispatcher.prototype );