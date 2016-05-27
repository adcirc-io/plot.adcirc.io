function AreaPlot ( width, height ) {

    // Scoping
    var self = this;


    // Plotting variables
    this.margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 50
    };

    this.animation_duration = 250;
    this.width = width - this.margin.left - this.margin.right;
    this.height = height - this.margin.top - this.margin.bottom;

    // Plotting functions
    this.build_x_axis = function () {

        // Create the function that maps from data space to display space
        self.x = d3.scale.linear().range( [ 0, self.width ] );

        // Create the axis function
        self.x_axis = d3.svg.axis()
                        .ticks( 10 )
                        .scale( self.x )
                        .orient( 'bottom' );

        // Add the axis
        self.x_axis_g = self.svg.append( 'g' )
                            .attr( 'class', 'x axis' )
                            .attr( 'transform', 'translate(0,' + self.height + ')' )
                            .call( self.x_axis );

        // Create the grid function
        self.x_grid = d3.svg.axis()
                        .ticks( 20 )
                        .scale( self.x )
                        .orient( 'bottom' )
                        .tickSize( -self.height );

        // Add the grid
        self.x_grid_g = self.svg.append( 'g' )
                            .attr( 'class', 'x grid' )
                            .attr( 'transform', 'translate(0,' + self.height + ')' )
                            .call( self.x_grid );

        // Style the grid
        self.style_x_grid( self.x_grid_g );

    };

    this.build_y_axis = function () {

        // Create the function that maps from data space to display space
        self.y = d3.scale.linear().range( [ self.height, 0 ] );

        // Create the axis function
        self.y_axis = d3.svg.axis()
                        .ticks( 10 )
                        .scale( self.y )
                        .orient( 'left' );

        // Add the axis
        self.y_axis_g = self.svg.append( 'g' )
                            .attr( 'class', 'y axis' )
                            .call( self.y_axis );

        // Create the grid function
        self.y_grid = d3.svg.axis()
                        .ticks( 20 )
                        .scale( self.y )
                        .orient( 'left' )
                        .tickSize( -self.width );

        // Add the grid
        self.y_grid_g = self.svg.append( 'g' )
                            .attr( 'class', 'y grid' )
                            .call( self.y_grid );

        // Style the grid
        self.style_y_grid( self.y_grid_g );


    };

    this.domain_value = function ( data_point, index ) {

        return self.x( index + 1 );

    };

    this.defined = function ( data_point ) {

        return data_point;

    };

    this.range_value = function ( data_point, index ) {

        return self.y( data_point );

    };

    this.set_data = function ( data ) {

        // Update data extents
        var y_extent = d3.extent( data );
        self.x.domain( [ 0, data.length ] );
        self.y.domain( [ Math.floor10( y_extent[0], -1 ), Math.ceil10( y_extent[1], -1 ) ] );

        // Update area
        // self.update_area( data );

        // Update line
        self.update_line( data );

        // Update dots
        // self.update_dots( data );

        // Update axes
        self.update_axes();

    };

    this.style_x_grid = function ( g ) {

        g.selectAll( '.tick' )
         .data( self.x.ticks( 10 ), function ( d ) { return d; } )
         .exit()
         .classed( 'minor', true );

    };

    this.style_y_grid = function ( g ) {

        g.selectAll( '.tick' )
         .data( self.y.ticks( 10 ), function ( d ) { return d; } )
         .exit()
         .classed( 'minor', true );

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

    this.update_axes = function () {

        self.x_axis_g
            .transition().duration( self.animation_duration )
            .call( self.x_axis );
        self.y_axis_g
            .transition().duration( self.animation_duration )
            .call( self.y_axis );

        self.x_grid_g.transition()
            .duration( self.animation_duration )
            .call( self.x_grid );
        self.y_grid_g.transition()
            .duration( self.animation_duration )
            .call( self.y_grid );

        // var g = self.svg.selectAll( '.y.grid' )
        //             .call( self.y_grid );
        //
        // self.style_y_grid( g );

        self.style_x_grid( self.x_grid_g );
        self.style_y_grid( self.y_grid_g );

        // self.svg.select( '.x.axis.minor' )
        //     .transition().duration( self.animation_duration )
        //     .call( self.x_minor );

        // self.x_major_g.call( self.style_axis );
        // self.y_axis_g.call( self.style_axis );

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



    // Create the plot
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

    // Build axes
    self.build_x_axis();
    self.build_y_axis();

}