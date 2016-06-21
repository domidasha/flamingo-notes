<?php
function autoloader($class) {
    include 'lib/' . $class . '.php';
}

spl_autoload_register('autoloader');
?>