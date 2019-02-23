$(function () {
    $(".gcb-resizable").resizable();

    $(".gcb-resizable").resizable({
        resize: function(event, ui) {
            //$("#gcb_preview").css({ "height": ui.size.height,"width":ui.size.width});
            $(".gcb-iframe-width").text( Math.round( $("#gcb_preview").width() ) );
        }
    });

    $(".gcb-iframe-width").text( Math.round( $("#gcb_preview").width() ) );
});