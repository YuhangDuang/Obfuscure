<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);
$conn = require_once "db.php";

// Check if form data is set
if (isset($_POST['username']) && isset($_POST['password'])) {
    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO users (username, password, fb_email, fb_password) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $user, $hashed_password, $defaultFbEmail, $defaultFbPassword);

    // Set parameters and execute
    $user = $_POST['username'];
    $hashed_password = $_POST['password'];
    $defaultFbEmail = ''; // Default value for fb_email
    $defaultFbPassword = ''; // Default value for fb_password

    if ($stmt->execute()) {
        // Get the ID of the newly created user
        $newUserId = $stmt->insert_id;
        echo json_encode(["status" => "success", "userId" => $newUserId]);
    } else {
        echo json_encode(["status" => "error", "message" => $stmt->error]);
    }

    $stmt->close();
} else {
    echo "Username or password not provided.";
}

$conn->close();
?>
