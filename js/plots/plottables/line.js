function Line ( container, axis ) {
    
    var self = this;

    this.animation_duration = 250;  // Duration of animations
    this.axis = axis;               // The axis on which this line will be drawn
    this.container = container;     // The container for this line, must be a d3 svg
    this.id = guid();               // Unique ID for this line


    this.defined = function ( data_point ) {

        return data_point;

    };

    this.redraw = function () {

        // Update data with transitions
        self.svg
            .selectAll( '.line' )
            .transition()
            .duration( self.animation_duration )
            .attr( 'd', self.line );

    };

    this.remove = function () {

        self.svg.remove();
        self.axis.remove_x_domain( self.id );
        self.axis.remove_y_domain( self.id );

    };
    
    this.set_stroke_color = function ( hex, alpha ) {

        self.svg.selectAll( '#d' + self.id )
            .style( 'stroke', hex )
            .style( 'stroke-opacity', alpha);
        
    };

    this.set_thickness = function ( thickness ) {

        self.svg.selectAll( '#d' + self.id )
            .style( 'stroke-width', thickness + 'px' );

    };

    this.set_x_values = function ( x_values ) {

        // Update the x values
        self.x_values = x_values;

        // Tell the axis the extent of the new x-values
        self.axis.set_x_domain( self.id, d3.extent( x_values ) );

    };

    this.set_y_values = function ( y_values ) {

        // Perform join on line id
        var select = self.svg.selectAll( '#d' + self.id ).data( y_values );

        // Add line if it doesn't exist
        select.enter().append( 'path' )
              .attr( 'class', 'line' )
              .attr( 'id', 'd' + self.id );

        // Remove data that no longer exists
        select.exit().remove();
        
        // Calculate the y-bounds of the new data using map reduce
        var extents = _.map( y_values, function ( dataset ) { return d3.extent( dataset ); } );
        var extent = _.reduce( extents, function ( extent, current ) {
            return d3.extent( _.flatten( extent, current ) );
        });

        // Tell the axis the extent of the new y-values
        self.axis.set_y_domain( self.id, extent );

    };

    this.x_value = function ( d, i ) {

        if ( self.x_values ) {

            return self.axis.x( self.x_values[ i ] );

        }

        return self.axis.x( i+1 );

    };

    this.y_value = function ( d ) {

        return self.axis.y( d );

    };


    this.line = d3.svg.line()
                  .defined( self.defined )
                  .x( self.x_value )
                  .y( self.y_value );
                  // .interpolate( 'monotone' );

    this.svg = self.container.append( 'g' );
    
}
