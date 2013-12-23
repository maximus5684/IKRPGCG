<?php 

$pageTitle = 'Character Builder - Iron Kingdoms Character Generator'; 
include($_SERVER['DOCUMENT_ROOT'] . '/phpincludes/header1.php'); ?> 
  
        <link href="css/character_builder3.css" rel="stylesheet"> 
        <script src="js/races.js"></script> 
        <script src="js/archetypes.js"></script> 
        <script src="js/careers.js"></script> 
        <script src="js/languages.js"></script>
        <script src="js/abilities.js"></script>
        <script src="js/spells.js"></script>
        <script src="js/cb3.js"></script> 
<?php include($_SERVER['DOCUMENT_ROOT'] . '/phpincludes/header2.php'); ?>

        <div class="container" id="mainContain" ng-controller="CB3Ctrl" data-ng-init="GetChar(<?php echo $_GET["CharacterID"]; ?>)">
            <h2 class="center">Character Builder</h2>
            <form class="form-horizontal" id="charFinalDetailsForm" ng-submit="UpdateChar()">
                <div class="control-group" ng-show="checkBenefitProperties()">
                    <label class="control-label" for="BenefitProperty">Benefit Properties:</label>
                    <div class="controls">

                    </div>
                </div>
            </form>
        </div>
<?php include($_SERVER['DOCUMENT_ROOT'] . '/phpincludes/footer.php'); ?>
