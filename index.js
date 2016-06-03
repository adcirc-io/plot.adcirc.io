

window.onload = function () {

    // // The plotting tool
    var plotter = new Plotter();

    // The data manager
    // var data_manager = new DataManager();
    
    // The sidebar controller
    // var sidebar = new Sidebar( 'sidebar' );


    // The UI elements
    var open_fort_63 = $( '#open-fort63' );
    // var open_fort_64 = $( '#open-fort64' );
    var page_wrapper = $( '#page-wrapper' );
    var toggle_sidebar = $( '#toggle-sidebar' );
    var fort_63_picker = $( '#fort63_picker' );
    // var fort_64_picker = $( '#fort64_picker' );
    
    
    // Window resize
    // $( window ).resize( plotter.on_resize );
    
    
    // File menu click events
    open_fort_63.click( function ( e ) {
        e.preventDefault();
        fort_63_picker.click();
    });

    // sidebar.data_placeholder.click( function ( e ) {
    //     e.preventDefault();
    //     fort_63_picker.click();
    // });

    // open_fort_64.click( function ( e ) {
    //     e.preventDefault();
    //     fort_64_picker.click();
    // });


    // Display menu click events
    toggle_sidebar.click( function ( e ) {
        e.preventDefault();
        page_wrapper.toggleClass( 'toggled' );
    });

    
    // File picked event handlers
    // fort_63_picker[0].addEventListener( 'change', function () {
    //
    //     var file = fort_63_picker[0].files[0];
    //     data_manager.open_fort_63( file );
    //     fort_63_picker[0].value = null;
    //
    //     // plotter.open_fort_63( file );
    //
    // });

    // fort_64_picker[0].addEventListener( 'change', function () {
    //
    //     var file = fort_64_picker[0].files[0];
    //     plotter.open_fort_64( file );
    //     fort_64_picker[0].value = null;
    //
    // });


};