<?php 
// Login values
require('email_login.php');

// Grabs sanitized values from global
global $ezee_email_vals;
$name = $ezee_email_vals['name'];
$email = $ezee_email_vals['email'];

// Where the email will be sent from (required)
$ezee_email_send_from_config = [
    'encryption_type' => 'tls', // (optional) 'ssl' or 'tls' 
    'port' => 587, 
    'server' => 'smtp.gmail.com', // Can also take secondary server separated by a comma
    'email' => [$my_secret_email, "Ryan's Rim Restoration"],
    'password' => $my_secret_pass // Password for address server
];

// Config for where the email will be sent to (required)
$ezee_email_send_to_config = [
    // If you want to send a 'name' when you have only one recipient,
    // this still needs to be an array of arrays
    'addresses' => [
        ['ryan@ryansrimrestoration.com', "Ryan's Rim Restoration"],
    ],
    'subject' => "Contact from $name",
    'reply_to' => [$email, $name]
];

// (required)
$ezee_email_value_options = [
    // Using this without flags or required_values is not as safe
    'required_values' => [
        // 'null' values means the key has to exist
        'name'  => null,
        'phone' => null,
        'email' => null,
        // '(opt)' value means key is optional, and can hold any kind of data.
        'message' => '(opt)',
    ]
];
