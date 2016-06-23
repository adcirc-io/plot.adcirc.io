function NodePicker ( container, max_nodes ) {

    var self = this;

    // Create the picker
    this.id = guid();
    this.id_node_number = guid();
    this.id_page_main = guid();
    this.id_page_settings = guid();
    this.id_remove = guid();
    this.id_settings_color = guid();
    this.id_settings_color_box = guid();
    this.id_settings_hide = guid();
    this.id_settings_show = guid();
    this.id_settings_thickness = guid();

    this.html = adcirc.templates.node_picker_flex(
        {
            id: self.id,
            max_nodes: max_nodes,
            node_number_id: self.id_node_number,
            page_main_id: self.id_page_main,
            page_settings_id: self.id_page_settings,
            remove_id: self.id_remove,
            settings_color_id: self.id_settings_color,
            settings_color_box_id: self.id_settings_color_box,
            settings_hide_id: self.id_settings_hide,
            settings_show_id: self.id_settings_show,
            settings_thickness_id: self.id_settings_thickness
        }
    );


    this.initialize = function ( container ) {

        // Add everything to the container
        container.append( self.html );

        // Get HTML elements
        self.div = $( '#' + self.id );
        self.node_number = $( '#' + self.id_node_number );
        self.page_main = $( '#' + self.id_page_main );
        self.page_settings = $( '#' + self.id_page_settings );
        self.remove = $( '#' + self.id_remove );
        self.settings_color = $( '#' + self.id_settings_color );
        self.settings_color_box = $( '#' + self.id_settings_color_box );
        self.settings_hide = $( '#' + self.id_settings_hide );
        self.settings_show = $( '#' + self.id_settings_show );
        self.settings_thickness = $( '#' + self.id_settings_thickness );

        // Initially hide the settings
        self.page_settings.hide();
        self.settings_hide.hide();

        // Initilize the color picker
        self.settings_color.colorpicker({
            align: 'left',
            format: 'rgba',
            colorSelectors: {
                "steelblue": "#4682b4",
                "lightsteelblue": "#b0c4de",
                "green": "#2ecc40",
                "orange": "#ff851b",
                "red": "#ff4136",
                "fuchsia": '#f012be',
                "purple": "#b10dc9",
                "black": '#111111',
                "gray": "#aaaaaa"
            }
        });

        // Listen for events
        self.node_number.on( 'change', self.on_change_node );
        self.remove.on( 'click', self.on_remove_node );
        self.settings_color.on( 'changeColor', self.on_change_color );
        self.settings_hide.on( 'click', self.on_hide_settings );
        self.settings_show.on( 'click', self.on_show_settings );
        self.settings_thickness.on( 'change', self.on_change_thickness );

    };


    // Helper functions
    this.hide_settings = function ( id ) {

        if ( id !== self.id ) {

            self.page_settings.hide();
            self.settings_hide.hide();
            self.settings_show.show();
            self.page_main.removeClass( '_active' );

        }

    };

    
    // Define event handlers and setters
    this.on_change_color = function ( event ) {

        event.preventDefault();

        // Show the new color in the color box
        self.settings_color_box.css( 'background-color', event.color.toHex() );

        // Send event to the plot
        self.dispatchEvent({
            type: 'change_color',
            id: self.id,
            hex: event.color.toHex(),
            alpha: event.color.value.a
        });

    };

    this.on_change_node = function ( event ) {

        event.preventDefault();

        self.dispatchEvent({
            type: 'change_node',
            id: self.id,
            node: event.target.value
        });

    };

    this.on_change_thickness = function ( event ) {

        event.preventDefault();

        self.dispatchEvent({
            type: 'change_thickness',
            id: self.id,
            thickness: event.target.value
        });

    };

    this.on_hide_settings = function ( event ) {

        event.preventDefault();
        self.hide_settings();

    };

    this.on_remove_node = function ( event ) {

        event.preventDefault();

        self.div[0].remove();

        self.dispatchEvent({
            type: 'remove',
            id: self.id
        });

    };

    this.on_show_settings = function ( event ) {

        event.preventDefault();

        self.page_settings.show();
        self.settings_hide.show();
        self.settings_show.hide();
        self.page_main.addClass( '_active' );

        self.dispatchEvent({
            type: 'show_settings',
            id: self.id
        });

    };

    this.set_node = function ( node ) {

        self.node_number.val( node );
        self.node_number.trigger( 'change' );

    };


    // Initialize everything
    this.initialize( container );

}

Object.assign( NodePicker.prototype, EventDispatcher.prototype );