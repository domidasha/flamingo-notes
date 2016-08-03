<?php
session_start();

session_unset();
session_destroy();

$api = 'http://flamingo-notes.dev/login.php';
header("Location: ".$api, true, 301);
