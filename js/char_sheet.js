function CSCtrl($scope, $http) {

    /////////////////////////////////////////////////////////////////////
    /////                                                           /////
    /////       Initial Values                                      /////
    /////                                                           /////
    /////////////////////////////////////////////////////////////////////

    // Character values
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
    $scope.NewWornArmorSpd = 0;
    $scope.NewWornArmorDef = 0;
    $scope.NewWornArmorArm = 0;
    $scope.MeleeWeapon1 = '';
    $scope.MeleeWeapon2 = '';
    $scope.RangedWeapon1 = '';
    $scope.RangedWeapon2 = '';
    $scope.HasSpells = false;
    $scope.SomethingChanged = false;
    $scope.EditName = false;
    $scope.OldName = null;
    $scope.EditSex = false;
    $scope.OldSex = null; // Gross.
    $scope.EditDefiningChars = false;
    $scope.OldDefChars = null;
    $scope.EditHeight = false;
    $scope.OldHeight = null;
    $scope.EditWeight = false;
    $scope.OldWeight = null;
    $scope.EditFaith = false;
    $scope.OldFaith = null;
    $scope.FeatPoints = 0;
    $scope.Notes = '';
    $scope.PHYDamBoxes = 
    [
        { Disabled: false, Checked: false },
        { Disabled: false, Checked: false },
        { Disabled: false, Checked: false },
        { Disabled: false, Checked: false },
        { Disabled: false, Checked: false },
        { Disabled: false, Checked: false },
        { Disabled: false, Checked: false },
        { Disabled: false, Checked: false },
        { Disabled: false, Checked: false },
        { Disabled: false, Checked: false },
        { Disabled: false, Checked: false },
        { Disabled: false, Checked: false }
    ];
    $scope.AGLDamBoxes = 
    [
        { Disabled: false, Checked: false },
        { Disabled: false, Checked: false },
        { Disabled: false, Checked: false },
        { Disabled: false, Checked: false },
        { Disabled: false, Checked: false },
        { Disabled: false, Checked: false },
        { Disabled: false, Checked: false },
        { Disabled: false, Checked: false },
        { Disabled: false, Checked: false },
        { Disabled: false, Checked: false },
        { Disabled: false, Checked: false },
        { Disabled: false, Checked: false }
    ];
    $scope.INTDamBoxes =
    [
        { Disabled: false, Checked: false },
        { Disabled: false, Checked: false },
        { Disabled: false, Checked: false },
        { Disabled: false, Checked: false },
        { Disabled: false, Checked: false },
        { Disabled: false, Checked: false },
        { Disabled: false, Checked: false },
        { Disabled: false, Checked: false },
        { Disabled: false, Checked: false },
        { Disabled: false, Checked: false },
        { Disabled: false, Checked: false },
        { Disabled: false, Checked: false }
    ];
    $scope.PFBoxes =
    [
        { Disabled: false, Checked: false },
        { Disabled: false, Checked: false },
        { Disabled: false, Checked: false },
        { Disabled: false, Checked: false },
        { Disabled: false, Checked: false },
        { Disabled: false, Checked: false }
    ];

    // Profile values
    $scope.ProfUrl = 'ajax/profile.php';
    $scope.User = null;
    
    $scope.Stats = {
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

    $scope.CharMSkills = [];
    $scope.CharOSkills = [];
    $scope.CharBenefits = [];
    $scope.CharAbilities = [];
    $scope.CharSpells = [];

    // Example: { Name: "Test Armor", Description: "Blah", SPD: 0, DEF: 0, ARM: 0 }
    // TODO: Figure out gear.
    $scope.Armor = [];
    $scope.MeleeWeapons = [];
    $scope.RangedWeapons = [];
    $scope.MiscGear = [];

    /////////////////////////////////////////////////////////////////////
    /////                                                           /////
    /////       Lookup Arrays/Objects                               /////
    /////                                                           /////
    /////////////////////////////////////////////////////////////////////

    $scope.Races = load_array('races', []);
    $scope.Archetypes = load_array('archetypes', []);
    $scope.Careers = load_array('careers', []);
    $scope.MilitarySkills = load_array('military skills', []);
    $scope.OccupationalSkills = load_array('occupational skills', []);
    $scope.GeneralSkills = load_array('general skills', []);
    $scope.Abilities = load_array('abilities', []);
    $scope.Spells = load_array('spells', []);

    /////////////////////////////////////////////////////////////////////
    /////                                                           /////
    /////       Public/Scope Functions                              /////
    /////                                                           /////
    /////////////////////////////////////////////////////////////////////

    // Get character from AJAX function and load defaults.
    // Also get profile from AJAX function and load defaults.
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

        $http.post($scope.ProfUrl, { ReqType: 'GetProfile' }).success(function(data, status) {
            if (typeof data !== 'object') {
                $scope.Error = data;
            } else {
                $scope.User = data;
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
        if ('FeatPoints' in $scope.Character) {
            $scope.FeatPoints = $scope.Character.FeatPoints;
        } else {
            $scope.Character.FeatPoints = 0;
        }

        if ('Notes' in $scope.Character) {
            $scope.Notes = $scope.Character.Notes;
        } else {
            $scope.Character.Notes = '';
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

        if ('XPAdvances' in $scope.Character) {
            for (var i = 0; i < $scope.Character.XPAdvances.length; i++) {
                for (var i1 = 0; i1 < $scope.Character.XPAdvances[i].AdvanceParts.length; i1++) {
                    if ($scope.Character.XPAdvances[i].AdvanceParts[i1].Type == 'Careers') {
                        for (var i2 = 0; i2 < $scope.Careers.length; i2++) {
                            if ($scope.Character.XPAdvances[i].AdvanceParts[i1].Selected == $scope.Careers[i2].Name) {
                                if ($scope.Career3 === null) {
                                    $scope.Career3 = $scope.Careers[i2];
                                } else {
                                    $scope.Career4 = $scope.Careers[i2];
                                }
                            }
                        }
                    }
                }
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

        // Add stat increases from XP advances.
        if ('XPAdvances' in $scope.Character) {
            for (var i = 0; i < $scope.Character.XPAdvances.length; i++) {
                for (var i1 = 0; i1 < $scope.Character.XPAdvances[i].AdvanceParts.length; i1++) {
                    if ($scope.Character.XPAdvances[i].AdvanceParts[i1].Type == 'Stats') {
                        $scope.Stats[$scope.Character.XPAdvances[i].AdvanceParts[i1].Selected].Current += 1;
                    }
                }
            }
        }

        // Disable damage boxes.
        var numToDisable = 12 - $scope.Stats.PHY.Current;

        for (var i = 0; i < numToDisable; i++) {
            $scope.PHYDamBoxes[i].Disabled = true;
        }

        numToDisable = 12 - $scope.Stats.AGL.Current;

        for (var i = 0; i < numToDisable; i++) {
            $scope.AGLDamBoxes[i].Disabled = true;
        }

        numToDisable = 12 - $scope.Stats.INT.Current;

        for (var i = 0; i < numToDisable; i++) {
            $scope.INTDamBoxes[i].Disabled = true;
        }

        // Populate military skills list.
        for (var i = 0; i < $scope.Character.MilitarySkills.length; i++) {
            for (var i1 = 0; i1 < $scope.MilitarySkills.length; i1++) {
                if ($scope.Character.MilitarySkills[i].Name == $scope.MilitarySkills[i1].Name) {
                    var tempMSkill = jQuery.extend(true, {}, $scope.Character.MilitarySkills[i], $scope.MilitarySkills[i1]);
                    $scope.CharMSkills.push(tempMSkill);
                }
            }
        }

        if ('XPAdvances' in $scope.Character) {
            for (var i = 0; i < $scope.Character.XPAdvances.length; i++) {
                for (var i1 = 0; i1 < $scope.Character.XPAdvances[i].AdvanceParts.length; i1++) {
                    if ($scope.Character.XPAdvances[i].AdvanceParts[i1].Type == 'MilitarySkills') {
                        var foundIndex = -1;

                        for (var i2 = 0; i2 < $scope.CharMSkills.length; i2++) {
                            if ($scope.Character.XPAdvances[i].AdvanceParts[i1].Selected == $scope.CharMSkills[i2].Name) {
                                foundIndex = i2;
                            }
                        }

                        if (foundIndex != -1) {
                            $scope.CharMSkills[foundIndex].Level += 1;
                        } else {
                            for (var i2 = 0; i2 < $scope.MilitarySkills.length; i2++) {
                                if ($scope.MilitarySkills[i2].Name == $scope.Character.XPAdvances[i].AdvanceParts[i1].Selected) {
                                    var tempMSkill = jQuery.extend(true, {}, $scope.MilitarySkills[i2]);
                                    tempMSkill.Level = 1;
                                    $scope.CharMSkills.push(tempMSkill);
                                }
                            }
                        }
                    }
                }
            }
        }

        $scope.CharMSkills.sort(byName);
        
        // Populate occupational skills list.
        for (var i = 0; i < $scope.Character.OccupationalSkills.length; i++) {
            for (var i1 = 0; i1 < $scope.OccupationalSkills.length; i1++) {
                if ($scope.Character.OccupationalSkills[i].Name == $scope.OccupationalSkills[i1].Name) {
                    var tempOSkill = jQuery.extend(true, {}, $scope.Character.OccupationalSkills[i], $scope.OccupationalSkills[i1]);

                    if (tempOSkill.BaseStat == 'Social') {
                        tempOSkill.StatsList = [];
                        tempOSkill.StatsList.push('PHY');
                        tempOSkill.StatsList.push('SPD');
                        tempOSkill.StatsList.push('STR');
                        tempOSkill.StatsList.push('AGL');
                        tempOSkill.StatsList.push('PRW');
                        tempOSkill.StatsList.push('POI');
                        tempOSkill.StatsList.push('INT');

                        if ($scope.Character.Archetype == 'Gifted') {
                            tempOSkill.StatsList.push('ARC');
                        }

                        tempOSkill.SocialStat = null;
                        tempOSkill.StatsList.push('PER');
                    }

                    $scope.CharOSkills.push(tempOSkill);
                }
            }

            for (var i1 = 0; i1 < $scope.GeneralSkills.length; i1++) {
                if ($scope.Character.OccupationalSkills[i].Name == $scope.GeneralSkills[i1].Name) {
                    var tempGSkill = jQuery.extend(true, {}, $scope.Character.OccupationalSkills[i], $scope.GeneralSkills[i1]);

                    if (tempGSkill.BaseStat == 'Social') {
                        tempGSkill.StatsList = [];
                        tempGSkill.StatsList.push('PHY');
                        tempGSkill.StatsList.push('SPD');
                        tempGSkill.StatsList.push('STR');
                        tempGSkill.StatsList.push('AGL');
                        tempGSkill.StatsList.push('PRW');
                        tempGSkill.StatsList.push('POI');
                        tempGSkill.StatsList.push('INT');

                        if ($scope.Character.Archetype == 'Gifted') {
                            tempGSkill.StatsList.push('ARC');
                        }

                        tempGSkill.SocialStat = null;
                        tempGSkill.StatsList.push('PER');
                    }

                    $scope.CharOSkills.push(tempGSkill);
                }
            }
        }

        if ('XPAdvances' in $scope.Character) {
            for (var i = 0; i < $scope.Character.XPAdvances.length; i++) {
                for (var i1 = 0; i1 < $scope.Character.XPAdvances[i].AdvanceParts.length; i1++) {
                    if ($scope.Character.XPAdvances[i].AdvanceParts[i1].Type == 'OccupationalSkills') {
                        var foundIndex = -1;

                        for (var i2 = 0; i2 < $scope.CharOSkills.length; i2++) {
                            if ($scope.Character.XPAdvances[i].AdvanceParts[i1].Selected == $scope.CharOSkills[i2].Name) {
                                if ('Property' in $scope.CharOSkills[i2] && 'Property' in $scope.Character.XPAdvances[i].AdvanceParts[i1]) {
                                    if ($scope.CharOSkills[i2].Property == $scope.Character.XPAdvances[i].AdvanceParts[i1].Property) {
                                        foundIndex = i2;
                                    }
                                } else {
                                    foundIndex = i2;
                                }
                            }
                        }

                        if (foundIndex != -1) {
                            $scope.CharOSkills[foundIndex].Level += 1;
                        } else {
                            var found = false;

                            for (var i2 = 0; i2 < $scope.OccupationalSkills.length; i2++) {
                                if ($scope.Character.XPAdvances[i].AdvanceParts[i1].Selected == $scope.OccupationalSkills[i2].Name) {
                                    found = true;

                                    var tempOSkill = jQuery.extend(true, {}, $scope.OccupationalSkills[i2]);

                                    tempOSkill.Level = 1;

                                    if ('Property' in $scope.Character.XPAdvances[i].AdvanceParts[i1]) {
                                        tempOSkill.Property = $scope.Character.XPAdvances[i].AdvanceParts[i1].Property;
                                    }

                                    if (tempOSkill.BaseStat == 'Social') {
                                        tempOSkill.StatsList = [];
                                        tempOSkill.StatsList.push('PHY');
                                        tempOSkill.StatsList.push('SPD');
                                        tempOSkill.StatsList.push('STR');
                                        tempOSkill.StatsList.push('AGL');
                                        tempOSkill.StatsList.push('PRW');
                                        tempOSkill.StatsList.push('POI');
                                        tempOSkill.StatsList.push('INT');

                                        if ($scope.Character.Archetype == 'Gifted') {
                                            tempOSkill.StatsList.push('ARC');
                                        }

                                        tempOSkill.SocialStat = null;
                                        tempOSkill.StatsList.push('PER');
                                    }

                                    $scope.CharOSkills.push(tempOSkill);
                                }
                            }

                            if (!found) {
                                for (var i2 = 0; i2 < $scope.GeneralSkills.length; i2++) {
                                    if ($scope.Character.XPAdvances[i].AdvanceParts[i1].Selected == $scope.GeneralSkills[i2].Name) {
                                        var tempGSkill = jQuery.extend(true, {}, $scope.GeneralSkills[i2]);

                                        tempGSkill.Level = 1;

                                        if ('Property' in $scope.Character.XPAdvances[i].AdvanceParts[i1]) {
                                            tempGSkill.Property = $scope.Character.XPAdvances[i].AdvanceParts[i1].Property;
                                        }

                                        if (tempGSkill.BaseStat == 'Social') {
                                            tempGSkill.StatsList = [];
                                            tempGSkill.StatsList.push('PHY');
                                            tempGSkill.StatsList.push('SPD');
                                            tempGSkill.StatsList.push('STR');
                                            tempGSkill.StatsList.push('AGL');
                                            tempGSkill.StatsList.push('PRW');
                                            tempGSkill.StatsList.push('POI');
                                            tempGSkill.StatsList.push('INT');

                                            if ($scope.Character.Archetype == 'Gifted') {
                                                tempGSkill.StatsList.push('ARC');
                                            }

                                            tempGSkill.SocialStat = null;
                                            tempGSkill.StatsList.push('PER');
                                        }

                                        $scope.CharOSkills.push(tempGSkill);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        $scope.CharOSkills.sort(byName);

        // Populate benefits list.
        for (var i = 0; i < $scope.Character.Benefits.length; i++) {
            for (var i1 = 0; i1 < $scope.Archetypes.length; i1++) {
                for (var i2 = 0; i2 < $scope.Archetypes[i1].Benefits.length; i2++) {
                    if ($scope.Character.Benefits[i].Name == $scope.Archetypes[i1].Benefits[i2].Name) {
                        var tempBen = jQuery.extend(true, {}, $scope.Character.Benefits[i], $scope.Archetypes[i1].Benefits[i2]);
                        $scope.CharBenefits.push(tempBen);
                    }
                }
            }
        }

        if ('XPAdvances' in $scope.Character) {
            for (var i = 0; i < $scope.Character.XPAdvances.length; i++) {
                for (var i1 = 0; i1 < $scope.Character.XPAdvances[i].AdvanceParts.length; i1++) {
                    if ($scope.Character.XPAdvances[i].AdvanceParts[i1].Type == 'ArchetypeBenefits') {
                        for (var i2 = 0; i2 < $scope.Archetypes.length; i2++) {
                            for (var i3 = 0; i3 < $scope.Archetypes[i2].Benefits.length; i3++) {
                                if ($scope.Character.XPAdvances[i].AdvanceParts[i1].Selected == $scope.Archetypes[i2].Benefits[i3].Name) {
                                    var tempBen = jQuery.extend(true, {}, $scope.Archetypes[i2].Benefits[i3]);
                                    
                                    if ('Property' in $scope.Character.XPAdvances[i].AdvanceParts[i1]) {
                                        tempBen.Property = $scope.Character.XPAdvances[i].AdvanceParts[i1].Property;
                                    }

                                    $scope.CharBenefits.push(tempBen);
                                }
                            }
                        }
                    }
                }
            }
        }

        $scope.CharBenefits.sort(byName);

        // Populate abilities list.
        for (var i = 0; i < $scope.Character.Abilities.length; i++) {
            for (var i1 = 0; i1 < $scope.Abilities.length; i1++) {
                if ($scope.Character.Abilities[i].Name == $scope.Abilities[i1].Name) {
                    var tempAbil = jQuery.extend(true, {}, $scope.Character.Abilities[i], $scope.Abilities[i1]);
                    $scope.CharAbilities.push(tempAbil);
                }
            }
        }

        if ('XPAdvances' in $scope.Character) {
            for (var i = 0; i < $scope.Character.XPAdvances.length; i++) {
                for (var i1 = 0; i1 < $scope.Character.XPAdvances[i].AdvanceParts.length; i1++) {
                    if ($scope.Character.XPAdvances[i].AdvanceParts[i1].Type == 'Abilities') {
                        for (var i2 = 0; i2 < $scope.Abilities.length; i2++) {
                            if ($scope.Character.XPAdvances[i].AdvanceParts[i1].Selected == $scope.Abilities[i2].Name) {
                                var tempAbil = jQuery.extend(true, {}, $scope.Abilities[i2]);

                                if ('Property' in $scope.Character.XPAdvances[i].AdvanceParts[i1]) {
                                    tempAbil.Property = $scope.Character.XPAdvances[i].AdvanceParts[i1].Property;
                                }

                                $scope.CharAbilities.push(tempAbil);
                            }
                        }
                    }
                }
            }
        }

        $scope.CharAbilities.sort(byName);

        // Populate spells list.
        if ('Spells' in $scope.Character) {
            $scope.HasSpells = true;
            for (var i = 0; i < $scope.Character.Spells.length; i++) {
                for (var i1 = 0; i1 < $scope.Spells.length; i1++) {
                    if ($scope.Character.Spells[i] == $scope.Spells[i1].Name) {
                        $scope.CharSpells.push($scope.Spells[i1]);
                    }
                }
            }
        }

        for (var i = 0; i < $scope.CharBenefits.length; i++) {
            if ('PropertyType' in $scope.CharBenefits[i]) {
                if ($scope.CharBenefits[i].PropertyType == 'Spell') {
                    for (var i1 = 0; i1 < $scope.Spells.length; i1++) {
                        if ($scope.CharBenefits[i].Property == $scope.Spells[i1].Name) {
                            $scope.CharSpells.push($scope.Spells[i1]);
                        }
                    }
                }
            }
        }

        if ('XPAdvances' in $scope.Character) {
            for (var i = 0; i < $scope.Character.XPAdvances.length; i++) {
                for (var i1 = 0; i1 < $scope.Character.XPAdvances[i].AdvanceParts.length; i1++) {
                    if ($scope.Character.XPAdvances[i].AdvanceParts[i1].Type == 'Spells') {
                        for (var i2 = 0; i2 < $scope.Spells.length; i2++) {
                            if ($scope.Character.XPAdvances[i].AdvanceParts[i1].Selected == $scope.Spells[i2].Name) {
                                $scope.CharSpells.push($scope.Spells[i2]);
                            }
                        }
                    }
                }
            }
        }

        $scope.CharSpells.sort(byName);
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
    
    $scope.displaySkillProperty = function(skill) {
        var sp = '';

        if ('Property' in skill) {
            sp = ' (' + skill.Property + ')';
        }

        return sp;
    }

    $scope.displaySkillBase = function(skill) {
        if (skill.BaseStat == 'Social') {
            if (skill.SocialStat == null) {
                return 'SOC';
            } else {
                return $scope.Stats[skill.SocialStat].Current;
            }
        } else {
            return $scope.Stats[skill.BaseStat].Current;
        }
    };

    $scope.displaySkillTotal = function(skill) {
        if (skill.BaseStat == 'Social') {
            if (skill.SocialStat == null) {
                return '-';
            } else {
                return skill.Level + $scope.Stats[skill.SocialStat].Current;
            }
        } else {
            return skill.Level + $scope.Stats[skill.BaseStat].Current;
        }
    }

    $scope.displayBenefitProperty = function(benefit) {
        var bp = '';
        
        if ('HasProperty' in benefit) {
            bp = ' (' + benefit.Property + ')';
        }

        return bp;
    }

    $scope.displayAbilityProperty = function(ability) {
        ap = '';

        if ('HasProperty' in ability) {
            ap = ' (' + ability.Property + ')';
        }

        return ap;
    }

    $scope.getCommandSkill = function() {
        skillLvl = 0;
        
        for (a = 0; a < $scope.CharOSkills.length; a++) {
            if ($scope.CharOSkills[a].Name == 'Command') {
                skillLvl = $scope.CharOSkills[a].Level;
            }
        }

        return skillLvl;
    }

    $scope.getRacialDefMod = function() {
        if ($scope.Race !== null && 'DefMod' in $scope.Race) {
            return $scope.Race.DefMod;
        } else {
            return 0;
        }
    }

    $scope.getOtherInitMods = function() {
        var initMod = 0;

        if ($scope.Race !== null && 'InitMod' in $scope.Race) {
            initMod += $scope.Race.InitMod;
        }

        if ($scope.Character !== null) {
            for (var i = 0; i < $scope.Character.Abilities.length; i++) {
                for (var i1 = 0; i1 < $scope.Abilities.length; i1++) {
                    if ($scope.Character.Abilities[i].Name == $scope.Abilities[i1].Name) {
                        if ('InitMod' in $scope.Abilities[i1]) {
                            initMod += $scope.Abilities[i1].InitMod;
                        }
                    }
                }
            }
        }

        return initMod;
    }

    $scope.getAbilityCmdMods = function() {
        var cmdMod = 0;

        if ($scope.Character !== null) {
            for (var i = 0; i < $scope.Character.Abilities.length; i++) {
                for (var i1 = 0; i1 < $scope.Abilities.length; i1++ ) {
                    if ($scope.Character.Abilities[i].Name == $scope.Abilities[i1].Name) {
                        if ('CMDRangeMod' in $scope.Abilities[i1]) {
                            cmdMod += $scope.Abilities[i1].CMDRangeMod;
                        }
                    }
                }
            }
        }

        return cmdMod;
    }

    // Functions to calculate totals.
    $scope.calcTotalDEF = function() {
        return $scope.Stats.SPD.Current + $scope.Stats.AGL.Current + $scope.Stats.PER.Current + $scope.getRacialDefMod();
    }

    $scope.calcTotalInit = function() {
        return $scope.Stats.SPD.Current + $scope.Stats.PRW.Current + $scope.Stats.PER.Current + $scope.getOtherInitMods();
    }

    $scope.calcTotalARM = function() {
        return $scope.Stats.PHY.Current;
    }

    $scope.calcTotalCMD = function() {
        return $scope.Stats.INT.Current + $scope.getCommandSkill() + $scope.getAbilityCmdMods();
    }

    // Functions to change basic character information.
    $scope.changeFeatPoints = function() {
        if ($scope.FeatPoints === null || $scope.FeatPoints == '') {
            $scope.FeatPoints = 0;
        } else if (isNaN($scope.FeatPoints)) {
            $scope.FeatPoints = 3;
        } else if ($scope.FeatPoints > 3) {
            $scope.FeatPoints = 3;
        } else if ($scope.FeatPoints < 0) {
            $scope.FeatPoints = 0;
        }

        $scope.SomethingChanged = true;
    }

    $scope.changeNotes = function() {
        $scope.SomethingChanged = true;
    }

    $scope.clickEditName = function() {
        clickEditField('EditName', 'Name', 'OldName');
    }

    $scope.clickEditSex = function() {
        clickEditField('EditSex', 'Sex', 'OldSex');
    }

    $scope.clickEditDefiningChars = function() {
        clickEditField('EditDefiningChars', 'DefiningCharacteristics', 'OldDefChars');
    }

    $scope.clickEditHeight = function() {
        clickEditField('EditHeight', 'Height', 'OldHeight');
    }

    $scope.clickEditWeight = function() {
        clickEditField('EditWeight', 'Weight', 'OldWeight');
    }

    $scope.clickEditFaith = function() {
        clickEditField('EditFaith', 'Faith', 'OldFaith');
    }

    $scope.SaveCharChanges = function() {
        $scope.Character.FeatPoints = $scope.FeatPoints;
        $scope.Character.Notes = $scope.Notes;

        $http.post($scope.CharUrl, { ReqType: 'UpdateChar', CharacterID: $scope.CharacterID, Character: $scope.Character }).success(function(data, status) {
            if (status != 200 || data != 'OK') {
                $scope.Error = data;
            } else {
                $scope.SomethingChanged = false;
            }
        }).error(function(data, status) {
            if (data !== null) {
                $scope.Error = data;
            } else {
                $scope.Error = 'Request failed. Status: ' + status;
            }
        });
    }

    function fieldHighlight(fieldId) {
        $("#" + fieldId).css("background-color", "#73e67a").delay(1000).animate({ backgroundColor: "transparent" });
    }

    // Functions to show/hide weapons.
    $scope.hideRanged1 = function() {
            if (($scope.MeleeWeapon1 !== '' && $scope.MeleeWeapon2 !== '')) {
                    $scope.RangedWeapon1 = '';
                    return true;
            } else {
                    return false;
            }
    };

    $scope.hideRanged2 = function() {
            if ($scope.MeleeWeapon1 !== '' || $scope.MeleeWeapon2 !== '') {
                    $scope.RangedWeapon2 = '';
                    return true;
            } else {
                    return false;
            }
    };

    $scope.hideMelee1 = function() {
            if ($scope.RangedWeapon1 !== '' && $scope.RangedWeapon2 !== '') {
                    $scope.MeleeWeapon1 = '';
                    return true;
            } else {
                    return false;
            }
    };

    $scope.hideMelee2 = function() {
            if ($scope.RangedWeapon1 !== '' || $scope.RangedWeapon2 !== '') {
                    $scope.MeleeWeapon2 = '';
                    return true;
            } else {
                    return false;
            }
    };

    /////////////////////////////////////////////////////////////////////
    /////                                                           /////
    /////       Private Functions                                   /////
    /////                                                           /////
    /////////////////////////////////////////////////////////////////////

    function clickEditField(fieldFlag, charField, oldField) {
        if ($scope[fieldFlag]) {
            if ($scope.Character[charField] != $scope[oldField]) {
                $scope.SomethingChanged = true;
            }
        } else {
            $scope[oldField] = $scope.Character[charField];
        }

        $scope[fieldFlag] = !$scope[fieldFlag];
    }

    $(window).bind('beforeunload', function() {
        if ($scope.SomethingChanged) {
            return 'Leaving this page without saving will lose all changes.';
        }
    });
}
