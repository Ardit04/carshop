<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once '../../db/db.php';
require_once '../../models/Comment.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['id']) || !isset($data['comment'])) {
    echo json_encode(["success" => false, "message" => "Invalid input"]);
    exit;
}

$id = intval($data['id']);
$comment = $data['comment'];

if (!isset($conn)) {
    echo json_encode(["success" => false, "message" => "Database connection not found"]);
    exit;
}

$stmt = $conn->prepare("UPDATE comments SET comment = ? WHERE id = ?");
$stmt->bind_param("si", $comment, $id);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "Failed to update comment"]);
}
