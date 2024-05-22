<?php
$mod =$_GET['mod'];
$conn = require_once "db.php";
if($mod == 'get'){
    $user_id = $_POST['user_id'];
    $stmt = $conn->prepare("SELECT keywords,stats_data FROM stats WHERE user_id = ?");
    $stmt->bind_param("s", $user_id);
    if ($stmt) {
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $data['keywords'] =   json_decode($row['keywords'],true);
            $data['stats_data'] = json_decode($row['stats_data'],true);  
            echo json_encode(["status" => "success", "empty"=>"no","data" => $data]);
        } else {
            echo json_encode(["status" => "success", "empty"=>"yes","data" => ""]);
        }
    }
}