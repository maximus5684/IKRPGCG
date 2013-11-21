<?php 

$pageTitle = 'Character Builder - Iron Kingdoms Character Generator'; 
include($_SERVER['DOCUMENT_ROOT'] . '/phpincludes/header1.php'); ?> 
  
        <link href="css/character_builder2.css" rel="stylesheet"> 
        <script src="js/races.js"></script> 
        <script src="js/archetypes.js"></script> 
        <script src="js/careers.js"></script> 
        <script src="js/languages.js"></script>
        <script src="js/cb2.js"></script> 
<?php include($_SERVER['DOCUMENT_ROOT'] . '/phpincludes/header2.php'); ?>

        <div class="container" id="mainContain" ng-controller="CB2Ctrl" data-ng-init="GetChar(<?php echo $_GET["CharacterID"]; ?>)">
            <h2 class="center">Character Builder</h2>
            <form class="form-horizontal" id="charDetailsForm" ng-submit="UpdateChar()">
                <div class="control-group">
                    <label class="control-label" for="ArchBenefit">Archetype Benefit ({{Character.Archetype}}):</label>
                    <div class="controls">
                        <select id="ArchBenefit" ng-model="Character.Benefit" ng-options="Benefit for Benefit in Benefits" ng-change="selectBenefit()">
                            <option value="">...</option>
                        </select>
                        <span ng-hide="checkBenefit()" class="label label-warning">Required</span><br><br>
                        <span ng-show="RacialBenefits">Racial Benefits: {{RacialBenefits}}<br></span>
                        <span ng-show="CareerBenefits">Career Benefits: {{CareerBenefits}}</span>
                    </div>
                </div>
                <div class="control-group">
                    <div class="controls">
                        <p style="width: 400px">
                            <span class="label label-important">WARNING:</span>
                            After you submit this page, you will not be able to change any of the values selected here.
                        </p>
                        <button type="submit" ng-disabled="submitCheck()" class="btn btn-primary">Submit</button>
                        <button type="button" ng-click="cancelConfirm()" class="btn" style="margin-left: 15px; margin-right: 15px">Cancel</button>
                        <span ng-hide="checkError()" class="label label-warning">{{Error}}</span>
                    </div>
                </div>
            </form>
        </div>
<?php include($_SERVER['DOCUMENT_ROOT'] . '/phpincludes/footer.php'); ?>
