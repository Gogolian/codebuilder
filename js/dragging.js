

function allowDrop(ev)
{
    ev.preventDefault();

    if (!$(ev.target).hasClass('drop-me-here') && $(ev.target).hasClass('droppable'))
    {
        $('.drop-me-here').remove();
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
   }, 50);
});

$(document).on('click', '.delete-me', function ()
{
   $(this).parent().parent().remove();
   reworkCode();
});