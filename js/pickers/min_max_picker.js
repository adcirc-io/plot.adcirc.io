function MinMaxPicker ( container, button ) {

    var self = this;

    // Create the picker
    this.button = button;
    this.id = guid();
    this.html = adcirc.templates.min_max_picker(
        {
            id: self.id,
            remove_id: 'x' + self.id
        }
    );

    // Insert the picker into the container
    container.append( self.html );


    // Define event handlers and functions
    this.on_remove_min_max = function ( event ) {

        event.preventDefault();

        $( '#' + self.id )[0].remove();
        self.enable_button();

        self.dispatchEvent({
            type: 'remove_min_max',
            id: self.id
        });

    };

    this.disable_button = function () {

        if ( self.button !== undefined ) {

            self.button.attr( 'disabled', true );

        }

    };

    this.enable_button = function () {

        if ( self.button !== undefined ) {

            self.button.attr( 'disabled', false );

        }

    };


    // Listen for events from the picker
    $( '#x' + self.id ).on( 'click', self.on_remove_min_max );

    // Disable the button
    self.disable_button();

}

Object.assign( MinMaxPicker.prototype, EventDispatcher.prototype );