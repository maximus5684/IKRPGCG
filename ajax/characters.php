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
        $sth = $pdo->prepare('INSERT INTO characters (UserID, Name, Race, Faith, DefiningChars, Sex, Height, Weight, Archetype, Career1, Career2, ArcaneTradition) VALUES (:userid, :name, :race, :faith, :definingchars, :sex, :height, :weight, :archetype, :career1, :career2, :arcanetradition)');
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
        $sth->bindParam(':arcanetradition', $charsReq->ArcaneTradition);
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
                $sth = $pdo->prepare("UPDATE characters SET Status = 'Complete', Benefit = :benefit, AdditionalStudySpell = :asspell, " .
                    "LanguagesChosen = :langschosen, RacialConnectionDetails = :racialcondetails, RacialStatIncreaseChosen = :racialstatincrease, " .
                    "RacialAbilitiesChosen = :racialabilities, Career1MSkillsChosen = :career1mskills, Career2MSkillsChosen = :career2mskills, " .
                    "Career1OSkillsChosen = :career1oskills, Career2OSkillsChosen = :career2oskills, " .
                    "Career1ConnectionDetails = :career1condetails, Career2ConnectionDetails = :career2condetails, " .
                    "Career1AssetsChosen = :career1assets, Career2AssetsChosen = :career2assets, AP1Stat = :ap1stat, AP2Stat = :ap2stat, AP3Stat = :ap3stat, " .
                    "HRCareer1AbToReplace = :hrcareer1abtoreplace, HRCareer1AbReplacedWith = :hrcareer1abreplacedwith, HRCareer2AbToReplace = :hrcareer2abtoreplace, " .
                    "HRCareer2AbReplacedWith = :hrcareer2abreplacedwith, HRCareer1OSkillToReplace = :hrcareer1oskilltoreplace, " .
                    "HRCareer1OSkillReplacedWith = :hrcareer1oskillreplacedwith, HRCareer2OSkillToReplace = :hrcareer2oskilltoreplace, " .
                    "HRCareer2OSkillReplacedWith = :hrcareer2oskillreplacedwith, HRCareer1MSkillToReplace = :hrcareer1mskilltoreplace, " .
                    "HRCareer1MSkillReplacedWith = :hrcareer1mskillreplacedwith, HRCareer2MSkillToReplace = :hrcareer2mskilltoreplace, " .
                    "HRCareer2MSkillReplacedWith = :hrcareer2mskillreplacedwith, HRCareer1SpellToReplace = :hrcareer1spelltoreplace, " .
                    "HRCareer1SpellReplacedWith = :hrcareer1spellreplacedwith, HRCareer2SpellToReplace = :hrcareer2spelltoreplace, " .
                    "HRCareer2SpellReplacedWith = :hrcareer2spellreplacedwith WHERE CharacterID = :characterid");
                $sth->bindParam(':benefit', $charsReq->Character->Benefit);
                $sth->bindParam(':asspell', $charsReq->Character->AdditionalStudySpell);
                $sth->bindParam(':langschosen', $charsReq->Character->LanguagesChosen);
                $sth->bindParam(':racialcondetails', $charsReq->Character->RacialConnectionDetails);
                $sth->bindParam(':racialstatincrease', $charsReq->Character->RacialStatIncreaseChosen);
                $sth->bindParam(':racialabilities', $charsReq->Character->RacialAbilitiesChosen);
                $sth->bindParam(':career1mskills', $charsReq->Character->Career1MSkillsChosen);
                $sth->bindParam(':career2mskills', $charsReq->Character->Career2MSkillsChosen);
                $sth->bindParam(':career1oskills', $charsReq->Character->Career1OSkillsChosen);
                $sth->bindParam(':career2oskills', $charsReq->Character->Career2OSkillsChosen);
                $sth->bindParam(':career1condetails', $charsReq->Character->Career1ConnectionDetails);
                $sth->bindParam(':career2condetails', $charsReq->Character->Career2ConnectionDetails);
                $sth->bindParam(':career1assets', $charsReq->Character->Career1AssetsChosen);
                $sth->bindParam(':career2assets', $charsReq->Character->Career2AssetsChosen);
                $sth->bindParam(':ap1stat', $charsReq->Character->AP1Stat);
                $sth->bindParam(':ap2stat', $charsReq->Character->AP2Stat);
                $sth->bindParam(':ap3stat', $charsReq->Character->AP3Stat);
                $sth->bindParam(':hrcareer1abtoreplace', $charsReq->Character->HRCareer1AbToReplace);
                $sth->bindParam(':hrcareer1abreplacedwith', $charsReq->Character->HRCareer1AbReplacedWith);
                $sth->bindParam(':hrcareer2abtoreplace', $charsReq->Character->HRCareer2AbToReplace);
                $sth->bindParam(':hrcareer2abreplacedwith', $charsReq->Character->HRCareer2AbReplacedWith);
                $sth->bindParam(':hrcareer1oskilltoreplace', $charsReq->Character->HRCareer1OSkillToReplace);
                $sth->bindParam(':hrcareer1oskillreplacedwith', $charsReq->Character->HRCareer1OSkillReplacedWith);
                $sth->bindParam(':hrcareer2oskilltoreplace', $charsReq->Character->HRCareer2OSkillToReplace);
                $sth->bindParam(':hrcareer2oskillreplacedwith', $charsReq->Character->HRCareer2OSkillReplacedWith);
                $sth->bindParam(':hrcareer1mskilltoreplace', $charsReq->Character->HRCareer1MSkillToReplace);
                $sth->bindParam(':hrcareer1mskillreplacedwith', $charsReq->Character->HRCareer1MSkillReplacedWith);
                $sth->bindParam(':hrcareer2mskilltoreplace', $charsReq->Character->HRCareer2MSkillToReplace);
                $sth->bindParam(':hrcareer2mskillreplacedwith', $charsReq->Character->HRCareer2MSkillReplacedWith);
                $sth->bindParam(':hrcareer1spelltoreplace', $charsReq->Character->HRCareer1SpellToReplace);
                $sth->bindParam(':hrcareer1spellreplacedwith', $charsReq->Character->HRCareer1SpellReplacedWith);
                $sth->bindParam(':hrcareer2spelltoreplace', $charsReq->Character->HRCareer2SpellToReplace);
                $sth->bindParam(':hrcareer2spellreplacedwith', $charsReq->Character->HRCareer2SpellReplacedWith);
                $sth->bindParam(':characterid', $charsReq->Character->CharacterID);
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
