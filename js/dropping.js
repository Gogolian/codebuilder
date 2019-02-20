    function allowDrop(ev) {
         ev.preventDefault();
         if (!$(ev.target).hasClass('drop-me-here') && $(ev.target).hasClass('droppable')) {
            $('.drop-me-here').remove();
            $('<span class="drop-me-here"></span>').appendTo(ev.target);
         }
      }

      function drag(ev) {
         ev.dataTransfer.setData("text", ev.target.id);
      }

      var new_element_id_counter = 0;
      function drop(ev) {
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

         if ($(element_to_drop).hasClass('initial')) {
            element_to_drop = element_to_drop.cloneNode(true);

            element_to_drop.id = element_to_drop.id + '_' + new_element_id_counter;
            new_element_id_counter++;

            $(element_to_drop).removeClass('initial');
            $(element_to_drop).addClass('deletable');
            $(element_to_drop).find('p').attr('onclick', 'labeledit(this)');

            $('<span class="delete-me">✖</span>').prependTo(element_to_drop);
         }
         console.log(element_to_drop);

         target.appendChild(element_to_drop);
         fix_col_class(target);

         reworkCode();
         ev.stopPropagation();
      }

      function fix_col_class(el)
      {
        var jQel = $(el);
        var selector = '[class*=col]';
        var elem_len = (12 / jQel.find(selector).length);
        console.log(elem_len);
        jQel.find(selector).removeClass (function (index, className) {
            return (className.match (/(^|\s)col-\S+/g) || []).join(' ');
        }).addClass('col-sm-'+elem_len);
        console.log(jQel);
      }

      var dragTimer;
      $(document).on('dragover', function (e) {
         window.clearTimeout(dragTimer);
      });
      $(document).on('dragleave', function (e) {
         dragTimer = window.setTimeout(function () {
            $('.drop-me-here').remove();
         }, 50);
      });

      $(document).on('click', '.delete-me', function () {
         //$('.delete-me').click(function () {
         $(this).parent().remove();
         reworkCode();
      });