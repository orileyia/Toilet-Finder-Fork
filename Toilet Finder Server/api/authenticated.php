<?php

require_once './session.php';

if (isset($_SESSION['user_id'])) {
    echo true;
    die();
}

if (!isset($_COOKIE['token'])) {
    echo false;
    die();
}

require_once './tokens.php';
require_once './conn.php';

$token = $_COOKIE['token'];
$token_info = get_token_info($pdo, $token);

if (!$token_info) {
    echo false;
    die();
}

$_SESSION['user_id'] = $token_info['user_id'];

echo true;
