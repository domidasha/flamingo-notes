<?php
include('functions.php');
/**
 * Created by PhpStorm.
 * User: dasha
 * Date: 28.07.16
 * Time: 16:09
 */


is_auth();

function is_auth() {

    $id = '';
    if (isset($_SESSION['userId'])) {
        $id = $_SESSION['userId'];
    }
    else {
        $id = 200;
    }

    return $id;
}