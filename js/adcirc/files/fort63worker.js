
// Regular expressions
var newline_regex = /\r?\n/g;
var nonwhite_regex = /\S+/g;
var nodal_timeseries = {};

// Progress variables
var _percent_interval = 0;
var _progress_interval = 0;
var _current_percent = 0;
var _current_progress = 0;

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

    post_progress_unknown();

    var reader = new FileReaderSync();
    var data = reader.readAsText( file );
    var lines = data.split( newline_regex );

    // Get info about the data
    var infoline = lines[1].match( nonwhite_regex );
    var num_nodes = parseInt( infoline[1] );
    var num_ts = parseInt( infoline[0] );

    console.log( lines[0].trim() );
    console.log( num_nodes + ' nodes in mesh' );
    console.log( num_ts + ' timesteps recorded' );

    post_header( lines[0].trim(), num_nodes, num_ts );
    post_progress_start( num_ts, 5 );

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

        post_progress();

    }
    
    post_data_ready();

}


function post_data_ready() {

    self.postMessage({
        type: 'data_ready'
    });

}


function post_error ( message ) {

    self.postMessage({
        type: 'error',
        message: message
    });

}


function post_header ( info, num_nodes, num_timesteps ) {

    self.postMessage({
        type: 'header',
        info: info,
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


/**
 * Call this function at every step of the loop/loops that we're tracking progress of.
 * The finish_total variable in post_progress_start() should be the total number of
 * times that this function is called.
 */
function post_progress () {

    _current_progress += 1;

    if ( _current_progress > _progress_interval ) {

        _current_percent += _percent_interval;
        _current_progress -= _progress_interval;

        self.postMessage({
            type: 'progress',
            progress: _current_percent
        });

    }

}


/**
 * Initialize the progress counter
 * @param finish_total The total number of times that post_progress() will be called
 * @param percent_interval The percent interval at which events will actually be dispatched
 */
function post_progress_start( finish_total, percent_interval ) {

    _percent_interval = percent_interval;
    _progress_interval = ( percent_interval / 99 ) * finish_total;
    _current_percent = 0;
    _current_progress = 0;

}


function post_progress_unknown () {

    self.postMessage({
        type: 'progress',
        progress: 'unknown'
    });

}