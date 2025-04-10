<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once '../../db/db.php';
require_once '../../models/Car.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(['error' => 'Invalid input']);
    exit;
}

$car = new Car($pdo);
$success = $car->create($data);

echo json_encode(['success' => $success]);
