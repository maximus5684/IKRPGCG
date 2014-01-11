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
        PHY: { Current: 0, Max: 0 },
        SPD: { Current: 0, Max: 0 },
        STR: { Current: 0, Max: 0 },
        AGL: { Current: 0, Max: 0 },
        PRW: { Current: 0, Max: 0 },
        POI: { Current: 0, Max: 0 },
        INT: { Current: 0, Max: 0 },
        ARC: { Current: 0, Max: 0 },
        PER: { Current: 0, Max: 0 }
    };
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
        $scope.Character.XPAdvances = []; 
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

        statSelect = '';

        switch($scope.Level) {
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

        // Load basic stats for current level.
        $scope.Stats.PHY.Current = $scope.Race.Stats.PHY.Starting;
        $scope.Stats.PHY.Max = $scope.Race.Stats.PHY[statSelect];
        $scope.Stats.SPD.Current = $scope.Race.Stats.SPD.Starting;
        $scope.Stats.SPD.Max = $scope.Race.Stats.SPD[statSelect];
        $scope.Stats.STR.Current = $scope.Race.Stats.STR.Starting;
        $scope.Stats.STR.Max = $scope.Race.Stats.STR[statSelect];
        $scope.Stats.AGL.Current = $scope.Race.Stats.AGL.Starting;
        $scope.Stats.AGL.Max = $scope.Race.Stats.AGL[statSelect];
        $scope.Stats.PRW.Current = $scope.Race.Stats.PRW.Starting;
        $scope.Stats.PRW.Max = $scope.Race.Stats.PRW[statSelect];
        $scope.Stats.POI.Current = $scope.Race.Stats.POI.Starting;
        $scope.Stats.POI.Max = $scope.Race.Stats.POI[statSelect];
        $scope.Stats.INT.Current = $scope.Race.Stats.INT.Starting;
        $scope.Stats.INT.Max = $scope.Race.Stats.INT[statSelect];

        if ($scope.Archetype.Name == 'Gifted') {
            if ($scope.Character.ArcaneTradition == 'Focuser') {
                $scope.Stats.ARC.Current = 2;
            } else if ($scope.Character.ArcaneTradition == 'Will Weaver') {
                $scope.Stats.ARC.Current = 3;
            }

            $scope.Stats.ARC.Max = $scope.Race.Stats.ARC[statSelect];
        } else {
            $scope.Stats.ARC.Current = '-';
            $scope.Stats.ARC.Max = '-';
        }

        $scope.Stats.PER.Current = $scope.Race.Stats.PER.Starting;
        $scope.Stats.PER.Max = $scope.Race.Stats.PER[statSelect];

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

        // If careers add to stat maximums add them.
        if ('StatMaxIncreases' in $scope.Career1) {
            for (var i = 0; i < $scope.Career1.StatMaxIncreases[$scope.Level].length; i++) {
                $scope.Stats[$scope.Career1.StatMaxIncreases[$scope.Level][i][0]].Max += $scope.Career1.StatMaxIncreases[$scope.Level][i][1];
            }
        }

        if ('StatMaxIncreases' in $scope.Career2) {
            for (var i = 0; i < $scope.Career2.StatMaxIncreases[$scope.Level].length; i++) {
                $scope.Stats[$scope.Career2.StatMaxIncreases[$scope.Level][i][0]].Max += $scope.Career2.StatMaxIncreases[$scope.Level][i][1];
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

        $scope.$digest();
    });

    $scope.checkCharXP = function(xp) {
        if ($scope.Character === null || $scope.Character.XP < xp) {
            return false;
        } else {
            return true;
        }
    }

    $scope.clickEditAdvance = function(xp) {
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
                    var tempChoice = { Label: '', ChoicesList: [], Selected: null, Property: '' };

                    switch (advance.Options[i][i1][0]) {
                        case 'Careers':
                            tempChoice.Label = 'Career';
                            
                            for (var i3 = 0; i3 < $scope.Careers.length; i3++) {
                                var found = false;

                                if ($scope.Career1.Name == $scope.Careers[i3].Name) {
                                    found = true;
                                }

                                if ($scope.Career2.Name == $scope.Careers[i3].Name) {
                                    found = true;
                                }

                                if ($scope.Career3 !== null && $scope.Career3.Name == $scope.Careers[i3].Name) {
                                    found = true;
                                }

                                if ($scope.Career4 !== null && $scope.Career4.Name == $scope.Careers[i3].Name) {
                                    found = true;
                                }

                                if (!found) {
                                    tempChoice.ChoicesList.push({ Name: $scope.Careers[i3].Name });
                                }
                            }
                            break;
                        case 'OccupationalSkills':
                            tempChoice.Label = 'Occupational Skill';
                            // TODO: Finish populating Occupational Skills list.
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
                            // TODO: Finish populating connections list.
                            break;
                        case 'MilitarySkills':
                            tempChoice.Label = 'Military Skill';

                            for (var i3 = 0; i3 < $scope.Career1.MilitarySkills.length; i3++) {
                                tempChoice.ChoicesList.push({ Name: $scope.Career1.MilitarySkills[i3].Name });
                            }

                            for (var i3 = 0; i3 < $scope.Career2.MilitarySkills.length; i3++) {
                                var found = false;
                                
                                for (var i4 = 0; i4 < tempChoice.ChoicesList.length; i4++) {
                                    if ($scope.Career2.MilitarySkills[i3].Name == tempChoice.ChoicesList[i4].Name) {
                                        found = true;
                                    }
                                }

                                if (!found) {
                                    tempChoice.ChoicesList.push({ Name: $scope.Career2.MilitarySkills[i3].Name });
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
                                        tempChoice.ChoicesList.push({ Name: $scope.Career3.MilitarySkills[i3].Name });
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
                                        tempChoice.ChoicesList.push({ Name: $scope.Career4.MilitarySkills[i3].Name });
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
                                    }

                                    tempChoice.ChoicesList.push(tempBenefit);
                                }
                            }

                            break;
                        case 'Stats':
                            tempChoice.Label = 'Stat';
                            tempChoice.ChoicesList =
                            [
                                { Name: 'PHY' },
                                { Name: 'SPD' },
                                { Name: 'STR' },
                                { Name: 'AGL' },
                                { Name: 'PRW' },
                                { Name: 'POI' },
                                { Name: 'INT' }
                            ];

                            if ($scope.Character.Archetype == 'Gifted') {
                                tempChoice.ChoicesList.push({ Name: 'ARC' });
                            }

                            tempChoice.ChoicesList.push({ Name: 'PER' });
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
        }

        if ($scope.XPOptionSelected !== null) {
            var selectedIndex = $scope.XPOptionsList.indexOf($scope.XPOptionSelected);
            $scope.XPOptions[selectedIndex].Selected = true;
        }
    }

    $scope.checkChoiceForTextProperty = function(choice) {
        if (choice === null) {
            return false;
        } else {
            if ('HasProperty' in choice) {
                if ('PropertyType' in choice) {
                    return false;
                } else if ('Type' in choice && choice.Type == 'Specific') {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        }
    }

    $scope.cancelConfirm = function() {
        if ($scope.SomethingChanged) {
            $('#cancelConfirm').modal();
        } else {
            $scope.returnToSheet();
        }
    }

    $scope.returnToSheet = function() {
        window.location = '/character_sheet.php?CharacterID=' + $scope.CharacterID;
    }

    /////////////////////////////////////////////////////////////////////
    /////                                                           /////
    /////       Private Functions                                   /////
    /////                                                           /////
    /////////////////////////////////////////////////////////////////////

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
                }

                abilList.push(AbilitiesList[i]);
            }
        }

        return abilList;
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
