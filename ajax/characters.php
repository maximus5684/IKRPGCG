<?php
session_start();

require $_SERVER['DOCUMENT_ROOT'] . '/phpincludes/connection.php';

$data = file_get_contents("php://input");
$charsReq = json_decode($data);

if ($charsReq->ReqType == 'GetUserChars') {
    $charsList = array();
    
    try {
        $sth = $pdo->prepare('SELECT * FROM characters WHERE UserID = :userid');
        $sth->bindParam(':userid', $_SESSION['UserID']);
        $sth->execute();
        $sth->setFetchMode(PDO::FETCH_OBJ);
        
        while ($row = $sth->fetch()) {
            $charsList[] = $row;
        }
        
        echo json_encode($charsList);
    } catch(PDOException $e) {
        echo $e->getMessage();
    }
} elseif ($charsReq->ReqType == 'DelChar') {
    try {
        $sth = $pdo->prepare('SELECT * FROM characters WHERE CharacterID = :charid');
        $sth->bindParam(':charid', $charsReq->CharacterID);
        $sth->execute();
        
        if ($sth->rowCount() > 0) {
            $result = $sth->fetch();
            if ($result['UserID'] == $_SESSION['UserID']) {
                $sth = $pdo->prepare('DELETE FROM characters WHERE CharacterID = :charid');
                $sth->bindParam(':charid', $charsReq->CharacterID);
                $sth->execute();
            } else {
                echo 'Character does not match logged-in user.';
            }
        }
    } catch(PDOException $e) {
        echo $e->getMessage();
    }
}

$pdo = null;
?>
