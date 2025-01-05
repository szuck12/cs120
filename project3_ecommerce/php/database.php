<?php 

    $server = "localhost";
    $user_id = "uvdzawqyhg0ny";
    $password = "Kindness74damages";
    $database = "dbuvpcmaon1sjt";

    $connection = new mysqli($server, $user_id, $password);

    if ($connection->connect_error) {
        die("FAILURE: was unable to establish a connection." . 
            $connection->connect_error);
    }

?>