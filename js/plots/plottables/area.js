function Area ( container, axis ) {

    var self = this;

    this.animation_duration = 250;  // Duration of animations
    this.axis = axis;               // The axis on which this line will be drawn
    this.container = container;     // The container for this line, must be a d3 svg
    this.id = guid();               // Unique ID for this line

    this.defined = function ( data ) {

        return data.length && data[0] && data[1];

    };

    this.redraw = function () {

        self.svg
            .selectAll( '.area' )
            .transition()
            .duration( self.animation_duration )
            .attr( 'd', self.area );

    };

    this.remove = function () {

        self.svg.remove();
        self.axis.remove_x_domain( self.id );
        self.axis.remove_y_domain( self.id );

    };

    this.set_fill_color = function ( hex, alpha ) {

        self.svg
            .selectAll( '#d' + self.id )
            .style( 'fill', hex )
            .style( 'fill-opacity', alpha);

    };

    this.set_x_values = function ( x_values ) {

        // Update the x values
        self.x_values = x_values;

        // Tell the axis the extent of the new x-values
        self.axis.set_x_domain( self.id, d3.extent( x_values ) );

    };

    this.set_y_values = function ( lower, upper ) {

        // Perform join on plot ID
        var select = self.svg
                         .selectAll( '#d' + self.id )
                         .data( [ _.zip( lower, upper ) ] );

        // Add area if it doesn't exist
        select.enter().append( 'path' )
              .attr( 'class', 'area' )
              .attr( 'id', 'd' + self.id );

        // Remove data that no longer exists
        select.exit().remove();

        // Calculate the y-bounds of the new data
        var extent = d3.extent( _.concat( d3.extent( lower ), d3.extent( upper ) ) );

        // Tell the axis the extent of the new y-values
        self.axis.set_y_domain( self.id, extent );

    };

    this.x_value = function ( d, i ) {

        if ( self.x_values ) {

            return self.axis.x( self.x_values[ i ] );

        }

        return self.axis.x( i+1 );

    };

    this.y_value_lower = function ( d ) {

        return self.axis.y( d[0] );

    };

    this.y_value_upper = function ( d ) {

        return self.axis.y( d[1] );

    };

    this.area = d3.svg.area()
        .defined( self.defined )
        .x( self.x_value )
        .y0( self.y_value_lower )
        .y1( self.y_value_upper )
        .interpolate( 'monotone' );

    this.svg = self.container.append( 'g' );


}