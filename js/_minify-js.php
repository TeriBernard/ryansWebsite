<?php 

$output_filename = '_script.min.js';

// Have to use an array to keep the order consistent
// the css will cascade from top to bottom, just like if added to index.html
$css_file_names = [
    "fetch.js",
    "promise.js", 
    "ezee-image-switcher.js",
    'ajax-mailer.js',
    "handle-contact-form.js"
];

// Holds final css
$css_text = '';
foreach($css_file_names as $file_name) {
    $contents = file_get_contents($file_name);
    if(!$contents){
        echo "Couldn't open $file_name <br />";
    } else {
        $css_text .= $contents;
        echo "Opened $file_name successfully <br />";
    }
}

if( !file_put_contents($output_filename, $css_text) ) {
    echo "<h1>Script consolidation failed</h1>";
} else {
    echo "<h1>Script consolidation succeeded</h1>";
}

