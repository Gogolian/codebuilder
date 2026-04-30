

let templIdNum = 0;

$('.template').each(function()
{
      $(this).addClass('draggable');
      $(this).attr('id', 'templ_' + (++templIdNum));
});

function bindDragAndDrop(element)
{
      if ($(element).hasClass('draggable')) {
            element.draggable = true;
            if (!element.gcbDragHandler) {
                  element.gcbDragHandler = function(event) {
                        drag(event);
                  };
            }
            element.removeEventListener('dragstart', element.gcbDragHandler);
            element.addEventListener('dragstart', element.gcbDragHandler);
      }

      if ($(element).hasClass('droppable')) {
            if (!element.gcbDropHandler) {
                  element.gcbDropHandler = function(event) {
                        drop(event);
                  };
            }
            if (!element.gcbDragoverHandler) {
                  element.gcbDragoverHandler = function(event) {
                        allowDrop(event);
                  };
            }
            element.removeEventListener('drop', element.gcbDropHandler);
            element.addEventListener('drop', element.gcbDropHandler);
            element.removeEventListener('dragover', element.gcbDragoverHandler);
            element.addEventListener('dragover', element.gcbDragoverHandler);
      }
}

function initializeInteractions(scope)
{
      const $scope = $(scope);
      $scope.filter('.draggable, .droppable')
            .add($scope.find('.draggable, .droppable'))
            .each(function() {
                  bindDragAndDrop(this);
            });
}

initializeInteractions(document);
