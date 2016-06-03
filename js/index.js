

window.onload = function () {

    // The plotting tool
    var plotter = new Plotter();


    // The UI elements
    var open_fort_63 = $( '#open-fort63' );
    var page_wrapper = $( '#page-wrapper' );
    var toggle_sidebar = $( '#toggle-sidebar' );
    var fort_63_picker = $( '#fort63_picker' );
    
    
    // Window resize events
    $( window ).resize( plotter.on_resize );
    page_wrapper.bind( 'oTransitionEnd transitionend webkitTransitionEnd', plotter.on_resize );
    
    
    // File menu click events
    open_fort_63.click( function ( e ) {
        e.preventDefault();
        fort_63_picker.click();
    });


    // Display menu click events
    toggle_sidebar.click( function ( e ) {
        e.preventDefault();
        page_wrapper.toggleClass( 'toggled' );
    });


};