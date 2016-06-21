<?php
include('functions.php');
/**
 * Created by PhpStorm.
 * User: dasha
 * Date: 16.06.16
 * Time: 17:00
 */
$response['success']='success';
$flamingo =  new FlamingoListService();

$flamingo -> updateNote(4, 2, 'Always like this', 'You can\'t stop what you can\'t see.');
//$flamingo -> createNote('movie1', 2, 'Mathilda since I met you everything been different. So I just need some time alone. You need some time to grow up a little.');
$flamingo -> deleteNoteById(8);

print_r($flamingo ->getNoteById(3));
//
//$req = json_decode( file_get_contents('php://input'), true );
//print_r($req);

if (isset($_GET['id'])) {
    $userId = $_GET['id']; // val1

    $response['notes'] = $flamingo->getAllNotesByUserId($userId);

   echo json_encode($response);

}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    }
}