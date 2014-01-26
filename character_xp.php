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
        <script src="js/languages.js"></script>
        <script src="js/xp_advances.js"></script>
        <script src="js/char_xp.js"></script>
<?php include($_SERVER['DOCUMENT_ROOT'] . '/phpincludes/header2.php'); ?>

        <div class="container" id="mainContain" ng-controller="XPManCtrl" data-ng-init="GetChar(<?php echo $_GET["CharacterID"]; ?>)">
            <form class="form-horizontal">
                <div class="control-group">
                    <label class="control-label" for="CharXP">Character XP:</label>
                    <div class="controls">
                        <input type="number" id="XP" ng-keyup="changeXP()" ng-model="Character.XP" min="{{XPMin}}" max="{{XPMax}}" style="width: 40px">
                        <button class="btn" style="float: right" ng-click="cancelConfirm()">Cancel</button>
                    </div>
                </div>
            </form>
            <table class="span12 table table-striped table-bordered" id="xpTable">
                <thead>
                    <tr>
                        <th colspan="4" id="bigHead"><h2>CHARACTER ADVANCEMENT TABLE</h2></th>
                    </tr>
                    <tr>
                        <th style="width: 80px">XP TOTAL</th>
                        <th>CHARACTER ADVANCEMENT</th>
                        <th style="width: 160px">ADD / EDIT / DELETE</th>
                    </tr>
                </thead>
                <tbody>
                    <tr ng-repeat="XPAdv in XPAdvances" ng-show="checkXPRow(XPAdv.XP)">
                        <td>{{XPAdv.XP}}</td>
                        <td>{{displayAdvanceChoices(XPAdv)}}</td>
                        <td>
                            <span ng-show="checkXPAdvCurOrNext(XPAdv.XP)">
                                <a ng-click="clickAddAdvance(XPAdv.XP)" ng-hide="checkXPAdvance(XPAdv.XP)">Add</a>
                                <span ng-show="checkXPAdvance(XPAdv.XP)"><a ng-click="clickEditAdvance(XPAdv.XP)">Edit</a> /
                                <a ng-click="clickDeleteAdvance(XPAdv.XP)">Delete</a></span>
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="modal hide fade" id="advEdit">
                <form ng-submit="submitAdvChange()" onsubmit="javascript:$('#advEdit').modal('hide')">
                    <div class="modal-header">
                        <h3>Edit XP Advancement</h3>
                    </div>
                    <div class="modal-body">
                        <div class="form-horizontal">
                            <div class="control-group" ng-show="HasXPOptions">
                                <label class="control-label" for="AdvOption">Advancement Options:</label>
                                <div class="controls">
                                    <select id="AdvChoice" ng-options="AdvOpt for AdvOpt in XPOptionsList" ng-model="XPOptionSelected" ng-change="selectXPOption()">
                                        <option value="">...</option>
                                    </select>
                                    <span ng-hide="XPOptionSelected !== null" class="label label-warning">Required</span>
                                </div>
                            </div>
                            <div ng-repeat="XPOption in XPOptions" ng-show="XPOption.Selected">
                                <div ng-repeat="XPChoice in XPOption.Choices">
                                    <div class="control-group">
                                        <label class="control-label" for="XPOptionChoice">{{XPChoice.Label}}:</label>
                                        <div class="controls">
                                            <select id="XPOptionChoice" ng-options="CListItem as getXPChoiceName(CListItem) for CListItem in XPChoice.ChoicesList" ng-model="XPChoice.Selected" ng-change="selectXPChoice($parent.$index, $index)">
                                                <option value="">...</option>
                                            </select>
                                            <span ng-hide="XPChoice.Selected !== null" class="label label-warning">Required</span>
                                        </div>
                                    </div>
                                    <div class="control-group" ng-show="checkChoiceForTextProperty(XPChoice.Selected)">
                                        <label class="control-label" for="XPOptionChoiceProperty">{{XPChoice.Label}} Property:</label>
                                        <div class="controls">
                                            <input type="text" id="XPOptionChoiceProperty" ng-model="XPChoice.Property">
                                            <span ng-hide="XPChoice.Property !== null && XPChoice.Property != ''" class="label label-warning">Required</span>
                                        </div>
                                    </div>
                                    <div class="control-group" ng-show="checkChoiceForDDLProperty(XPChoice.Selected)">
                                        <label class="control-label" for="XPOptionChoiceProperty">{{XPChoice.Label}} Property:</label>
                                        <div class="controls">
                                            <select id="XPOptionChoiceProperty" ng-options="PLItem for PLItem in XPChoice.Selected.PropertyList" ng-model="XPChoice.Property">
                                                <option value="">...</option>
                                            </select>
                                            <span ng-hide="XPChoice.Property !== null && XPChoice.Property != ''" class="label label-warning">Required</span>
                                        </div>
                                    </div>
                                </div><!-- XPOption.Choices -->
                            </div><!-- XPOptions -->
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn" data-dismiss="modal" ng-click="clearXPEdit()">Cancel</button>
                        <button type="submit" ng-disabled="submitAdvChangeCheck()" class="btn btn-primary">Edit</button>
                    </div>
                </form>
            </div>
            <div id="bottomSpacer">&#160;</div>
            <div id="changedBox" class="row" ng-show="SomethingChanged">
                <div class="span12">
                    <form ng-submit="SaveCharChanges()">
                        <h4 style="float: left">Your character has unsaved changes. Would you like to save them now?</h4>
                        <div style="float: right; margin: 5px 10px">
                            <button type="submit" class="btn btn-primary">Save</button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="modal hide fade" id="cancelConfirm">
                <form ng-submit="returnToSheet()">
                    <div class="modal-header">
                        <h3>Cancel XP Changes</h3>
                    </div>
                    <div class="modal-body">
                        All progress will be lost. Are you sure you wish to cancel editing this character's XP advancement?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn" data-dismiss="modal">Don't Quit</button>
                        <button type="submit" class="btn btn-primary">Go Back to Character Sheet</button>
                    </div>
                </form>
            </div>
        </div>
