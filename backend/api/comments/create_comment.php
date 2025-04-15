<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once '../../db/db.php';
require_once '../../models/Comment.php';

$data = json_decode(file_get_contents("php://input"));

if (!$data) {
    echo json_encode(["error" => "Invalid or missing JSON input"]);
    exit;
}

if (!isset($data->car_id) || !isset($data->customer_id) || !isset($data->comment)) {
    echo json_encode(["error" => "Missing required fields: car_id, customer_id, comment"]);
    exit;
}

$car_id = $data->car_id;
$customer_id = $data->customer_id;
$comment = $data->comment;

if (!isset($conn)) {
    echo json_encode(["error" => "Database connection failed"]);
    exit;
}

$sql = "INSERT INTO comments (car_id, customer_id, comment) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(["error" => "Failed to prepare the SQL statement"]);
    exit;
}

$stmt->bind_param("iis", $car_id, $customer_id, $comment);

if ($stmt->execute()) {
    echo json_encode(["message" => "Comment added successfully"]);
} else {
    echo json_encode(["error" => $stmt->error]);
}
