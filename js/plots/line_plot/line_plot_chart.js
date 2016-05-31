function LinePlotChart ( container ) {
    
    // Scoping
    var self = this;
    
    // Parent
    this.parent = d3.select( container );

    // Calculate size and margins
    var container_width = parseInt( this.parent.style( 'width' ), 10 );
    var container_height = 400;
    this.margin = { top: 30, right: 50, bottom: 30, left: 50 };
    this.width = container_width - this.margin.left - this.margin.right;
    this.height = container_height - this.margin.top - this.margin.bottom;

    // Other plotting variables
    this.animation_duration = 250;


    this.domain_value = function ( data_point, index ) {

        return self.axis.x( index + 1 );

    };

    this.defined = function ( data_point ) {

        return data_point;

    };

    this.range_value = function ( data_point, index ) {

        return self.axis.y( data_point );

    };

    this.resize = function () {

        // Update the width
        var container_width = parseInt( self.parent.style( 'width' ), 10 );
        var container_height = 400;

        self.width = container_width - self.margin.left - self.margin.right;
        self.height = container_height - self.margin.top - self.margin.bottom;

        // Update the plot
        d3.select( self.svg.node().parentNode )
          .attr( 'width', container_width )
          .attr( 'height', container_height );

        self.svg
            .attr( 'width', self.width )
            .attr( 'height', self.height );

        // Update the axis
        self.axis.resize( self.width, self.height );

        // Update the line
        self.svg.selectAll( '.line' )
            .transition()
            .duration( self.animation_duration )
            .attr( 'd', self.line );


    };

    this.set_data = function ( data ) {

        // Update axis with new data extent
        self.axis.update(
            [ 0, data.length ],
            d3.extent( data )
        );

        // Update line
        self.update_line( data );


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

    // Add the plot
    this.svg = this.parent.append( 'svg' )
                   .attr( 'width', container_width )
                   .attr( 'height', container_height )
                   .append( 'g' )
                   .attr( 'transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')' );

    // Add the axis to the plot
    this.axis = new Axis( self.svg, self.width, self.height );
    
}