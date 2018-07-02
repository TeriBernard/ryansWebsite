<?php 
// Separate fiel for actual login info, or just hardcode below
require('email_login.php');

global $ezee_email_vals;
$name = $ezee_email_vals['name'];
$email = $ezee_email_vals['email'];

// Configuration for where the email will be sent from (required)
$ezee_email_send_from_config = [
    'encryption_type' => 'tls', 
    'port' => 587, 
    'server' => 'smtp.gmail.com', 
    'email' => [$my_secret_email, "Ryan's Rim Restoration"], 
    'password' => $my_secret_pass, 

];

// Config for where the email will be sent to (required)
$ezee_email_send_to_config = [
    'addresses' => [
        [$my_secret_email, "Ryan's Rim Restoration"]
    ],
    'subject' => "Contact from $name", 
    'reply_to' => $email
];

// (required)
$ezee_email_value_options = [
    // Only send in email the values under 'required_values'
    'limit_to_required' => true,
    'fail_on_value_overload' => true,
    // Required posted keys and values
    'required_values' => [
            "name" => null,
            "phone" => null,
            "email"=> null,
            "message" => null
    ]
];


