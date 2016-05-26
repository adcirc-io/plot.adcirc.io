
var newline_regex = /\r?\n/g;
var nonwhite_regex = /\S+/g;
var nodal_timeseries = {};

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
    var data = reader.readAsText( file );
    var lines = data.split( newline_regex );

    // Get info about the data
    var infoline = lines[1].match( nonwhite_regex );
    var numnodes = parseInt( infoline[1] );
    var numts = parseInt( infoline[0] );

    console.log( numnodes + ' nodes in mesh' );
    console.log( numts + ' timesteps recorded' );

    // Create empty lists
    for ( var ts=0; ts<numts; ++ts ) {

        nodal_timeseries[ (ts+1).toString() ] = [];

    }

    // Read data
    for ( ts=0; ts<numts; ++ts ) {

        var start_line = 2 + ts * ( numnodes + 1 );

        for ( var node=1; node<numnodes+1; ++node ) {

            var dat = lines[ start_line+node].match( nonwhite_regex );
            nodal_timeseries[ node.toString() ].push( parseFloat( dat[1] ) );

        }

    }

    console.log( nodal_timeseries['1'])

}