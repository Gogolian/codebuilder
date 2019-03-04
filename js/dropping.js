
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
      var name = $(element_to_drop).find('p#name').text();

      //element_to_drop = element_to_drop.cloneNode(true);
      element_to_drop = element_to_drop.children[1].children[0].cloneNode(true);

      element_to_drop.id = element_to_drop.id + '_' + new_element_id_counter;
      new_element_id_counter++;

      $(element_to_drop).removeClass('initial');
      $(element_to_drop).addClass('deletable');
      $(element_to_drop).addClass('draggable');

      $(element_to_drop).attr('ondragstart', 'drag(event)');
      $(element_to_drop).attr('draggable', 'true');

      if( !$(element_to_drop).hasClass('do_not_drop_on_me') )
      {
         $(element_to_drop).addClass('droppable');
         $(element_to_drop).attr('ondrop', 'drop(event)');
         $(element_to_drop).attr('ondragover', 'allowDrop(event)');
      }

      $(element_to_drop).addClass('code_block');
      //fix_col_class(element_to_drop, target);

      $('<div class="delete-me-wrapper"><span class="delete-me">✖</span><span class="block-field-label">'+name+'</span></div>').prependTo(element_to_drop);

   }
   console.log(element_to_drop);

   target.appendChild(element_to_drop);

   $('.gcb_temporary_dropper').children().unwrap();
   $('.gcb_temporary_dropper').remove();
   //fix_col_class(target);

   reworkCode();
   ev.stopPropagation();
}

/*
function fix_col_class(el, target)
{
   var elem = $(el);
   var par = $(target);
   if( par != null)
   {
      if (par.hasClass('row'))
      {
      var rowcount = par.children().length + 1;

      var elem_len = (12 / rowcount);

      elem.removeClass(function (index, className) {
            return (className.match(/(^|\s)col-\S+/g) || []).join(' ');
         })
         .addClass('col-sm-' + elem_len);
      }
   }

}*/