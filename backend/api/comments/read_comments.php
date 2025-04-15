<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once '../../db/db.php';
require_once '../../models/Comment.php';

if (!isset($_GET['car_id'])) {
    echo json_encode(["success" => false, "message" => "Missing car_id parameter"]);
    exit;
}

$car_id = intval($_GET['car_id']);

if (!isset($conn)) {
    echo json_encode(["success" => false, "message" => "Database connection not found"]);
    exit;
}

$sql = "SELECT c.id, c.comment, c.created_at, cust.name AS customer_name
        FROM comments c
        JOIN customers cust ON c.customer_id = cust.id
        WHERE c.car_id = ?
        ORDER BY c.created_at DESC";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $car_id);
$stmt->execute();
$result = $stmt->get_result();

$comments = [];

while ($row = $result->fetch_assoc()) {
    $comments[] = $row;
}

echo json_encode($comments);
