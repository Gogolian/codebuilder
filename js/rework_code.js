
function reworkCode()
{
    var codeNode = $('#droparea')[0].cloneNode(true);

    $(codeNode).find('.delete-me').remove();

    $(codeNode).find('*').removeAttr('id ondragstart draggable ondrop ondragover');
    $(codeNode).find('*').removeClass('draggable label_changable droppable deletable');

    var code_start = '<!DOCTYPE html><html lang="pl"><head><meta name="viewport" content="width=device-width, initial-scale=1"><meta charset="UTF-8"><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css"><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script><script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script><title>Built with code builder</title></head><body><div class="container">';
    var code_end = '</div></body></html>';
    $('#codearea .code').val(code_start + codeNode.innerHTML + code_end);

}