<?php
header("Access-Control-Allow-Origin: *");
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");

require_once '../../db/db.php';
require_once '../../models/Comment.php';

if (isset($_GET['user_id'])) {
    $userId = intval($_GET['user_id']);
  
    try {
        // Create an instance of the Comment class
        $commentModel = new Comment($db); // Pass the $db connection
        $comments = $commentModel->getCommentsByUserId($userId); // Call the method on the instance

        echo json_encode([
            'success' => true,
            'comments' => $comments,
        ]);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'comments' => [],
            'message' => 'Failed to fetch comments: ' . $e->getMessage(),
        ]);
    }
} else {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'comments' => [],
        'message' => 'User ID is required.',
    ]);
}
