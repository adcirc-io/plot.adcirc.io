function NodePicker ( container, max_nodes ) {

    var self = this;

    // Create the picker
    this.id = guid();
    this.html = adcirc.templates.node_picker(
        {
            id: self.id,
            max_nodes: max_nodes,
            picker_id: 'p' + self.id,
            settings_id: 's' + self.id,
            remove_id: 'x' + self.id
        }
    );

    // Insert the picker into the container
    container.append( self.html );

    
    // Define event handlers and setters
    this.on_change_node = function ( event ) {

        event.preventDefault();

        self.dispatchEvent({
            type: 'change_node',
            id: self.id,
            node: event.target.value
        });

    };

    this.on_remove_node = function ( event ) {

        event.preventDefault();

        $( '#' + self.id )[0].remove();

        self.dispatchEvent({
            type: 'remove_node',
            id: self.id
        });

    };

    this.set_node = function ( node ) {

        var picker = $( '#p' + self.id );
        picker.val( node );
        picker.trigger( 'change' );

    };

    
    // Listen for events from the picker
    $( '#p' + self.id ).on( 'change', self.on_change_node );
    $( '#x' + self.id ).on( 'click', self.on_remove_node );

}

Object.assign( NodePicker.prototype, EventDispatcher.prototype );