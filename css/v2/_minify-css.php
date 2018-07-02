<?php 

$output_filename = '_style.min.css';

// Have to use an array to keep the order consistent
$css_file_names = [
    'minimal.css',
    'ezee-gallery-mods.css',
    'ezee-gallery.min.css',
    'contact.css',
    'footer.css'
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
    echo "<h1>Consolidation failed</h1>";
} else {
    echo "<h1>Consolidation succeeded</h1>";
}

