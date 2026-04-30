


function reworkCode()
{
    const codeNode = $('#droparea')[0].cloneNode(true);

    $(codeNode).find('.delete-me-wrapper').remove();

    $(codeNode).find('*').removeAttr('id ondragstart draggable ondrop ondragover');
    $(codeNode).find('*').removeClass('display_me_inline do_not_drop_on_me code_block draggable label_changable droppable deletable');

    $(codeNode).find('.wrapper_delete').children().unwrap();

    $(codeNode).find('*').each( function(){
        const dis = $(this);
        const attr = $(this).attr('my_real_type');
        dis.removeAttr('my_real_type');
        if (typeof attr !== typeof undefined && attr !== false) {
            dis.changeElementType(attr);
        }
        
    });

    const code_start = '<!DOCTYPE html>\n<html lang="pl">\n<head>\n       <meta charset="UTF-8">\n       <meta name="viewport" content="width=device-width, initial-scale=1">\n       <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">\n       <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>\n       <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>\n       <title>Built with code builder</title>\n</head>\n<body>\n       <div class="container">\n<!-- START CONTENT --->';
    const code_end = '\n\n       <!-- END CONTENT --->\n       </div>\n</body>\n</html>';
    const new_code = code_start + formatCode(codeNode.innerHTML + code_end,true,true);
    $('#codearea .code').val(new_code);
    document.getElementById('gcb_preview').src = "data:text/html;charset=utf-8," + encodeURIComponent(new_code);

}

(function($) {
    $.fn.changeElementType = function(newType) {
        const attrs = {};

        $.each(this[0].attributes, function(idx, attr) {
            attrs[attr.nodeName] = attr.nodeValue;
        });

        this.replaceWith(function() {
            return $("<" + newType + "/>", attrs).append($(this).contents());
        });
    };
})(jQuery);

 function formatCode (code, stripWhiteSpaces, stripEmptyLines) {
    "use strict";
    const whitespace        = ' '.repeat(4);             // Default indenting 4 whitespaces
    let currentIndent       = 0;
    let char                = null;
    let nextChar            = null;


    let result = '';
    for(let pos=0; pos <= code.length; pos++) {
        char            = code.substr(pos, 1);
        nextChar        = code.substr(pos+1, 1);

        // If opening tag, add newline character and indention
        if(char === '<' && nextChar !== '/') {
            result += '\n' + whitespace.repeat(currentIndent);
            currentIndent++;
        }
        // if Closing tag, add newline and indention
        else if(char === '<' && nextChar === '/') {
            // If there're more closing tags than opening
            if(--currentIndent < 0) currentIndent = 0;
            result += '\n' + whitespace.repeat(currentIndent);
        }

        // remove multiple whitespaces
        else if(stripWhiteSpaces === true && char === ' ' && nextChar === ' ') char = '';
        // remove empty lines
        else if(stripEmptyLines === true && char === '\n' ) {
            //debugger;
            if(code.substr(pos, code.substr(pos).indexOf("<")).trim() === '' ) char = '';
        }

        result += char;
    }

    return result;
}
