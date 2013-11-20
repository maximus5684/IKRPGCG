<?php
session_start();

require $_SERVER['DOCUMENT_ROOT'] . '/phpincludes/connection.php';

$data = file_get_contents("php://input");
$charsReq = json_decode($data);

if ($charsReq->ReqType == 'GetUserChars') {
    $charsList = array();
    
    try {
        $sth = $pdo->prepare('SELECT CharacterID, Status, Name, Race, Career1, Career2, XP FROM characters WHERE UserID = :userid');
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
        $sth = $pdo->prepare('INSERT INTO characters (UserID, Name, Race, Faith, DefiningChars, Sex, Height, Weight, Archetype, Career1, Career2) VALUES (:userid, :name, :race, :faith, :definingchars, :sex, :height, :weight, :archetype, :career1, :career2)');
        $sth->bindParam(':userid', $_SESSION['UserID']);
        $sth->bindParam(':name', $charsReq->Name);
        $sth->bindParam(':race', $charsReq->Race);
        $sth->bindParam(':faith', $charsReq->Faith);
        $sth->bindParam(':definingchars', $charsReq->DefiningChars);
        $sth->bindParam(':sex', $charsReq->Sex);
        $sth->bindParam(':height', $charsReq->Height);
        $sth->bindParam(':weight', $charsReq->Weight);
        $sth->bindParam(':archetype', $charsReq->Archetype);
        $sth->bindParam(':career1', $charsReq->Career1);
        $sth->bindParam(':career2', $charsReq->Career2);
        $sth->execute();

        echo $pdo->lastInsertId();
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
                echo 'Character does not match logged-in user.';
            }
        }
    } catch(PDOException $e) {
        echo $e->getMessage();
    }
}

$pdo = null;
?>
