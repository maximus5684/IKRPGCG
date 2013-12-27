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
                <div ng-show="HasOSkillsWithProperties">
                    <h3>Occupational Skills</h3>
                    <div class="control-group" ng-repeat="Skill in OSkillsWithProperties">
                        <label class="control-label" for="SkillProperty">{{Skill.Name}} Property:</label>
                        <div class="controls">
                            <input type="text" id="SkillProperty" ng-model="Skill.Property">
                            <span ng-show="Skill.Property == null || Skill.Property == ''" class="label label-warning">Required</span>
                        </div>
                    </div>
                </div> 
                <div ng-show="HasBenefitsWithProperties">
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
                <div ng-show="HasRacialAbilityChoice">
                    <h3>Racial Ability Choice</h3>
                    <div class="control-group">
                        <label class="control-label" for="RacialAbilityChoice">Racial Ability:</label>
                        <div class="controls">
                            <select id="RacialAbilityChoice" ng-model="RacialAbilityChoice" ng-options="Ability as Ability.Name for Ability in RacialAbilityChoices" ng-change="selectRacialAbility()">
                                <option value="">...</option>
                            </select>
                            <span ng-show="RacialAbilityChoice == null" class="label label-warning">Required</span>
                        </div>
                    </div>
                    <div class="control-group" ng-show="checkRacialAbilityForProperty()">
                        <label class="control-label" for="RacialAbilityProperty">Racial Ability Property:</label>
                        <div class="controls">
                            <input type="text" ng-hide="checkAbilityForPropType(RacialAbilityChoice)" id="RacialAbilityProperty" ng-model="RacialAbilityProperty">
                            <select ng-show="checkAbilityForPropType(RacialAbilityChoice)" id="RacialAbilityProperty" ng-model="RacialAbilityProperty" ng-options="Property for Property in RacialAbilityPropertyList">
                                <option value="">...</option>
                            </select>
                            <span ng-show="RacialAbilityProperty == null || RacialAbilityProperty == ''" class="label label-warning">Required</span>
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
