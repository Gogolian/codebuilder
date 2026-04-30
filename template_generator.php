<!DOCTYPE html>
<html lang="pl">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
    <title>Built with code builder</title>
</head>

<body>
    <div class="container">
        <!-- START CONTENT --->

<?php

    function e($value)
    {
        return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    }

    function slugify($value)
    {
        $slug = preg_replace('/[^A-Za-z0-9._-]+/', '-', trim($value));
        return trim($slug, '.-_');
    }

    function info($message, $type = 'info')
    {
        $allowedTypes = ['info', 'warning', 'danger', 'success'];
        if (!in_array($type, $allowedTypes, true)) {
            $type = 'info';
        }

        echo '<div class="alert alert-'.e($type).'"><strong>'.e($message).'</strong></div>';
    }

    $template = isset($_POST['template']) ? (string) $_POST['template'] : null;
    $list = isset($_POST['list']) ? (string) $_POST['list'] : null;
    $folder = isset($_POST['folder']) ? slugify((string) $_POST['folder']) : null;

    if($template && $list && $folder)
    {
        $templates_path = realpath(__DIR__.'/templates');
        if ($templates_path === false) {
            $templates_path = __DIR__.'/templates';
            mkdir($templates_path, 0755);
        }

        $base_path = $templates_path.DIRECTORY_SEPARATOR.$folder;

        if(!file_exists($base_path))
        {
            mkdir($base_path, 0755);
            info('Dir '.$base_path.' created!');
        }

        if (!is_dir($base_path)) {
            info('Template path is not a directory: '.$base_path, 'danger');
        } else {
            $list_exploded = preg_split('/\R/', $list);
            foreach($list_exploded as $item)
            {
                $item = trim($item);
                if ($item === '') {
                    continue;
                }

                $filename = slugify($item);
                if ($filename === '') {
                    info('Skipped invalid item: '.$item, 'warning');
                    continue;
                }

                $html = str_replace("{{{item}}}", e($item), $template);
                $res = file_put_contents($base_path.DIRECTORY_SEPARATOR.$filename.'.html', $html);
                info('Template file created: '.$filename.'.html ('.$res.' bytes)');
            }
        }
    }
    
?>

        <form method="POST" action="">
        <div class="row">
            <div class="col col-md-12">
                <h1>Template Generator</h1>
            </div>
        </div>
        <div class="row">
            <div class="col col-md-12">
                template body (place {{{item}}} where each text from list should be).
                <textarea class="template" name="template" style="width:100%; min-height: 300px;" required><p id="name">all</p>
<div id="content">
    <div class="wrapper_delete display_me_inline">
        <div class="delete-me-wrapper">To work wrap each button in btn-group first</div>
        <div class="div1 ">div1</div>
        <div class="div2 droppable">div2</div>
        <div class="div3 {{{item}}}">{{{item}}}}</div>
    </div>
</div>
<!-- place {{{item}}} where each text from list should be  -->
<!-- div .delete-me-wrapper will be deleted upon compilation  -->
<!-- elements inside .wrapper_delete will be unwrapped (only childrn will exists)-->
<!-- div .do_not_drop_on_me will prevent being dropped on -->
<!-- div .display_me_inline will display element inline but will be deleted upon completition --></textarea>
            </div>
        </div>
        <div class="row">
            <div class="col col-md-12">
                <br/>
                place each item in new row this will be filename.html as well as replaced '{{{item}}}' in template.
                <textarea class="list" name="list" style="width:100%; min-height: 300px;" required></textarea>
            </div>
        </div>
        <div class="row">
            <div class="col col-md-12">
                <br/>folder name<br/>
                <input type="text" class="folder" name="folder" required>
            </div>
        </div>
        <div class="row">
            <div class="col col-md-12">
                <br/>
                <input type="submit" class="btn btn-primary" value="Generate" >
            </div>
        </div>
        </form>
        <!-- END CONTENT --->
    </div>
</body>

</html>
