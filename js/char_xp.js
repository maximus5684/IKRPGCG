function XPManCtrl($scope, $http) {

    /////////////////////////////////////////////////////////////////////
    /////                                                           /////
    /////       Initial Values                                      /////
    /////                                                           /////
    /////////////////////////////////////////////////////////////////////
    
    // Character Values
    $scope.CharUrl = 'ajax/characters.php';
    $scope.Error = null;
    $scope.CharacterID = null;
    $scope.Character = null;
    $scope.Archetype = null;
    $scope.Race = null;
    $scope.Career1 = null;
    $scope.Career2 = null;
    $scope.Career3 = null;
    $scope.Career4 = null;
    $scope.Level = 'Hero';
    $scope.Stats =
    {
        PHY: { Current: 0 },
        SPD: { Current: 0 },
        STR: { Current: 0 },
        AGL: { Current: 0 },
        PRW: { Current: 0 },
        POI: { Current: 0 },
        INT: { Current: 0 },
        ARC: { Current: 0 },
        PER: { Current: 0 }
    };
    $scope.CurrentXPEdit = null;
    $scope.HasXPOptions = false;
    $scope.XPOptionsList = [];
    $scope.XPOptionSelected = null;
    $scope.XPOptions = [];
    $scope.SomethingChanged = false;

    /////////////////////////////////////////////////////////////////////
    /////                                                           /////
    /////       Lookup Arrays/Objects                               /////
    /////                                                           /////
    /////////////////////////////////////////////////////////////////////

    $scope.Races = raceArr; // In races.js
    $scope.Archetypes = archArr; // In archetypes.js
    $scope.Careers = careerArr; // In careers.js
    $scope.Abilities = abilArr; // In abilities.js
    $scope.Spells = spellsArr; // In spells.js
    $scope.Languages = langArr; // In languages.js
    $scope.XPAdvances = xpAdvArr; // In xp_advances.js

    $scope.MilitarySkills = milSkillsArr; // from skills.js
    $scope.OccupationalSkills = occSkillsArr; // from skills.js
    $scope.GeneralSkills = genSkillsArr; // from skills.js

    /////////////////////////////////////////////////////////////////////
    /////                                                           /////
    /////       Public/Scope Functions                              /////
    /////                                                           /////
    /////////////////////////////////////////////////////////////////////

    $scope.GetChar = function(CharID) {
        $scope.CharacterID = CharID;

        $http.post($scope.CharUrl, { ReqType: 'GetChar', CharacterID: CharID }).success(function(data, status) {
            if (typeof data !== 'object') {
                $scope.Error = data;
            } else {
                $scope.CharacterRow = data;
                $scope.Character = JSON.parse($scope.CharacterRow.CharacterJSON);
                $scope.loadCharacterDefaults();
            }
        }).error(function(data, status) {
            if (data !== null) {
                $scope.Error = data;
            } else {
                $scope.Error = 'Request failed. Status: ' + status;
            }
        });
    }

    $scope.loadCharacterDefaults = function() {
        if (!('XPAdvances' in $scope.Character)) {
            $scope.Character.XPAdvances = []; 
        }

        $scope.Level = $scope.xpLevel($scope.Character.XP);

        for (var i = 0; i < $scope.Races.length; i++) {
            if ($scope.Character.Race == $scope.Races[i].Name) {
                $scope.Race = $scope.Races[i];
            }
        }

        for (var i = 0; i < $scope.Archetypes.length; i++) {
            if ($scope.Character.Archetype == $scope.Archetypes[i].Name) {
                $scope.Archetype = $scope.Archetypes[i];
            }
        }

        for (var i = 0; i < $scope.Careers.length; i++) {
            if ($scope.Character.Career1 == $scope.Careers[i].Name) {
                $scope.Career1 = $scope.Careers[i];
            }

            if ($scope.Character.Career2 == $scope.Careers[i].Name) {
                $scope.Career2 = $scope.Careers[i];
            }
        }

        // Load basic stats for current level.
        $scope.Stats.PHY.Current = $scope.Race.Stats.PHY.Starting;
        $scope.Stats.SPD.Current = $scope.Race.Stats.SPD.Starting;
        $scope.Stats.STR.Current = $scope.Race.Stats.STR.Starting;
        $scope.Stats.AGL.Current = $scope.Race.Stats.AGL.Starting;
        $scope.Stats.PRW.Current = $scope.Race.Stats.PRW.Starting;
        $scope.Stats.POI.Current = $scope.Race.Stats.POI.Starting;
        $scope.Stats.INT.Current = $scope.Race.Stats.INT.Starting;

        if ($scope.Archetype.Name == 'Gifted') {
            if ($scope.Character.ArcaneTradition == 'Focuser') {
                $scope.Stats.ARC.Current = 2;
            } else if ($scope.Character.ArcaneTradition == 'Will Weaver') {
                $scope.Stats.ARC.Current = 3;
            }
        } else {
            $scope.Stats.ARC.Current = '-';
        }

        $scope.Stats.PER.Current = $scope.Race.Stats.PER.Starting;

        // If race grants stat increases, add them.
        if ('StatIncreases' in $scope.Race) {
            for (var i = 0; i < $scope.Race.StatIncreases.length; i++) {
                $scope.Stats[$scope.Race.StatIncreases[i][0]].Current += $scope.Race.StatIncreases[i][1];
            }
        }

        // If race grants choseable stat increases add them.
        if ('RacialStatIncreaseChosen' in $scope.Character) {
            $scope.Stats[$scope.Character.RacialStatIncreaseChosen].Current += 1;
        }

        // If careers grant stat increases add them.
        if ('StatIncreases' in $scope.Career1) {
            for (var i = 0; i < $scope.Career1.StatIncreases.length; i++) {
                $scope.Stats[$scope.Career1.StatIncreases[i][0]].Current += $scope.Career1.StatIncreases[i][1];
            }
        }

        if ('StatIncreases' in $scope.Career2) {
            for (var i = 0; i < $scope.Career2.StatIncreases.length; i++) {
                $scope.Stats[$scope.Career2.StatIncreases[i][0]].Current += $scope.Career2.StatIncreases[i][1];
            }
        }

        // Add advancement points.
        $scope.Stats[$scope.Character.AP1Stat].Current += 1;
        $scope.Stats[$scope.Character.AP2Stat].Current += 1;
        $scope.Stats[$scope.Character.AP3Stat].Current += 1;
    }

    $scope.xpLevel = function(xp) {
        if (xp <= 49) {
            return 'Hero';
        } else if (xp <= 99) {
            return 'Veteran';
        } else if (xp > 99) {
            return 'Epic';
        }
    }

    $scope.displayAdvanceChoices = function(advance) {
        var advText = '';

        for (var i = 0; i < advance.Options.length; i++) {
            if (advText != '') {
                advText += ' or ';
            }

            for (var i1 = 0; i1 < advance.Options[i].length; i1++) {
                if (i1 > 0) {
                    advText += ' and ';
                }

                switch (advance.Options[i][i1][0]) {
                    case 'Careers':
                        advText += '+' + String(advance.Options[i][i1][1]) + ' Career';
                        break;
                    case 'OccupationalSkills':
                        advText += '+' + String(advance.Options[i][i1][1]) + ' Occupational Skill';
                        break;
                    case 'Spells':
                        if ($scope.Character !== null && $scope.Character.Archetype == 'Gifted') {
                            advText += '+' + String(advance.Options[i][i1][1]) + ' Spell';
                        }

                        break;
                    case 'Abilities':
                        advText += '+' + String(advance.Options[i][i1][1]) + ' Ability';
                        break;
                    case 'Connections':
                        advText += '+' + String(advance.Options[i][i1][1]) + ' Connection';
                        break;
                    case 'MilitarySkills':
                        advText += '+' + String(advance.Options[i][i1][1]) + ' Military Skill';
                        break;
                    case 'Stats':
                        advText += '+' + String(advance.Options[i][i1][1]) + ' Stat';
                        break;
                    case 'ArchetypeBenefits':
                        advText += '+' + String(advance.Options[i][i1][1]) + ' Archetype Benefit';
                }

                if (advance.Options[i][i1][1] > 1) {
                    if (advText.charAt(advText.length - 1) == 'y') {
                        advText = advText.substr(0, advText.length - 2);
                        advText += 'ie';
                    }

                    advText += 's';
                }
            }
        }

        return advText;
    }

    $scope.changeXP = function() {
        $scope.SomethingChanged = true;
    }

    $('input#XP').keyup(function() {
        if ($(this).val() == '') {
            $(this).val(0);
            $scope.Character.XP = 0;
        } else if (parseInt($(this).val()) > 150) {
            $(this).val(150);
            $scope.Character.XP = 150;
        } else if (parseInt($(this).val()) < 0) {
            $(this).val(0);
            $scope.Character.XP = 0;
        }
    });
    
    $scope.checkXPRow = function(xp) {
        if ($scope.Character === null || $scope.Character.XP < xp) {
            return false;
        } else {
            var nextAdvanceXP = getNextAdvanceXP();

            if ((xp - nextAdvanceXP) < 10) {
                if (xp <= nextAdvanceXP) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
    }

    $scope.checkXPAdvCurOrNext = function(xp) {
        if ($scope.Character === null) {
            return false;
        } else {
            var lastAdvanceXP = getLastAdvanceXP();

            if ((xp - lastAdvanceXP) < 10) {
                var nextAdvanceXP = getNextAdvanceXP();

                if (xp == lastAdvanceXP || xp == nextAdvanceXP) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
    }

    $scope.checkXPAdvance = function(xp) {
        if ($scope.Character !== null) {
            var found = false;

            for (var i = 0; i < $scope.Character.XPAdvances.length; i++) {
                if (xp == $scope.Character.XPAdvances[i].XP) {
                    found = true;
                }
            }

            return found;
        } else {
            return false;
        }
    }

    $scope.clickAddAdvance = function(xp) {
        $scope.CurrentXPEdit = xp;
        $scope.HasXPOptions = false;
        $scope.XPOptionsList = [];
        $scope.XPOptionSelected = null;
        $scope.XPOptions = [];

        var advance = null;

        for (var i = 0; i < $scope.XPAdvances.length; i++) {
            if ($scope.XPAdvances[i].XP == xp) {
                advance = $scope.XPAdvances[i];
            }
        }

        // Create the options list (if there is more than 1 option).
        if (advance.Options.length > 1) {
            for (var i = 0; i < advance.Options.length; i++) {
                var advText = '';

                for (var i1 = 0; i1 < advance.Options[i].length; i1++) {
                    if (i1 > 0) {
                        advText += ' and ';
                    }

                    switch (advance.Options[i][i1][0]) {
                        case 'Careers':
                            advText += '+' + String(advance.Options[i][i1][1]) + ' Career';
                            break;
                        case 'OccupationalSkills':
                            advText += '+' + String(advance.Options[i][i1][1]) + ' Occupational Skill';
                            break;
                        case 'Spells':
                            if ($scope.Character.Archetype == 'Gifted') {
                                advText += '+' + String(advance.Options[i][i1][1]) + ' Spell';
                            }

                            break;
                        case 'Abilities':
                            advText += '+' + String(advance.Options[i][i1][1]) + ' Ability';
                            break;
                        case 'Connections':
                            advText += '+' + String(advance.Options[i][i1][1]) + ' Connection';
                            break;
                        case 'MilitarySkills':
                            advText += '+' + String(advance.Options[i][i1][1]) + ' Military Skill';
                            break;
                        case 'Stats':
                            advText += '+' + String(advance.Options[i][i1][1]) + ' Stat';
                            break;
                        case 'ArchetypeBenefits':
                            advText += '+' + String(advance.Options[i][i1][1]) + ' Archetype Benefit';
                    }

                    if (advance.Options[i][i1][1] > 1) {
                        if (advText.charAt(advText.length - 1) == 'y') {
                            advText = advText.substr(0, advText.length - 2);
                            advText += 'ie';
                        }

                        advText += 's';
                    }
                }

                if (advText != '') {
                    $scope.XPOptionsList.push(advText);
                }
            }

            $scope.HasXPOptions = true;
        }

        //Create the options array.
        for (var i = 0; i < advance.Options.length; i++) {
            var tempOption = { Selected: true, Choices: [] };

            if ($scope.HasXPOptions) {
                tempOption.Selected = false;
            }

            // Loop for the number of choices in each option.
            for (var i1 = 0; i1 < advance.Options[i].length; i1++) {
                // Loop for the number of multiples of each choice.
                for (var i2 = 0; i2 < advance.Options[i][i1][1]; i2++) {
                    var tempChoice = { Type: advance.Options[i][i1][0], Label: '', ChoicesList: [], Selected: null, Property: '' };
                    var maxSkillLevel = 0;

                    if (xp <= 49) {
                        maxSkillLevel = 2;
                    } else if (xp <= 99) {
                        maxSkillLevel = 3;
                    } else if (xp > 99) {
                        maxSkillLevel = 4;
                    }

                    switch (advance.Options[i][i1][0]) {
                        case 'Careers':
                            tempChoice.Label = 'Career';
                            
                            for (var i3 = 0; i3 < $scope.Careers.length; i3++) {
                                var found = false;
                                var prereqsMet = true;

                                if ($scope.Career1.Name == $scope.Careers[i3].Name) {
                                    found = true;
                                }

                                if ($scope.Career2.Name == $scope.Careers[i3].Name) {
                                    found = true;
                                }

                                if ($scope.Career3 !== null && $scope.Career3.Name == $scope.Careers[i3].Name) {
                                    found = true;
                                }

                                if ($scope.Careers[i3].StartingCareerOnly) {
                                    prereqsMet = false;
                                }

                                if ('ReqArchetype' in $scope.Careers[i3] && $scope.Careers[i3].ReqArchetype != $scope.Character.Archetype) {
                                    prereqsMet = false;
                                }

                                if ('ReqRaces' in $scope.Careers[i3]) {
                                    var raceFound = false;

                                    for (var i4 = 0; i4 < $scope.Careers[i3].ReqRaces.length; i4++) {
                                        if ($scope.Race.Name == $scope.Careers[i3].ReqRaces[i4]) {
                                            raceFound = true;
                                        }
                                    }

                                    if (!raceFound) {
                                        prereqsMet = false;
                                    }
                                }

                                if (!found && prereqsMet) {
                                    tempChoice.ChoicesList.push({ Name: $scope.Careers[i3].Name });
                                }
                            }
                            break;
                        case 'OccupationalSkills':
                            tempChoice.Label = 'Occupational Skill';

                            for (var i3 = 0; i3 < $scope.Career1.OccupationalSkills.length; i3++) {
                                if ($scope.Career1.OccupationalSkills[i3].Name == 'General Skills') {
                                    for (var i4 = 0; i4 < $scope.GeneralSkills.length; i4++) {
                                        var curLevel = getOccupationalSkillLevel($scope.GeneralSkills[i4].Name);

                                        if ((curLevel + 1) <= $scope.Career1.OccupationalSkills[i3].Level && (curLevel +1) <= maxSkillLevel) {
                                            tempChoice.ChoicesList.push($scope.GeneralSkills[i4]);
                                        }
                                    }
                                } else {
                                    var curLevel = getOccupationalSkillLevel($scope.Career1.OccupationalSkills[i3].Name);

                                    if ((curLevel + 1) <= $scope.Career1.OccupationalSkills[i3].Level && (curLevel +1) <= maxSkillLevel) {
                                        tempChoice.ChoicesList.push($scope.Career1.OccupationalSkills[i3]);
                                    }
                                }
                            }

                            for (var i3 = 0; i3 < $scope.Career2.OccupationalSkills.length; i3++) {
                                if ($scope.Career2.OccupationalSkills[i3].Name == 'General Skills') {
                                    for (var i4 = 0; i4 < $scope.GeneralSkills.length; i4++) {
                                        var found = false;

                                        for (var i5 = 0; i5 < tempChoice.ChoicesList.length; i5++) {
                                            if ($scope.GeneralSkills[i4].Name == tempChoice.ChoicesList[i5].Name) {
                                                found = true;
                                            }
                                        }

                                        if (!found) {
                                            var curLevel = getOccupationalSkillLevel($scope.GeneralSkills[i4].Name);

                                            if ((curLevel + 1) <= $scope.Career2.OccupationalSkills[i3].Level && (curLevel +1) <= maxSkillLevel) {
                                                tempChoice.ChoicesList.push($scope.GeneralSkills[i4]);
                                            }
                                        }
                                    }
                                } else {
                                    var found = false;
                                    
                                    for (var i4 = 0; i4 < tempChoice.ChoicesList.length; i4++) {
                                        if ($scope.Career2.OccupationalSkills[i3].Name == tempChoice.ChoicesList[i4].Name) {
                                            found = true;
                                        }
                                    }

                                    if (!found) {
                                        var curLevel = getOccupationalSkillLevel($scope.Career2.OccupationalSkills[i3].Name);

                                        if ((curLevel + 1) <= $scope.Career2.OccupationalSkills[i3].Level && (curLevel +1) <= maxSkillLevel) {
                                            tempChoice.ChoicesList.push($scope.Career2.OccupationalSkills[i3]);
                                        }
                                    }
                                }
                            }

                            if ($scope.Career3 !== null) {
                                if ($scope.Career3.OccupationalSkills[i3].Name == 'General Skills') {
                                    for (var i4 = 0; i4 < $scope.GeneralSkills.length; i4++) {
                                        var found = false;

                                        for (var i5 = 0; i5 < tempChoice.ChoicesList.length; i5++) {
                                            if ($scope.GeneralSkills[i4].Name == tempChoice.ChoicesList[i5].Name) {
                                                found = true;
                                            }
                                        }

                                        if (!found) {
                                            var curLevel = getOccupationalSkillLevel($scope.GeneralSkills[i4].Name);

                                            if ((curLevel + 1) <= $scope.Career3.OccupationalSkills[i3].Level && (curLevel +1) <= maxSkillLevel) {
                                                tempChoice.ChoicesList.push($scope.GeneralSkills[i4]);
                                            }
                                        }
                                    }
                                } else {
                                    for (var i3 = 0; i3 < $scope.Career3.OccupationalSkills.length; i3++) {
                                        var found = false;
                                        
                                        for (var i4 = 0; i4 < tempChoice.ChoicesList.length; i4++) {
                                            if ($scope.Career3.OccupationalSkills[i3].Name == tempChoice.ChoicesList[i4].Name) {
                                                found = true;
                                            }
                                        }

                                        if (!found) {
                                            var curLevel = getOccupationalSkillLevel($scope.Career3.OccupationalSkills[i3].Name);

                                            if ((curLevel + 1) <= $scope.Career3.OccupationalSkills[i3].Level && (curLevel +1) <= maxSkillLevel) {
                                                tempChoice.ChoicesList.push($scope.Career3.OccupationalSkills[i3]);
                                            }
                                        }
                                    }
                                }
                            }

                            if ($scope.Career4 !== null) {
                                if ($scope.Career4.OccupationalSkills[i3].Name == 'General Skills') {
                                    for (var i4 = 0; i4 < $scope.GeneralSkills.length; i4++) {
                                        var found = false;

                                        for (var i5 = 0; i5 < tempChoice.ChoicesList.length; i5++) {
                                            if ($scope.GeneralSkills[i4].Name == tempChoice.ChoicesList[i5].Name) {
                                                found = true;
                                            }
                                        }

                                        if (!found) {
                                            var curLevel = getOccupationalSkillLevel($scope.GeneralSkills[i4].Name);

                                            if ((curLevel + 1) <= $scope.Career4.OccupationalSkills[i3].Level && (curLevel +1) <= maxSkillLevel) {
                                                tempChoice.ChoicesList.push($scope.GeneralSkills[i4]);
                                            }
                                        }
                                    }
                                } else {
                                    for (var i3 = 0; i3 < $scope.Career4.OccupationalSkills.length; i3++) {
                                        var found = false;
                                        
                                        for (var i4 = 0; i4 < tempChoice.ChoicesList.length; i4++) {
                                            if ($scope.Career4.OccupationalSkills[i3].Name == tempChoice.ChoicesList[i4].Name) {
                                                found = true;
                                            }
                                        }

                                        if (!found) {
                                            var curLevel = getOccupationalSkillLevel($scope.Career4.OccupationalSkills[i3].Name);

                                            if ((curLevel + 1) <= $scope.Career4.OccupationalSkills[i3].Level && (curLevel +1) <= maxSkillLevel) {
                                                tempChoice.ChoicesList.push($scope.Career4.OccupationalSkills[i3]);
                                            }
                                        }
                                    }
                                }
                            }

                            // TODO: Find a way to do this in the DDL rather than here.
                            //for (var i3 = 0; i3 < tempChoice.ChoicesList.length; i3++) {
                            //    if ('Type' in tempChoice.ChoicesList[i3]) {
                            //        if (tempChoice.ChoicesList[i3].Type == 'Specific') {
                            //            tempChoice.ChoicesList[i3].Name += ' (' + tempChoice.ChoicesList[i3].Property + ')';
                            //        }
                            //    }
                            //}

                            tempChoice.ChoicesList.sort(byName);
                            
                            break;
                        case 'Spells':
                            tempChoice.Label = 'Spell';

                            if ('SpellList' in $scope.Career1) {
                                for (var i3 = 0; i3 < $scope.Career1.SpellList.length; i3++) {
                                    tempChoice.ChoicesList.push({ Name: $scope.Career1.SpellList[i3] });
                                }
                            }

                            if ('SpellList' in $scope.Career2) {
                                for (var i3 = 0; i3 < $scope.Career2.SpellList.length; i3++) {
                                    var found = false;

                                    for (i4 = 0; i4 < tempChoice.ChoicesList.length; i4++) {
                                        if ($scope.Career2.SpellList[i3] == tempChoice.ChoicesList[i4]) {
                                            found = true;
                                        }
                                    }

                                    if (!found) {
                                        tempChoice.ChoicesList.push({ Name: $scope.Career2.SpellList[i3] });
                                    }
                                }
                            }

                            if ($scope.Career3 !== null && 'SpellList' in $scope.Career3) {
                                for (var i3 = 0; i3 < $scope.Career3.SpellList.length; i3++) {
                                    var found = false;

                                    for (i4 = 0; i4 < tempChoice.ChoicesList.length; i4++) {
                                        if ($scope.Career3.SpellList[i3] == tempChoice.ChoiceList[i4]) {
                                            found = true;
                                        }
                                    }

                                    if (!found) {
                                        tempChoice.ChoicesList.push({ Name: $scope.Career3.SpellList[i3] });
                                    }
                                }
                            }

                            if ($scope.Career4 !== null && 'SpellList' in $scope.Career4) {
                                for (var i3 = 0; i3 < $scope.Career4.SpellList.length; i3++) {
                                    var found = false;

                                    for (i4 = 0; i4 < tempChoice.ChoicesList.length; i4++) {
                                        if ($scope.Career4.SpellList[i3] == tempChoice.ChoiceList[i4]) {
                                            found = true;
                                        }
                                    }

                                    if (!found) {
                                        tempChoice.ChoicesList.push({ Name: $scope.Career4.SpellList[i3] });
                                    }
                                }
                            }

                            tempChoice.ChoicesList.sort(byName);

                            break;
                        case 'Abilities':
                            tempChoice.Label = 'Ability';
                            tempChoice.ChoicesList = getAbilities();
                            break;
                        case 'Connections':
                            tempChoice.Label = 'Connection';
                            
                            if ('Connections' in $scope.Career1) {
                                for (var i3 = 0; i3 < $scope.Career1.Connections.length; i3++) {
                                    if ($scope.Career1.Connections[i3].Type != 'Specific') {
                                        $scope.Career1.Connections[i3].Property = null;
                                    }

                                    tempChoice.ChoicesList.push($scope.Career1.Connections[i3]);
                                }
                            }

                            if ('Connections' in $scope.Career2) {
                                for (var i3 = 0; i3 < $scope.Career2.Connections.length; i3++) {
                                    var found = false;

                                    for (var i4 = 0; i4 < tempChoice.ChoicesList.length; i4++) {
                                        if ($scope.Career2.Connections[i3].Name == tempChoice.ChoicesList[i4].Name) {
                                            found = true;
                                        }
                                    }

                                    if (!found) {
                                        if ($scope.Career2.Connections[i3].Type != 'Specific') {
                                            $scope.Career2.Connections[i3].Property = null;
                                        }

                                        tempChoice.ChoicesList.push($scope.Career2.Connections[i3]);
                                    }
                                }
                            }

                            if ($scope.Career3 !== null) {
                                if ('Connections' in $scope.Career3) {
                                    for (var i3 = 0; i3 < $scope.Career3.Connections.length; i3++) {
                                        var found = false;

                                        for (var i4 = 0; i4 < tempChoice.ChoicesList.length; i4++) {
                                            if ($scope.Career3.Connections[i3].Name == tempChoice.ChoicesList[i4].Name) {
                                                found = true;
                                            }
                                        }

                                        if (!found) {
                                            if ($scope.Career3.Connections[i3].Type != 'Specific') {
                                                $scope.Career3.Connections[i3].Property = null;
                                            }

                                            tempChoice.ChoicesList.push($scope.Career3.Connections[i3]);
                                        }
                                    }
                                }
                            }

                            if ($scope.Career4 !== null) {
                                if ('Connections' in $scope.Career4) {
                                    for (var i3 = 0; i3 < $scope.Career4.Connections.length; i3++) {
                                        var found = false;

                                        for (var i4 = 0; i4 < tempChoice.ChoicesList.length; i4++) {
                                            if ($scope.Career4.Connections[i3].Name == tempChoice.ChoicesList[i4].Name) {
                                                found = true;
                                            }
                                        }

                                        if (!found) {
                                            if ($scope.Career4.Connections[i3].Type != 'Specific') {
                                                $scope.Career4.Connections[i3].Property = null;
                                            }

                                            tempChoice.ChoicesList.push($scope.Career4.Connections[i3]);
                                        }
                                    }
                                }
                            }

                            tempChoice.ChoicesList.sort(byName);

                            break;
                        case 'MilitarySkills':
                            tempChoice.Label = 'Military Skill';

                            for (var i3 = 0; i3 < $scope.Career1.MilitarySkills.length; i3++) {
                                var curLevel = getMilitarySkillLevel($scope.Career1.MilitarySkills[i3].Name);

                                if ((curLevel + 1) <= $scope.Career1.MilitarySkills[i3].Level && (curLevel + 1) <= maxSkillLevel) {
                                    tempChoice.ChoicesList.push($scope.Career1.MilitarySkills[i3]);
                                }
                            }

                            for (var i3 = 0; i3 < $scope.Career2.MilitarySkills.length; i3++) {
                                var found = false;
                                
                                for (var i4 = 0; i4 < tempChoice.ChoicesList.length; i4++) {
                                    if ($scope.Career2.MilitarySkills[i3].Name == tempChoice.ChoicesList[i4].Name) {
                                        found = true;
                                    }
                                }

                                if (!found) {
                                    var curLevel = getMilitarySkillLevel($scope.Career2.MilitarySkills[i3].Name);

                                    if ((curLevel +1) <= $scope.Career2.MilitarySkills[i3].Level && (curLevel +1) <= maxSkillLevel) {
                                        tempChoice.ChoicesList.push($scope.Career2.MilitarySkills[i3]);
                                    }
                                }
                            }

                            if ($scope.Career3 !== null) {
                                for (var i3 = 0; i3 < $scope.Career3.MilitarySkills.length; i3++) {
                                    var found = false;
                                    
                                    for (var i4 = 0; i4 < tempChoice.ChoicesList.length; i4++) {
                                        if ($scope.Career3.MilitarySkills[i3].Name == tempChoice.ChoicesList[i4].Name) {
                                            found = true;
                                        }
                                    }

                                    if (!found) {
                                        var curLevel = getMilitarySkillLevel($scope.Career3.MilitarySkills[i3].Name);

                                        if ((curLevel +1) <= $scope.Career3.MilitarySkills[i3].Level && (curLevel +1) <= maxSkillLevel) {
                                            tempChoice.ChoicesList.push($scope.Career3.MilitarySkills[i3]);
                                        }
                                    }
                                }
                            }

                            if ($scope.Career4 !== null) {
                                for (var i3 = 0; i3 < $scope.Career4.MilitarySkills.length; i3++) {
                                    var found = false;
                                    
                                    for (var i4 = 0; i4 < tempChoice.ChoicesList.length; i4++) {
                                        if ($scope.Career4.MilitarySkills[i3].Name == tempChoice.ChoicesList[i4].Name) {
                                            found = true;
                                        }
                                    }

                                    if (!found) {
                                        var curLevel = getMilitarySkillLevel($scope.Career4.MilitarySkills[i3].Name);

                                        if ((curLevel +1) <= $scope.Career4.MilitarySkills[i3].Level && (curLevel +1) <= maxSkillLevel) {
                                            tempChoice.ChoicesList.push($scope.Career4.MilitarySkills[i3]);
                                        }
                                    }
                                }
                            }

                            tempChoice.ChoicesList.sort(byName);
                            break;
                        case 'ArchetypeBenefits':
                            tempChoice.Label = 'Archetype Benefit';

                            for (var i3 = 0; i3 < $scope.Archetype.Benefits.length; i3++) {
                                var found = false;

                                for (var i4 = 0; i4 < $scope.Character.Benefits.length; i4++) {
                                    if ($scope.Character.Benefits[i4].Name == $scope.Archetype.Benefits[i3].Name) {
                                        if (!('HasProperty' in $scope.Archetype.Benefits[i3])) {
                                            found = true;
                                        }
                                    }
                                }

                                if (!found) {
                                    tempBenefit = $scope.Archetype.Benefits[i3];
                                    
                                    if ('HasProperty' in tempBenefit) {
                                        tempBenefit.Property = null;
                                        
                                        if ('PropertyType' in tempBenefit) {
                                            tempBenefit.PropertyList = getPropertyList(tempBenefit.PropertyType);
                                        }
                                    }

                                    tempChoice.ChoicesList.push(tempBenefit);
                                }
                            }

                            break;
                        case 'Stats':
                            tempChoice.Label = 'Stat';

                            if ($scope.Stats.PHY.Current + 1 <= getStatMax('PHY', xp)) {
                                tempChoice.ChoicesList.push({ Name: 'PHY' });
                            }

                            if ($scope.Stats.SPD.Current + 1 <= getStatMax('SPD', xp)) {
                                tempChoice.ChoicesList.push({ Name: 'SPD' });
                            }

                            if ($scope.Stats.STR.Current + 1 <= getStatMax('STR', xp)) {
                                tempChoice.ChoicesList.push({ Name: 'STR' });
                            }

                            if ($scope.Stats.AGL.Current + 1 <= getStatMax('AGL', xp)) {
                                tempChoice.ChoicesList.push({ Name: 'AGL' });
                            }

                            if ($scope.Stats.PRW.Current + 1 <= getStatMax('PRW', xp)) {
                                tempChoice.ChoicesList.push({ Name: 'PRW' });
                            }

                            if ($scope.Stats.POI.Current + 1 <= getStatMax('POI', xp)) {
                                tempChoice.ChoicesList.push({ Name: 'POI' });
                            }

                            if ($scope.Stats.INT.Current + 1 <= getStatMax('INT', xp)) {
                                tempChoice.ChoicesList.push({ Name: 'INT' });
                            }

                            if ($scope.Character.Archetype == 'Gifted') {
                                if ($scope.Stats.ARC.Current + 1 <= getStatMax('ARC', xp)) {
                                    tempChoice.ChoicesList.push({ Name: 'ARC' });
                                }
                            }

                            if ($scope.Stats.PER.Current + 1 <= getStatMax('PER', xp)) {
                                tempChoice.ChoicesList.push({ Name: 'PER' });
                            }

                            break;
                    }

                    if (tempChoice.Label == 'Spell') {
                        if ($scope.Character.Archetype == 'Gifted') {
                            tempOption.Choices.push(tempChoice);
                        }
                    } else {
                        tempOption.Choices.push(tempChoice);
                    }
                }
            }

            if (tempOption.Choices.length > 0) {
                $scope.XPOptions.push(tempOption);
            }
        }

        // Activate the modal dialog.
        $('#advEdit').modal();
    }

    $scope.selectXPOption = function() {
        for (var i = 0; i < $scope.XPOptions.length; i++) {
            $scope.XPOptions[i].Selected = false;
            
            for (var i1 = 0; i1 < $scope.XPOptions[i].Choices.length; i1++) {
                $scope.XPOptions[i].Choices[i1].Selected = null;

                if ('Property' in $scope.XPOptions[i].Choices[i1]) {
                    $scope.XPOptions[i].Choices[i1].Property = null;
                }

                for (var i2 = 0; i2 < $scope.XPOptions[i].Choices[i1].ChoicesList.length; i2++) {
                    if ('Property' in $scope.XPOptions[i].Choices[i1].ChoicesList[i2]) {
                        $scope.XPOptions[i].Choices[i1].ChoicesList[i2].Property = null;
                    }
                }
            }
        }

        if ($scope.XPOptionSelected !== null) {
            var selectedIndex = $scope.XPOptionsList.indexOf($scope.XPOptionSelected);
            $scope.XPOptions[selectedIndex].Selected = true;
        }
    }

    $scope.selectXPChoice = function(iOption, iChoice) {
        var choice = $scope.XPOptions[iOption].Choices[iChoice];

        if ('Property' in choice) {
            choice.Property = null;
        }

        for (var i = 0; i < choice.ChoicesList.length; i++) {
            if ('Property' in choice.ChoicesList[i]) {
                choice.ChoicesList[i].Property = null;
            }
        }
    }

    $scope.checkChoiceForTextProperty = function(choice) {
        if (choice === null) {
            return false;
        } else {
            if ('Property' in choice) {
                if ('PropertyType' in choice) {
                    return false;
                } else if ('Type' in choice) {
                    if (choice.Type == 'Specific') {
                        return false;
                    } else {
                        return true;
                    }
                } else {
                    return true;
                }
            } else {
                return false;
            }
        }
    }

    $scope.checkChoiceForDDLProperty = function(choice) {
        if (choice == null) {
            return false;
        } else {
            if ('HasProperty' in choice) {
                if ('PropertyType' in choice) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
    }

    $scope.clearXPEdit = function() {
        $scope.CurrentXPEdit = null;
    }

    $scope.submitAdvChange = function() {
        if ($scope.CurrentXPEdit = getLastAdvanceXP()) {
            $scope.Character.XPAdvances.pop();
        }
        
        // TODO: Finish building advance and add to Character.XPAdvances.
        var tempAdvance = { XP: $scope.CurrentXPEdit, AdvanceParts: [] };

        for (var i = 0; i < $scope.XPOptions.length; i++) {
            if ($scope.XPOptions[i].Selected) {
                switch ($scope.XPOptions[i].Type) {
                    case 'Careers:
                        break;
                    case 'OccupationalSkills':
                        break;
                    case 'Spells':
                        break;
                    case 'Abilities':
                        break;
                    case 'Connections':
                        break;
                    case 'MilitarySkills':
                        break;
                    case 'Stats':
                        break;
                    case 'ArchetypeBenefits':
                        break;
                }
            }
        }

        $scope.CurrentXPEdit = null;
    }

    $scope.cancelConfirm = function() {
        if ($scope.SomethingChanged) {
            $('#cancelConfirm').modal();
        } else {
            $scope.returnToSheet();
        }
    }

    $scope.returnToSheet = function() {
        $scope.SomethingChanged = false;
        window.location = '/character_sheet.php?CharacterID=' + $scope.CharacterID;
    }

    /////////////////////////////////////////////////////////////////////
    /////                                                           /////
    /////       Private Functions                                   /////
    /////                                                           /////
    /////////////////////////////////////////////////////////////////////

    function getLastAdvanceXP() {
        var lastAdvXP = 0;

        if ($scope.Character.XPAdvances.length > 0) {
            lastAdvXP = $scope.Character.XPAdvances[$scope.Character.XPAdvances.length - 1].XP;
        }

        return lastAdvXP;
    }

    function getNextAdvanceXP() {
        var lastAdvanceXP = getLastAdvanceXP();
        var nextAdvanceXP = 0;
        var curAdvIndex = -1;

        for (var i = 0; i < $scope.XPAdvances.length; i++) {
            if ($scope.XPAdvances[i].XP == lastAdvanceXP) {
                curAdvIndex = i;
                break;
            }
        }

        if ((curAdvIndex + 1) < $scope.XPAdvances.length) {
            nextAdvanceXP = $scope.XPAdvances[curAdvIndex + 1].XP;
        } else {
            nextAdvanceXP = $scope.XPAdvances[curAdvIndex].XP;
        }

        return nextAdvanceXP;
    }

    function getMilitarySkillLevel(mSkill) {
        var mSkillTotal = 0;

        for (var i = 0; i < $scope.Character.MilitarySkills.length; i++) {
            if (mSkill = $scope.Character.MilitarySkills[i].Name) {
                mSkillTotal += $scope.Character.MilitarySkills[i].Level;
            }
        }

        for (var i = 0; i < $scope.Character.XPAdvances.length; i++) {
            for (var i1 = 0; i1 < $scope.Character.XPAdvances[i].AdvanceParts.length; i1++) {
                if ($scope.Character.XPAdvances[i].AdvanceParts[i1].Type == 'MilitarySkill' && $scope.Character.XPAdvances[i].AdvanceParts[i1].Name == mSkill) {
                    mSkillTotal += 1;
                }
            }
        }
    }

    function getAbilities() {
        var AbilitiesList = [];

        for (var i = 0; i < $scope.Career1.Abilities.length; i++) {
            for (var i1 = 0; i1 < $scope.Abilities.length; i1++) {
                if ($scope.Career1.Abilities[i].Name == $scope.Abilities[i1].Name) {
                    var tempAbil = jQuery.extend(true, {}, $scope.Abilities[i1]);

                    if ('Type' in $scope.Career1.Abilities[i]) {
                        tempAbil.Type = $scope.Career1.Abilities[i].Type;
                    }

                    if ('Property' in $scope.Career1.Abilities[i]) {
                        tempAbil.Property = $scope.Career1.Abilities[i].Property;
                    }

                    AbilitiesList.push(tempAbil);
                }
            }
        }

        for (var i = 0; i < $scope.Career2.Abilities.length; i++) {
            for (var i1 = 0; i1 < $scope.Abilities.length; i1++) {
                if ($scope.Career2.Abilities[i].Name == $scope.Abilities[i1].Name) {
                    var found = false;

                    for (var i2 = 0; i2 < AbilitiesList.length; i2++) {
                        if ($scope.Abilities[i1].Name == AbilitiesList[i2].Name) {
                            found = true;
                        }
                    }

                    if (!found) {
                        var tempAbil = jQuery.extend(true, {}, $scope.Abilities[i1]);

                        if ('Type' in $scope.Career2.Abilities[i]) {
                            tempAbil.Type = $scope.Career2.Abilities[i].Type;
                        }

                        if ('Property' in $scope.Career2.Abilities[i]) {
                            tempAbil.Property = $scope.Career2.Abilities[i].Property;
                        }

                        AbilitiesList.push(tempAbil);
                    }
                }
            }
        }

        AbilitiesList.sort(byName);

        var abilList = [];

        for (var i = 0; i < AbilitiesList.length; i++) {
            var prereqsMet = true;

            // Check to see if they already have the ability and it can't be taken multiple times.
            if (!('HasProperty' in AbilitiesList[i])) {
                for (var i1 = 0; i1 < $scope.Character.Abilities.length; i1++) {
                    if (AbilitiesList[i].Name == $scope.Character.Abilities[i1].Name) {
                        prereqsMet = false;
                        break;
                    }
                }
            }

            // Check for Archetype prerequisites.
            if ('PrereqArch' in AbilitiesList[i] && prereqsMet) {
                if ($scope.Character.Archetype != AbilitiesList[i]) {
                    prereqsMet = false;
                }
            }

            // Check for Stat prerequisites.
            if ('PrereqStats' in AbilitiesList[i] && prereqsMet) {
                for (var i1 = 0; i1 < AbilitiesList[i].PrereqStats.length; i1++) {
                    if (AbilitiesList[i].PrereqStats[i1].Level > $scope.Stats[AbilitiesList[i].PrereqStats[i1].Name]) {
                        prereqsMet = false;
                        break;
                    }
                }
            }

            // Check for Ability prerequisites.
            if ('PrereqAbils' in AbilitiesList[i] && prereqsMet) {
                for (var i1 = 0; i1 < AbilitiesList[i].PrereqAbils.length; i1++) {
                    var abilFound = false;

                    for (var i2 = 0; i2 < $scope.Character.Abilities.length; i2++) {
                        if (AbilitiesList[i].PrereqAbils[i1].Name == $scope.Character.Abilities[i2].Name) {
                            abilFound = true;
                        }
                    }

                    if (!abilFound) {
                        prereqsMet = false;
                        break;
                    }
                }
            }

            // Check for Military Skill prerequisites.
            if ('PrereqMSkills' in AbilitiesList[i] && prereqsMet) {
                for (var i1 = 0; i1 < AbilitiesList[i].PrereqMSkills.length; i1++) {
                    var mSkillFound = false;

                    for (var i2 = 0; i2 < $scope.Character.MilitarySkills.length; i2++) {
                        if (AbilitiesList[i].PrereqMSkills[i1].Name == $scope.Character.MilitarySkills[i2].Name) {
                            if (AbilitiesList[i].PrereqMSkills[i1].Level <= $scope.Character.MilitarySkills[i2].Level) {
                                mSkillFound = true;
                            }
                        }
                    }

                    if (!abilFound) {
                        prereqsMet = false;
                        break;
                    }
                }
            }

            // Check for Occupational Skill prerequisites.
            if ('PrereqOSkills' in AbilitiesList[i] && prereqsMet) {
                for (var i1 = 0; i1 < AbilitiesList[i].PrereqOSkills.length; i1++) {
                    var oSkillFound = false;

                    for (var i2 = 0; i2 < $scope.Character.OccupationalSkills.length; i2++) {
                        if (AbilitiesList[i].PrereqOSkills[i1].Name == $scope.Character.OccupationalSkills[i2].Name) {
                            if ('Property' in AbilitiesList[i].PrereqOSkills[i1]) {
                                if (AbilitiesList[i].PrereqOSkills[i1].Property == $scope.Character.OccupationalSkills[i2].Property) {
                                    if (AbilitiesList[i].PrereqOSkills[i1].Level <= $scope.Character.OccupationalSkills[i2].Level) {
                                        oSkillFound = true;
                                    }
                                }
                            } else {
                                if (AbilitiesList[i].PrereqOSkills[i1].Level <= $scope.Character.OccupationalSkills[i2].Level) {
                                    oSkillFound = true;
                                }
                            }
                        }
                    }

                    if (!oSkillFound) {
                        prereqsMet = false;
                        break;
                    }
                }
            }

            if (prereqsMet) {
                if ('HasProperty' in AbilitiesList[i]) {
                    AbilitiesList[i].Property = null;

                    if ('PropertyType' in AbilitiesList[i]) {
                        AbilitiesList[i].PropertyList = getPropertyList(AbilitiesList[i].PropertyType);
                    }
                }

                abilList.push(AbilitiesList[i]);
            }
        }

        return abilList;
    }

    function getPropertyList(propType) {
        var tempList = [];

        switch (propType) {
            case 'Spell':
                if ('SpellList' in $scope.Career1) {
                    for (var i = 0; i < $scope.Career1.SpellList.length; i++) {
                        tempList.push($scope.Career1.SpellList[i]);
                    }
                }

                if ('SpellList' in $scope.Career2) {
                    for (var i = 0; i < $scope.Career2.SpellList.length; i++) {
                        if (tempList.indexOf($scope.Career2.SpellList[i]) == -1) {
                            tempList.push($scope.Career2.SpellList[i]);
                        }
                    }
                }

                if ($scope.Career4 !== null) {
                    if ('SpellList' in $scope.Career3) {
                        for (var i = 0; i < $scope.Career3.SpellList.length; i++) {
                            if (tempList.indexOf($scope.Career3.SpellList[i]) == -1) {
                                tempList.push($scope.Career3.SpellList[i]);
                            }
                        }
                    }
                }

                if ($scope.Career4 !== null) {
                    if ('SpellList' in $scope.Career4) {
                        for (var i = 0; i < $scope.Career4.SpellList.length; i++) {
                            if (tempList.indexOf($scope.Career4.SpellList[i]) == -1) {
                                tempList.push($scope.Career4.SpellList[i]);
                            }
                        }
                    }
                }

                break;
            case 'Military Skill':
                if ('MilitarySkills' in $scope.Character) {
                    for (var i = 0; i < $scope.Character.MilitarySkills; i++) {
                        tempList.push($scope.Character.MilitarySkills[i].Name);
                    }
                }

                break;
            case 'Language':
                for (var i = 0; i < $scope.Languages.length; i++) {
                    var found = false;

                    if ($scope.Character.LanguagesChosen.indexOf($scope.Languages[i]) != -1) {
                        found = true;
                    }

                    for (var i1 = 0; i1 < $scope.Character.Abilities.length; i1++) {
                        if ($scope.Character.Abilities[i1].Name == 'Language' && $scope.Character.Abilities[i1].Property == $scope.Languages[i]) {
                            found = true;
                        }
                    }

                    if (!found) {
                        tempList.push($scope.Languages[i]);
                    }
                }

                break;
        }

        tempList.sort();
        return tempList;
    }

    function getStatMax(stat, xp) {
        var funcLevel = $scope.xpLevel(xp);
        var statSelect = '';

        switch(funcLevel) {
            case 'Hero':
                statSelect = 'MaxHero';
                break;
            case 'Veteran':
                statSelect = 'MaxVet';
                break;
            case 'Epic':
                statSelect = 'MaxEpic';
                break;
        }

        statMax = $scope.Race.Stats[stat][statSelect];

        // If careers add to stat maximums add them.
        if ('StatMaxIncreases' in $scope.Career1) {
            for (var i = 0; i < $scope.Career1.StatMaxIncreases[funcLevel].length; i++) {
                if ($scope.Career1.StatMaxIncreases[funcLevel][i][0] == stat) {
                    statMax += $scope.Career1.StatMaxIncreases[funcLevel][i][1];
                }
            }
        }

        if ('StatMaxIncreases' in $scope.Career2) {
            for (var i = 0; i < $scope.Career2.StatMaxIncreases[$scope.Level].length; i++) {
                if ($scope.Career2.StatMaxIncreases[funcLevel][i][0] == stat) {
                    statMax += $scope.Career2.StatMaxIncreases[funcLevel][i][1];
                }
            }
        }

        if ($scope.Career3 !== null) {
            if ('StatMaxIncreases' in $scope.Career3) {
                for (var i = 0; i < $scope.Career3.StatMaxIncreases[$scope.Level].length; i++) {
                    if ($scope.Career3.StatMaxIncreases[funcLevel][i][0] == stat) {
                        statMax += $scope.Career3.StatMaxIncreases[funcLevel][i][1];
                    }
                }
            }
        }

        if ($scope.Career4 !== null) {
            if ('StatMaxIncreases' in $scope.Career4) {
                for (var i = 0; i < $scope.Career4.StatMaxIncreases[$scope.Level].length; i++) {
                    if ($scope.Career4.StatMaxIncreases[funcLevel][i][0] == stat) {
                        statMax += $scope.Career4.StatMaxIncreases[funcLevel][i][1];
                    }
                }
            }
        }

        return statMax;
    }

    function byName(objA, objB) {
        if (objA.Name > objB.Name) {
            return 1;
        } else {
            return -1;
        }
    }

    $(window).bind('beforeunload', function() {
        if ($scope.SomethingChanged) {
            return 'Leaving this page without saving will lose all changes.';
        }
    });
}
