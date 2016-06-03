function LinePlotChart ( container ) {
    
    // Scoping
    var self = this;

    // Parent
    this.parent = d3.select( '#' + container );

    // Calculate size and margins
    var container_width = parseInt( this.parent.style( 'width' ), 10 );
    var container_height = 400;
    this.margin = { top: 32, right: 40, bottom: 30, left: 50 };
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

    this.set_data = function ( id, title, data ) {

        // Update the plot bounds
        self.update_bounds( data );

        // Perform join on plot ID, add it if it doesn't exist
        self.svg.selectAll( '#d' + id ).data( [data] )
            .enter().append( 'path' )
            .attr( 'class', 'line' )
            .attr( 'id', 'd' + id );

        // Update all lines
        self.svg.selectAll( '.line' ).transition().duration( self.animation_duration ).attr( 'd', self.line );
        

    };

    this.update_bounds = function ( data ) {

        var xmax = data.length;
        var ymin = d3.min( data );
        var ymax = d3.max( data );

        if ( !self.x_bounds ) {
            self.x_bounds = [ 0, data.length ];
        } else {
            self.x_bounds = [ 0, d3.max( [xmax, self.x_bounds[1]] ) ];
        }

        if ( !self.y_bounds ) {
            self.y_bounds = d3.extent( data );
        } else {
            self.y_bounds = [ d3.min( [ymin, self.y_bounds[0]] ), d3.max( [ymax, self.y_bounds[1]] ) ];
        }

        self.axis.update( self.x_bounds, self.y_bounds );

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