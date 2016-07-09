function Plot ( parent ) {

    // Scoping
    var self = this;

    // Parent container
    this.parent = $( parent );

    // ID
    this.id = guid();

    // Controllers
    this.controllers = [];

    // Margin options
    this.margin = { top: 35, right: 35, bottom: 35, left: 55 };

    // Axis options
    this.units_x = 'time';
    this.units_y = 'meters';

    // Add the plot to the container
    this.parent.append(
        adcirc.templates.plot(
            {
                id: self.id
            }
        )
    );

    // Create drawing area hierarchy
    this.container = d3.select( '#' + self.id );
    this.area = this.container.append( 'svg' );
    this.svg = this.area.append( 'g' )
                   .attr( 'transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')' );

    // Create layers
    this.background = this.svg.append( 'g' );
    this.midground = this.svg.append( 'g' );
    this.foreground = this.svg.append( 'g' );
    

    this.add_controller = function ( controller ) {

        // Tell the controller which axis to use
        controller.set_axis( self.axis );
        controller.set_layers( self.background, self.midground, self.foreground );
        controller.set_x_units( self.units_x );
        
        // Save the controller
        self.controllers.push( controller );

    };

    this.redraw = function () {

        // Update all plottables
        _.each( self.controllers, function ( controller ) {

            controller.redraw();

        });

    };

    this.resize = function () {

        var area_width = parseInt( self.container.style( 'width' ), 10 );
        var area_height = 400;

        self.width = area_width - self.margin.left - self.margin.right;
        self.height = area_height - self.margin.top - self.margin.bottom;

        // Update the plot
        self.area
          .attr( 'width', area_width )
          .attr( 'height', area_height );

        self.svg
            .attr( 'width', self.width )
            .attr( 'height', self.height );

        // Update the axis
        if ( self.axis ) {
            self.axis.resize( self.width, self.height );
        }

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


    // Initial sizing
    this.resize();

    // Add the axis
    this.axis = new Axis( self.background, self.width, self.height );
    this.axis.addEventListener( 'updated', self.redraw );

}

Object.assign( Plot.prototype, EventDispatcher.prototype );