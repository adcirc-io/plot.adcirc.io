function Fort63Display ( file_name, num_nodes, num_timesteps ) {

    // Scoping
    var self = this;

    // Generate IDs
    this.id = guid();
    this.id_title = guid();
    this.id_content_wrapper = guid();
    this.id_data_list = guid();
    this.id_data_list_placeholder = guid();
    this.id_add_node = guid();
    this.id_add_nodes = guid();
    this.id_add_min_max = guid();
    
    // Generate HTML
    this.html = adcirc.templates.fort63options(
        {
            file_name: file_name,
            id: self.id,
            id_content_wrapper: self.id_content_wrapper,
            id_add_min_max: self.id_add_min_max,
            id_add_node: self.id_add_node,
            id_add_nodes: self.id_add_nodes,
            id_data_list: self.id_data_list,
            id_data_list_placeholder: self.id_data_list_placeholder,
            id_title: self.id_title,
            num_nodes: num_nodes,
            num_timesteps: num_timesteps
        }
    );

    this.initialize = function () {

        // Get HTML elements
        self.div = $( '#' + self.id );
        self.content_wrapper = $( '#' + self.id_content_wrapper );
        self.title = $( '#' + self.id_title );
        self.data_list = $( '#' + self.id_data_list );
        self.data_list_placeholder = $( '#' + self.id_data_list_placeholder );
        self.add_node = $( '#' + self.id_add_node );
        self.add_nodes = $( '#' + self.id_add_nodes );
        self.add_min_max = $( '#' + self.id_add_min_max );

        // Listen for events
        self.add_node.click( self.on_add_node );

    };

    // Event handlers
    this.on_add_node = function ( event ) {

        event.preventDefault();

        // Make sure placeholder is hidden
        self.data_list_placeholder.hide();
        
        // Create a node picker
        var id = guid();
        var node_picker = adcirc.templates.node_picker(
            { 
                id: id,
                max_nodes: num_nodes
            }
        );

        // Add node picker
        self.data_list.append( node_picker );

        self.dispatchEvent( { type: 'add_node', id: id, node: 1 } );

    }
    
}

Object.assign( Fort63Display.prototype, EventDispatcher.prototype );