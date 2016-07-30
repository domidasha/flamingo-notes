<!--<!DOCTYPE html>-->
<!--<html ng-app="myApp">-->
<!--<script src="../bower_components/angular/angular.min.js"></script>-->
<!--<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>-->
<!--<script src="../bower_components/angular-route/angular-route.js"></script>-->
<!--<link rel="stylesheet" href="css/app.css">-->
<!---->
<!---->
<!--<script src="js/app.js"></script>-->
<!--<body>-->
<!---->
<?php
//include('functions.php');
//
//$response['success']='success';
//$response['message']='';
//
//$flamingo =  new FlamingoListService();
//
//if ($_SERVER['REQUEST_METHOD'] == 'POST') {
//
//    $inputJSON = file_get_contents('php://input');
//    $user= json_decode( $inputJSON, TRUE );
//
//
//    if (isset($user['login']) and isset($user['password'])) {
//        $login = $user['login'];
//        $password = $user['password'];
//
//        $id = $flamingo->checkUser($login, $password);
//
//        if ($id>0) {
//            $response['id'] = $id;
//            $_SESSION['userId'] = $id;
//            //header("Location: http://flamingo-notes.dev//back-notes/notes.php/".$id);
//        } else {
//            $_SESSION['userId'] = 0;
//            $response['success']='false';
//            $response['message']='wrong password or login';
//
//        }
//
//        echo json_encode($response);
//    }
//}
//
//
//
//function is_auth() {
//    $id = '';
//    if (isset($_SESSION['userId'])) {
//        $id = $_SESSION['userId'];
//    }
//    else {
//        $id = false;
//    }
//        return $id;
//    }
//?>
<!---->
<!---->
<!--    --><?php //if(is_auth()==false) :?>
<!--        <p>not auth</p>-->
<!--        <div ng-view class="view"></div>-->
<!---->
<!--    --><?php //else : ?>
<!--       <p>auth</p>-->
<!--        <div ng-view class="view"></div>-->
<!--        <note-list></note-list>-->
<!---->
<!--    --><?php //endif; ?>
<!---->
<!--</body>-->
<!--</html>-->