<?php
include_once('functions.php');
/**
 * Created by PhpStorm.
 * User: dasha
 * Date: 29.07.16
 * Time: 15:03
 */

$response['success']='success';
$response['message']='';

$flamingo =  new FlamingoListService();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $inputJSON = file_get_contents('php://input');
    $user= json_decode( $inputJSON, TRUE);


    if (isset($user['login']) and isset($user['password'])) {
        $login = $user['login'];
        $password = $user['password'];

        $id = $flamingo->checkUser($login, $password);

        if ($id>0) {
            $response['id'] = $id;
            $_SESSION['userId'] = $id;
            //header("Location: http://flamingo-notes.dev//back-notes/notes.php/".$id);
        } else {
            $_SESSION['userId'] = 0;
            $response['success']='false';
            $response['message']='wrong password or login';
        }
        echo json_encode($response);
    }
}