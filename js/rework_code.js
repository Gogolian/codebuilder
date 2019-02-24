


function reworkCode()
{
    var codeNode = $('#droparea')[0].cloneNode(true);

    $(codeNode).find('.delete-me-wrapper').remove();

    $(codeNode).find('*').removeAttr('id ondragstart draggable ondrop ondragover');
    $(codeNode).find('*').removeClass('gcb-inliner do_not_drop_on_me code_block draggable label_changable droppable deletable');

    $(codeNode).find('.wrapper_delete').children().unwrap();

    var code_start = '<!DOCTYPE html>\n<html lang="pl">\n<head>\n       <meta name="viewport" content="width=device-width, initial-scale=1">\n       <meta charset="UTF-8">\n       <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">\n       <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>\n       <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>\n       <title>Built with code builder</title>\n</head>\n<body>\n       <div class="container">\n<!-- START CONTENT --->';
    var code_end = '\n\n       <!-- END CONTENT --->\n       </div>\n</body>\n</html>';
    var new_code = code_start + formatCode(codeNode.innerHTML + code_end,true,true);
    $('#codearea .code').val(new_code);
    //$('#gcb_preview').contents().html(new_code);
    document.getElementById('gcb_preview').src = "data:text/html;charset=utf-8," + escape(new_code);

}

 function formatCode (code, stripWhiteSpaces, stripEmptyLines) {
    "use strict";
    var whitespace          = ' '.repeat(4);             // Default indenting 4 whitespaces
    var currentIndent       = 0;
    var char                = null;
    var nextChar            = null;


    var result = '';
    for(var pos=0; pos <= code.length; pos++) {
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