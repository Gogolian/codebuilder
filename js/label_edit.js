function labeledit(el) {
         //var elem = $(this);
         elem = $(el);
         console.log(elem);

         if (elem.prop('editing') != 'yes') {
            elem.prop('editing', 'yes');

            var tmp = elem.clone();
            var id = tmp.attr('id');

            elem.html('<input type="text" id="change_' + id + '" class="label_changer" value="' + elem.text() + '"/>');
            $('#change_' + id).focus();
            $('#change_' + id).on('blur', function () {

               var new_label_text = $(this).val();
               elem.html(tmp.html());
               elem.text(new_label_text);
               elem.prop('editing', 'no');
               reworkCode();
            });
            $('#change_' + id).enterKey(function () {
               var new_label_text = $(this).val();
               elem.html(tmp.html());
               elem.text(new_label_text);
               elem.prop('editing', 'no');
               reworkCode();
            });
         }
         el.stopPropagation();
      }

      $.fn.enterKey = function (fnc, mod) {
         return this.each(function () {
            $(this).keypress(function (ev) {
               var keycode = (ev.keyCode ? ev.keyCode : ev.which);
               if ((keycode == '13' || keycode == '10') && (!mod || ev[mod + 'Key'])) {
                  fnc.call(this, ev);
               }
            })
         })
      }