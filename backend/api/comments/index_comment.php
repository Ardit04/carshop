<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once '../../db/db.php';
require_once '../../models/Comment.php';

if (isset($_GET['user_id'])) {
    $userId = intval($_GET['user_id']);
    echo json_encode([
        'success' => true,
        'comments' => [
            ['id' => 1, 'text' => 'Sample comment 1', 'user_id' => $userId],
            ['id' => 2, 'text' => 'Sample comment 2', 'user_id' => $userId],
        ],
    ]);
} else {
    http_response_code(400);
    echo json_encode(['success' => false, 'comments' => [], 'message' => 'User ID is required.']);
}
