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
        controller.addEventListener( 'change_color', self.on_change_color );
        controller.addEventListener( 'change_thickness', self.on_change_thickness );
        controller.addEventListener( 'domain', self.on_domain );
        controller.addEventListener( 'remove', self.on_remove );
        controller.addEventListener( 'timeseries', self.on_timeseries );

        // Save the controller
        self.controllers.push( controller );
        
    };
    
    this.get_x_domain = function () {
        
        return self.line_plot.get_x_domain();
        
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
    
    this.set_x_domain = function ( x_domain ) {
        
        self.line_plot.set_x_domain( x_domain );
        
    };

    this.on_area = function ( event ) {

        var id = event.id;
        var title = event.title;
        var data = event.data;

        self.line_plot.set_area( id, title, data );

    };
    
    this.on_domain = function ( event ) {

        self.set_x_domain( event.domain );

    };
    
    this.on_change_color = function ( event ) {

        var id = event.id;
        var attr = event.attr;
        var hex = event.hex;
        var alpha = event.alpha;

        if ( attr === 'stroke' ) {
            self.line_plot.set_stroke_color( id, hex, alpha );
        }

        else if ( attr === 'fill' ) {
            self.line_plot.set_fill_color( id, hex, alpha );
        }

    };

    this.on_change_thickness = function ( event ) {

        var id = event.id;
        var thickness = event.thickness;
        self.line_plot.set_thickness( id, thickness );

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