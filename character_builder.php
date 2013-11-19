<?php

$pageTitle = 'Character Builder - Iron Kingdoms Character Generator';
include($_SERVER['DOCUMENT_ROOT'] . '/phpincludes/header1.php'); ?>

        <link href="css/character_builder.css" rel="stylesheet">
        <script src="js/races.js"></script>
        <script src="js/archetypes.js"></script>
        <script src="js/careers.js"></script>
        <script src="js/cb.js"></script>
<?php include($_SERVER['DOCUMENT_ROOT'] . '/phpincludes/header2.php'); ?>

        <div class="container" id="mainContain" ng-controller="CBCtrl">
            <h2 class="center">Character Builder</h2>
            <div id="specialBox" ng-show="checkRace()">
                <div id="raceSpecial" class="csBox">
                    <p class="csBoxHead">Race</p>
                    <ul>
                        <li ng-repeat="AddChar in Race.AdditionalChars">{{AddChar}}</li>
                    </ul>
                </div>
                <div id="career1Special" ng-show="checkCareer1Special()" class="csBox">
                    <p class="csBoxHead">Career 1</p>
                    {{Career1.StartingSpecial}}
                </div>
                <div id="career2Special" ng-show="checkCareer2Special()" class="csBox">
                    <p class="csBoxHead">Career 2</p>
                    {{Career2.StartingSpecial}}
                </div>
            </div>
            <form class="form-horizontal">
                <div class="control-group">
                    <label class="control-label" for="CharName">Character Name:</label>
                    <div class="controls">
                        <input type="text" id="CharName" maxlength="255">
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label" for="Sex">Sex:</label>
                    <div class="controls">
                        <select id="Sex" style="width: 60px" ng-model="Sex" ng-change="selectSex()">
                            <option value="M">M</option>
                            <option value="F">F</option>
                        </select>
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label" for="DefiningChars">Defining Characteristics:</label>
                    <div class="controls">
                        <input type="text" id="DefiningChars" maxlength="255">
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label" for="Faith">Faith:</label>
                    <div class="controls">
                        <input type="text" id="Faith" maxlength="255">
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label" for="Race">Race:</label>
                    <div class="controls">
                        <select id="Race" style="margin-right: 10px" ng-model="Race" ng-options="Race.Name for Race in Races" ng-disabled="checkRace()" ng-change="selectRace()">
                            <option value="">...</option>
                        </select>
                        <span ng-show="checkRace()"><a ng-click="changeRace()">Change</a></span>
                    </div>
                </div>
                <div class="control-group" ng-show="checkRace()">
                    <label class="control-label" for="Height">Height:</label>
                    <div class="controls">
                        <div class="input-append">
                            <input type="number" id="Height" style="width: 40px"><span class="add-on">in.</span>
                        </div>
                    </div>
                </div>
                <div class="control-group" ng-show="checkRace()">
                    <label class="control-label" for="Weight">Weight:</label>
                    <div class="controls">
                        <div class="input-append">
                            <input type="number" id="Weight" style="width: 50px"><span class="add-on">lbs.</span>
                        </div>
                    </div>
                </div>
                <div class="control-group" ng-show="checkRace()">
                    <label class="control-label" for="Archetype">Archetype:</label>
                    <div class="controls">
                        <select id="Archetype" style="margin-right: 10px" ng-model="Archetype" ng-options="Archetype.Name for Archetype in Archetypes" ng-disabled="checkArchetype()" ng-change="selectArchetype()">
                            <option value="">...</option>
                        </select>
                        <span ng-show="checkArchetype()"><a ng-click="changeArchetype()">Change</a></span>
                    </div>
                </div>
                <div class="control-group" ng-show="checkArchetype()">
                    <label class="control-label" for="Career1">Career 1:</label>
                    <div class="controls">
                        <select id="Career1" style="margin-right: 10px" ng-model="Career1" ng-options="Career.Name for Career in Career1List" ng-disabled="checkCareer1()" ng-change="selectCareer1()">
                            <option value="">...</option>
                        </select>
                        <span ng-show="checkCareer1()"><a ng-click="changeCareer1()">Change</a></span>
                    </div>
                </div>
                <div class="control-group" ng-show="checkCareer1()">
                    <label class="control-label" for="Career1">Career 2:</label>
                    <div class="controls">
                        <select id="Career2" ng-model="Career2" ng-options="Career.Name for Career in Career2List">
                            <option value="">...</option>
                        </select>
                    </div>
                </div>
            </form>
            <div class="modal hide fade" id="changeRace">
                <form ng-submit="resetRace()" onsubmit="javascript:$('#changeRace').modal('hide')">
                    <div class="modal-header">
                        <h3>Change Race</h3>
                    </div>
                    <div class="modal-body">
                        Changing your race will reset your archetype, benefit, and career choices. Are you sure you wish to do this?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn" data-dismiss="modal">Cancel</button>
                        <button type="submit" class="btn btn-primary">Change</button>
                    </div>
                </form>
            </div>
            <div class="modal hide fade" id="changeArchetype">
                <form ng-submit="resetArchetype()" onsubmit="javascript:$('#changeArchetype').modal('hide')">
                    <div class="modal-header">
                        <h3>Change Archetype</h3>
                    </div>
                    <div class="modal-body">
                        Changing your archetype will reset your benefit and career choices. Are you sure you wish to do this?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn" data-dismiss="modal">Cancel</button>
                        <button type="submit" class="btn btn-primary">Change</button>
                    </div>
                </form>
            </div>
            <div class="modal hide fade" id="changeCareer1">
                <form ng-submit="resetCareer1()" onsubmit="javascript:$('#changeCareer1').modal('hide')">
                    <div class="modal-header">
                        <h3>Change Career 1</h3>
                    </div>
                    <div class="modal-body">
                        Changing your first career will reset your second career choice. Are you sure you wish to do this?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn" data-dismiss="modal">Cancel</button>
                        <button type="submit" class="btn btn-primary">Change</button>
                    </div>
                </form>
            </div>
        </div>
<?php include($_SERVER['DOCUMENT_ROOT'] . '/phpincludes/footer.php'); ?>
