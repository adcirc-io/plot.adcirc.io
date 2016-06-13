function Sidebar ( id ) {
    
    // Scoping
    var self = this;
    
    // Get HTML elements
    this.element = $( '#' + id );
    this.data = this.element.find( '#sidebar-data' );
    this.data_placeholder = this.element.find( '#data-placeholder');
    this.options = this.element.find( '#sidebar-options' );
    this.options_placeholder = this.element.find( '#options-placeholder' );
    
    
    this.add_controller = function ( controller ) {
        
        // Make sure data placeholder is hidden
        self.data_placeholder.hide();

        // Initialize the controller display
        controller.initialize_display( self.data );
        
    };

    this.on_controller_added = function ( event ) {

        // Make sure data placeholder is hidden
        self.data_placeholder.hide();

        // Add the controller to the display
        event.controller.initialize_display( self.data );

    };

    this.set_current_plot = function ( plot ) {



    };
    
}

Object.assign( Sidebar.prototype, EventDispatcher.prototype );