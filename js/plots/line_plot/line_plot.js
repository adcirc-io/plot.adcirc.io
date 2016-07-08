function LinePlotChart ( container ) {
    
    // Scoping
    var self = this;

    // Parent
    this.parent = d3.select( '#' + container );

    // Calculate size and margins
    var container_width = parseInt( this.parent.style( 'width' ), 10 );
    var container_height = 400;
    this.margin = { top: 35, right: 35, bottom: 35, left: 55 };
    this.width = container_width - this.margin.left - this.margin.right;
    this.height = container_height - this.margin.top - this.margin.bottom;

    // Other plotting variables
    this.animation_duration = 250;
    this.bounds = [];
    

    this.defined = function ( data_point ) {

        return data_point;

    };
    
    this.get_x_domain = function () {
        
        return self.x_domain;
        
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


        self.svg.selectAll( '.area' )
            .transition()
            .duration( self.animation_duration )
            .attr( 'd', self.area );


    };
    
    this.set_area = function ( id, title, data ) {

        // Update the plot bounds
        self.update_bounds( id, [ data.lower_bound, data.upper_bound ] );

        // Perform join on plot ID, add it if it doesn't exist
        var select = self.midground.selectAll( '#d' + id ).data( [ _.zip( data.lower_bound, data.upper_bound ) ] );

        select.enter().append( 'path' )
              .attr( 'class', 'area' )
              .attr( 'id', 'd' + id )
              .attr( 'd', self.area );

        select.exit().remove();

        // Update everything
        self.svg.selectAll( '.line' ).transition().duration( self.animation_duration ).attr( 'd', self.line );
        self.svg.selectAll( '.area' ).transition().duration( self.animation_duration ).attr( 'd', self.area );
        
    };

    this.set_x_domain = function ( x_domain ) {

        self.x_domain = x_domain;

        var xmin = d3.min( x_domain );
        var xmax = d3.max( x_domain );

        self.axis.update_x_domain( [ xmin, xmax ] );

    };

    this.set_stroke_color = function ( id, hex, alpha ) {

        self.svg.selectAll( '#d' + id )
            .style( 'stroke', hex )
            .style( 'stroke-opacity', alpha);

    };

    this.set_fill_color = function ( id, hex, alpha ) {

        self.svg.selectAll( '#d' + id )
            .style( 'fill', hex )
            .style( 'fill-opacity', alpha);

    };

    this.set_data = function ( id, title, data ) {

        // Update the plot bounds
        self.update_bounds( id, data );

        // Perform join on plot ID, add it if it doesn't exist
        var select = self.foreground.selectAll( '#d' + id ).data( data );

        select.enter().append( 'path' )
              .attr( 'class', 'line' )
              .attr( 'id', 'd' + id );

        select.exit().remove();

        // Update everything
        self.svg.selectAll( '.line' ).transition().duration( self.animation_duration ).attr( 'd', self.line );
        self.svg.selectAll( '.area' ).transition().duration( self.animation_duration ).attr( 'd', self.area );
        

    };

    this.set_thickness = function ( id, thickness ) {

        self.svg.selectAll( '#d' + id )
            .style( 'stroke-width', thickness + 'px' );

    };

    this.update_bounds = function ( id, data ) {

        if ( id && data ) {

            // Get the min/max ranges
            var ymin = d3.min( _.map( data, function ( timeseries ) { return d3.min( timeseries ); } ) );
            var ymax = d3.max( _.map( data, function ( timeseries ) { return d3.max( timeseries ); } ) );

            // Update the range values if we've got them, add them if we don't
            var found = false;
            for ( var i = 0; i < self.bounds.length; ++i ) {
                if ( self.bounds[ i ].id === id ) {
                    self.bounds[ i ].ymin = ymin;
                    self.bounds[ i ].ymax = ymax;
                    found = true;
                    break;
                }
            }

            if ( !found ) {

                self.bounds.push({
                    id: id,
                    ymin: ymin,
                    ymax: ymax
                });

            }

        }

        var ybounds = [
            d3.min( self.bounds.map( function ( b ) { return b.ymin; } ) ),
            d3.max( self.bounds.map( function ( b ) { return b.ymax; } ) )
        ];

        // self.axis.update( xbounds, ybounds );
        self.axis.update_y_domain( ybounds );

    };
    
    this.x_value = function ( data_point, index ) {

        console.log( this.id );
        console.log( self.x_domain );

        if ( self.x_domain ) {
            return self.axis.x( self.x_domain[ index ] );
        }

        return self.axis.x( index + 1 );

    };
    
    this.y_value = function ( data_point ) {

        return self.axis.y( data_point );

    };


    // Add the plot
    this.svg = this.parent.append( 'svg' )
                   .attr( 'width', container_width )
                   .attr( 'height', container_height )
                   .append( 'g' )
                   .attr( 'transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')' );

    // Create layers
    this.background = this.svg.append( 'g' );
    this.midground = this.svg.append( 'g' );
    this.foreground = this.svg.append( 'g' );


    // Add the axis to the plot
    this.axis = new Axis( self.background, self.width, self.height );


    // Create the plotting functions
    this.line = d3.svg.line()
                  .defined( self.defined )
                  .x( self.x_value )
                  .y( self.y_value )
                  .interpolate( 'monotone' );

    this.area = d3.svg.area()
                  .defined( function ( d ) { return d[0] && d[1]; } )
                  .x( self.x_value )
                  .y0( function ( d ) { return self.axis.y( d[0] ); } )
                  .y1( function ( d ) { return self.axis.y( d[1] ); } )
                  .interpolate( 'monotone' );
    
}