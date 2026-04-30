function labeledit(el) {
   const elem = $(el);

   if (elem.prop('editing') !== 'yes') {
      elem.prop('editing', 'yes');

      const tmp = elem.clone();
      const id = tmp.attr('id');
      const input = $('<input>', {
         type: 'text',
         id: 'change_' + id,
         class: 'label_changer'
      }).val(elem.text());

      elem.empty().append(input);
      input.focus();

      const finishEditing = function () {
         const new_label_text = $(this).val();
         elem.html(tmp.html());
         elem.text(new_label_text);
         elem.prop('editing', 'no');
         reworkCode();
      };

      input.on('blur', finishEditing);
      input.enterKey(finishEditing);
   }
   el.stopPropagation();
}

$.fn.enterKey = function (fnc, mod) {
   return this.each(function () {
      $(this).keypress(function (ev) {
         const keycode = (ev.keyCode ? ev.keyCode : ev.which);
         if ((keycode === 13 || keycode === 10) && (!mod || ev[mod + 'Key'])) {
            fnc.call(this, ev);
         }
      });
   });
};
