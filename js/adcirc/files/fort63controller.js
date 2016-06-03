function Fort63Controller ( fort63 ) {
    
    var self = this;
    
    this.data = fort63;
    this.display = new Fort63Display( self.data.file.name, self.data.num_nodes, self.data.num_timesteps );

    this.initialize_display = function ( container ) {

        container.append( self.display.html );
        self.display.initialize();

    };
    
}