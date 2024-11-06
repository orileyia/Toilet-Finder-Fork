<?php

$host = 'localhost';
$dbname = 'toilet_finder_db';
$dbusername = 'root';
$dbpassword = '';

$DNS = "mysql:host=$host;dbname=$dbname";

$pdo = new PDO($DNS, $dbusername, $dbpassword);
