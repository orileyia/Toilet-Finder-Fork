<?php
require_once('../includes/conn.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];

    $user_id = get_user_id($pdo, $email, $password);

    if ($user_id) {
        require_once '../includes/tokens.php';

        remember_user($pdo, $user_id);

        echo json_encode(true);
    } else {
        echo json_encode(false);
    }
}

function get_user_id(PDO $pdo, string $email, string $password): int|null
{
    $stmt = $pdo->prepare('SELECT id, password FROM users WHERE email = :email');
    $stmt->bindParam(':email', $email);
    $stmt->execute();

    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['password'])) {
        $user_id = (int)$user['id'];
    } else {
        $user_id = null;
    }

    return $user_id;
}
