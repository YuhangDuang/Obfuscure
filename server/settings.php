<?php
$mod =$_GET['mod'];
$conn = require_once "db.php";
if($mod == 'get'){
    $user_id =$_GET['user_id']??0;
    $stmt = $conn->prepare("SELECT user_id, keyword,percentage FROM settings WHERE user_id = ?");
    if ($stmt) {
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            echo json_encode(["status" => "success", "empty"=>"no","data" => $row]);
        } else {
            echo json_encode(["status" => "success", "empty"=>"yes","data" => ""]);
        }
    }
}
if($mod == 'add'){
    $user_id = $_POST['user_id'];
    $keyword = $_POST['keyword'];
    $percentage = $_POST['percentage'];
    $stmt = $conn->prepare("INSERT INTO settings (user_id, keyword,percentage) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE keyword = VALUES(keyword),percentage = VALUES(percentage)
    ");
    $stmt->bind_param("sss", $user_id, $keyword, $percentage);


    if ($stmt->execute()) {
        // Get the ID of the newly created user
        $newUserId = $stmt->insert_id;
        echo json_encode(["status" => "success", "id" => $newUserId]);
    } else {
        echo json_encode(["status" => "error", "message" => $stmt->error]);
    }

}

if($mod == 'start'){
    $user_id = $_POST['user_id'];
    $keyword = $_POST['keyword'];
    $percentage = $_POST['percentage'];
    $key = $_POST['key'];
    $username = $_POST['email'];
    $password = $_POST['password'];
    // Escape the parameters for security
    $escapedUsername = escapeshellarg($username);
    $escapedPassword = escapeshellarg($password);
    $keyword = escapeshellarg($keyword);
    // Build the command to execute the Python script with parameters
    $command = "C:\\xampp\\htdocs\\myvenv\\Scripts\\python.exe C:\\xampp\\htdocs\\linux\\bot.py $percentage $key $escapedUsername $escapedPassword $keyword $user_id";
    // Execute the command
    $output = shell_exec($command);

    //echo $output;
    echo json_encode([
        "status" => "success",
        "message"=>$command,
    ]);
}

if($mod == 'logout_facebook'){

    $user_id = $_POST['user_id'];
    // Build the command to execute the Python script with parameters
    $command = "C:\\xampp\\htdocs\\myvenv\\Scripts\\python.exe C:\\xampp\\htdocs\\linux\\exit.py $user_id";
    // Execute the command
    $output = shell_exec($command);

    echo json_encode([
        "status" => "success",
        "message"=>$command,
    ]);
}