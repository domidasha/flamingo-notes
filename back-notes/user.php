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

if (isset($_GET['id']) and isset($_SESSION['userId']) ) {
    $userId = $_GET['id']; // val1

    $notes = $flamingo->getAllNotesByUserId($userId);

    if (!empty($notes)) {
        $response['notes'] = $notes;
        $response['success']='true';
    }
    else {
        $response['message'] = 'No notes are found.';
        $response['success']='false';
    }
    echo json_encode($response);
//
//    $url = "http://flamingo-notes.dev/front-notes/app/index.html";
//    header('Location: '.$url);
}