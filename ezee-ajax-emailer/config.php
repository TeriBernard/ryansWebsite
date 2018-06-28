<?php 
// This holds email sign in credentials
require('password.php');

global $ezee_email_vals;
$name = $ezee_email_vals['name'];
$email = $ezee_email_vals['email'];

// Configuration for where the email will be sent from (required)
$ezee_email_send_from_config = [
    'encryption_type' => 'tls', // (optional) 'ssl' or 'tls' 
    'port' => 587, 
    'server' => 'smtp.gmail.com', // Can also take secondary server separated by a comma
    'email' => [$ryans_email_address, 'Ryan Mcdowell'], // Email address on server
    'password' => $this_is_a_secret // Password is kept in it's own file. Otherwise I *will forget and I *will push it on accident.
];

// Config for where the email will be sent to (required)
$ezee_email_send_to_config = [
    'addresses' => $ryans_email_address,
    'subject' => "Contact from site by $name", // Sanitized values can be used here(see above)
    'reply_to' => [$email, $name]
];
