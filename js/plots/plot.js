function Plot( container ) {
    
    // Scoping
    var self = this;
    
    // Parent container
    this.parent = $( container );
    
    // ID
    this.id = guid();
    
    // Controllers
    this.controllers = [];
    
    // Add the plot to the container
    this.parent.append(
        adcirc.templates.plot(
            {
                id: self.id
            }
        )
    );
    
    this.add_controller = function ( controller ) {

        // Will listen to the controller and recieve plottable datasets
        
    };
    
}

Object.assign( Plot.prototype, EventDispatcher.prototype );