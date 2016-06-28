<?php
include('functions.php');
/**
 * Created by PhpStorm.
 * User: dasha
 * Date: 16.06.16
 * Time: 17:00
 */
$response['success']='success';
$response['message'] = '';

$flamingo =  new FlamingoListService();

//$flamingo -> updateNote(4, 2, 'Always like this', 'You can\'t stop what you can\'t see.');
////$flamingo -> createNote('movie1', 2, 'Mathilda since I met you everything been different. So I just need some time alone. You need some time to grow up a little.');
//$flamingo -> deleteNoteById(8);


if (isset($_GET['id']) and isset($_SESSION['userId']) ) {
    $noteId = $_GET['id']; // val1

    $note = $flamingo->getNoteById($noteId);

    if (empty($note)) {
        $response['message'] = 'No notes are found.';
        $response['success']='false';
    }

   else {
       $response['note'] = $note[0];
   }
   // print_r($response['note']);
   echo json_encode($response);

}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $inputJSON = file_get_contents('php://input');
    $note= json_decode( $inputJSON, TRUE );

	$noteId = $note['id'];
	if ($note['action']=='delete') {
		$flamingo -> deleteNoteById($note['id']);

	}
	if ($note['action']=='update') {
		$title= $note['title'];
		$text = $note['text'];
		$flamingo -> updateNote($noteId, $title, $text);
        $response['message'] = 'note is changed successfully';
	}
    else {
        $response['success']='false';
        $response['message'] = 'error';
    }
    echo json_encode($response);
}
