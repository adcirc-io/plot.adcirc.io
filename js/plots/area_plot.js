function AreaPlot ( width, height ) {

    // Scoping
    var self = this;


    // Plot variables
    this.margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 50
    };

    this.animation_duration = 250;
    this.width = width - this.margin.left - this.margin.right;
    this.height = height - this.margin.top - this.margin.bottom;


    this.domain_value = function ( data_point, index ) {

        return self.axis.x( index + 1 );
        
    };

    this.defined = function ( data_point ) {

        return data_point;

    };

    this.range_value = function ( data_point, index ) {

        return self.axis.y( data_point );

    };

    this.set_data = function ( data ) {

        // Update axis with new data extent
        self.axis.update(
            [ 0, data.length ],
            d3.extent( data )
        );

        // Update area
        // self.update_area( data );

        // Update line
        self.update_line( data );

        // Update dots
        // self.update_dots( data );


    };


    this.update_area = function ( data ) {

        // Plot data using joins
        var plot = self.svg.selectAll( '.area' )
                       .data( [ data ] );

        // Add elements when new data is present
        plot.enter().append( 'path' )
            .attr( 'class', 'area' );

        // Set the data attribute
        plot
            .transition().duration( self.animation_duration )
            .attr( 'd', self.area );

        // Remove elements when data has been removed
        plot.exit().remove();

    };


    this.update_dots = function ( data ) {

        var dots = self.svg.selectAll( '.dot' )
            .data( data.filter( self.defined ) );

        dots.enter().append( 'circle' )
            .attr( 'class', 'dot' )
            .attr( 'r', 2.0 );

        dots.transition().duration( self.animation_duration )
            .attr( 'cx', self.domain_value )
            .attr( 'cy', self.range_value );

        dots.exit().remove();

    };

    this.update_line = function ( data ) {

        var plot = self.svg.selectAll( '.line' )
                       .data( [data] );

        // Add elements when new data is present
        plot.enter().append( 'path' )
            .attr( 'class', 'line' );

        // Set the data attribute
        plot.transition().duration( self.animation_duration )
            .attr( 'd', self.line );

        // Remove elements when data has been removed
        plot.exit().remove();

    };



    // Create the plotting functions
    this.line = d3.svg.line()
                  .defined( self.defined )
                  .x( self.domain_value )
                  .y( self.range_value );

    this.area = d3.svg.area()
                  .defined( self.defined )
                  .x( self.domain_value )
                  .y0( self.height )
                  .y1( self.range_value );

    // Add the plot
    this.svg = d3.select( '.plotting-area' ).append( 'svg' )
                 .attr( 'width', width )
                 .attr( 'height', height )
                 .append( 'g' )
                 .attr( 'transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')' );

    // Add the axis to the plot
    this.axis = new Axis( self.svg, self.width, self.height );

}