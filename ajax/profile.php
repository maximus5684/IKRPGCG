<?php
session_start();

require $_SERVER['DOCUMENT_ROOT'] . '/phpincludes/PasswordHash.php';
require $_SERVER['DOCUMENT_ROOT'] . '/phpincludes/connection.php';

$data = file_get_contents("php://input");
$objData = json_decode($data);
$t_hasher = new PasswordHash(8, FALSE);

if ($objData->ReqType == 'EditProfile') {
    try {
        //Check for another account with same email address.
        $sth = $pdo->prepare("SELECT * FROM users WHERE Email = :email AND UserID <> :userid");
        $sth->bindParam(':email', $objData->Email);
        $sth->bindParam(':userid', $_SESSION['UserID']);
        $sth->execute();
        $numRows = $sth->rowCount();
        $sth = null;
        
        if ($numRows < 1) {
            if ($objData->NewPass == true) {
                $passHash = $t_hasher->HashPassword($objData->NewPassVal);
                $sth = $pdo->prepare("UPDATE users SET Email = :email, First = :first, Last = :last, PassHash = :passhash WHERE UserID = :userid");
                $params = array('email' => $objData->Email,
                                'first' => $objData->First,
                                'last' => $objData->Last,
                                'passhash' => $passHash,
                                'userid' => $_SESSION['UserID']);
                $sth->execute($params);
                
                echo 'OK';
            } else {
                $sth = $pdo->prepare("UPDATE users SET Email = :email, First = :first, Last = :last WHERE UserID = :userid");
                $params = array('email' => $objData->Email,
                                'first' => $objData->First,
                                'last' => $objData->Last,
                                'userid' => $_SESSION['UserID']);
                $sth->execute($params);
                
                echo 'OK';
            }
        } else {
            echo 'DuplicateEmail';
        }
    } catch(PDOException $e) {
        echo $e->getMessage();
    }
} else if ($objData->ReqType == 'GetProfile') {
    try {
        $sth = $pdo->prepare("SELECT * FROM users WHERE UserID = :userid");
        $sth->bindParam(':userid', $_SESSION['UserID']);
        $sth->execute();
        $result = $sth->fetch();
        $numRows = $sth->rowCount();
        $profile = new stdClass();
        
        if ($numRows > 0) {
            $profile->Email = $result['Email'];
            $profile->First = $result['First'];
            $profile->Last = $result['Last'];
            
            echo json_encode($profile);
        } else {
            'UserNotFound';
        }
    } catch(PDOException $e) {
        echo $e->getMessage();
    }
}
?>
