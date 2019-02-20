
var new_element_id_counter = 0;

function drop(ev)
{
   ev.preventDefault();

   var data = ev.dataTransfer.getData("text");
   var element_to_drop = document.getElementById(data);

   var target = ev.target;

   //console.log(target);
   while (!$(target).hasClass('droppable')) {
      target = target.parentElement;
      //console.log(target);
      if ($(target).hasClass('codebuilder-initial-container')) break;
   }

   $('.drop-me-here').remove();

   if ($(element_to_drop).hasClass('template'))
   {
      element_to_drop = element_to_drop.cloneNode(true);

      element_to_drop.id = element_to_drop.id + '_' + new_element_id_counter;
      new_element_id_counter++;

      $(element_to_drop).removeClass('initial');
      $(element_to_drop).addClass('deletable');
      $(element_to_drop).addClass('droppable');

      var pname = $(element_to_drop).find('p#name');
      $('<div class="delete-me-wrapper"><span class="delete-me">✖</span>'+pname+'</div>').prependTo(element_to_drop);
      pname.remove();
   }
   console.log(element_to_drop);

   target.appendChild(element_to_drop);
   //fix_col_class(target);

   reworkCode();
   ev.stopPropagation();
}