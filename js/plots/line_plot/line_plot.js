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
    this.bounds = [];


    this.domain_value = function ( data_point, index ) {

        return self.axis.x( index + 1 );

    };

    this.defined = function ( data_point ) {

        return data_point;

    };

    this.range_value = function ( data_point, index ) {

        return self.axis.y( data_point );

    };
    
    this.remove = function ( id ) {

        // Remove the line from the chart
        d3.selectAll( '#d' + id ).remove();

        // Remove the data bounds from our list of bounds
        for ( var i=0; i<self.bounds.length; ++i ) {

            if ( self.bounds[ i ].id === id ) {

                self.bounds.splice( i, 1 );
                break;

            }

        }

        // Update the axes
        self.update_bounds();

        // Update all lines
        self.svg.selectAll( '.line' ).transition().duration( self.animation_duration ).attr( 'd', self.line );
        
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
        self.update_bounds( id, data );

        // Perform join on plot ID, add it if it doesn't exist
        self.svg.selectAll( '#d' + id ).data( [data] )
            .enter().append( 'path' )
            .attr( 'class', 'line' )
            .attr( 'id', 'd' + id );

        // Update all lines
        self.svg.selectAll( '.line' ).transition().duration( self.animation_duration ).attr( 'd', self.line );
        

    };

    this.update_bounds = function ( id, data ) {

        if ( id && data ) {

            // Get the min/max ranges
            var xmax = data.length;
            var ymin = d3.min( data );
            var ymax = d3.max( data );

            // Update the range values if we've got them, add them if we don't
            var found = false;
            for ( var i = 0; i < self.bounds.length; ++i ) {
                if ( self.bounds[ i ].id === id ) {
                    self.bounds[ i ].xmin = 0;
                    self.bounds[ i ].xmax = xmax;
                    self.bounds[ i ].ymin = ymin;
                    self.bounds[ i ].ymax = ymax;
                    found = true;
                    break;
                }
            }

            if ( !found ) {

                self.bounds.push({
                    id: id,
                    xmin: 0,
                    xmax: xmax,
                    ymin: ymin,
                    ymax: ymax
                });

            }

        }

        var xbounds = [
            d3.min( self.bounds.map( function ( b ) { return b.xmin; } ) ),
            d3.max( self.bounds.map( function ( b ) { return b.xmax; } ) )
        ];

        var ybounds = [
            d3.min( self.bounds.map( function ( b ) { return b.ymin; } ) ),
            d3.max( self.bounds.map( function ( b ) { return b.ymax; } ) )
        ];

        self.axis.update( xbounds, ybounds );


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