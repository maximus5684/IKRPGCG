<?php

$pageTitle = 'XP Manager - Iron Kingdoms Character Generator';
include($_SERVER['DOCUMENT_ROOT'] . '/phpincludes/header1.php'); ?>

        <link href="css/char_xp.css" rel="stylesheet">
        <script src="js/races.js"></script>
        <script src="js/careers.js"></script>
        <script src="js/skills.js"></script>
        <script src="js/archetypes.js"></script>
        <script src="js/abilities.js"></script>
        <script src="js/spells.js"></script>
        <script src="js/char_xp.js"></script>
<?php include($_SERVER['DOCUMENT_ROOT'] . '/phpincludes/header2.php'); ?>

        <div class="container" id="mainContain" ng-controller="XPManCtrl" data-ng-init="GetChar(<?php echo $_GET["CharacterID"]; ?>)">

        </div>
