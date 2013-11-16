<?php
session_start();

require $_SERVER['DOCUMENT_ROOT'] . '/phpincludes/PasswordHash.php';
require $_SERVER['DOCUMENT_ROOT'] . '/phpincludes/connection.php';

$data = file_get_contents("php://input");
$objData = json_decode($data);

$enteredPass = $objData->Pass;
$t_hasher = new PasswordHash(8, FALSE);
try {
    $sth = $pdo->prepare("SELECT * FROM users WHERE Email = :email");
    $sth->bindParam(':email', $objData->Email);
    $sth->execute();
    $result = $sth->fetch();
    $numRows = $sth->rowCount();
} catch(PDOException $e) {
    echo $e->getMessage();
}

$dbPass = $result['PassHash'];

if ($numRows == 0) {
    echo 'BadUsername';
} else {
    if ($t_hasher->CheckPassword($enteredPass, $dbPass)) {
        $_SESSION['LoggedIn'] = 'OK';
        $_SESSION['UserID'] = $result['UserID'];
        $_SESSION['PassHash'] = $dbPass;
        echo 'OKLogin';
    } else {
        echo 'BadPassword';
    }
}

$pdo = null;

?>