

function allowDrop(ev)
{
    ev.preventDefault();

    if (!$(ev.target).hasClass('drop-me-here') && $(ev.target).hasClass('droppable'))
    {
        $('.drop-me-here').remove();

        $(ev.target).addClass('not-me-please');
        $('.gcb_temporary_dropper').filter(':not(.not-me-please)').remove();
        $(ev.target).removeClass('not-me-please');

        if( !$(ev.target).hasClass('gcb_temporary_dropper'))
        {
            $('<span class="gcb_temporary_dropper droppable"></span>').prependTo(ev.target);
        }
        
        $('<span class="drop-me-here"></span>').appendTo(ev.target);
    }
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}


var dragTimer;

$(document).on('dragover', function (e)
{
   window.clearTimeout(dragTimer);
});

$(document).on('dragleave', function (e)
{
   dragTimer = window.setTimeout(function ()
   {
      $('.drop-me-here').remove();
      $('.gcb_temporary_dropper').remove();
   }, 50);
});

$(document).on('click', '.delete-me', function ()
{
   $(this).parent().parent().remove();
   reworkCode();
});