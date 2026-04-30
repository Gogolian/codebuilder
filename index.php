<!DOCTYPE html>
<html lang="pl">

<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1">
   <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
   <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>

   <link href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" rel="stylesheet" />
   <script
 			  src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"
 			  integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU="
 			  crossorigin="anonymous"></script>

   <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
   <link rel="stylesheet" href="style.css">
   <link rel="stylesheet" href="template_repair_styles.css">
   <title>Code Builder</title>
</head>

<body>
   <div class="container-fluid codebuilder-initial-container">
      <div class="row">
         <div class="codebuilder-col col-md-2">
            snippets
            <?php
            function e($value)
            {
               return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
            }

            function render_template_file($path, $templatesBase)
            {
               $realPath = realpath($path);
               if (
                  $realPath === false ||
                  strpos($realPath, $templatesBase . DIRECTORY_SEPARATOR) !== 0 ||
                  strtolower(pathinfo($realPath, PATHINFO_EXTENSION)) !== 'html'
               ) {
                  return;
               }

               echo '<div class="template">';
               echo file_get_contents($realPath);
               echo '</div>';
            }

            $templatesBase = realpath(__DIR__ . '/templates');
            if ($templatesBase !== false) {
               $entries = glob($templatesBase . '/*') ?: [];
               sort($entries, SORT_NATURAL | SORT_FLAG_CASE);

               foreach ($entries as $entry) {
                  if (is_dir($entry)) {
                     echo '<div class="template_group"><details><summary>▶ ' . e(basename($entry)) . '</summary>';

                     $files = glob($entry . '/*.html') ?: [];
                     sort($files, SORT_NATURAL | SORT_FLAG_CASE);
                     foreach ($files as $file) {
                        render_template_file($file, $templatesBase);
                     }

                     echo '</details></div>';
                  } else {
                     render_template_file($entry, $templatesBase);
                  }
               }
            }
            ?>
         </div>
         <div class="codebuilder-col col-md-10">
            drop:
            <div id="droparea" class="droppable"></div>
            <div id="codearea">
               code:
               <textarea class="code"></textarea>
            </div>
            <div id="previewarea">
               preview: (iframe width: <span class="gcb-iframe-width">100%</span>)<br/>
               <div class="gcb-resizable">
                  <iframe id="gcb_preview"></iframe>
               </div>
            </div>
         </div>
      </div>
   </div>
   <script type="text/javascript" src="js/dragging.js"></script>
   <script type="text/javascript" src="js/dropping.js"></script>
   <script type="text/javascript" src="js/rework_code.js"></script>
   <script type="text/javascript" src="js/additional.js"></script>
   <script type="text/javascript" src="js/draggable_init.js"></script>

</body>

</html>
