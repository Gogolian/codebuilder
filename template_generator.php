<!DOCTYPE html>
<html lang="pl">

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta charset="UTF-8">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
    <title>Built with code builder</title>
</head>

<body>
    <div class="container">
        <!-- START CONTENT --->

<?php

    $template = isset($_POST['template']) ? $_POST['template'] : null;
    $list = isset($_POST['list']) ? $_POST['list'] : null;
    $folder = isset($_POST['folder']) ? $_POST['folder'] : null;

    if($template && $list && $folder)
    {
        function info($message)
        {
            echo '<div class="alert alert-info"><strong>'.$message.'</strong></div>';
        }

        $base_path = './templates/'.$folder.'/';

        if(!file_exists($base_path) && !is_dir($base_path))
        {
            mkdir($base_path);
            info('Dir '.$base_path.' created!');
        }

        $list_exploaded = explode("\r\n", $list);
        foreach($list_exploaded as $item)
        {
            $item = trim($item);
            $html = str_replace("{{{item}}}", $item, $template);
            $res = file_put_contents($base_path.$item.'.html', $html);
            info('Template file created: '.$res.'');
        }
    }
    
?>

        <form method="POST" action="">
        <div class="row">
            <div class="col col-md-12">
                <h1>Template Ganerator</h1>
            </div>
        </div>
        <div class="row">
            <div class="col col-md-12">
                template body (place {{{item}}} where each text from list should be).
                <textarea class="template" name="template" style="width:100%; min-height: 300px;" required><p id="name">all</p>
<div id="content">
    <div class="wrapper_delete gcb-inliner">
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
<!-- div .gcb-inliner will display element inline but will be deleted upon completition --></textarea>
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