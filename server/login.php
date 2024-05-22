<?php
header('Content-Type: application/json');
$conn = require_once "db.php";

if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['username']) && isset($_POST['password'])) {
        $stmt = $conn->prepare("SELECT id, password FROM users WHERE username = ?");
        if ($stmt) {
            $stmt->bind_param("s", $_POST['username']);
            $stmt->execute();
            $result = $stmt->get_result();
            if ($result->num_rows > 0) {
                $row = $result->fetch_assoc();
                if ($_POST['password'] === $row['password']) {
                    echo json_encode(["status" => "success", "userId" => $row['id']]);
                } else {
                    echo json_encode(["status" => "error", "message" => "Invalid username or password"]);
                }
            } else {
                echo json_encode(["status" => "error", "message" => "Invalid username or password"]);
            }
            $stmt->close();
        } else {
            echo json_encode(["status" => "error", "message" => "Database prepare statement error"]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Username or password not provided"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
}

$conn->close();
?>
