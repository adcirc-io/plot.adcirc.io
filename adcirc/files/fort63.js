
function Fort63 ( file ) {

    // Scoping
    var self = this;


    // Variables
    this.file = file;
    this.worker = new Worker( 'adcirc/files/fort63worker.js' );


    // Functions
    this.load = function () {

        var loadmessage = {
            action: 'load',
            file: self.file
        };

        self.worker.postMessage( loadmessage );

    };

    // Kick things off by loading the file
    self.load();

}