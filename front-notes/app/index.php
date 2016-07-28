<!DOCTYPE html>
<html ng-app="myApp">
<script src="../bower_components/angular/angular.min.js"></script>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
<script src="../bower_components/angular-route/angular-route.js"></script>
<link rel="stylesheet" href="css/app.css">


<script src="app.js"></script>
<body>

<p>ddd</p>

<p>{{isAuth}}</p>

    <?php if(true) :?>
        <p>true</p>
        <div ng-view class="view"></div>

    <?php else : ?>
       <p>false</p>
        <div ng-view class="view"></div>
        <note-list></note-list>

    <?php endif; ?>

</body>
</html>