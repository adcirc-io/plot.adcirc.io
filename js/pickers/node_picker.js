function NodePicker ( container, max_nodes ) {

    var self = this;

    // Create the picker
    this.id = guid();
    this.html = adcirc.templates.node_picker_flex(
        {
            id: self.id,
            max_nodes: max_nodes,
            page_main_id: 'p_m' + self.id,
            page_settings_id: 'p_s' + self.id,
            picker_id: 'p' + self.id,
            remove_id: 'x' + self.id,
            settings_id: 's' + self.id,
            settings_thickness_id: 's_t' + self.id
        }
    );

    // Insert the picker into the container
    container.append( self.html );
    
    // Hide the settings
    $( '#p_s' + self.id ).hide();

    
    // Define event handlers and setters
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

    this.on_remove_node = function ( event ) {

        event.preventDefault();

        $( '#' + self.id )[0].remove();

        self.dispatchEvent({
            type: 'remove',
            id: self.id
        });

    };

    this.on_show_settings = function ( event ) {

        event.preventDefault();

        $( '#p_s' + self.id ).show();
        $( '#p_m' + self.id ).addClass( '_active' );

    };

    this.set_node = function ( node ) {

        var picker = $( '#p' + self.id );
        picker.val( node );
        picker.trigger( 'change' );

    };

    
    // Listen for events from the picker
    $( '#p' + self.id ).on( 'change', self.on_change_node );
    $( '#x' + self.id ).on( 'click', self.on_remove_node );
    $( '#s' + self.id ).on( 'click', self.on_show_settings );
    $( '#s_t' + self.id ).on( 'change', self.on_change_thickness );

}

Object.assign( NodePicker.prototype, EventDispatcher.prototype );