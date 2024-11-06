<?php

function generate_user_token()
{
    return hash('sha256', uniqid(rand(), true));
}

function remember_user(PDO $pdo, $user_id, $days = 365)
{
    $token = generate_user_token();
    $expiry_seconds = time() + $days * 24 * 60 * 60;
    $expiry = date('Y-m-d H:i:s', $expiry_seconds);

    delete_token($pdo, $user_id);
    insert_token($pdo, $user_id, $token, $expiry);

    setcookie('token', $token, $expiry_seconds, '/');

    require_once 'session.php';
    $_SESSION['user_id'] = $user_id;
}

function delete_token(PDO $pdo, $user_id)
{
    $stmt = $pdo->prepare('DELETE FROM user_tokens WHERE user_id = :user_id');
    $stmt->bindParam(':user_id', $user_id);
    $stmt->execute();
}

function insert_token(PDO $pdo, $user_id, $token, $expiry)
{
    $stmt = $pdo->prepare('INSERT INTO user_tokens (user_id, token, expiry) VALUES (:user_id, :token, :expiry)');
    $stmt->bindParam(':user_id', $user_id);
    $stmt->bindParam(':token', $token);
    $stmt->bindParam(':expiry', $expiry);
    $stmt->execute();
}

function get_token_info($pdo, $token)
{
    $stmt = $pdo->prepare('SELECT * FROM user_tokens WHERE token = :token AND expiry > NOW()');
    $stmt->bindParam(':token', $token);
    $stmt->execute();
    return $stmt->fetch(PDO::FETCH_ASSOC);
}
