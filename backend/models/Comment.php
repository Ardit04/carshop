<?php
class Comment {
    private $conn;
    private $table = 'comments';

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getAll() {
        $query = "SELECT * FROM {$this->table}";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function getById($id) {
        $query = "SELECT * FROM {$this->table} WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->execute([$id]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function create($data) {
        $query = "INSERT INTO {$this->table} (car_id, customer_id, comment) VALUES (?, ?, ?)";
        $stmt = $this->conn->prepare($query);
        return $stmt->execute([
            $data['car_id'],
            $data['customer_id'],
            $data['comment']
        ]);
    }

    public function update($id, $data) {
        $query = "UPDATE {$this->table} SET car_id = ?, customer_id = ?, comment = ? WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        return $stmt->execute([
            $data['car_id'],
            $data['customer_id'],
            $data['comment'],
            $id
        ]);
    }

    public function delete($id) {
        $query = "DELETE FROM {$this->table} WHERE id = ?";
        $stmt = $this->conn->prepare($query);
        return $stmt->execute([$id]);
    }
}
?>
