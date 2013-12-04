<?php
session_start();

require $_SERVER['DOCUMENT_ROOT'] . '/phpincludes/connection.php';

$data = file_get_contents("php://input");
$charsReq = json_decode($data);

if ($charsReq->ReqType == 'GetUserChars') {
    $charsList = array();
    
    try {
        $sth = $pdo->prepare('SELECT CharacterID, Status, CharacterJSON FROM characters WHERE UserID = :userid');
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
} elseif ($charsReq->ReqType == 'AddChar') {
    try {
        $sth = $pdo->prepare('INSERT INTO characters (UserID, CharacterJSON) VALUES (:userid, :charjson)');
        $sth->bindParam(':userid', $_SESSION['UserID']);
        $sth->bindParam(':charjson', json_encode($charsReq->Character));
        $sth->execute();

        echo $pdo->lastInsertId();
    } catch(PDOException $e) {
        echo 'Error: ' . $e->getMessage();
    }
} elseif ($charsReq->ReqType == 'BuildChar') {
    try {
        $sth = $pdo->prepare('SELECT UserID FROM characters WHERE CharacterID = :charid');
        $sth->bindParam(':charid', $charsReq->Character->CharacterID);
        $sth->execute();

        if ($sth->rowCount() > 0) {
            $result = $sth->fetch();

            if ($result['UserID'] == $_SESSION['UserID']) {
                $sth = $pdo->prepare("UPDATE characters SET Status = 'Complete', CharacterJSON = :charjson WHERE CharacterID = :characterid");
                $sth->bindParam(':charjson', $charsReq->Character);
                $sth->bindParam(':characterid', $charsReq->CharacterID);
                $sth->execute();
            } else {
                echo 'Error: Character does not match logged-in user.';
            }
        } else {
            echo 'Error: Character not found.';
        }
    } catch(PDOException $e) {
        echo 'Error: ' . $e->getMessage();
    }
} elseif ($charsReq->ReqType == 'GetChar') {
    $charsList = array();
    
    try {
        $sth = $pdo->prepare('SELECT * FROM characters WHERE CharacterID = :charid');
        $sth->bindParam(':charid', $charsReq->CharacterID);
        $sth->execute();

        if ($sth->rowCount() > 0) {
            $result = $sth->fetch();
            if ($result['UserID'] == $_SESSION['UserID']) {
                echo json_encode($result);
            } else {
                echo 'Error: Character does not match logged-in user.';
            }
        } else {
            echo 'Error: Character not found.';
        }
    } catch(PDOException $e) {
        echo 'Error: ' . $e->getMessage();
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
                echo 'Error: Character does not match logged-in user.';
            }
        } else {
            echo 'Error: Character not found.';
        }
    } catch(PDOException $e) {
        echo 'Error: ' . $e->getMessage();
    }
} else {
    echo 'Error: Request type not found.';
}

$pdo = null;
?>
