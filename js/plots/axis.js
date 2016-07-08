function Axis ( svg, width, height ) {
    
    // Scoping
    var self = this;
    
    // Axis options
    this.num_major = { x: 10, y: 10 };
    this.num_minor = { x: 1, y: 1 };
    this.animation_duration = 250;

    // Axis bounds
    this.x_bounds = {};
    this.y_bounds = {};

    // Axis mode
    this.x_axis_mode = 'fit';
    this.y_axis_mode = 'fit';

    // Axis formatting
    this.format_x_tick = function ( seconds ) {

        return moment.duration( seconds, 'seconds' ).format( 'h:mm' );

    };


    // Axis variables
    this.svg = svg;
    this.width = width;
    this.height = height;
    this.x = d3.scale.linear().range( [0, self.width] );
    this.y = d3.scale.linear().range( [self.height, 0] );
    this.x_ticks = d3.svg.axis()
                     .scale( self.x )
                     .orient( 'bottom' )
                     .tickFormat( self.format_x_tick );
    this.y_ticks = d3.svg.axis()
                     .scale( self.y )
                     .orient( 'left' );
    this.x_lines = d3.svg.axis()
                     .scale( self.x )
                     .orient( 'bottom' )
                     .tickSize( -self.height );
    this.y_lines = d3.svg.axis()
                     .scale( self.y )
                     .orient( 'left' )
                     .tickSize( -self.width );
    this.x_grid = d3.svg.axis()
                    .scale( self.x )
                    .orient( 'bottom' )
                    .tickSize( -self.height );
    this.y_grid = d3.svg.axis()
                    .scale( self.y )
                    .orient( 'left' )
                    .tickSize( -self.width );
    this.x_ticks_g = self.svg.append( 'g' )
                         .attr( 'class', 'x axis' )
                         .attr( 'transform', 'translate(0,' + self.height + ')' )
                         .call( self.x_ticks );
    this.y_ticks_g = self.svg.append( 'g' )
                         .attr( 'class', 'y axis' )
                         .call( self.y_ticks );
    this.x_lines_g = self.svg.append( 'g' )
                         .attr( 'class', 'x lines' )
                         .attr( 'transform', 'translate(0,' + self.height + ')' )
                         .call( self.x_lines );
    this.y_lines_g = self.svg.append( 'g' )
                         .attr( 'class', 'y lines' )
                         .call( self.y_lines );
    this.x_grid_g = self.svg.append( 'g' )
                        .attr( 'class', 'x grid' )
                        .attr( 'transform', 'translate(0,' + self.height + ')' )
                        .attr( 'stroke-dasharray', '2, 2')
                        .call( self.x_grid );
    this.y_grid_g = self.svg.append( 'g' )
                        .attr( 'class', 'y grid' )
                        .attr( 'stroke-dasharray', '2, 2')
                        .call( self.y_grid );

    this.fit_x_domain = function () {

        var x_bounds = [
            d3.min( _.map( self.x_bounds, function ( bounds ) { return bounds[0]; } ) ),
            d3.max( _.map( self.x_bounds, function ( bounds ) { return bounds[1]; } ) )
        ];

        if ( !x_bounds[0] || !x_bounds[1] ) {

            x_bounds = [ 0, 1 ];

        }

        self.update_x_domain( x_bounds );

    };

    this.fit_y_domain = function () {

        var y_bounds = [
            d3.min( _.map( self.y_bounds, function ( bounds ) { return bounds[0]; } ) ),
            d3.max( _.map( self.y_bounds, function ( bounds ) { return bounds[1]; } ) )
        ];

        if ( !y_bounds[0] || !y_bounds[1] ) {

            y_bounds = [ 0, 1 ];

        }

        self.update_y_domain( y_bounds );

    };

    this.remove_x_domain = function ( id ) {

        self.x_bounds = _.omit( self.x_bounds, [id] );

        if ( self.x_axis_mode === 'fit' ) {

            self.fit_x_domain();

        } else {

            self.update();

        }

    };
    
    this.remove_y_domain = function ( id ) {
        
        self.y_bounds = _.omit( self.y_bounds, [id] );

        if ( self.y_axis_mode === 'fit' ) {

            self.fit_y_domain();

        } else {

            self.update();

        }
        
    };

    this.resize = function ( width, height ) {

        self.x.range( [0, width] );
        self.y.range( [height, 0] );
        self.width = width;
        self.height = height;

        self.update();

    };

    this.set_x_domain = function ( id, x_domain ) {

        self.x_bounds[ id ] = x_domain;

        if ( self.x_axis_mode === 'fit') {

            self.fit_x_domain();

        } else {

            self.update();

        }

    };

    this.set_y_domain = function ( id, y_domain ) {

        self.y_bounds[ id ] = y_domain;

        if ( self.y_axis_mode === 'fit' ) {

            self.fit_y_domain();

        } else {

            self.update();

        }


    };

    this.update = function () {

        var major_x = self.x.ticks( self.num_major.x );
        var major_y = self.y.ticks( self.num_major.y );
        var minor_x = [];
        var minor_y = [];
        var i, j, interval;
        interval = ( major_x[1] - major_x[0] ) / ( self.num_minor.x + 1 );
        for ( i=0; i<major_x.length; ++i ) {
            for ( j=0; j<self.num_minor.x; ++j ) {
                var x = major_x[i] + interval * ( j + 1 );
                if ( self.x( x ) < self.width ) {
                    minor_x.push( x );
                }
            }
        }
        interval = ( major_y[1] - major_y[0] ) / ( self.num_minor.y + 1 );
        for ( i=0; i<major_y.length; ++i ) {
            for ( j=0; j<self.num_minor.y; ++j ) {
                var y = major_y[i] + interval * ( j + 1 );
                if ( self.y( y ) > 0 ) {
                    minor_y.push( y );
                }
            }
        }

        self.x_ticks.tickValues( major_x );
        self.y_ticks.tickValues( major_y );
        self.x_lines.tickSize( -self.height )
            .tickValues( major_x );
        self.y_lines.tickSize( -self.width )
            .tickValues( major_y );
        self.x_grid.tickSize( -self.height )
            .tickValues( minor_x );
        self.y_grid.tickSize( -self.width )
            .tickValues( minor_y );

        self.x_ticks_g
            .transition()
            .duration( self.animation_duration )
            .attr( 'transform', 'translate(0,' + self.height + ')' )
            .call( self.x_ticks );
        self.y_ticks_g
            .transition()
            .duration( self.animation_duration )
            .call( self.y_ticks );
        self.x_lines_g
            .transition()
            .duration( self.animation_duration )
            .attr( 'transform', 'translate(0,' + self.height + ')' )
            .call( self.x_lines );
        self.y_lines_g
            .transition()
            .duration( self.animation_duration )
            .call( self.y_lines );
        self.x_grid_g
            .transition()
            .duration( self.animation_duration )
            .attr( 'transform', 'translate(0,' + self.height + ')' )
            .call( self.x_grid );
        self.y_grid_g
            .transition()
            .duration( self.animation_duration )
            .call( self.y_grid );

        self.dispatchEvent({
            type: 'updated'
        });

    };

    this.update_x_domain = function ( x_domain ) {

        self.x_domain = x_domain;
        self.x.domain( self.x_domain ).nice();
        self.update();

    };

    this.update_y_domain = function ( y_domain ) {

        self.y_domain = y_domain;
        self.y.domain( self.y_domain ).nice();
        self.update();

    };

    self.update();

}

Object.assign( Axis.prototype, EventDispatcher.prototype );