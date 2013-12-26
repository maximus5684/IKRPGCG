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
                <div id="bwpBox" ng-show="HasBenefitsWithProperties">
                    <h3>Benefits</h3>
                    <div class="control-group" ng-repeat="Benefit in BenefitsWithProperties">
                        <label class="control-label" for="BenefitProperty">{{Benefit.Name}} Property:</label>
                        <div class="controls">
                            <select id="BenefitProperty" ng-options="Property for Property in Benefit.PropertiesList" ng-model="Benefit.Property">
                                <option value="">...</option>
                            </select>
                            <span ng-show="Benefit.Property == null" class="label label-warning">Required</span>
                        </div>
                    </div>
                </div>
                <div ng-show="HasAbilitiesWithProperties">
                    <h3>Abilities</h3>
                    <div class="control-group" ng-repeat="Ability in AbilitiesWithProperties">
                        <label class="control-label" for="AbilityProperty">{{Ability.Name}} Property:</label>
                        <div class="controls">
                            <input type="text" ng-hide="checkAbilityForPropType(Ability)" id="AbilityProperty" ng-model="Ability.Property">
                            <select ng-show="checkAbilityForPropType(Ability)" id="AbilityProperty" ng-model="Ability.Property" ng-options="Property for Property in Ability.PropertiesList">
                                <option value="">...</option>
                            </select>
                            <span ng-show="Ability.Property == null || Ability.Property == ''" class="label label-warning">Required</span>
                        </div>
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
            <div class="modal hide fade" id="cancelConfirm">
                <form ng-submit="returnToHome()">
                    <div class="modal-header">
                        <h3>Cancel Character Building</h3>
                    </div>
                    <div class="modal-body">
                        All progress on this page will be lost. Selections from the previous page have already been saved. Are you sure you wish to cancel building this character?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn" data-dismiss="modal">Don't Quit</button>
                        <button type="submit" class="btn btn-primary">Go Back Home</button>
                    </div>
                </form>
            </div>
        </div>
<?php include($_SERVER['DOCUMENT_ROOT'] . '/phpincludes/footer.php'); ?>
