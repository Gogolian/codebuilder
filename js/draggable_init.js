      $('.draggable').attr('ondragstart', 'drag(event)');
      $('.draggable').attr('draggable', 'true');
      $('.droppable').attr('ondrop', 'drop(event)');
      $('.droppable').attr('ondragover', 'allowDrop(event)');