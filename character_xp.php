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
        <script src="js/xp_advances.js"></script>
        <script src="js/char_xp.js"></script>
<?php include($_SERVER['DOCUMENT_ROOT'] . '/phpincludes/header2.php'); ?>

        <div class="container" id="mainContain" ng-controller="XPManCtrl" data-ng-init="GetChar(<?php echo $_GET["CharacterID"]; ?>)">
            <form class="form-horizontal">
                <div class="control-group">
                    <label class="control-label" for="CharXP">Character XP:</label>
                    <div class="controls">
                        <input type="number" id="XP" ng-model="Character.XP" min="0" max="150" style="width: 40px">
                    </div>
                </div>
            </form>
            <table class="span12 table table-striped table-bordered" id="xpTable">
                <thead>
                    <tr>
                        <th colspan="4" id="bigHead"><h2>CHARACTER ADVANCEMENT TABLE</h2></th>
                    </tr>
                    <tr>
                        <th>XP TOTAL</th>
                        <th>CHARACTER ADVANCEMENT</th>
                        <th>CHOOSE/<br>EDIT</th>
                    </tr>
                </thead>
                <tbody>
                    <tr ng-repeat="XPAdv in XPAdvances" ng-show="checkCharXP(XPAdv.XP)">
                        <td>{{XPAdv.XP}}</td>
                        <td>{{displayAdvanceChoices(XPAdv)}}</td>
                        <td>&#160;</td>
                    </tr>
                </tbody>
            </table>
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
        </div>
