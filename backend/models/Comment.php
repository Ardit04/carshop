<?php
class Comment {
    private $pdo;

    public function __construct($pdo) {
        $this->pdo = $pdo;
    }

    // Create a comment
    public function create($data) {
        $query = "INSERT INTO comments (user_id, comment) VALUES (:user_id, :comment)";
        $stmt = $this->pdo->prepare($query);
        
        $stmt->bindParam(':user_id', $data['user_id']);
        $stmt->bindParam(':comment', $data['text']); // Use 'text' from the input data

        return $stmt->execute();
    }

    // Read comments for a user
    public function read($user_id) {
        $query = "SELECT * FROM comments WHERE user_id = :user_id";
        $stmt = $this->pdo->prepare($query);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Update comment
    public function update($id, $text) {
        $query = "UPDATE comments SET comment = :comment WHERE id = :id";
        $stmt = $this->pdo->prepare($query);
        
        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':comment', $text);

        return $stmt->execute();
    }

    // Delete comment
    public function delete($id) {
        $query = "DELETE FROM comments WHERE id = :id";
        $stmt = $this->pdo->prepare($query);
        $stmt->bindParam(':id', $id);
        return $stmt->execute();
    }
}
?>
