function Sidebar ( id ) {
    
    // Scoping
    var self = this;
    
    // Get HTML elements
    this.element = $( '#' + id );
    this.data = this.element.find( '#sidebar-data' );
    this.data_placeholder = this.element.find( '#data-placeholder');
    this.options = this.element.find( '#sidebar-options' );
    this.options_placeholder = this.element.find( '#options-placeholder' );

    // Functions
    // this.add_dataset = function ( dataset ) {
    //
    //     // Make sure the placeholder is hidden
    //     self.data_placeholder.hide();
    //
    //     // Get the dataset options
    //     var dataset_options = dataset.get_options();
    //
    //     // Add the dataset options to the sidebar
    //     self.data.append( dataset_options.html );
    //
    //     // Activate the options
    //     dataset_options.initialize();
    //    
    //     // Listen for events
    //
    // };
    
    this.add_controller = function ( controller ) {
        
        // Make sure data placeholder is hidden
        self.data_placeholder.hide();

        // Initialize the controller display
        controller.initialize_display( self.data );
        
    };

    this.set_current_plot = function ( plot ) {



    };
    
}

Object.assign( Sidebar.prototype, EventDispatcher.prototype );