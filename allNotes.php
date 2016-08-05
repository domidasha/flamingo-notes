<?php
include('functions.php');

$response['success']='success';
$response['message']='';
$flamingo =  new FlamingoListService();


if (isset($_GET)) {

    //  if ($_GET['id'] == $_SESSION['userId']) {

    $userId = $_SESSION['userId']; // val1
    $notes = $flamingo->getAllNotesByUserId($userId);

    if (!empty($notes)) {
        $response['notes'] = $notes;
    } else {
        $response['message'] = 'No notes are found.';
    }
    $response['success'] = true;
//    }
//else {
//    $response['success'] = false;
//    $response['message'] = 'Access is not allowed.';
//}
    echo json_encode($response);
};