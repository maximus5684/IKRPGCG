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
                <div class="control-group" ng-show="Language1Required">
                    <label class="control-label" for="Language1">First Language:</label>
                    <div class="controls">
                        <select id="Language1" ng-model="Character.LanguagesChosen[0]" ng-disabled="checkLang1()" ng-options="Language for Language in Language1Choices" ng-change="selectLang1()">
                            <option value="">...</option>
                        </select>
                        <span ng-hide="checkLang1()" class="label label-warning">Required</span>
                        <span ng-show="checkLang1()"><a ng-click="changeLang1()">Change</a></span>
                    </div>
                </div>
                <div class="control-group" ng-show="Language2Required">
                    <label class="control-label" for="Language2">Second Language:</label>
                    <div class="controls">
                        <select id="Language2" ng-model="Character.LanguagesChosen[1]" ng-disabled="checkLang2" ng-options="Language for Language in Language2Choices" ng-change="selectLang2()">
                            <option value="">...</option>
                        </select>
                        <span ng-hide="checkLang2()" class="label label-warning">Required</span>
                        <span ng-show="checkLang2()"><a ng-click="changeLang2()">Change</a></span>
                    </div>
                </div>
                <div class="control-group" ng-show="Language3Required">
                    <label class="control-label" for="Language3">Third Language:</label>
                    <div class="controls">
                        <select id="Language3" ng-model="Character.LanguagesChosen[2]" ng-options="Language for Language in Language3Choices">
                            <option value="">...</option>
                        </select>
                        <span ng-hide="checkLang3()" class="label label-warning">Required</span>
                    </div>
                </div>
                <div class="control-group" ng-show="RacialStatIncreaseRequired">
                    <label class="control-label" for="RacialStatIncrease">Stat to Increase (Racial):</label>
                    <div class="controls">
                        <select id="RacialStatIncrease" ng-model="Character.RacialStatIncreaseChosen" ng-options="Option for Option in Race.StatIncreaseChoiceOptions">
                            <option value="">...</option>
                        </select>
                        <span ng-hide="checkRacialStatIncrease()" class="label label-warning">Required</span>
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
            <div class="modal hide fade" id="changeLang1">
                <form ng-submit="resetLang1()" onsubmit="javascript:$('#changeLang1').modal('hide')">
                    <div class="modal-header">
                        <h3>Change First Language</h3>
                    </div>
                    <div class="modal-body">
                        Changing your first language will reset your second and third languages. Are you sure you wish to do this?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn" data-dismiss="modal">Cancel</button>
                        <button type="submit" class="btn btn-primary">Change</button>
                    </div>
                </form>
            </div>
        </div>
<?php include($_SERVER['DOCUMENT_ROOT'] . '/phpincludes/footer.php'); ?>
