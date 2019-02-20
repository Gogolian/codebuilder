<!DOCTYPE html>
<html lang="pl">

<head>
   <meta name="viewport" content="width=device-width, initial-scale=1">
   <meta charset="UTF-8">
   <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
   <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
   <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
   <script src="https://cdn.jsdelivr.net/npm/vue@2.6.6/dist/vue.min.js"></script>
   <link rel="stylesheet" href="style.css">
   <title>Code Builder</title>
</head>

<body>
   <div class="container-fluid codebuilder-initial-container">
      <div class="row">
         <div class="codebuilder-col col-md-2">
            snippets
            <?php
            if ($handle = opendir('./templates/'))
            {
               while (false !== ($entry = readdir($handle)))
               {
                   if ($entry != "." && $entry != "..")
                   {
                      if( is_dir('./templates/'.$entry) )
                      {
                        echo '<div class="template_group"><details><summary>▶ '.$entry.'</summary>';
                        if ($handle2 = opendir('./templates/'.$entry))
                        {
                           while (false !== ($entry2 = readdir($handle2)))
                           {
                               if ($entry2 != "." && $entry2 != "..")
                               {
                                    echo '<div class="template">';
                                    echo file_get_contents('./templates/'.$entry.'/'.$entry2);
                                    echo '</div>';
                               }
                           }
                           closedir($handle2);
                        }
                        echo '</details></div>';
                      }
                      else
                      {
                        echo '<div class="template">';
                        echo file_get_contents('./templates/'.$entry);
                        echo '</div>';
                     }
                   }
               }
               closedir($handle);
            }
            ?>
         </div>
         <div class="codebuilder-col col-md-9">
            drop:
            <div id="droparea" class="droppable"></div>
            <div id="codearea">
               code:
               <textarea class="code"></textarea>
            </div>
         </div>
      </div>
   </div>
   <script type="text/javascript" src="js/draggable_init.js"></script>
   <script type="text/javascript" src="js/dragging.js"></script>
   <script type="text/javascript" src="js/dropping.js"></script>
   <script type="text/javascript" src="js/rework_code.js"></script>
   <!-- script type="text/javascript" src="js/label_edit.js"></script -->

</body>

</html>