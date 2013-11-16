<?php

$pageTitle = 'Character Sheet - Iron Kingdoms Character Generator';
include($_SERVER['DOCUMENT_ROOT'] . '/phpincludes/header1.php'); ?>

          <link href="css/character_sheet.css" rel="stylesheet">
          <script src="js/races.js"></script>
          <script src="js/careers.js"></script>
          <script src="js/skills.js"></script>
          <script src="js/archetypes.js"></script>
          <script src="js/cs.js"></script>
<?php include($_SERVER['DOCUMENT_ROOT'] . '/phpincludes/header2.php'); ?>

        <div class="container" id="mainContain" ng-controller="CSCtrl">
            <!--Body content-->
            <div class="row">
                <div class="span12">
                    <div class="csBox" id="csHeader">
                        <p class="csBoxHead">IRON KINGDOMS ROLEPLAYING GAME CHARACTER SHEET</p>
                        <p class="csInputBox">
                            <input type="text" name="Player Name" style="width: 230px"><br>
                            <strong class="small">CHARACTER NAME</strong>
                        </p>
                        <p class="csInputBox">
                            <input type="text" name="Sex" maxlength="1" style="text-align: center; width: 15px"><br>
                            <strong class="small">SEX</strong>
                        </p>
                        <p class="csInputBox">
                            <input type="text" name="Defining Characteristics" style="width: 210px"><br>
                            <strong class="small">DEFINING CHARACTERISTIC(S)</strong>
                        </p>
                        <p class="csInputBox">
                            <input type="text" name="Weight" maxlength="3" style="text-align: right; width: 27px"><br>
                            <strong class="small">WEIGHT</strong>
                        </p>
                        <p class="csInputBox">
                            <select name="Career1" style="width: 120px" ng-model="Career1" ng-options="Career.Name for Career in Career1List" ng-change="updateCareer(1)">
                                <option value="">...</option>
                            </select><br>
                            <strong class="small">CAREER 1</strong>
                        </p>
                        <p class="csInputBox">
                            <select name="Career2" style="width: 120px" ng-model="Career2" ng-options="Career.Name for Career in Career2List" ng-change="updateCareer(2)">
                                <option value="">...</option>
                            </select><br>
                            <strong class="small">CAREER 2</strong>
                        </p>
                        <div class="clear">&#160;</div>
                        <p class="csInputBox">
                            <select name="Archetype" style="width: 110px" ng-model="Archetype" ng-options="Arch for Arch in Archetypes">
                                <option value="">...</option>
                            </select><br>
                            <strong class="small">ARCHETYPE</strong>
                        </p>
                        <p class="csInputBox">
                            <select name="Race" style="width: 90px" ng-model="Race" ng-options="Race.Name for Race in Races" ng-change="updateRace()">
                                    <option value="">...</option>
                            </select><br>
                            <strong class="small">RACE</strong>
                        </p>
                        <p class="csInputBox">
                            <input type="text" name="Faith" style="width: 80px"><br>
                            <strong class="small">FAITH</strong>
                        </p>
                        <p class="csInputBox">
                            <input type="text" name="Player Name" style="width: 182px"><br>
                            <strong class="small">PLAYER NAME</strong>
                        </p>
                        <p class="csInputBox">
                            <input type="text" name="Height" maxlength="3" style="text-align: right; width: 27px"><br>
                            <strong class="small">HEIGHT</strong>
                        </p>
                        <p class="csInputBox">
                            <span class="careerSpace">{{Career3.Name}}</span><br>
                            <strong class="small">CAREER 3</strong>
                        </p>
                        <p class="csInputBox">
                            <span class="careerSpace">{{Career4.Name}}</span><br>
                            <strong class="small">CAREER 4</strong>
                        </p>
                        <div class="clear">&#160;</div>
                        <div class="csStatBox small" style="right: 10px; top: 5px; width: 100px">
                            <p class="csStatBoxVal">{{Level}}</p>
                            <p class="csStatBoxStat" style="border-top: 1px solid #000000">LEVEL</p>
                            <p class="csStatBoxVal">{{XP}}&#160;&#160;<button class="btn btn-mini" data-toggle="modal" data-target="#editXP" ng-show="displayEditXP()"><i class="icon-pencil"></i></button></p>
                            <p class="csStatBoxStat small" style="border-top: 1px solid #000000">TOTAL XP EARNED</p>
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
                                <p class="csStatBoxVal">{{Stats["PHY"].Current}}</p>
                                <p class="csStatBoxStat">PHY</p>
                            </div>
                            <div class="csStatBox smaller" style="left: 68px; top: 60px; width: 30px">
                                <p class="csStatBoxVal">{{Stats["PHY"].Max}}</p>
                                <p class="csStatBoxStat grey">MAX</p>
                            </div>
                            <div class="csStatBox small" style="left: 120px; top: 10px; width: 40px">
                                <p class="csStatBoxVal">{{Stats["SPD"].Current}}</p>
                                <p class="csStatBoxStat">SPD</p>
                            </div>
                            <div class="csStatBox smaller" style="left: 168px; top: 22px; width: 30px">
                                <p class="csStatBoxVal">{{Stats["SPD"].Max}}</p>
                                <p class="csStatBoxStat grey">MAX</p>
                            </div>									
                            <div class="csStatBox small" style="left: 120px; top: 75px; width: 40px">
                                <p class="csStatBoxVal">{{Stats["STR"].Current}}</p>
                                <p class="csStatBoxStat">STR</p>
                            </div>
                            <div class="csStatBox smaller" style="left: 168px; top: 87px; width: 30px">
                                <p class="csStatBoxVal">{{Stats["STR"].Max}}</p>
                                <p class="csStatBoxStat grey">MAX</p>
                            </div>
                        </div>
                        <div class="csStatsSection span3">
                            <div class="csStatBox" style="left: 10px; top: 35px; width: 50px">
                                <p class="csStatBoxVal">{{Stats["AGL"].Current}}</p>
                                <p class="csStatBoxStat">AGL</p>
                            </div>
                            <div class="csStatBox smaller" style="left: 68px; top: 60px; width: 30px">
                                <p class="csStatBoxVal">{{Stats["AGL"].Max}}</p>
                                <p class="csStatBoxStat grey">MAX</p>
                            </div>
                            <div class="csStatBox small" style="left: 120px; top: 10px; width: 40px">
                                <p class="csStatBoxVal">{{Stats["PRW"].Current}}</p>
                                <p class="csStatBoxStat">PRW</p>
                            </div>
                            <div class="csStatBox smaller" style="left: 168px; top: 22px; width: 30px">
                                <p class="csStatBoxVal">{{Stats["PRW"].Max}}</p>
                                <p class="csStatBoxStat grey">MAX</p>
                            </div>									
                            <div class="csStatBox small" style="left: 120px; top: 75px; width: 40px">
                                <p class="csStatBoxVal">{{Stats["POI"].Current}}</p>
                                <p class="csStatBoxStat">POI</p>
                            </div>
                            <div class="csStatBox smaller" style="left: 168px; top: 87px; width: 30px">
                                <p class="csStatBoxVal">{{Stats["POI"].Max}}</p>
                                <p class="csStatBoxStat grey">MAX</p>
                            </div>
                        </div>
                        <div class="csStatsSection span3">
                            <div class="csStatBox" style="left: 10px; top: 35px; width: 50px">
                                <p class="csStatBoxVal">{{Stats["INT"].Current}}</p>
                                <p class="csStatBoxStat">INT</p>
                            </div>
                            <div class="csStatBox smaller" style="left: 68px; top: 60px; width: 30px">
                                <p class="csStatBoxVal">{{Stats["INT"].Max}}</p>
                                <p class="csStatBoxStat grey">MAX</p>
                            </div>
                            <div class="csStatBox small" style="left: 120px; top: 10px; width: 40px">
                                <p class="csStatBoxVal">{{Stats["ARC"].Current}}</p>
                                <p class="csStatBoxStat">ARC</p>
                            </div>
                            <div class="csStatBox smaller" style="left: 168px; top: 22px; width: 30px">
                                <p class="csStatBoxVal">{{Stats["ARC"].Max}}</p>
                                <p class="csStatBoxStat grey">MAX</p>
                            </div>									
                            <div class="csStatBox small" style="left: 120px; top: 75px; width: 40px">
                                <p class="csStatBoxVal">{{Stats["PER"].Current}}</p>
                                <p class="csStatBoxStat">PER</p>
                            </div>
                            <div class="csStatBox smaller" style="left: 168px; top: 87px; width: 30px">
                                <p class="csStatBoxVal">{{Stats["PER"].Max}}</p>
                                <p class="csStatBoxStat grey">MAX</p>
                            </div>
                        </div>
                        <div style="height: 135px; position: relative; float: left">
                            <div class="csStatBox" style="left: 70px; top: 30px; width: 80px">
                                <p class="csStatBoxVal">{{Willpower}}</p>
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
                            <p class="csStatBoxVal">{{Def}}</p>
                            <p class="csStatBoxStat small"><br>TOTAL DEF</p>
                        </div>
                        <p class="csBigText" style="padding-top: 25px"><strong> = </strong></p>
                        <div class="csStatBox small" style="float: right; width: 55px; position: static">
                            <p class="csStatBoxVal">99</p>
                            <p class="csStatBoxStat small">EQUIPMENT<br>MODIFIERS</p>
                        </div>
                        <p class="csBigText" style="padding-top: 25px"><strong> + </strong></p>
                        <div class="csStatBox small" style="float: right; width: 55px; position: static">
                            <p class="csStatBoxVal">{{RaceDefMod}}</p>
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
                            <p class="csStatBoxVal">{{Arm}}</p>
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
                    <div class="csBox">
                        <p class="csBoxHead">SKILLS</p>
                        <table class="csTable table-striped">
                            <thead>
                                <tr>
                                    <th style="text-align: left; padding-left: 5px"><strong>MILITARY SKILLS</strong></th>
                                    <th class="small" style="text-align: center; width: 68px">PARENT<br>SET VALUE</th>
                                    <th style="width:10px">&#160;</th>
                                    <th class="small" style="text-align: center; width: 48px">SKILL<br>LEVEL</th>
                                    <th style="width:10px">&#160;</th>
                                    <th class="small" style="text-align: center; width: 40px">TOTAL</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr ng-repeat="Skill in MilitarySkills">
                                    <td><small>{{Skill.Name}} ({{Skill.BaseStat}})</small></td>
                                    <td><strong>{{displaySkillBase(Skill.BaseStat)}}</strong></td>
                                    <td>+</td>
                                    <td><strong>{{Skill.Level}}</strong></td>
                                    <td>=</td>
                                    <td><strong>{{Skill.Total}}</strong></td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="csTable table-striped">
                            <thead>
                                <tr>
                                    <th style="text-align: left; padding-left: 5px"><strong>OCCUPATIONAL SKILLS</strong></th>
                                    <th class="small" style="text-align: center; width: 68px">PARENT<br>SET VALUE</th>
                                    <th style="width:10px">&#160;</th>
                                    <th class="small" style="text-align: center; width: 48px">SKILL<br>LEVEL</th>
                                    <th style="width:10px">&#160;</th>
                                    <th class="small" style="text-align: center; width: 40px">TOTAL</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr ng-repeat="Skill in OccupationalSkills">
                                    <td><small>{{Skill.Name}} ({{Skill.BaseStat}})</small></td>
                                    <td><strong>{{displaySkillBase(Skill.BaseStat)}}</strong></td>
                                    <td>+</td>
                                    <td><strong>{{Skill.Level}}</strong></td>
                                    <td>=</td>
                                    <td><strong>{{Skill.Total}}</strong></td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="clear">&#160;</div>
                    </div>
                </div>
                <div class="span6">
                    <div class="csBox" style="padding: 5px">
                        <p class="csBoxHead">INITIATIVE</p>
                        <div class="csStatBox small" style="float: right; width: 55px; position: static">
                            <p class="csStatBoxVal">{{Initiative}}</p>
                            <p class="csStatBoxStat small">TOTAL<br>INITIATIVE</p>
                        </div>
                        <p class="csBigText" style="padding-top: 25px"><strong> = </strong></p>
                        <div class="csStatBox small" style="float: right; width: 57px; position: static">
                            <p class="csStatBoxVal">99</p>
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
                    <div class="csBox" style="padding: 5px">
                        <p class="csBoxHead">COMMAND</p>
                        <div class="csStatBox small" style="float: right; width: 55px; position: static">
                            <p class="csStatBoxVal">{{CmdRange}}</p>
                            <p class="csStatBoxStat small">TOTAL CMD<br>RANGE</p>
                        </div>
                        <p class="csBigText" style="padding-top: 25px"><strong> = </strong></p>
                        <div class="csStatBox small" style="float: right; width: 55px; position: static">
                            <p class="csStatBoxVal">99</p>
                            <p class="csStatBoxStat small">ABILITY<br>MODIFIERS</p>
                        </div>
                        <p class="csBigText" style="padding-top: 25px"><strong> + </strong></p>
                        <div class="csStatBox small" style="float: right; width: 55px; position: static">
                            <p class="csStatBoxVal">{{displaySkillTotal('Command','O')}}</p>
                            <p class="csStatBoxStat small">COMMAND<br>SKILL</p>
                        </div>
                        <p class="csBigText" style="padding-top: 25px"><strong> + </strong></p>
                        <p class="csBigText"><strong>INT<br>STAT</strong></p>
                        <div class="clear">&#160;</div>
                    </div>
                    <div class="csBox">
                        <div class="csBoxHead">BENIFITS AND ABILITIES</div>
                        <table class="csTable table-striped">
                            <thead>
                                <tr>
                                    <th class="small" style="text-align: left">NAME</th>
                                    <th class="small">DESCRIPTION/NOTES</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>&#160;</td>
                                    <td>&#160;</td>
                                </tr>
                            </tbody>
                        </table>
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
            <div class="modal hide fade" id="editXP">
                <form ng-submit="editXP()" onsubmit="javascript:$('#editXP').modal('hide')">
                    <div class="modal-body">
                        <div class="csBox">
                            <div class="csBoxHead">EDIT XP</div>
                            <p class="csInputBox control-group">
                                <input type="text" name="SkillName" id="SkillName" style="width: 260px" ng-model="NewSkillName" required><br>
                                <label class="control-label" for="SkillName"><strong class="small">SKILL NAME</strong></label>
                            </p>
                            <p class="csInputBox control-group">
                                <select name="BaseStat" id="BaseStat" style="width: 90px" ng-model="NewSkillBaseStat" required>
                                    <option value="PHY">PHY</option>
                                    <option value="SPD">SPD</option>
                                    <option value="STR">STR</option>
                                    <option value="AGL">AGL</option>
                                    <option value="PRW">PRW</option>
                                    <option value="POI">POI</option>
                                    <option value="INT">INT</option>
                                    <option value="ARC">ARC</option>
                                    <option value="PER">PER</option>
                                    <option value="Social">Social</option>
                                </select><br>
                                <label class="control-label" for="BaseStat"><strong class="small">BASE STAT</strong></label>
                            </p>
                            <p class="csInputBox control-group">
                                <input type="text" name="Level" id="Level" style="text-align: center; width: 30px" maxlength="2" ng-model="NewSkillLevel" required><br>
                                <label class="control-label" for="Level"><strong class="small">LEVEL</strong></label>
                            </p>
                            <div class="clear">&#160;</div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn" data-dismiss="modal">Cancel</button>
                        <button type="submit" class="btn btn-primary">Add</button>
                    </div>
                </form>
            </div>
        </div>
<?php include($_SERVER['DOCUMENT_ROOT'] . '/phpincludes/footer.php'); ?>