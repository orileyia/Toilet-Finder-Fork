<?php

require_once './conn.php';
require_once './session.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $user = get_user_data($pdo, (int)$_SESSION['user_id']);

    echo json_encode($user, JSON_UNESCAPED_UNICODE);
}

function get_user_data($pdo, int $id)
{
    $stmt = $pdo->prepare('SELECT username, email FROM users WHERE id = :id');
    $stmt->bindParam(':id', $id);
    $stmt->execute();

    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    return $user;
}
