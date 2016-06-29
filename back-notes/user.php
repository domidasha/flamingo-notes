<?php
 include('functions.php');

 $response['success']='success';
 $response['message']='';
 $flamingo =  new FlamingoListService();

if (isset($_GET['id']) and isset($_SESSION['userId']) ) {
    $userId = $_GET['id']; // val1

    $notes = $flamingo->getAllNotesByUserId($userId);

    if (empty($notes)) {
        $response['message'] = 'No notes are found.';
        $response['success']='false';
    }
    else {
        $response['notes'] = $notes;
    }
    echo json_encode($response);
//
//    $url = "http://flamingo-notes.dev/front-notes/app/index.html";
//    header('Location: '.$url);
}