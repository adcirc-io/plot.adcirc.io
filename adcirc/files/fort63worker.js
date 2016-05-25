
var data;

self.addEventListener( 'message', function ( message ) {

    var action = message.data.action;

    switch ( action ) {

        case 'load':

            load_file( message.data.file );
            break;

    }

});


function load_file ( file ) {

    console.log( 'Loading ' + file.name );

    var reader = new FileReaderSync();

    data = reader.readAsText( file );

    console.log( data );

}