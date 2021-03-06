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
    
}

Object.assign( Sidebar.prototype, EventDispatcher.prototype );