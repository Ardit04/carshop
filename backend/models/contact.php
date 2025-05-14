<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);

$name = $data['name'] ?? '';
$email = $data['email'] ?? '';
$message = $data['message'] ?? '';

if ($name && $email && $message) {
    $mysqli = new mysqli('localhost', 'root', '', 'carshop');
    if ($mysqli->connect_errno) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Database connection failed']);
        exit;
    }
    $stmt = $mysqli->prepare("INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)");
    $stmt->bind_param('sss', $name, $email, $message);
    $stmt->execute();
    $stmt->close();
    $mysqli->close();
    echo json_encode(['success' => true, 'message' => 'Message saved!']);
} else {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing fields']);
}
?>