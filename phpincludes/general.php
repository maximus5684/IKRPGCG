<?php session_start();
//Login Check
if (strpos(str_replace('/', '', $_SERVER['SCRIPT_NAME']), 'login.php') === FALSE) {
    if (!(isset($_SESSION["LoggedIn"])) || $_SESSION["LoggedIn"] != "OK") {
        $redir_url = 'Location: login.php?Reason=Inactive' . urlencode($_SERVER['SCRIPT_NAME']) . urlencode('?' . $_SERVER['QUERY_STRING']);
        header( $redir_url );
    }
}

function activeCheck($pageName) {
    if (strpos(str_replace('/','',$_SERVER['SCRIPT_NAME']), $pageName) !== FALSE) {
        return(' class="active"');
    } else {
        return;
    }
} ?>
