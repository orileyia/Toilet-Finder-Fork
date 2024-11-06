<?php
require_once('../includes/conn.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $toilets = get_toilet_data($pdo);

    echo json_encode($toilets);
}

function get_toilet_data(PDO $pdo)
{
    $stmt = $pdo->prepare('SELECT `longitude`, `latitude`, `rating`, `price` FROM `toilets`');
    $stmt->execute();

    $toilets = $stmt->fetchAll(PDO::FETCH_ASSOC);

    return $toilets;
}
