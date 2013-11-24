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
                        <span ng-hide="checkBenefit()" class="label label-warning">Required</span><br>
                        <span ng-show="RacialBenefits"><br>Racial Benefits: {{RacialBenefits}}</span>
                        <span ng-show="CareerBenefits"><br>Career Benefits: {{CareerBenefits}}</span>
                    </div>
                </div>
                <div class="control-group" ng-show="RacialAbilitiesRequired">
                    <label class="control-label" for="RacialAbility">Select an additional starting ability from your careers (racial bonus):</label>
                    <div class="controls">
                        <select id="RacialAbility" ng-model="Character.RacialAbilitiesChosen" ng-options="Option for Option in RacialAbilityChoices">
                            <option value="">...</option>
                        </select>
                        <span ng-hide="checkRacialAbility()" class="label label-warning">Required</span><br>
                        <span ng-show="RacialAbilities"><br>Racial Abilities: {{RacialAbilities}}</span>
                        <span ng-show="CareerAbilities"><br>Career Abilities: {{CareerAbilities}}</span>
                        <span class="label label-important"><br>Note:</span> Some abilities have prerequisites and this page does not take this into consideration.
                    </div>
                </div>
                <div class="control-group" ng-show="RacialStatIncreaseRequired">
                    <label class="control-label" for="RacialStatIncrease">Select a stat to increase by +1 (racial bonus):</label>
                    <div class="controls">
                        <select id="RacialStatIncrease" ng-model="Character.RacialStatIncreaseChosen" ng-options="Stat for Stat in Race.StatIncreaseChoiceOptions">
                            <option value="">...</option>
                        </select>
                        <span ng-hide="checkRacialStatIncrease()" class="label label-warning">Required</span>
                    </div>
                </div>
                <div class="control-group" ng-show="showAP()">
                    <label class="control-label" for="AdvancementPoints">Distribute Advancement Points:<br>({{AdvancementPoints}} remaining)</label>
                    <div class="controls">
                        <table id="APTable">
                            <thead>
                                <tr>
                                    <th>&#160;</th>
                                    <th class="priStat">PHY</th>
                                    <th class="secStat">SPD</th>
                                    <th class="secStat">STR</th>
                                    <th class="priStat">AGL</th>
                                    <th class="secStat">PRW</th>
                                    <th class="secStat">POI</th>
                                    <th class="priStat">INT</th>
                                    <th class="secStat">ARC</th>
                                    <th class="secStat">PER</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="left">Starting</td>
                                    <td>{{StartingStats[0]}}</td>
                                    <td>{{StartingStats[1]}}</td>
                                    <td>{{StartingStats[2]}}</td>
                                    <td>{{StartingStats[3]}}</td>
                                    <td>{{StartingStats[4]}}</td>
                                    <td>{{StartingStats[5]}}</td>
                                    <td>{{StartingStats[6]}}</td>
                                    <td>{{StartingStats[7]}}</td>
                                    <td>{{StartingStats[8]}}</td>
                                </tr>
                                <tr>
                                    <td class="left">Advancement</td>
                                    <td><input type="number" min="0" max="3" value="0"></td>
                                    <td><input type="number" min="0" max="3" value="0"></td>
                                    <td><input type="number" min="0" max="3" value="0"></td>
                                    <td><input type="number" min="0" max="3" value="0"></td>
                                    <td><input type="number" min="0" max="3" value="0"></td>
                                    <td><input type="number" min="0" max="3" value="0"></td>
                                    <td><input type="number" min="0" max="3" value="0"></td>
                                    <td><input type="number" min="0" max="3" value="0"></td>
                                    <td><input type="number" min="0" max="3" value="0"></td>
                                </tr>
                                <tr>
                                    <td class="left">Max</td>
                                    <td>{{MaxStats[0]}}</td>
                                    <td>{{MaxStats[1]}}</td>
                                    <td>{{MaxStats[2]}}</td>
                                    <td>{{MaxStats[3]}}</td>
                                    <td>{{MaxStats[4]}}</td>
                                    <td>{{MaxStats[5]}}</td>
                                    <td>{{MaxStats[6]}}</td>
                                    <td>{{MaxStats[7]}}</td>
                                    <td>{{MaxStats[8]}}</td>
                                </tr>
                            </tbody>
                        </table>
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
                <div class="control-group" ng-show="showLang2()">
                    <label class="control-label" for="Language2">Second Language:</label>
                    <div class="controls">
                        <select id="Language2" ng-model="Character.LanguagesChosen[1]" ng-disabled="checkLang2()" ng-options="Language for Language in Language2Choices" ng-change="selectLang2()">
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
                <div class="control-group" ng-show="Career1MSkillsRequired">
                    <label class="control-label" for="Career1MSkill">Choose your starting Military skill(s) for {{Career1.Name}} (pick {{Career1.StartingMSkillChoices}}):</label>
                    <div class="controls">
                        <ul>
                            <li ng-repeat="Skill in Career1MSkillsCBs"><input type="checkbox" name="Career1MSkillChoice" value="{{Skill.Name}}" ng-model="Skill.Checked" ng-disabled="Skill.Disabled" ng-change="changeCareer1MSkill()">{{Skill.Name}}, {{Skill.Level}}</li>
                        </ul>
                    </div>
                </div>
                <div class="control-group" ng-show="Career1OSkillsRequired">
                    <label class="control-label" for="Career1OSkill">Choose your starting Occupational skill(s) for {{Career1.Name}} (pick {{Career1.StartingOSkillChoices}}):</label>
                    <div class="controls">
                        <ul>
                            <li ng-repeat="Skill in Career1OSkillsCBs"><input type="checkbox" name="Career1OSkillChoice" value="{{Skill.Name}}" ng-model="Skill.Checked" ng-disabled="Skill.Disabled" ng-change="changeCareer1OSkill()">{{Skill.Name}}, {{Skill.Level}}</li>
                        </ul>
                    </div>
                </div>
                <div class="control-group" ng-show="Career2MSkillsRequired">
                    <label class="control-label" for="Career2MSkill">Choose your starting Military skill(s) for {{Career2.Name}} (pick {{Career2.StartingMSkillChoices}}):</label>
                    <div class="controls">
                        <ul>
                            <li ng-repeat="Skill in Career2MSkillsCBs"><input type="checkbox" name="Career2MSkillChoice" value="{{Skill.Name}}" ng-model="Skill.Checked" ng-disabled="Skill.Disabled" ng-change="changeCareer2MSkill()">{{Skill.Name}}, {{Skill.Level}}</li>
                        </ul>
                    </div>
                </div>
                <div class="control-group" ng-show="Career2OSkillsRequired">
                    <label class="control-label" for="Career2OSkill">Choose your starting Occupational skill(s) for {{Career2.Name}} (pick {{Career2.StartingOSkillChoices}}):</label>
                    <div class="controls">
                        <ul>
                            <li ng-repeat="Skill in Career2OSkillsCBs"><input type="checkbox" name="Career2OSkillChoice" value="{{Skill.Name}}" ng-model="Skill.Checked" ng-disabled="Skill.Disabled" ng-change="changeCareer2OSkill()">{{Skill.Name}}, {{Skill.Level}}</li>
                        </ul>
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
