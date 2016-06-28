function Axis ( svg, width, height ) {
    
    // Scoping
    var self = this;
    
    // Axis options
    self.num_major = { x: 10, y: 10 };
    self.num_minor = { x: 20, y: 20 };
    self.animation_duration = 250;

    // Axis formatting
    self.formatTime = d3.time.format.multi([
        [".%L", function(d) { return d.getMilliseconds(); }],
        [":%S", function(d) { return d.getSeconds(); }],
        ["%I:%M", function(d) { return d.getMinutes(); }],
        ["%I %p", function(d) { return d.getHours(); }],
        ["%a %d", function(d) { return d.getDay() && d.getDate() != 1; }],
        ["%b %d", function(d) { return d.getDate() != 1; }],
        ["%B", function(d) { return d.getMonth(); }],
        ["%Y", function() { return true; }]
    ]);
    self.formatSeconds = function ( seconds ) { return self.formatTime( new Date( 1988, 7, 1, 0, 0, seconds ) ); };
    
    // Axis variables
    self.svg = svg;
    self.width = width;
    self.height = height;
    self.x = d3.scale.linear().range( [0, self.width] );
    self.y = d3.scale.linear().range( [self.height, 0] );
    self.x_ticks = d3.svg.axis()
                     .ticks( self.num_major.x )
                     .scale( self.x )
                     .orient( 'bottom' )
                     .tickFormat( self.formatSeconds );
    self.y_ticks = d3.svg.axis()
                     .ticks( self.num_major.y )
                     .scale( self.y )
                     .orient( 'left' );
    self.x_lines = d3.svg.axis()
                     .ticks( self.num_major.x )
                     .scale( self.x )
                     .orient( 'bottom' )
                     .tickSize( -self.height );
    self.y_lines = d3.svg.axis()
                     .ticks( self.num_major.y )
                     .scale( self.y )
                     .orient( 'left' )
                     .tickSize( -self.width );
    self.x_grid = d3.svg.axis()
                    .ticks( self.num_minor.x )
                    .scale( self.x )
                    .orient( 'bottom' )
                    .tickSize( -self.height );
    self.y_grid = d3.svg.axis()
                    .ticks( self.num_minor.y )
                    .scale( self.y )
                    .orient( 'left' )
                    .tickSize( -self.width );
    self.x_ticks_g = self.svg.append( 'g' )
                         .attr( 'class', 'x axis' )
                         .attr( 'transform', 'translate(0,' + self.height + ')' )
                         .call( self.x_ticks );
    self.y_ticks_g = self.svg.append( 'g' )
                         .attr( 'class', 'y axis' )
                         .call( self.y_ticks );
    self.x_lines_g = self.svg.append( 'g' )
                         .attr( 'class', 'x lines' )
                         .attr( 'transform', 'translate(0,' + self.height + ')' )
                         .call( self.x_lines );
    self.y_lines_g = self.svg.append( 'g' )
                         .attr( 'class', 'y lines' )
                         .call( self.y_lines );
    self.x_grid_g = self.svg.append( 'g' )
                         .attr( 'class', 'x grid' )
                         .attr( 'transform', 'translate(0,' + self.height + ')' )
                         .call( self.x_grid );
    self.y_grid_g = self.svg.append( 'g' )
                         .attr( 'class', 'y grid' )
                         .call( self.y_grid );

    self.resize = function ( width, height ) {

        self.x.range( [0, width] );
        self.y.range( [height, 0] );
        self.width = width;
        self.height = height;

        self.update();

    };

    self.update = function () {

        self.x_lines.tickSize( -self.height );
        self.y_lines.tickSize( -self.width );
        self.x_grid.tickSize( -self.height );
        self.y_grid.tickSize( -self.width );

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

    };

    self.update_x_domain = function ( x_domain ) {

        self.x_domain = x_domain;
        self.x.domain( self.x_domain ).nice();
        self.update();

    };

    self.update_y_domain = function ( y_domain ) {

        self.y_domain = y_domain;
        self.y.domain( self.y_domain ).nice();
        self.update();

    };
    
}