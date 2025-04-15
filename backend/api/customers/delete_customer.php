<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once '../../db/db.php';
require_once '../../models/Cusomer.php';

if (!isset($_GET['id'])) {
    echo json_encode(["success" => false, "message" => "Missing customer ID"]);
    exit;
}

$id = intval($_GET['id']);  

if (!isset($conn)) {
    echo json_encode(["success" => false, "message" => "Database connection failed"]);
    exit;
}

$stmt = $conn->prepare("DELETE FROM customers WHERE id = ?");
if (!$stmt) {
    echo json_encode(["success" => false, "message" => "Failed to prepare the SQL statement"]);
    exit;
}

$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Customer deleted successfully"]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to delete customer"]);
}
