function Plot( container ) {
    
    // Scoping
    var self = this;
    
    // Parent container
    this.parent = $( container );
    
    // IDs
    this.id = guid();
    this.options_id = guid();
    this.chart_id = guid();
    
    // Add the plot to the container
    this.parent.append(
        adcirc.templates.plot(
            {
                id: self.id,
                options_id: self.options_id,
                chart_id: self.chart_id
            }
        )
    );
    
}