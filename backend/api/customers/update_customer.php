<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once '../../db/db.php';
require_once '../../models/Cusomer.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["error" => "Invalid JSON input"]);
    exit;
}

if (!isset($data['id']) || !isset($data['name']) || !isset($data['email']) || !isset($data['password'])) {
    echo json_encode(["error" => "Missing required fields: id, name, email, password"]);
    exit;
}

$id = intval($data['id']);  
$name = $data['name'];
$email = $data['email'];
$password = password_hash($data['password'], PASSWORD_BCRYPT);

if (!isset($conn)) {
    echo json_encode(["error" => "Database connection failed"]);
    exit;
}

$stmt = $conn->prepare("UPDATE customers SET name = ?, email = ?, password = ? WHERE id = ?");
if (!$stmt) {
    echo json_encode(["error" => "Failed to prepare SQL query"]);
    exit;
}

$stmt->bind_param("sssi", $name, $email, $password, $id);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Customer updated successfully"]);
} else {
    echo json_encode(["error" => "Failed to update customer"]);
}
