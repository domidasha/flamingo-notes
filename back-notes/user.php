<?php
include('functions.php');

$response['success']='success';
$flamingo =  new FlamingoListService();

print_r($flamingo->checkUser('user', '1222'));

//if ($_SERVER['REQUEST_METHOD'] == 'POST') {
//    if (isset($_POST['login']) and isset($_POST['password'])) {
//        $login = $_POST['login'];
//        $password = $_POST['password'];
//
//        $flamingo->checkUser($login, $password);
//    }
//}