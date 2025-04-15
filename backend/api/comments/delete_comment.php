<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once '../../db/db.php';
require_once '../../models/Comment.php';

if (!isset($_GET['id'])) {
    echo json_encode(["success" => false, "message" => "Missing comment ID"]);
    exit;
}

$id = intval($_GET['id']); 

if (!isset($conn)) {
    echo json_encode(["success" => false, "message" => "Database connection not found"]);
    exit;
}

$stmt = $conn->prepare("DELETE FROM comments WHERE id = ?");
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to delete comment"]);
}
