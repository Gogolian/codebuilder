

var templ_id_num = 0;

$('.template').each(function()
{
      $(this).addClass('draggable');
      $(this).attr('id', 'templ_' + (++templ_id_num));
});

$('.draggable').attr('ondragstart', 'drag(event)');
$('.draggable').attr('draggable', 'true');
$('.droppable').attr('ondrop', 'drop(event)');
$('.droppable').attr('ondragover', 'allowDrop(event)');