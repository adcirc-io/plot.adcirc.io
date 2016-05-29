
window.onload = function () {

    // The plotting tool
    var plotter = new Plotter();

    // The UI elements
    var node_picker = $( '#node-number' );
    var open_fort_63 = $( '#open-fort63' );
    var open_fort_64 = $( '#open-fort64' );
    var fort_63_picker = $( '#fort63_picker' );
    var fort_64_picker = $( '#fort64_picker' );
    
    
    // Window resize
    $( window ).resize( plotter.on_resize );
    
    
    // File menu click events
    open_fort_63.click( function () {
        fort_63_picker.click();
    });

    open_fort_64.click( function () {
        fort_64_picker.click();
    });

    
    // File picked event handlers
    fort_63_picker[0].addEventListener( 'change', function () {

        var file = fort_63_picker[0].files[0];
        plotter.open_fort_63( file );
        fort_63_picker[0].value = null;

    });

    fort_64_picker[0].addEventListener( 'change', function () {

        var file = fort_64_picker[0].files[0];
        plotter.open_fort_64( file );
        fort_64_picker[0].value = null;

    });


    // Node number change events
    node_picker.change( function () {

        var node_number = node_picker.val();

        plotter.set_node( node_number );

    })

};