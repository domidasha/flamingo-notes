<!DOCTYPE html>
<html ng-app="myApp">
<script src="../bower_components/angular/angular.min.js"></script>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
<script src="../bower_components/angular-route/angular-route.js"></script>
<link rel="stylesheet" href="css/app.css">


<script src="app.js"></script>
<body>

<?php

include('../back-notes/functions.php');



function is_auth() {
    $id = '';
    if (isset($_SESSION['userId'])) {
        $id = $_SESSION['userId'];
    }
    else {
        $id = false;
    }
        return $id;
    }
?>


    <?php if(is_auth()==false) :?>
        <p>not auth</p>
        <div ng-view class="view"></div>

    <?php else : ?>
       <p>auth</p>
        <div ng-view class="view"></div>
        <note-list></note-list>

    <?php endif; ?>

</body>
</html>