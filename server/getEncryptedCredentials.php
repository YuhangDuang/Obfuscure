<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

$conn = require_once "db.php";
// Check connection
if ($conn->connect_error) {
    error_log("Connection Error: " . $conn->connect_error);
    echo json_encode(["status" => "error", "message" => "Connection failed"]);
    exit;
}

if (isset($_GET['userId'])) {
    $userId = intval($_GET['userId']);

    $stmt = $conn->prepare("SELECT fb_email, fb_password FROM users WHERE id = ?");
    if (!$stmt) {
        error_log("Prepare Statement Error: " . $conn->error);
        echo json_encode(["status" => "error", "message" => "Prepare statement failed"]);
        exit;
    }

    $stmt->bind_param("i", $userId);
    if (!$stmt->execute()) {
        error_log("Execute Error: " . $stmt->error);
        echo json_encode(["status" => "error", "message" => "Execute failed"]);
        exit;
    }

    $result = $stmt->get_result();
    if ($row = $result->fetch_assoc()) {
        // Debugging logs to check the fetched data
        error_log("Fetched Encrypted Email: " . $row['fb_email']);
        error_log("Fetched Encrypted Password: " . $row['fb_password']);

        echo json_encode([
            "status" => "success",
            "fb_email" => $row['fb_email'],
            "fb_password" => $row['fb_password']
        ]);
    } else {
        error_log("No User Found for ID: " . $userId);
        echo json_encode(["status" => "error", "message" => "No user found"]);
    }

    $stmt->close();
} else {
    error_log("User ID not provided");
    echo json_encode(["status" => "error", "message" => "User ID not provided"]);
}

$conn->close();
?>
