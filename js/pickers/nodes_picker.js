function NodesPicker ( container ) {

    var self = this;

    // Create the picker
    this.id = guid();
    this.html = adcirc.templates.nodes_picker(
        {
            id: self.id,
            picker_id: 'p' + self.id,
            remove_id: 'x' + self.id
        }
    );

    // Insert the picker into the container
    container.append( self.html );


    // Define event handlers
    this.on_change_nodes = function ( event ) {

        event.preventDefault();

        // Get the node picker id and new text
        var text = event.target.value;

        // Parse each input value or range
        var regex_number = /\d+(?=\D|$)/g;
        var regex_range = /\d+\s*\-\s*\d+/g;

        var numbers = text.match( regex_number );
        var ranges = text.match( regex_range );

        var node_list = _.map( numbers, function ( number ) { return parseInt( number ); } );

        _.each( ranges, function ( range ) {

            var bounds = range.match( regex_number );

            if ( bounds.length == 2 ) {

                var lower_bound = parseInt( bounds[ 0 ] );
                var upper_bound = parseInt( bounds[ 1 ] );

                node_list = _.union( node_list, _.range( lower_bound, upper_bound + 1 ) );

            }

        });

        self.dispatchEvent( { type: 'change_nodes', id: self.id, nodes: node_list, string: text } );

    };

    this.on_remove_nodes = function ( event ) {

        event.preventDefault();

        $( '#' + self.id )[0].remove();

        self.dispatchEvent({
            type: 'remove',
            id: self.id
        });

    };


    // Listen for events from the picker
    $( '#p' + self.id ).on( 'change', self.on_change_nodes );
    $( '#x' + self.id ).on( 'click', self.on_remove_nodes );

}

Object.assign( NodesPicker.prototype, EventDispatcher.prototype );