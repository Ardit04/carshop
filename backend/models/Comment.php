<?php

class Comment {
    private $conn;
    private $table = 'comments';

    public function __construct($db) {
        $this->conn = $db;
    }

    // Create a comment
    public function create($data) {
        $query = "INSERT INTO comments (user_id, comment, car_id) VALUES (:user_id, :comment, :car_id)";
        $stmt = $this->conn->prepare($query);
        
        $stmt->bindParam(':user_id', $data['user_id']);
        $stmt->bindParam(':car_id', $data['car_id']);
        $stmt->bindParam(':comment', $data['text']); // Use 'text' from the input data

        return $stmt->execute();
    }

    // Read comments for a user
    public function read($user_id) {
        $query = "SELECT * FROM comments WHERE user_id = :user_id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->execute();
        return $stmt->fetchAll(conn::FETCH_ASSOC);
    }

    // Update comment
    public function update($id, $text) {
        $query = "UPDATE comments SET comment = :comment WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        
        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':comment', $text);

        return $stmt->execute();
    }

    // Delete comment
    public function delete($id) {
        $query = "DELETE FROM comments WHERE id = :id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':id', $id);
        return $stmt->execute();
    }

    public function getCommentsByUserId($userId) {
        $query = "SELECT id, comment AS text, user_id, car_id FROM comments WHERE user_id = :user_id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':user_id', $userId, conn::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll(conn::FETCH_ASSOC);
    }
}
?>
