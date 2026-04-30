
let newElementIdCounter = 0;

function drop(ev)
{
   ev.preventDefault();

   const data = ev.dataTransfer.getData("text");
   let element_to_drop = document.getElementById(data);

   let target = ev.target;

   while (!$(target).hasClass('droppable')) {
      target = target.parentElement;
      if ($(target).hasClass('codebuilder-initial-container')) break;
   }

   $('.drop-me-here').remove();

   if ($(element_to_drop).hasClass('template'))
   {
      const name = $(element_to_drop).find('p#name').text();

      //element_to_drop = element_to_drop.cloneNode(true);
      element_to_drop = element_to_drop.children[1].children[0].cloneNode(true);

      element_to_drop.id = element_to_drop.id + '_' + newElementIdCounter;
      newElementIdCounter++;

      $(element_to_drop).removeClass('initial');
      $(element_to_drop).addClass('deletable');
      $(element_to_drop).addClass('draggable');

      if( !$(element_to_drop).hasClass('do_not_drop_on_me') )
      {
         $(element_to_drop).addClass('droppable');
      }

      $(element_to_drop).addClass('code_block');
      //fix_col_class(element_to_drop, target);

      $('<div class="delete-me-wrapper"><span class="delete-me">✖</span><span class="block-field-label">'+name+'</span></div>').prependTo(element_to_drop);

    }

   initializeInteractions(element_to_drop);

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
