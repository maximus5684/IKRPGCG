<?php

$pageTitle = 'Character Sheet - Iron Kingdoms Character Generator';
include($_SERVER['DOCUMENT_ROOT'] . '/phpincludes/header1.php'); ?>

        <link href="css/char_sheet.css" rel="stylesheet">
        <script src="js/races.js"></script>
        <script src="js/careers.js"></script>
        <script src="js/skills.js"></script>
        <script src="js/archetypes.js"></script>
        <script src="js/abilities.js"></script>
        <script src="js/spells.js"></script>
        <script src="js/char_sheet.js"></script>
<?php include($_SERVER['DOCUMENT_ROOT'] . '/phpincludes/header2.php'); ?>

        <div class="container" id="mainContain" ng-controller="CSCtrl" data-ng-init="GetChar(<?php echo $_GET["CharacterID"]; ?>)">
            <!--Body content-->
            <div id="errorRow" class="row" ng-show="Error !== null">
                <h2 class="span12 center">{{Error}}</h2>
            </div>
            <div class="row">
                <div class="span12">
                    <div class="csBox" id="csHeader">
                        <p class="csBoxHead">IRON KINGDOMS ROLEPLAYING GAME CHARACTER SHEET</p>
                        <p class="csInputBox">
                            <span id="Name" class="textSpace" style="width:240px" ng-hide="EditName">{{Character.Name}}</span><input type="text" id="Name" class="textSpace" maxlength="30" style="width: 240px" ng-show="EditName" ng-model="Character.Name"><br>
                            <strong class="small"><a ng-click="clickEditName()">CHARACTER NAME</a></strong>
                        </p>
                        <p class="csInputBox">
                            <span class="textSpace" style="text-align: center; width: 38px" ng-hide="EditSex">{{Character.Sex}}</span><select class="textSpace" style="margin-top: 7px; width: 41px" ng-show="EditSex" ng-model="Character.Sex">
                                <option value="M">M</option>
                                <option value="F">F</option>
                            </select><br>
                            <strong class="small"><a ng-click="clickEditSex()">SEX</a></strong>
                        </p>
                        <p class="csInputBox">
                            <span class="textSpace" style="width: 270px" ng-hide="EditDefiningChars">{{Character.DefiningCharacteristics}}</span><input type="text" class="textSpace" maxlength="30" style="width: 270px" ng-show="EditDefiningChars" ng-model="Character.DefiningCharacteristics"><br>
                            <strong class="small"><a ng-click="clickEditDefiningChars()">DEFINING CHARACTERISTIC(S)</a></strong>
                        </p>
                        <p class="csInputBox">
                            <span class="textSpace" style="text-align: center; width: 50px" ng-hide="EditHeight">{{Character.Height}}"</span><input type="number" class="textSpace" ng-model="Character.Height" style="width: 50px" ng-show="EditHeight"><br>
                            <strong class="small"><a ng-click="clickEditHeight()">HEIGHT</a></strong>
                        </p>
                        <p class="csInputBox">
                            <span class="textSpace" style="text-align: center; width: 50px" ng-hide="EditWeight">{{Character.Weight}} lbs</span><input type="number" class="textSpace" ng-model="Character.Weight" style="width: 50px" ng-show="EditWeight"><br>
                            <strong class="small"><a ng-click="clickEditWeight()">WEIGHT</a></strong>
                        </p>
                        <p class="csInputBox">
                            <span class="textSpace" style="width: 110px" ng-hide="EditFaith">{{Character.Faith}}</span><input type="text" class="textSpace" ng-model="Character.Faith" style="width: 110px" ng-show="EditFaith"><br>
                            <strong class="small"><a ng-click="clickEditFaith()">FAITH</a></strong>
                        </p>
                        <div class="clear">&#160;</div>
                        <p class="csInputBox">
                            <span class="textSpace" style="width: 152px">{{User.First}}</span><br>
                            <strong class="small">PLAYER NAME</strong>
                        </p>
                        <p class="csInputBox">
                            <span class="textSpace" style="width: 75px">{{Character.Archetype}}</span><br>
                            <strong class="small">ARCHETYPE</strong>
                        </p>
                        <p class="csInputBox">
                            <span class="textSpace" style="width: 75px">{{Character.Race}}</span><br>
                            <strong class="small">RACE</strong>
                        </p>
                        <p class="csInputBox">
                            <span class="textSpace career">{{Character.Career1}}</span><br>
                            <strong class="small">CAREER 1</strong>
                        </p>
                        <p class="csInputBox">
                            <span class="textSpace career">{{Character.Career2}}</span><br>
                            <strong class="small">CAREER 2</strong>
                        </p>
                        <p class="csInputBox">
                            <span class="textSpace career">{{Career3.Name}}</span><br>
                            <strong class="small">CAREER 3</strong>
                        </p>
                        <p class="csInputBox">
                            <span class="textSpace career">{{Career4.Name}}</span><br>
                            <strong class="small">CAREER 4</strong>
                        </p>
                        <div class="clear">&#160;</div>
                        <div class="csStatBox small" style="right: 10px; top: 5px; width: 100px">
                            <p class="csStatBoxVal">{{Level}}</p>
                            <p class="csStatBoxStat" style="border-top: 1px solid #000000">LEVEL</p>
                            <p class="csStatBoxVal" style="font-size: 225%"><a href="/character_xp.php?CharacterID={{CharacterID}}">{{Character.XP}}</a></p>
                            <p class="csStatBoxStat small" style="border-top: 1px solid #000">TOTAL XP EARNED</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="span12">
                    <div class="csBox" style="padding-top: 0">
                        <p class="csBoxHead">STATS</p>
                        <div class="csStatsSection span3">
                            <div class="csStatBox" style="left: 10px; top: 35px; width: 50px">
                                <p class="csStatBoxVal">{{Stats.PHY.Current}}</p>
                                <p class="csStatBoxStat">PHY</p>
                            </div>
                            <div class="csStatBox smaller" style="left: 68px; top: 60px; width: 30px">
                                <p class="csStatBoxVal">{{Stats.PHY.Max}}</p>
                                <p class="csStatBoxStat grey">MAX</p>
                            </div>
                            <div class="csStatBox small" style="left: 120px; top: 10px; width: 40px">
                                <p class="csStatBoxVal">{{Stats.SPD.Current}}</p>
                                <p class="csStatBoxStat">SPD</p>
                            </div>
                            <div class="csStatBox smaller" style="left: 168px; top: 22px; width: 30px">
                                <p class="csStatBoxVal">{{Stats.SPD.Max}}</p>
                                <p class="csStatBoxStat grey">MAX</p>
                            </div>									
                            <div class="csStatBox small" style="left: 120px; top: 75px; width: 40px">
                                <p class="csStatBoxVal">{{Stats.STR.Current}}</p>
                                <p class="csStatBoxStat">STR</p>
                            </div>
                            <div class="csStatBox smaller" style="left: 168px; top: 87px; width: 30px">
                                <p class="csStatBoxVal">{{Stats.STR.Max}}</p>
                                <p class="csStatBoxStat grey">MAX</p>
                            </div>
                        </div>
                        <div class="csStatsSection span3">
                            <div class="csStatBox" style="left: 10px; top: 35px; width: 50px">
                                <p class="csStatBoxVal">{{Stats.AGL.Current}}</p>
                                <p class="csStatBoxStat">AGL</p>
                            </div>
                            <div class="csStatBox smaller" style="left: 68px; top: 60px; width: 30px">
                                <p class="csStatBoxVal">{{Stats.AGL.Max}}</p>
                                <p class="csStatBoxStat grey">MAX</p>
                            </div>
                            <div class="csStatBox small" style="left: 120px; top: 10px; width: 40px">
                                <p class="csStatBoxVal">{{Stats.PRW.Current}}</p>
                                <p class="csStatBoxStat">PRW</p>
                            </div>
                            <div class="csStatBox smaller" style="left: 168px; top: 22px; width: 30px">
                                <p class="csStatBoxVal">{{Stats.PRW.Max}}</p>
                                <p class="csStatBoxStat grey">MAX</p>
                            </div>									
                            <div class="csStatBox small" style="left: 120px; top: 75px; width: 40px">
                                <p class="csStatBoxVal">{{Stats.POI.Current}}</p>
                                <p class="csStatBoxStat">POI</p>
                            </div>
                            <div class="csStatBox smaller" style="left: 168px; top: 87px; width: 30px">
                                <p class="csStatBoxVal">{{Stats.POI.Max}}</p>
                                <p class="csStatBoxStat grey">MAX</p>
                            </div>
                        </div>
                        <div class="csStatsSection span3">
                            <div class="csStatBox" style="left: 10px; top: 35px; width: 50px">
                                <p class="csStatBoxVal">{{Stats.INT.Current}}</p>
                                <p class="csStatBoxStat">INT</p>
                            </div>
                            <div class="csStatBox smaller" style="left: 68px; top: 60px; width: 30px">
                                <p class="csStatBoxVal">{{Stats.INT.Max}}</p>
                                <p class="csStatBoxStat grey">MAX</p>
                            </div>
                            <div class="csStatBox small" style="left: 120px; top: 10px; width: 40px">
                                <p class="csStatBoxVal">{{Stats.ARC.Current}}</p>
                                <p class="csStatBoxStat">ARC</p>
                            </div>
                            <div class="csStatBox smaller" style="left: 168px; top: 22px; width: 30px">
                                <p class="csStatBoxVal">{{Stats.ARC.Max}}</p>
                                <p class="csStatBoxStat grey">MAX</p>
                            </div>									
                            <div class="csStatBox small" style="left: 120px; top: 75px; width: 40px">
                                <p class="csStatBoxVal">{{Stats.PER.Current}}</p>
                                <p class="csStatBoxStat">PER</p>
                            </div>
                            <div class="csStatBox smaller" style="left: 168px; top: 87px; width: 30px">
                                <p class="csStatBoxVal">{{Stats.PER.Max}}</p>
                                <p class="csStatBoxStat grey">MAX</p>
                            </div>
                        </div>
                        <div style="height: 135px; position: relative; float: left">
                            <div class="csStatBox" style="left: 70px; top: 30px; width: 80px">
                                <p class="csStatBoxVal">{{Stats.PHY.Current + Stats.INT.Current}}</p>
                                <p class="csStatBoxStat small">WILLPOWER<br><span class="small">(PHY + INT)</span></p>
                            </div>
                        </div>
                        <div class="clear">&#160;</div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="span6">
                    <div class="csBox" style="padding: 5px">
                        <p class="csBoxHead">DEF</p>
                        <div class="csStatBox small" style="float: right; width: 55px; position: static">
                            <p class="csStatBoxVal">{{calcTotalDEF()}}</p>
                            <p class="csStatBoxStat small"><br>TOTAL DEF</p>
                        </div>
                        <p class="csBigText" style="padding-top: 25px"><strong> = </strong></p>
                        <div class="csStatBox small" style="float: right; width: 55px; position: static">
                            <p class="csStatBoxVal">99</p>
                            <p class="csStatBoxStat small">EQUIPMENT<br>MODIFIERS</p>
                        </div>
                        <p class="csBigText" style="padding-top: 25px"><strong> + </strong></p>
                        <div class="csStatBox small" style="float: right; width: 55px; position: static">
                            <p class="csStatBoxVal">{{getRacialDefMod()}}</p>
                            <p class="csStatBoxStat small">RACIAL<br>MODIFIER</p>
                        </div>
                        <p class="csBigText" style="padding-top: 25px"><strong> + </strong></p>
                        <p class="csBigText"><strong>PER<br>STAT</strong></p>
                        <p class="csBigText" style="padding-top: 25px"><strong> + </strong></p>
                        <p class="csBigText"><strong>AGL<br>STAT</strong></p>
                        <p class="csBigText" style="padding-top: 25px"><strong> + </strong></p>
                        <p class="csBigText"><strong>SPD<br>STAT</strong></p>
                        <div class="clear">&#160;</div>
                    </div>
                    <div class="csBox" style="padding: 5px">
                        <p class="csBoxHead">ARM</p>
                        <div class="csStatBox small" style="float: right; width: 55px; position: static">
                            <p class="csStatBoxVal">{{calcTotalARM()}}</p>
                            <p class="csStatBoxStat small"><br>TOTAL ARM</p>
                        </div>
                        <p class="csBigText" style="padding-top: 25px"><strong> = </strong></p>
                        <div class="csStatBox small" style="float: right; width: 55px; position: static">
                            <p class="csStatBoxVal">99</p>
                            <p class="csStatBoxStat small">OTHER<br>MODIFIERS</p>
                        </div>
                        <p class="csBigText" style="padding-top: 25px"><strong> + </strong></p>
                        <div class="csStatBox small" style="float: right; width: 55px; position: static">
                            <p class="csStatBoxVal">99</p>
                            <p class="csStatBoxStat small">ARMOR<br>MODIFIERS</p>
                        </div>
                        <p class="csBigText" style="padding-top: 25px"><strong> + </strong></p>
                        <div class="csStatBox small" style="float: right; width: 55px; position: static">
                            <p class="csStatBoxVal">99</p>
                            <p class="csStatBoxStat small">SHIELD<br>MODIFIER</p>
                        </div>
                        <p class="csBigText" style="padding-top: 25px"><strong> + </strong></p>
                        <p class="csBigText"><strong>PHY<br>STAT</strong></p>
                        <div class="clear">&#160;</div>
                    </div>
                    <div class="csBox" style="padding: 5px">
                        <p class="csBoxHead">INITIATIVE</p>
                        <div class="csStatBox small" style="float: right; width: 55px; position: static">
                            <p class="csStatBoxVal">{{calcTotalInit()}}</p>
                            <p class="csStatBoxStat small">TOTAL<br>INITIATIVE</p>
                        </div>
                        <p class="csBigText" style="padding-top: 25px"><strong> = </strong></p>
                        <div class="csStatBox small" style="float: right; width: 57px; position: static">
                            <p class="csStatBoxVal">{{getOtherInitMods()}}</p>
                            <p class="csStatBoxStat small">ADDITIONAL<br>MODIFIERS</p>
                        </div>
                        <p class="csBigText" style="padding-top: 25px"><strong> + </strong></p>
                        <div class="csStatBox small" style="float: right; width: 55px; position: static">
                            <p class="csStatBoxVal">99</p>
                            <p class="csStatBoxStat small">EQUIPMENT<br>MODIFIERS</p>
                        </div>
                        <p class="csBigText" style="padding-top: 25px"><strong> + </strong></p>
                        <p class="csBigText"><strong>PER<br>STAT</strong></p>
                        <p class="csBigText" style="padding-top: 25px"><strong> + </strong></p>
                        <p class="csBigText"><strong>PRW<br>STAT</strong></p>
                        <p class="csBigText" style="padding-top: 25px"><strong> + </strong></p>
                        <p class="csBigText"><strong>SPD<br>STAT</strong></p>
                        <div class="clear">&#160;</div>
                    </div>
                    <div class="csBox">
                        <p class="csBoxHead">SKILLS</p>
                        <table class="csTable table-striped">
                            <thead>
                                <tr>
                                    <th style="text-align: left; padding-left: 5px"><strong>MILITARY SKILLS</strong></th>
                                    <th class="small" style="text-align: center; width: 68px">PARENT<br>STAT VALUE</th>
                                    <th style="width:10px">&#160;</th>
                                    <th class="small" style="text-align: center; width: 48px">SKILL<br>LEVEL</th>
                                    <th style="width:10px">&#160;</th>
                                    <th class="small" style="text-align: center; width: 40px">TOTAL</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr ng-repeat="Skill in CharMSkills">
                                    <td><small>{{Skill.Name}} ({{Skill.BaseStat}})</small></td>
                                    <td><strong>{{displaySkillBase(Skill)}}</strong></td>
                                    <td>+</td>
                                    <td><strong>{{Skill.Level}}</strong></td>
                                    <td>=</td>
                                    <td><strong>{{displaySkillTotal(Skill)}}</strong></td>
                                </tr>
                            </tbody>
                        </table>
                        <table id="oSkillsTable" class="csTable table-striped">
                            <thead>
                                <tr>
                                    <th style="text-align: left; padding-left: 5px"><strong>OCCUPATIONAL SKILLS</strong></th>
                                    <th class="small" style="text-align: center; width: 68px">PARENT<br>STAT VALUE</th>
                                    <th style="width:10px">&#160;</th>
                                    <th class="small" style="text-align: center; width: 48px">SKILL<br>LEVEL</th>
                                    <th style="width:10px">&#160;</th>
                                    <th class="small" style="text-align: center; width: 40px">TOTAL</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr ng-repeat="Skill in CharOSkills">
                                    <td><small>
                                            {{Skill.Name}}{{displaySkillProperty(Skill)}} (<span ng-hide="Skill.BaseStat == 'Social'">{{Skill.BaseStat}}</span><select ng-show="Skill.BaseStat == 'Social'" ng-model="Skill.SocialStat" ng-options="Stat for Stat in Skill.StatsList">
                                            <option value="">Social</option>
                                        </select>)</small></td>
                                    <td><strong>{{displaySkillBase(Skill)}}</strong></td>
                                    <td>+</td>
                                    <td><strong>{{Skill.Level}}</strong></td>
                                    <td>=</td>
                                    <td><strong>{{displaySkillTotal(Skill)}}</strong></td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="clear">&#160;</div>
                    </div>
                </div>
                <div class="span6">
                    <div class="csBox small" style="padding: 0 0 0 5px">
                        <p class="csBoxHead">FEAT POINTS</p>
                        <div class="csStatBox" id="featPointsBox">
                            <p class="csStatBoxVal"><input type="number" id="featPoints" min="0" max="3" value="0"></p>
                            <p class="csStatBoxStat">CURRENT<br>FEAT<br>POINTS</p>
                        </div>
                        <div id="featBox">
                            <p class="fbHead">Feat Points can be earned by:</span>
                            <ul class="fbFirst">
                                <li>Critical success on a skill roll</li>
                                <li>Destroy an enemy</li>
                            </ul>
                            <ul>
                                <li>Given by the GM</li>
                            </ul>
                            <p class="fbHead">Feat Points can be spent to:</p>
                            <ul class="fbFirst">
                                <li>Remove a continuous effect</li>
                                <li>Re-roll a failed roll</li>
                                <li>Perform a relentless charge</li>
                                <li>Perform a Run &amp; Gun</li>
                                <li>Perform a Two-Fister</li>
                                <li>Perform a Heroic Dodge</li>
                            </ul>
                            <ul>
                                <li>Boost a non-combat skill roll</li>
                                <li>Make a quick action</li>
                                <li>Shake</li>
                                <li>Sprint</li>
                                <li>Parry</li>
                                <li>Walk it Off</li>
                            </ul>
                        </div>
                        <div class="clear">&#160;</div>
                    </div>
                    <div class="csBox" style="padding: 5px">
                        <p class="csBoxHead">COMMAND</p>
                        <div class="csStatBox small" style="float: right; width: 55px; position: static">
                            <p class="csStatBoxVal">{{calcTotalCMD()}}</p>
                            <p class="csStatBoxStat small">TOTAL CMD<br>RANGE</p>
                        </div>
                        <p class="csBigText" style="padding-top: 25px"><strong> = </strong></p>
                        <div class="csStatBox small" style="float: right; width: 55px; position: static">
                            <p class="csStatBoxVal">{{getAbilityCmdMods()}}</p>
                            <p class="csStatBoxStat small">ABILITY<br>MODIFIERS</p>
                        </div>
                        <p class="csBigText" style="padding-top: 25px"><strong> + </strong></p>
                        <div class="csStatBox small" style="float: right; width: 55px; position: static">
                            <p class="csStatBoxVal">{{getCommandSkill()}}</p>
                            <p class="csStatBoxStat small">COMMAND<br>SKILL</p>
                        </div>
                        <p class="csBigText" style="padding-top: 25px"><strong> + </strong></p>
                        <p class="csBigText"><strong>INT<br>STAT</strong></p>
                        <div class="clear">&#160;</div>
                    </div>
                    <div class="csBox">
                        <div class="csBoxHead">BENEFITS</div>
                        <table class="csTable table-striped" id="benefTable">
                            <thead>
                                <tr>
                                    <th class="small" style="text-align: left">NAME</th>
                                    <th class="small">BOOK</th>
                                    <th class="small">PAGE</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr ng-repeat="Benefit in CharBenefits">
                                    <td>{{Benefit.Name}}{{displayBenefitProperty(Benefit)}}</td>
                                    <td>{{Benefit.Book}}</td>
                                    <td>{{Benefit.Page}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="csBox">
                        <div class="csBoxHead">ABILITIES</div>
                        <table class="csTable table-striped" id="abilTable">
                            <thead>
                                <tr>
                                    <th class="small" style="text-align: left">NAME</th>
                                    <th class="small">BOOK</th>
                                    <th class="small">PAGE</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr ng-repeat="Ability in CharAbilities">
                                    <td>{{Ability.Name}}{{displayAbilityProperty(Ability)}}</td>
                                    <td>{{Ability.Book}}</td>
                                    <td>{{Ability.Page}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="row" ng-show="HasSpells">
                <div class="span12">
                    <div class="csBox">
                        <p class="csBoxHead">SPELLS</p>
                        <table class="csTable table-striped" id="spellTable">
                            <thead>
                                <tr>
                                    <th class="small" style="text-align: left">NAME</th>
                                    <th class="small">COST</th>
                                    <th class="small">RNG</th>
                                    <th class="small">AOE</th>
                                    <th class="small">POW</th>
                                    <th class="small">UP</th>
                                    <th class="small">OFF</th>
                                    <th class="small">BOOK</th>
                                    <th class="small">PAGE</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr ng-repeat="Spell in CharSpells">
                                    <td>{{Spell.Name}}</td>
                                    <td>{{Spell.Cost}}</td>
                                    <td>{{Spell.Range}}</td>
                                    <td>{{Spell.AOE}}</td>
                                    <td>{{Spell.POW}}</td>
                                    <td>{{Spell.UP}}</td>
                                    <td>{{Spell.OFF}}</td>
                                    <td>{{Spell.Book}}</td>
                                    <td>{{Spell.Page}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="span4">
                    <div class="csBox" style="padding-top: 0; height: 292px">
                        <p class="csBoxHead">CHARACTER PORTRAIT</p>
                    </div>
                </div>
                <div class="span4">
                    <div id="damageBox" class="csBox" style="padding-top: 0">
                        <p class="csBoxHead">DAMAGE CAPACITY</p>
                        <ul class="damBoxList">
                            <li ng-repeat="DamBox in PHYDamBoxes" id="PHYLI{{$index}}">
                                <input type="checkbox" name="PHYCheck" id="PHYCheck{{$index}}" ng-model="DamBox.Checked" ng-disabled="DamBox.Disabled">
                            </li>
                        </ul>
                        <ul class="damBoxList">
                            <li ng-repeat="DamBox in AGLDamBoxes" id="AGLLI{{$index}}">
                                <input type="checkbox" name="AGLCheck" id="AGLCheck{{$index}}" ng-model="DamBox.Checked" ng-disabled="DamBox.Disabled">
                            </li>
                        </ul>
                        <ul class="damBoxList">
                            <li ng-repeat="DamBox in INTDamBoxes" id="INTLI{{$index}}">
                                <input type="checkbox" name="INTCheck" id="INTCheck{{$index}}" ng-model="DamBox.Checked" ng-disabled="DamBox.Disabled">
                            </li>
                        </ul>
                        <ul class="pfBoxList">
                            <li ng-repeat="PFBox in PFBoxes" id="PFLI{{$index}}">
                                <input type="checkbox" name="PFCheck" id="PFCheck{{$index}}" ng-model="PFBox.Checked" ng-disabled="PFBox.Disabled">
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="span4">
                    <div class="csBox" style="height: 268px">
                        <p class="csBoxHead">NOTES</p>
                        <textarea maxlength="450" id="notesBox"></textarea>
                    </div>
                </div>
            </div>
            <div class="row" style="page-break-before: always">
                <div class="span6">
                    <div class="csBox" style="background-color: #eff0e0">
                        <p class="csBoxHead">RANGED WEAPONS</p>
                        <div style="position: relative" ng-hide="hideRanged1()">
                            <img src="img/cs_ranged.jpg" alt="Ranged Weapon Image" style="float: left; width: 62px; margin: 8px 10px">
                            <p class="csInputBox">
                                <select name="Ranged1Name" style="width: 216px" ng-model="RangedWeapon1">
                                    <option value="">...</option>
                                    <option value="1">W1</option>
                                    <option value="2">W2</option>
                                    <option value="3">W3</option>
                                    <option value="4">W4</option>
                                </select><br>
                                <strong class="small">NAME</strong><br>
                                <input type="text" name="Ranged1Notes" style="width: 203px"><br>
                                <strong class="small">NOTES</strong>
                            </p>
                            <p class="csInputBox" style="margin-top: 50px">
                                <input type="text" name="Ranged1Ammo" style="width: 127px"><br>
                                <strong class="small">AMMO</strong>
                            </p>
                            <div class="csStatBox small" style="right: 105px; top: -18px; width: 40px">
                                <p class="csStatBoxVal">99</p>
                                <p class="csStatBoxStat">RNG</p>
                            </div>
                            <div class="csStatBox small" style="right: 55px; top: -18px; width: 40px">
                                <p class="csStatBoxVal">99</p>
                                <p class="csStatBoxStat">RAT</p>
                            </div>
                            <div class="csStatBox small" style="right: 5px; top: -18px; width: 40px">
                                <p class="csStatBoxVal">99</p>
                                <p class="csStatBoxStat">POW</p>
                            </div>
                        </div>
                        <div class="clear" style="margin-bottom: 24px">&#160;</div>
                        <div style="position: relative" ng-hide="hideRanged2()">
                            <img src="img/cs_ranged.jpg" alt="Ranged Weapon Image" style="float: left; width: 62px; margin: 8px 10px">
                            <p class="csInputBox">
                                <select name="Ranged2Name" style="width: 216px" ng-model="RangedWeapon2">
                                    <option value="">...</option>
                                    <option value="1">W1</option>
                                    <option value="2">W2</option>
                                    <option value="3">W3</option>
                                    <option value="4">W4</option>
                                </select><br>
                                <strong class="small">NAME</strong><br>
                                <input type="text" name="Ranged1Notes" style="width: 203px"><br>
                                <strong class="small">NOTES</strong>
                            </p>
                            <p class="csInputBox" style="margin-top: 50px">
                                <input type="text" name="Ranged1Ammo" style="width: 127px"><br>
                                <strong class="small">AMMO</strong>
                            </p>
                            <div class="csStatBox small" style="right: 105px; top: -18px; width: 40px">
                                <p class="csStatBoxVal">99</p>
                                <p class="csStatBoxStat">RNG</p>
                            </div>
                            <div class="csStatBox small" style="right: 55px; top: -18px; width: 40px">
                                <p class="csStatBoxVal">99</p>
                                <p class="csStatBoxStat">RAT</p>
                            </div>
                            <div class="csStatBox small" style="right: 5px; top: -18px; width: 40px">
                                <p class="csStatBoxVal">99</p>
                                <p class="csStatBoxStat">POW</p>
                            </div>
                            <div class="clear">&#160;</div>
                        </div>
                    </div>
                    <div class="csBox" style="background-color: #e7ede9">
                        <p class="csBoxHead">ADDITIONAL WEAPON</p>
                        <p class="csInputBox">
                            <select name="AdditionalName" style="width: 268px">
                                <option value="">...</option>
                                <option value="1">W1</option>
                                <option value="2">W2</option>
                                <option value="3">W3</option>
                                <option value="4">W4</option>
                            </select><br>
                            <strong class="small">NAME</strong><br>
                            <input type="text" name="AdditionalWeaponNotes" style="width: 255px"><br>
                            <strong class="small">NOTES</strong>
                        </p>
                        <div class="clear">&#160;</div>
                        <div class="csStatBox" style="right: 125px; top: 40px; width: 50px">
                            <p class="csStatBoxVal">99</p>
                        </div>
                        <div class="csStatBox" style="right: 65px; top: 40px; width: 50px">
                            <p class="csStatBoxVal">99</p>
                        </div>
                        <div class="csStatBox" style="right: 5px; top: 40px; width: 50px">
                            <p class="csStatBoxVal">99</p>
                        </div>
                    </div>
                </div>
                <div class="span6">
                    <div class="csBox" style="background-color: #f7eedf">
                        <p class="csBoxHead">MELEE WEAPONS</p>
                        <div style="position: relative" ng-hide="hideMelee1()">
                            <img src="img/cs_melee.jpg" alt="Melee Weapon Image" style="float: left; width: 62px; margin: 14px 10px">
                            <p class="csInputBox">
                                <select name="Melee1Name" style="width: 246px" ng-model="MeleeWeapon1">
                                    <option value="">...</option>
                                    <option value="1">W1</option>
                                    <option value="2">W2</option>
                                    <option value="3">W3</option>
                                    <option value="4">W4</option>
                                </select><br>
                                <strong class="small">NAME</strong><br>
                                <input type="text" name="Melee1Notes" style="width: 233px"><br>
                                <strong class="small">NOTES</strong>
                            </p>
                            <div class="csStatBox" style="right: 65px; top: 8px; width: 50px">
                                <p class="csStatBoxVal">99</p>
                                <p class="csStatBoxStat">MAT</p>
                            </div>
                            <div class="csStatBox" style="right: 5px; top: 8px; width: 50px">
                                <p class="csStatBoxVal">99</p>
                                <p class="csStatBoxStat">P+S</p>
                            </div>
                        </div>
                        <div class="clear" style="margin-bottom: 24px">&#160;</div>
                        <div style="position: relative" ng-hide="hideMelee2()">
                            <img src="img/cs_melee.jpg" alt="Melee Weapon Image" style="float: left; width: 62px; margin: 14px 10px">
                            <p class="csInputBox">
                                <select name="Melee1Name" style="width: 246px" ng-model="MeleeWeapon2">
                                    <option value="">...</option>
                                    <option value="1">W1</option>
                                    <option value="2">W2</option>
                                    <option value="3">W3</option>
                                    <option value="4">W4</option>
                                </select><br>
                                <strong class="small">NAME</strong><br>
                                <input type="text" name="Melee1Notes" style="width: 233px"><br>
                                <strong class="small">NOTES</strong>
                            </p>
                            <div class="csStatBox" style="right: 65px; top: 8px; width: 50px">
                                <p class="csStatBoxVal">99</p>
                                <p class="csStatBoxStat">MAT</p>
                            </div>
                            <div class="csStatBox" style="right: 5px; top: 8px; width: 50px">
                                <p class="csStatBoxVal">99</p>
                                <p class="csStatBoxStat">P+S</p>
                            </div>
                            <div class="clear">&#160;</div>
                        </div>
                    </div>
                    <div class="csBox">
                        <p class="csBoxHead">WORN ARMOR</p>
                        <table class="csTable table-striped">
                            <thead>
                                <tr>
                                    <th class="small" style="text-align: left">NAME</th>
                                    <th class="small">DESCRIPTION/NOTES</th>
                                    <th class="small">SPD</th>
                                    <th class="small">DEF</th>
                                    <th class="small">ARM</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>&#160;</td>
                                    <td>&#160;</td>
                                    <td>&#160;</td>
                                    <td>&#160;</td>
                                    <td>&#160;</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
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
        </div>
<?php include($_SERVER['DOCUMENT_ROOT'] . '/phpincludes/footer.php'); ?>
