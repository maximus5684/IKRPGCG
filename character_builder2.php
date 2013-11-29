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
                <div class="control-group" ng-show="checkAdditionalStudy()">
                    <label class="control-label" for="AdditionalStudySpell">Additional Study Spell:</label>
                    <div class="controls">
                        <select id="AdditionalStudySpell" ng-model="Character.AdditionalStudySpell" ng-options="Spell for Spell in AdditionalStudySpellList">
                            <option value="">...</option>
                        </select>
                        <span ng-hide="checkAdditionalStudySpell()" class="label label-warning">Required</span>
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
                        <select id="RacialStatIncrease" ng-model="Character.RacialStatIncreaseChosen" ng-options="Stat for Stat in Race.StatIncreaseChoiceOptions" ng-change="selectRacialStatIncrease()">
                            <option value="">...</option>
                        </select>
                        <span ng-hide="checkRacialStatIncrease()" class="label label-warning">Required</span>
                    </div>
                </div>
                <div class="control-group" ng-show="showAP()">
                    <label class="control-label" for="AdvancementPoints">
                        Distribute Advancement Points:<br>
                        ({{AdvancementPoints}} remaining)
                        <span ng-hide="AdvancementPoints == 0" class="label label-warning"><br>Required</span>
                    </label>
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
                                    <td>{{APFields.PHY.Starting}}</td>
                                    <td>{{APFields.SPD.Starting}}</td>
                                    <td>{{APFields.STR.Starting}}</td>
                                    <td>{{APFields.AGL.Starting}}</td>
                                    <td>{{APFields.PRW.Starting}}</td>
                                    <td>{{APFields.POI.Starting}}</td>
                                    <td>{{APFields.INT.Starting}}</td>
                                    <td>{{APFields.ARC.Starting}}</td>
                                    <td>{{APFields.PER.Starting}}</td>
                                </tr>
                                <tr>
                                    <td class="left">Advancement</td>
                                    <td><input type="number" min="{{APFields.PHY.FieldMin}}" max="{{APFields.PHY.FieldMax}}" ng-model="APFields.PHY.Points" ng-change="changeAP()" ng-disabled="APFields.PHY.Disabled"></td>
                                    <td><input type="number" min="{{APFields.SPD.FieldMin}}" max="{{APFields.SPD.FieldMax}}" ng-model="APFields.SPD.Points" ng-change="changeAP()" ng-disabled="APFields.SPD.Disabled"></td>
                                    <td><input type="number" min="{{APFields.STR.FieldMin}}" max="{{APFields.STR.FieldMax}}" ng-model="APFields.STR.Points" ng-change="changeAP()" ng-disabled="APFields.STR.Disabled"></td>
                                    <td><input type="number" min="{{APFields.AGL.FieldMin}}" max="{{APFields.AGL.FieldMax}}" ng-model="APFields.AGL.Points" ng-change="changeAP()" ng-disabled="APFields.AGL.Disabled"></td>
                                    <td><input type="number" min="{{APFields.PRW.FieldMin}}" max="{{APFields.PRW.FieldMax}}" ng-model="APFields.PRW.Points" ng-change="changeAP()" ng-disabled="APFields.PRW.Disabled"></td>
                                    <td><input type="number" min="{{APFields.POI.FieldMin}}" max="{{APFields.POI.FieldMax}}" ng-model="APFields.POI.Points" ng-change="changeAP()" ng-disabled="APFields.POI.Disabled"></td>
                                    <td><input type="number" min="{{APFields.INT.FieldMin}}" max="{{APFields.INT.FieldMax}}" ng-model="APFields.INT.Points" ng-change="changeAP()" ng-disabled="APFields.INT.Disabled"></td>
                                    <td><input type="number" min="{{APFields.ARC.FieldMin}}" max="{{APFields.ARC.FieldMax}}" ng-model="APFields.ARC.Points" ng-change="changeAP()" ng-disabled="APFields.ARC.Disabled"></td>
                                    <td><input type="number" min="{{APFields.PER.FieldMin}}" max="{{APFields.PER.FieldMax}}" ng-model="APFields.PER.Points" ng-change="changeAP()" ng-disabled="APFields.PER.Disabled"></td>
                                </tr>
                                <tr>
                                    <td class="left">Max</td>
                                    <td>{{APFields.PHY.Max}}</td>
                                    <td>{{APFields.SPD.Max}}</td>
                                    <td>{{APFields.STR.Max}}</td>
                                    <td>{{APFields.AGL.Max}}</td>
                                    <td>{{APFields.PRW.Max}}</td>
                                    <td>{{APFields.POI.Max}}</td>
                                    <td>{{APFields.INT.Max}}</td>
                                    <td>{{APFields.ARC.Max}}</td>
                                    <td>{{APFields.PER.Max}}</td>
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
                    <label class="control-label" for="Career1MSkill">
                        Choose your starting Military skill(s) for {{Career1.Name}} (pick {{Career1.StartingMSkillChoices}}):
                        <span ng-hide="checkCareer1MSkills()" class="label label-warning"><br>Required</span>
                    </label>
                    <div class="controls">
                        <ul>
                            <li ng-repeat="Skill in Career1MSkillsCBs"><input type="checkbox" name="Career1MSkillChoice" value="{{Skill.Name}}" ng-model="Skill.Checked" ng-disabled="Skill.Disabled" ng-change="changeCareer1MSkill()">{{Skill.Name}}, {{Skill.Level}}</li>
                        </ul>
                    </div>
                </div>
                <div class="control-group" ng-show="Career1OSkillsRequired">
                    <label class="control-label" for="Career1OSkill">
                        Choose your starting Occupational skill(s) for {{Career1.Name}} (pick {{Career1.StartingOSkillChoices}}):
                        <span ng-hide="checkCareer1OSkills()" class="label label-warning"><br>Required</span>
                    </label>
                    <div class="controls">
                        <ul>
                            <li ng-repeat="Skill in Career1OSkillsCBs"><input type="checkbox" name="Career1OSkillChoice" value="{{Skill.Name}}" ng-model="Skill.Checked" ng-disabled="Skill.Disabled" ng-change="changeCareer1OSkill()">{{Skill.Name}}, {{Skill.Level}}</li>
                        </ul>
                    </div>
                </div>
                <div class="control-group" ng-show="Career2MSkillsRequired">
                    <label class="control-label" for="Career2MSkill">
                        Choose your starting Military skill(s) for {{Career2.Name}} (pick {{Career2.StartingMSkillChoices}}):
                        <span ng-hide="checkCareer2MSkills()" class="label label-warning"><br>Required</span>
                    </label>
                    <div class="controls">
                        <ul>
                            <li ng-repeat="Skill in Career2MSkillsCBs"><input type="checkbox" name="Career2MSkillChoice" value="{{Skill.Name}}" ng-model="Skill.Checked" ng-disabled="Skill.Disabled" ng-change="changeCareer2MSkill()">{{Skill.Name}}, {{Skill.Level}}</li>
                        </ul>
                    </div>
                </div>
                <div class="control-group" ng-show="Career2OSkillsRequired">
                    <label class="control-label" for="Career2OSkill">
                        Choose your starting Occupational skill(s) for {{Career2.Name}} (pick {{Career2.StartingOSkillChoices}}):
                        <span ng-hide="checkCareer2OSkills()" class="label label-warning"><br>Required</span>
                    </label>
                    <div class="controls">
                        <ul>
                            <li ng-repeat="Skill in Career2OSkillsCBs"><input type="checkbox" name="Career2OSkillChoice" value="{{Skill.Name}}" ng-model="Skill.Checked" ng-disabled="Skill.Disabled" ng-change="changeCareer2OSkill()">{{Skill.Name}}, {{Skill.Level}}</li>
                        </ul>
                    </div>
                </div>
                <div class="control-group" ng-show="RacialConnections">
                    <label class="control-label" for="RacialConnectionDetails">Racial Connection:</label>
                    <div class="controls">
                        {{Race.Connections[0]}}<br>
                        <input type="checkbox" name="RacialConnectionDetails" ng-model="ShowRacialConnectionDetails"> To change the details of this connection (the text between the parentheses), click this checkbox.
                        <span ng-show="ShowRacialConnectionDetails"><br><br>Details: <input type="text" ng-model="Character.RacialConnectionDetails"></span>
                    </div>
                </div>
                <div class="control-group" ng-show="Career1Connections">
                    <label class="control-label" for="Career1ConnectionDetails">{{Career1.Name}} Connection:</label>
                    <div class="controls">
                        {{Career1.StartingConnections[0]}}<br>
                        <input type="checkbox" name="Career1ConnectionDetails" ng-model="ShowCareer1ConnectionDetails"> To change the details of this connection (the text between the parentheses), click this checkbox.
                        <span ng-show="ShowCareer1ConnectionDetails"><br><br>Details: <input type="text" ng-model="Character.Career1ConnectionDetails"></span>
                    </div>
                </div>
                <div class="control-group" ng-show="Career2Connections">
                    <label class="control-label" for="Career2ConnectionDetails"> Connection:</label>
                    <div class="controls">
                        {{Career2.StartingConnections[0]}}<br>
                        <input type="checkbox" name="Career2ConnectionDetails" ng-model="ShowCareer2ConnectionDetails"> To change the details of this connection (the text between the parentheses), click this checkbox.
                        <span ng-show="ShowCareer2ConnectionDetails"><br><br>Details: <input type="text" ng-model="Character.Career2ConnectionDetails"></span>
                    </div>
                </div>
                <div class="control-group" ng-show="Career1AssetsRequired">
                    <label class="control-label" for="Career1AssetChoice">
                        Select your starting asset(s) for {{Career1.Name}} (pick {{Career1.StartingAssetChoices}}):
                        <span ng-hide="checkCareer1Assets()" class="label label-warning"><br>Required</span>
                    </label>
                    <div class="controls">
                        <ul>
                            <li ng-repeat="Asset in Career1AssetChoiceCBs"><input type="checkbox" name="Career1AssetChoice" value={{Asset.Name}} ng-model="Asset.Checked" ng-disabled="Asset.Disabled" ng-change="changeCareer1AssetChoice()">{{Asset.Name}}</li>
                        </ul>
                    </div>
                </div>
                <div class="control-group" ng-show="Career2AssetsRequired">
                    <label class="control-label" for="Career2AssetChoice">
                        Select your starting asset(s) for {{Career2.Name}} (pick {{Career2.StartingAssetChoices}}):
                        <span ng-hide="checkCareer2Assets()" class="label label-warning"><br>Required</span>
                    </label>
                    <div class="controls">
                        <ul>
                            <li ng-repeat="Asset in Career2AssetChoiceCBs"><input type="checkbox" name="Career2AssetChoice" value={{Asset.Name}} ng-model="Asset.Checked" ng-disabled="Asset.Disabled" ng-change="changeCareer2AssetChoice()">{{Asset.Name}}</li>
                        </ul>
                    </div>
                </div>
                <div class="control-group">
                    <label class="control-label" for="HRAbilityCB">House Rules:</label>
                    <div class="controls">
                        <ul>
                            <li ng-show="HRAbility">
                                <input type="checkbox" id="HRAbilityCB" ng-model="HRAbilityChecked" ng-change="selectHRAbSwap()">Swap Starting Abilities
                            </li>
                            <li ng-show="HRMSkill">
                                <input type="checkbox" id="HRMSkillCB" ng-model="HRMSkillChecked" ng-change="selectHRMSkillSwap()">Swap Starting Military Skills
                            </li>
                            <li ng-show="HROSkill">
                                <input type="checkbox" id="HROSkillCB" ng-model="HROSkillChecked" ng-change="selectHROSkillSwap()">Swap Starting Occupational Skills
                            </li>
                            <li ng-show="HRSpell">
                                <input type="checkbox" id="HRSpellCB" ng-model="HRSpellChecked" ng-change="selectHRSpellSwap()">Swap Starting Spells
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="control-group" ng-show="HRAbilityChecked && HRAbilityC1">
                    <label for="HRAbCareer1From" class="control-label">{{Career1.Name}} ability to replace:</label>
                    <div class="controls">
                        <select id="HRAbCareer1From" ng-model="Character.HRCareer1AbToReplace" ng-options="Ability for Ability in Career1.StartingAbilities" ng-change="selectHRAbCareer1From()">
                            <option value="">...</option>
                        </select>
                    </div>
                </div>
                <div class="control-group" ng-show="checkHRAbCareer1From()">
                    <label for="HRAbCareer1To" class="control-label">Replace {{Career1.Name}} ability with:</label>
                    <div class="controls">
                        <select id="HRAbCareer1To" ng-model="Character.HRCareer1AbReplacedWith" ng-options="Ability for Ability in HRAbCareer1List">
                            <option value="">...</option>
                        </select>
                        <span ng-hide="Character.HRCareer1AbReplacedWith !== null" class="label label-warning">Required</span>
                    </div>
                </div>
                <div class="control-group" ng-show="HRAbilityChecked && HRAbilityC2">
                    <label for="HRAbCareer2From" class="control-label">{{Career2.Name}} ability to replace:</label>
                    <div class="controls">
                        <select id="HRAbCareer2From" ng-model="Character.HRCareer2AbToReplace" ng-options="Ability for Ability in Career2.StartingAbilities" ng-change="selectHRAbCareer2From()">
                            <option value="">...</option>
                        </select>
                    </div>
                </div>
                <div class="control-group" ng-show="checkHRAbCareer2From()">
                    <label for="HRAbCareer2To" class="control-label">Replace {{Career2.Name}} ability with:</label>
                    <div class="controls">
                        <select id="HRAbCareer2To" ng-model="Character.HRCareer2AbReplacedWith" ng-options="Ability for Ability in HRAbCareer2List">
                            <option value="">...</option>
                        </select>
                        <span ng-hide="Character.HRCareer2AbReplacedWith !== null" class="label label-warning">Required</span>
                    </div>
                </div>
                <div class="control-group" ng-show="HRMSkillChecked && HRMSkillC1">
                    <label for="HRMSkillCareer1From" class="control-label">{{Career1.Name}} military skill to replace:</label>
                    <div class="controls">
                        <select id="HRMSkillCareer1From" ng-model="Character.HRCareer1MSkillToReplace" ng-options="Skill[0] for Skill in Career1.StartingMilitarySkills" ng-change="selectHRMSkillCareer1From()">
                            <option value="">...</option>
                        </select>
                    </div>
                </div>
                <div class="control-group" ng-show="checkHRMSkillCareer1From()">
                    <label for="HRMSkillCareer1To" class="control-label">Replace {{Career1.Name}} military skill with:</label>
                    <div class="controls">
                        <select id="HRMSkillCareer1To" ng-model="Character.HRCareer1MSkillReplacedWith" ng-options="Skill[0] for Skill in HRMSkillCareer1List">
                            <option value="">...</option>
                        </select>
                        <span ng-hide="Character.HRCareer1MSkillReplacedWith !== null" class="label label-warning">Required</span>
                    </div>
                </div>
                <div class="control-group" ng-show="HRMSkillChecked && HRMSkillC2">
                    <label for="HRMSkillCareer2From" class="control-label">{{Career2.Name}} military skill to replace:</label>
                    <div class="controls">
                        <select id="HRMSkillCareer2From" ng-model="Character.HRCareer2MSkillToReplace" ng-options="Skill[0] for Skill in Career2.StartingMilitarySkills" ng-change="selectHRMSkillCareer2From()">
                            <option value="">...</option>
                        </select>
                    </div>
                </div>
                <div class="control-group" ng-show="checkHRMSkillCareer2From()">
                    <label for="HRMSkillCareer1To" class="control-label">Replace {{Career2.Name}} military skill with:</label>
                    <div class="controls">
                        <select id="HRMSkillCareer1To" ng-model="Character.HRCareer2MSkillReplacedWith" ng-options="Skill[0] for Skill in HRMSkillCareer2List">
                            <option value="">...</option>
                        </select>
                        <span ng-hide="Character.HRCareer2MSkillReplacedWith !== null" class="label label-warning">Required</span>
                    </div>
                </div>
                <div class="control-group" ng-show="HROSkillChecked && HROSkillC1">
                    <label for="HROSkillCareer1From" class="control-label">{{Career1.Name}} occupational skill to replace:</label>
                    <div class="controls">
                        <select id="HROSkillCareer1From" ng-model="Character.HRCareer1OSkillToReplace" ng-options="Skill[0] for Skill in Career1.StartingOccupationalSkills" ng-change="selectHROSkillCareer1From()">
                            <option value="">...</option>
                        </select>
                    </div>
                </div>
                <div class="control-group" ng-show="checkHROSkillCareer1From()">
                    <label for="HROSkillCareer1To" class="control-label">Replace {{Career1.Name}} occupational skill with:</label>
                    <div class="controls">
                        <select id="HROSkillCareer1To" ng-model="Character.HRCareer1OSkillReplacedWith" ng-options="Skill[0] for Skill in HROSkillCareer1List">
                            <option value="">...</option>
                        </select>
                        <span ng-hide="Character.HRCareer1OSkillReplacedWith !== null" class="label label-warning">Required</span>
                    </div>
                </div>
                <div class="control-group" ng-show="HROSkillChecked && HROSkillC2">
                    <label for="HROSkillCareer2From" class="control-label">{{Career2.Name}} occupational skill to replace:</label>
                    <div class="controls">
                        <select id="HROSkillCareer2From" ng-model="Character.HRCareer2OSkillToReplace" ng-options="Skill[0] for Skill in Career2.StartingOccupationalSkills" ng-change="selectHROSkillCareer2From()">
                            <option value="">...</option>
                        </select>
                    </div>
                </div>
                <div class="control-group" ng-show="checkHROSkillCareer2From()">
                    <label for="HROSkillCareer1To" class="control-label">Replace {{Career2.Name}} occupational skill with:</label>
                    <div class="controls">
                        <select id="HROSkillCareer1To" ng-model="Character.HRCareer2OSkillReplacedWith" ng-options="Skill[0] for Skill in HROSkillCareer2List">
                            <option value="">...</option>
                        </select>
                        <span ng-hide="Character.HRCareer2OSkillReplacedWith !== null" class="label label-warning">Required</span>
                    </div>
                </div>
                <div class="control-group" ng-show="HRSpellChecked && HRSpellC1">
                    <label for="HRSpellCareer1From" class="control-label">{{Career1.Name}} spell to replace:</label>
                    <div class="controls">
                        <select id="HRSpellCareer1From" ng-model="Character.HRCareer1SpellToReplace" ng-options="Spell for Spell in Career1.StartingSpells" ng-change="selectHRSpellCareer1From()">
                            <option value="">...</option>
                        </select>
                    </div>
                </div>
                <div class="control-group" ng-show="checkHRSpellCareer1From()">
                    <label for="HRSpellCareer1To" class="control-label">Replace {{Career1.Name}} spell with:</label>
                    <div class="controls">
                        <select id="HRSpellCareer1To" ng-model="Character.HRCareer1SpellReplacedWith" ng-options="Spell for Spell in HRSpellCareer1List">
                            <option value="">...</option>
                        </select>
                        <span ng-hide="Character.HRCareer1SpellReplacedWith !== null" class="label label-warning">Required</span>
                    </div>
                </div>
                <div class="control-group" ng-show="HRSpellChecked && HRSpellC2">
                    <label for="HRSpellCareer2From" class="control-label">{{Career2.Name}} spell to replace:</label>
                    <div class="controls">
                        <select id="HRSpellCareer2From" ng-model="Character.HRCareer2SpellToReplace" ng-options="Spell for Spell in Career2.StartingSpells" ng-change="selectHRSpellCareer2From()">
                            <option value="">...</option>
                        </select>
                    </div>
                </div>
                <div class="control-group" ng-show="checkHRSpellCareer2From()">
                    <label for="HRSpellCareer1To" class="control-label">Replace {{Career2.Name}} spell with:</label>
                    <div class="controls">
                        <select id="HRSpellCareer1To" ng-model="Character.HRCareer2SpellReplacedWith" ng-options="Spell for Spell in HRSpellCareer2List">
                            <option value="">...</option>
                        </select>
                        <span ng-hide="Character.HRCareer2SpellReplacedWith !== null" class="label label-warning">Required</span>
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
                        <span ng-show="checkError()" class="label label-warning">{{Error}}</span>
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
