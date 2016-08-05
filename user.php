<?php
 include('functions.php');

 $response['success']='success';
 $response['message']='';
 $flamingo =  new FlamingoListService();


if ($_SERVER['REQUEST_METHOD'] == 'POST')  {

    $inputJSON = file_get_contents('php://input');
    $newUser = json_decode( $inputJSON, TRUE );

    $response['success'] = 'false';

    if ($newUser['action']=='register') {
        if ($flamingo->checkUserLogin($newUser['login'])===true) {
            $response['message'] = 'already exists';
            $response['success']='false';
        } else {

            $response['message'] = 'new user is added';
            $response['success']='true';
            $flamingo ->createUser($newUser['login'], $newUser['password']);
        }
    }
    echo json_encode($response);
}