function Fort63Display () {

    // Scoping
    var self = this;

    // Generate IDs
    this.id = guid();
    this.id_title = guid();
    this.id_view_data = guid();
    this.id_view_loading = guid();
    this.id_data_list = guid();
    this.id_data_list_placeholder = guid();
    this.id_add_node = guid();
    this.id_add_nodes = guid();
    this.id_add_min_max = guid();
    this.id_num_nodes = guid();
    this.id_num_timesteps = guid();
    this.id_progress = guid();

    // Private Variables
    this._num_pickers = 0;
    this._num_nodes = 0;
    
    // Generate HTML
    this.html = adcirc.templates.fort63display(
        {
            file_name: 'fort.63',
            id: self.id,
            id_view_data: self.id_view_data,
            id_view_loading: self.id_view_loading,
            id_add_min_max: self.id_add_min_max,
            id_add_node: self.id_add_node,
            id_add_nodes: self.id_add_nodes,
            id_data_list: self.id_data_list,
            id_data_list_placeholder: self.id_data_list_placeholder,
            id_title: self.id_title,
            id_num_nodes: self.id_num_nodes,
            id_num_timesteps: self.id_num_timesteps,
            id_progress: self.id_progress
        }
    );

    this.initialize = function ( container, status ) {

        // Add everything to the page
        container.append( self.html );

        // Get HTML elements
        self.div = $( '#' + self.id );
        self.view_data = $( '#' + self.id_view_data );
        self.view_loading = $( '#' + self.id_view_loading );
        self.title = $( '#' + self.id_title );
        self.data_list = $( '#' + self.id_data_list );
        self.data_list_placeholder = $( '#' + self.id_data_list_placeholder );
        self.add_node = $( '#' + self.id_add_node );
        self.add_nodes = $( '#' + self.id_add_nodes );
        self.add_min_max = $( '#' + self.id_add_min_max );
        self.num_nodes = $( '#' + self.id_num_nodes );
        self.num_timesteps = $( '#' + self.id_num_timesteps );
        self.progress = $( '#' + self.id_progress );

        // Initially hide everything
        self.div.hide();

        // Show loadbar or data, depending on the status
        switch ( status ) {

            case 'loading':

                self.set_view_loading();
                break;

            case 'ready':

                self.set_view_data();
                break;

            default:

                self.set_view_data();
                break;

        }

        // Listen for events
        self.add_min_max.click( self.on_add_min_max );
        self.add_node.click( self.on_add_node );
        self.add_nodes.click( self.on_add_nodes );

    };

    this.hide = function () {

        self.div.hide();

    };

    this.passthrough = function ( event ) {

        self.dispatchEvent( event );

    };

    this.show = function () {

        self.div.show();

    };

    // Event handlers
    this.on_add_min_max = function ( event ) {

        event.preventDefault();

        // Make new min/max picker
        var picker = new MinMaxPicker( self.data_list, self.add_min_max );

        // Dispatch an add picker event
        self.dispatchEvent( { type: 'add_min_max', id: picker.id } );

        // Fire on add picker event
        self.on_add_picker( picker );
        
    };
    
    this.on_add_node = function ( event ) {

        event.preventDefault();

        // Make new node picker
        var picker = new NodePicker( self.data_list, self._num_nodes );

        // Listen for events from the node picker
        picker.addEventListener( 'change_node', self.passthrough );
        picker.addEventListener( 'change_thickness', self.passthrough );

        // Start out at node number 1
        picker.set_node( 1 );

        // Fire on add picker event
        self.on_add_picker( picker );

    };

    this.on_add_nodes = function ( event ) {

        event.preventDefault();

        // Make new nodes picker
        var picker = new NodesPicker( self.data_list );

        // Listen for events from the nodes picker
        picker.addEventListener( 'change_nodes', self.passthrough );

        // Fire on add picker event
        self.on_add_picker( picker );

    };
    
    this.on_add_picker = function ( picker ) {

        // Listen for events common to all pickers
        picker.addEventListener( 'remove', self.on_remove_picker );

        // Make sure placeholder is hidden
        self.data_list_placeholder.hide();
        self._num_pickers += 1;
        
    };

    this.on_remove_picker = function ( event ) {

        // Check if it was the last picker
        self._num_pickers -= 1;
        if ( self._num_pickers == 0 ) {

            // It was, so show the placeholder
            self.data_list_placeholder.show();

        }

        // Pass through event
        self.dispatchEvent( event );

    };

    // Setters
    this.set_num_nodes = function ( num_nodes ) {

        self._num_nodes = num_nodes;
        self.num_nodes.text( num_nodes );

    };

    this.set_num_timesteps = function ( num_timesteps ) {

        self.num_timesteps.text( num_timesteps );

    };

    this.set_progress = function ( progress ) {

        if ( progress === 'unknown' ) {
            self.progress.width( '100%' );
            self.progress.addClass( 'progress-bar-striped active' );
        } else {
            self.progress.width( progress + '%' );
            self.progress.removeClass( 'progress-bar-striped active' );
        }

    };

    this.set_view_data = function () {

        self.view_loading.hide();
        self.view_data.show();

    };

    this.set_view_loading = function () {

        self.view_data.hide();
        self.view_loading.show();

    };
    
}

Object.assign( Fort63Display.prototype, EventDispatcher.prototype );