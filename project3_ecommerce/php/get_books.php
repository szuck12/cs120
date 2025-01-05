<?php 
    include 'database.php';

    $connection->select_db($database);

    $sql = "SELECT book_name FROM Books;";
    $result = $connection->query($sql);

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            echo "Book Name: " . $row['book_name'] . "<br>";
        }
    } else {
        echo "No books found.";
    }

    $connection->close();

?>