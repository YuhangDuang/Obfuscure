<?php

$conn = require_once "db.php";

$id = $_POST['id'];
$encrypted_fb_email = $_POST['fb_email'];
$encrypted_fb_email_iv = $_POST['fb_email_iv']??"";
$encrypted_fb_password = $_POST['fb_password'];
$encrypted_fb_password_iv = $_POST['fb_password_iv']??"";

$stmt = $conn->prepare("UPDATE users SET fb_email = ?, fb_email_iv = ?, fb_password = ?, fb_password_iv = ? WHERE id = ?");
$stmt->bind_param("ssssi", $encrypted_fb_email, $encrypted_fb_email_iv, $encrypted_fb_password, $encrypted_fb_password_iv, $id);

if ($stmt->execute()) {
    echo "Credentials updated successfully for ID: " . $id;
} else {
    echo "Error executing query: " . $stmt->error;
}

error_log("Storing Encrypted Email: " . $_POST['fb_email']);
error_log("Storing Encrypted Password: " . $_POST['fb_password']);

$stmt->close();
$conn->close();
?>