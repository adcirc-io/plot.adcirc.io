function LinePlotOptions( container ) {

    // Scoping
    var self = this;

    // Parent container
    this.parent = $( '#' + container );

    // IDs
    this.id_div_collapse = guid();
    this.id_icon_collapse = guid();
    this.id_icon_more = guid();
    this.id_input_height = guid();
    this.id_input_node = guid();       // TEMPORARY
    this.id_input_width = guid();


    // Add the template to the page
    this.parent.append(
        adcirc.templates.line_plot(
            {
                div_collapse: self.id_div_collapse,
                icon_collapse: self.id_icon_collapse,
                icon_more: self.id_icon_more,
                input_height: self.id_input_height,
                input_node: self.id_input_node,              // TEMPORARY
                input_width: self.id_input_width
            }
        )
    );


    // Get the elements from the page
    this.div_collapse = $( '#' + self.id_div_collapse );
    this.icon_collapse = $( '#' + self.id_icon_collapse );
    this.input_height = $( '#' + self.id_input_height );
    this.input_node = $( '#' + self.id_input_node );        // TEMPORARY
    this.input_width = $( '#' + self.id_input_width );


    // Event listeners
    this.on_icon_collapse = function () {

        // Collapse (or expand) the line plot options
        self.div_collapse.collapse( 'toggle' );

    };

    this.on_input_height = function () {

        // Get the height
        var height = self.input_height.val();

        // Dispatch event
        self.dispatchEvent( { type: 'height', height: height } );

    };

    this.on_input_node = function () {                                      // TEMPORARY
                                                                            // TEMPORARY
        // Get the node number                                              // TEMPORARY
        var node_number = self.input_node.val();                            // TEMPORARY
                                                                            // TEMPORARY
        // Dispatch event                                                   // TEMPORARY
        self.dispatchEvent( { type: 'node', node_number: node_number } );   // TEMPORARY
                                                                            // TEMPORARY
    };                                                                      // TEMPORARY

    this.on_input_width = function () {

        // Get width
        var width = self.input_width.val();

        // Dispatch event
        self.dispatchEvent( { type: 'width', width: width } );

    };

    // Connect event listeners
    this.icon_collapse.click( self.on_icon_collapse );
    this.input_height[0].addEventListener( 'change', self.on_input_height );
    this.input_node[0].addEventListener( 'change', self.on_input_node );    // TEMPORARY
    this.input_width[0].addEventListener( 'change', self.on_input_width );


    
}


Object.assign( LinePlotOptions.prototype, EventDispatcher.prototype );