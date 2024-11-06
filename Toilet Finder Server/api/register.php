<?php
require_once('./conn.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $uname = $_POST['uname'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    $hashed_pass = password_hash($password, PASSWORD_DEFAULT);

    $user_id = create_user($pdo, $uname, $email, $hashed_pass);

    if ($user_id) {
        require_once './tokens.php';

        remember_user($pdo, $user_id);

        echo json_encode(true);
    } else {
        echo json_encode(false);
    }
}

function create_user(PDO $pdo, $uname, $email, $password)
{
    $stmt = $pdo->prepare('INSERT INTO users (username, email, password) VALUES (:uname, :email, :password)');
    $stmt->bindParam(':uname', $uname);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':password', $password);
    $stmt->execute();

    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    return $pdo->lastInsertId();
}
