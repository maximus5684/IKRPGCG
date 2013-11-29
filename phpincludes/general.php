<?php session_start();
//Login Check

if (strpos(str_replace('/', '', $_SERVER['SCRIPT_NAME']), 'login.php') === FALSE) {
    if (!(isset($_SESSION["LoggedIn"])) || $_SESSION["LoggedIn"] != "OK") {
        header( 'Location: login.php?Reason=Inactive' );
    }
}

function activeCheck($pageName) {
    if (strpos(str_replace('/','',$_SERVER['SCRIPT_NAME']), $pageName) !== FALSE) {
        return(' class="active"');
    } else {
        return;
    }
} ?>
