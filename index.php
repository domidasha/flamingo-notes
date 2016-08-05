<!DOCTYPE html>
<html ng-app="myApp">
<script src="frontend/bower_components/angular/angular.min.js"></script>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
<script src="frontend/bower_components/angular-route/angular-route.js"></script>
<link rel="stylesheet" href="frontend/app/css/app.css">


<script src="frontend/app/js/app.js"></script>
<body>

    <?php
    include('functions.php');

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

    <div class="view">
        <note-list></note-list>
        <div ng-view></div>
<!--        <note-list-green></note-list-green>-->
    </div>


</body>
</html>