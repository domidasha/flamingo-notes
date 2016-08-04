<?php
include_once('functions.php');
/**
 * Created by PhpStorm.
 * User: dasha
 * Date: 29.07.16
 * Time: 15:03
 */


?>

<!DOCTYPE html>

<link rel="stylesheet" href="frontend/app/css/app.css">

<body>
    <form action="login.php" method="POST" class="">
        <label>Login: </label><br>
        <input name="login" type="text" size="25" />
        <br>

        <label>Password: </label><br>
        <input name="password" type="password" size="25" />
        <input name="mySubmit" type="submit" value="Submit!" />
    </form>
</body>
</html>


<?php

$api = 'http://flamingo-notes.dev/index.php';

$response['success']='success';
$response['message']='';

$flamingo =  new FlamingoListService();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

//    $inputJSON = file_get_contents('php://input');
//    $user= json_decode( $inputJSON, TRUE);

    if (isset($_POST['login']) and isset($_POST['password'])) {
        $login = $_POST['login'];
        $password = $_POST['password'];

        $id = $flamingo->checkUser($login, $password);

        if ($id>0) {
            $response['id'] = $id;
            $_SESSION['userId'] = $id;

            header("Location: ".$api."#/notes/".$id, true, 301);
            //header("Location: http://flamingo-notes.dev//back-notes/notes.php/".$id);
        } else {
            $_SESSION['userId'] = 0;
            $response['success']='false';
            $response['message']='wrong password or login';
            echo 'wrong password or login';
        }
        //echo json_encode($response);
    }
}