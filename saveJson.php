<?php

// Adjust the actual location of the file relative 
    // to the location of the PHP script
    $json_str = file_get_contents('entries.json');

    // Convert json string to PHP array
    $json_arr = json_decode($json_str, true);

    // Make sure this variable is set in case Actors.json is empty
    if(!$json_arr) {
        $json_arr = array();
    }

    // Add new data
    $json_arr[] = $_POST;

    // Encode back to json string and save
    $json_str_done = json_encode($json_arr);
    file_put_contents('entries.json', $json_str_done);


?>