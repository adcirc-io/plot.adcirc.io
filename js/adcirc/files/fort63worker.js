
var newline_regex = /\r?\n/g;
var nonwhite_regex = /\S+/g;
var nodal_timeseries = {};

self.addEventListener( 'message', function ( message ) {

    var action = message.data.action;

    switch ( action ) {

        case 'load':

            load_file( message.data.file );
            break;
        
        case 'get_nodal_timeseries':
            
            get_nodal_timeseries( message.data.node );
            break;

    }

});


function get_nodal_timeseries ( node ) {

    var data = nodal_timeseries[ node ];

    if ( data ) {

        var timeseries = new Float32Array( data );
        post_nodal_timeseries( node, timeseries );

    } else {

        post_error( 'Unable to find node ' + node + ' in dataset' );

    }
    
}


function load_file ( file ) {

    console.log( 'Loading ' + file.name );

    var reader = new FileReaderSync();
    var data = reader.readAsText( file );
    var lines = data.split( newline_regex );

    // Get info about the data
    var infoline = lines[1].match( nonwhite_regex );
    var num_nodes = parseInt( infoline[1] );
    var num_ts = parseInt( infoline[0] );

    console.log( num_nodes + ' nodes in mesh' );
    console.log( num_ts + ' timesteps recorded' );

    // Create empty lists
    for ( var node=0; node<num_nodes; ++node ) {

        nodal_timeseries[ (node+1).toString() ] = [];

    }

    // Read data
    for ( var ts=0; ts<num_ts; ++ts ) {

        var start_line = 2 + ts * ( num_nodes + 1 );

        for ( node=1; node<num_nodes+1; ++node ) {

            var dat = parseFloat( lines[ start_line+node ].match( nonwhite_regex )[1] );
            if ( dat != -99999 ) {
                nodal_timeseries[ node.toString() ].push( dat );
            } else {
                nodal_timeseries[ node.toString() ].push( null );
            }

        }

    }
    
    post_data_ready( num_nodes, num_ts );

}


function post_error ( message ) {

    self.postMessage({
        type: 'error',
        message: message
    });

}


function post_data_ready( num_nodes, num_timesteps ) {

    self.postMessage({
        type: 'data_ready',
        num_nodes: num_nodes,
        num_timesteps: num_timesteps
    });

}


function post_nodal_timeseries( node, timeseries ) {

    var data = {
        type: 'nodal_timeseries',
        node: node,
        timeseries: timeseries.buffer
    };

    self.postMessage(
        data,
        [data.timeseries]
    );

}