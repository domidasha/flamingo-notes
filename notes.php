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
   echo json_encode($response);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $response['success'] = true;

    $response['userId'] = $_SESSION['userId'];

    $inputJSON = file_get_contents('php://input');
    $note = json_decode( $inputJSON, TRUE );
	
	if ($note['action']=='delete') {
		$noteId = $note['id'];
		$flamingo -> deleteNoteById($note['id']);
        $response['message'] = 'note is deleted successfully';

	}
	if ($note['action']=='update') {
		$noteId = $note['id'];
		$title= $note['title'];
		$text = $note['text'];
		$priority = $note['priority'];
		$flamingo -> updateNote($noteId, $title, $text, $priority);
        $response['message'] = 'note is changed successfully';

	}
	if ($note['action']=='add') {
		$userId = $_SESSION['userId'];
        $title= $note['title'];
        $text = $note['text'];
        $priority = $note['priority'];
        

        if ($title!=''and $text!='') {
            $flamingo -> createNote($title, $text, $priority, $userId);
            $response['message'] = 'new note is added successfully';
            $response['userId'] = $userId;
        }
		else {
            $response['success'] = false;
            $response['message'] = 'Title and Text are required';
        }

	}
    
    echo json_encode($response);
}
