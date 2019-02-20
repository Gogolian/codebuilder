function fix_col_class(el) {
    var jQel = $(el);
    var selector = '[class*=col]';
    var elem_len = (12 / jQel.find(selector).length);
    console.log(elem_len);
    jQel.find(selector).removeClass(function (index, className) {
       return (className.match(/(^|\s)col-\S+/g) || []).join(' ');
    }).addClass('col-sm-' + elem_len);
    console.log(jQel);
 }