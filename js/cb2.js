function CB2Ctrl($scope, $http) {
    $scope.Url = 'ajax/characters.php';
    $scope.Error = null;
    $scope.CharacterID = null;
    $scope.Character = null;
    $scope.Benefit = null;
    $scope.Benefits = [];
    $scope.Race = null;
    $scope.Career1 = null;
    $scope.Career2 = null;
    $scope.RacialBenefits = null;
    $scope.CareerBenefits = null;
    $scope.Connections = false;
    $scope.RacialStatIncreaseRequired = false;
    $scope.AdvancementPoints = 3;
    // [0] = Starting, [1] = Max, [2] = AP Points, [3] = Field Min, [4] = Field Max
    $scope.APFields =
    {
        PHY: { Starting: 0, Max: 0, Points: 0, FieldMin: 0, FieldMax: 3, Disabled: false },
        SPD: { Starting: 0, Max: 0, Points: 0, FieldMin: 0, FieldMax: 3, Disabled: false },
        STR: { Starting: 0, Max: 0, Points: 0, FieldMin: 0, FieldMax: 3, Disabled: false },
        AGL: { Starting: 0, Max: 0, Points: 0, FieldMin: 0, FieldMax: 3, Disabled: false },
        PRW: { Starting: 0, Max: 0, Points: 0, FieldMin: 0, FieldMax: 3, Disabled: false },
        POI: { Starting: 0, Max: 0, Points: 0, FieldMin: 0, FieldMax: 3, Disabled: false },
        INT: { Starting: 0, Max: 0, Points: 0, FieldMin: 0, FieldMax: 3, Disabled: false },
        ARC: { Starting: 0, Max: 0, Points: 0, FieldMin: 0, FieldMax: 3, Disabled: false },
        PER: { Starting: 0, Max: 0, Points: 0, FieldMin: 0, FieldMax: 3, Disabled: false }
    };
    $scope.Language1Required = false;
    $scope.Language1Choices = [];
    $scope.Language2Required = false;
    $scope.Language2Choices = [];
    $scope.Language3Required = false;
    $scope.Language3Choices = [];
    $scope.Career1MSkillsRequired = false;
    $scope.Career1MSkillsCBs = [];
    $scope.Career1MSkillsChosen = [];
    $scope.Career2MSkillsRequired = false;
    $scope.Career2MSkillsCBs = [];
    $scope.Career2MSkillsChosen = [];
    $scope.Career1OSkillsRequired = false;
    $scope.Career1OSkillsCBs = [];
    $scope.Career1OSkillsChosen = [];
    $scope.Career2OSkillsRequired = false;
    $scope.Career2OSkillsCBs = [];
    $scope.Career2OSkillsChosen = [];
    $scope.Career1AssetsRequired = false;
    $scope.Career1AssetChoiceCBs = [];
    $scope.Career1AssetsChosen = [];
    $scope.Career2AssetsRequired = false;
    $scope.Career2AssetChoiceCBs = [];
    $scope.Career2AssetsChosen = [];
    $scope.HRAbilityC1 = false;
    $scope.HRAbilityC2 = false;
    $scope.HRAbility = false;
    $scope.HRAbCareer1List = [];
    $scope.HRAbCareer2List = [];
    $scope.HRCareer1AbToReplace = null;
    $scope.HRCareer1AbReplacedWith = null;
    $scope.HRCareer2AbToReplace = null;
    $scope.HRCareer2AbReplacedWith = null;
    $scope.HRMSkillC1 = false;
    $scope.HRMSkillC2 = false;
    $scope.HRMSkill = false;
    $scope.HRMSkillCareer1List = [];
    $scope.HRMSkillCareer2List = [];
    $scope.HRCareer1MSkillToReplace = null;
    $scope.HRCareer1MSkillReplacedWith = null;
    $scope.HRCareer2MSkillToReplace = null;
    $scope.HRCareer2MSkillReplacedWith = null;
    $scope.HROSkillC1 = false;
    $scope.HROSkillC2 = false;
    $scope.HROSkill = false;
    $scope.HROSkillCareer1List = [];
    $scope.HROSkillCareer2List = [];
    $scope.HRCareer1OSkillToReplace = null;
    $scope.HRCareer1OSkillReplacedWith = null;
    $scope.HRCareer2OSkillToReplace = null;
    $scope.HRCareer2OSkillReplacedWith = null;
    $scope.HRSpellC1 = false;
    $scope.HRSpellC2 = false;
    $scope.HRSpell = false;
    $scope.HRSpellCareer1List = [];
    $scope.HRSpellCareer2List = [];
    $scope.HRCareer1SpellToReplace = null;
    $scope.HRCareer1SpellReplacedWith = null;
    $scope.HRCareer2SpellToReplace = null;
    $scope.HRCareer2SpellReplacedWith = null;

    $scope.Races = raceArr;
    $scope.Archetypes = archArr; 
    $scope.Careers = careerArr;
    $scope.Abilities = abilArr;
    $scope.GeneralSkills = genSkillsArr;
    $scope.Spells = spellsArr;

    // Initial function to load character.
    $scope.GetChar = function(CharID) {
        $scope.CharacterID = CharID;

        $http.post($scope.Url, { ReqType: 'GetChar', CharacterID: CharID }).success(function(data, status) {
            if (typeof data !== 'object') {
                $scope.Error = data;
            } else {
                $scope.CharacterRow = data;
                $scope.Character = JSON.parse($scope.CharacterRow.CharacterJSON);
                loadCharacterDefaults();
            }
        }).error(function(data, status) {
            if (data !== null) {
                $scope.Error = data;
            } else {
                $scope.Error = 'Request failed. Status: ' + status;
            }
        });
    }

    $scope.checkError = function() {
        if ($scope.Error !== null) {
            return true;
        } else {
            return false;
        }
    }

    loadCharacterDefaults = function() {
        $scope.Character.LanguagesChosen = [null, null, null];
        
        // Load benefits into scope from Archetype.
        for (a = 0; a < $scope.Archetypes.length; a++) {
            if ($scope.Archetypes[a].Name == $scope.Character.Archetype) {
                if ('ArcaneTradition' in $scope.Character) {
                    for (a1 = 0; a1 < $scope.Archetypes[a].Benefits.length; a1++) {
                        if (!('ReqArcaneTradition' in $scope.Archetypes[a].Benefits[a1]) || $scope.Archetypes[a].Benefits[a1].ReqArcaneTradition == $scope.Character.ArcaneTradition) {
                            $scope.Benefits.push($scope.Archetypes[a].Benefits[a1]);
                        }
                    }
                } else {
                    $scope.Benefits = $scope.Archetypes[a].Benefits;
                    break;
                }
            }
        }

        // Load race into scope. 
        for (b = 0; b < $scope.Races.length; b++) {
            if ($scope.Races[b].Name == $scope.Character.Race) {
                $scope.Race = $scope.Races[b];
                break;
            }
        }
        
        // Create racial benefits list (if exists).
        if ('Benefits' in $scope.Race) {
            for (c = 0; c < $scope.Race.Benefits.length; c++) {
                if ($scope.RacialBenefits === null) {
                    $scope.RacialBenefits = $scope.Race.Benefits[c];
                } else {
                    $scope.RacialBenefits += ', ' + $scope.Race.Benefits[c];
                }
            }
        }

        // If they get a language from their race, create the languages list and make required.
        if ($scope.Race.LangChoices > 0) {
            $scope.Language1Required = true;
            
            for (g = 0; g < langArr.length; g++) {
                if ('StartLangs' in $scope.Race) {
                    if ($scope.Race.StartLangs.indexOf(langArr[g]) == -1) {
                        $scope.Language1Choices.push(langArr[g]);
                    }
                } else {
                    $scope.Language1Choices.push(langArr[g]);
                }
            }
        }

        if ($scope.Race.LangChoices > 1) {
            $scope.Language2Required = true;
        }

        if ($scope.Race.LangChoices > 2) {
            $scope.Language3Required = true;
        }

        // If they get racial connections, create the Connections array and add them to it. 
        if ('Connections' in $scope.Race) {
            $scope.Connections = true;
            $scope.Character.Connections = [];

            for (var i = 0; i < $scope.Race.Connections.length; i++) {
                $scope.Character.Connections.push($scope.Race.Connections[i]);
            }

            $scope.Character.Connections.sort(byName);
        }

        // If they get a racial stat bonus choice, make it required.
        if ($scope.Race.StatIncreaseChoices > 0) {
            $scope.RacialStatIncreaseRequired = true;
            $scope.Character.RacialStatIncreaseChosen = null;
        }

        // Load the careers into the scope.
        for (d = 0; d < $scope.Careers.length; d++) {
            if ($scope.Careers[d].Name == $scope.Character.Career1) {
                $scope.Career1 = $scope.Careers[d];
            } else if ($scope.Careers[d].Name == $scope.Character.Career2) {
                $scope.Career2 = $scope.Careers[d];
            }
        }

        // If they get benefits from either career, create the CareerBenefits list and add them to it.
        if ('FreeBenefits' in $scope.Career1) {
            for (e = 0; e < $scope.Career1.FreeBenefits.length; e++) {
                if ($scope.CareerBenefits === null) {
                    $scope.CareerBenefits = $scope.Career1.FreeBenefits[e];
                } else {
                    $scope.CareerBenefits += ', ' + $scope.Career1.FreeBenefits[e];
                }
            }
        }
            
        if ('FreeBenefits' in $scope.Career2) {
            for (f = 0; f < $scope.Career2.FreeBenefits.length; f++) {
                if ($scope.CareerBenefits === null) {
                    $scope.CareerBenefits = $scope.Career2.FreeBenefits[f];
                } else {
                    $scope.CareerBenefits += ', ' + $scope.Career2.FreeBenefits[f];
                }
            }
        }

        // If they get starting abilities from either career, create the CareerAbilities list and add them to it.
        if ('StartingAbilities' in $scope.Career1) {
            for (f1 = 0; f1 < $scope.Career1.StartingAbilities.length; f1++) {
                if ($scope.CareerAbilities === null) {
                    $scope.CareerAbilities = $scope.Career1.StartingAbilities[f1];
                } else {
                    $scope.CareerAbilities += ', ' + $scope.Career1.StartingAbilities[f1];
                }
            }
        }

        if ('StartingAbilities' in $scope.Career2) {
            for (f2 = 0; f2 < $scope.Career2.StartingAbilities.length; f2++) {
                if ($scope.CareerAbilities === null) {
                    $scope.CareerAbilities = $scope.Career2.StartingAbilities[f2];
                } else {
                    $scope.CareerAbilities += ', ' + $scope.Career2.StartingAbilities[f2];
                }
            }
        }

        // If they get to choose starting skills, build the checkbox lists for them.
        if ($scope.Career1.StartingMSkillChoices > 0) {
            $scope.Career1MSkillsRequired = true;

            for (var i = 0; i < $scope.Career1.StartingMSkillChoicesOptions.length; i++) {
                $scope.Career1MSkillsCBs.push({ Name: $scope.Career1.StartingMSkillChoicesOptions[i].Name, Level: $scope.Career1.StartingMSkillChoicesOptions[i].Level, Checked: false, Disabled: false });
            }
            
            $scope.Career1MSkillsCBs.sort(byName);
        }

        if ($scope.Career1.StartingOSkillChoices > 0) {
            $scope.Career1OSkillsRequired = true;
        
            for (var i = 0; i < $scope.Career1.StartingOSkillChoicesOptions.length; i++) {
                if ('Property' in $scope.Career1.StartingOSkillChoicesOptions[i]) {
                    $scope.Career1OSkillsCBs.push({ Name: $scope.Career1.StartingOSkillChoicesOptions[i].Name, Level: $scope.Career1.StartingOSkillChoicesOptions[i].Level, Type: $scope.Career1.StartingOSkillChoicesOptions[i].Type, Property: $scope.Career1.StartingOSkillChoicesOptions[i].Property, Checked: false, Disabled: false });
                } else {
                    $scope.Career1OSkillsCBs.push({ Name: $scope.Career1.StartingOSkillChoicesOptions[i].Name, Level: $scope.Career1.StartingOSkillChoicesOptions[i].Level, Checked: false, Disabled: false });
                }
            }

            $scope.Career1OSkillsCBs.sort(byName);
        }

        if ($scope.Career2.StartingMSkillChoices > 0) {
            $scope.Career2MSkillsRequired = true;
        
            for (var i = 0; i < $scope.Career2.StartingMSkillChoicesOptions.length; i++) {
                $scope.Career2MSkillsCBs.push({ Name: $scope.Career2.StartingMSkillChoicesOptions[i].Name, Level: $scope.Career2.StartingMSkillChoicesOptions[i].Level, Checked: false, Disabled: false });
            }

            $scope.Career2MSkillsCBs.sort(byName);
        }
        
        if ($scope.Career2.StartingOSkillChoices > 0) {
            $scope.Career2OSkillsRequired = true;
        
            for (var i = 0; i < $scope.Career2.StartingOSkillChoicesOptions.length; i++) {
                if ('Property' in $scope.Career2.StartingOSkillChoicesOptions[i]) {
                    $scope.Career2OSkillsCBs.push({ Name: $scope.Career2.StartingOSkillChoicesOptions[i].Name, Level: $scope.Career2.StartingOSkillChoicesOptions[i].Level, Type: $scope.Career2OSkillChoicesOptions[i].Type, Property: $scope.Career2OSkillChoicesOptions[i].Property, Checked: false, Disabled: false });
                } else {
                    $scope.Career2OSkillsCBs.push({ Name: $scope.Career2.StartingOSkillChoicesOptions[i].Name, Level: $scope.Career2.StartingOSkillChoicesOptions[i].Level, Checked: false, Disabled: false });
                }
            }

            $scope.Career2OSkillsCBs.sort(byName);
        }

        // If they have starting connections in their careers, check to see if the connections list
        // exists. If not, create it. Either way, add the connections to the connections list.
        if ('StartingConnections' in $scope.Career1) {
            $scope.Connections = true;

            if (!('Connections' in $scope.Character)) {
                $scope.Character.Connections = [];
            }

            for (var i = 0; i < $scope.Career1.Connections; i++) {
                $scope.Character.Connections.push($scope.Career1.Connections[i]);
            }

            $scope.Character.Connections.sort(byName);
        }

        if ('StartingConnections' in $scope.Career2) {
            $scope.Connections = true;

            if (!('Connections' in $scope.Character)) {
                $scope.Character.Connections = [];
            }

            for (var i = 0; i < $scope.Career2.Connections; i++) {
                $scope.Character.Connections.push($scope.Career2.Connections[i]);
            }

            $scope.Character.Connections.sort(byName);
        }

        // If the user gets to choose starting assets, make them required and build the list of checkboxes.
        if ($scope.Career1.StartingAssetChoices > 0) {
            $scope.Career1AssetsRequired = true;
        
            for (var i = 0; i < $scope.Career1.StartingAssetChoiceOptions.length; i++) {
                $scope.Career1AssetChoiceCBs.push({ Name: $scope.Career1.StartingAssetChoiceOptions[i], Checked: false, Disabled: false });
            }
        }

        if ($scope.Career2.StartingAssetChoices > 0) {
            $scope.Career2AssetsRequired = true;
        
            for (i = 0; i < $scope.Career2.StartingAssetChoiceOptions.length; i++) {
                $scope.Career2AssetChoiceCBs.push({ Name: $scope.Career2.StartingAssetChoiceOptions[i], Checked: false, Disabled: false });
            } 
        }
        
        // Create the Advancement Point field models.
        setAPFields();

        // Check for starting abilities and, if found, add the house rule for swapping them.
        if ('StartingAbilities' in $scope.Career1 && ($scope.Career1.StartingAbilities.length < $scope.Career1.Abilities.length)) {
            $scope.HRAbilityC1 = true;
            $scope.HRAbility = true;
        }
        
        if ('StartingAbilities' in $scope.Career2 && ($scope.Career2.StartingAbilities.length < $scope.Career2.Abilities.length)) {
            $scope.HRAbilityC2 = true;
            $scope.HRAbility = true;
        }

        // Check for Military and Occupational skills and, if found, add the house rules for swapping them.
        if ('StartingMilitarySkills' in $scope.Career1) {
            for (var i = 0; i < $scope.Career1.MilitarySkills.length; i++) {
                found = false;

                for (var i2 = 0; i2 < $scope.Career1.StartingMilitarySkills.length; i2++) {
                    if ($scope.Career1.MilitarySkills[i].Name == $scope.Career1.StartingMilitarySkills[i2].Name) {
                        found = true;
                    }
                }

                if (!found) {
                    $scope.HRMSkillC1 = true;
                    $scope.HRMSkill = true;
                    break;
                }
            }
        }
        
        if ('StartingMilitarySkills' in $scope.Career2) {
            for (var i = 0; i < $scope.Career2.MilitarySkills.length; i++) {
                found = false;

                for (var i2 = 0; i2 < $scope.Career2.StartingMilitarySkills.length; i2++) {
                    if ($scope.Career2.MilitarySkills[i].Name == $scope.Career2.StartingMilitarySkills[i2].Name) {
                        found = true;
                    }
                }

                if (!found) {
                    $scope.HRMSkillC2 = true;
                    $scope.HRMSkill = true;
                    break;
                }
            }
        }

        if ('StartingOccupationalSkills' in $scope.Career1) {
            for (var i = 0; i < $scope.Career1.OccupationalSkills.length; i++) {
                found = false;

                for (var i2 = 0; i2 < $scope.Career1.StartingOccupationalSkills.length; i2++) {
                    if ($scope.Career1.OccupationalSkills[i].Name == $scope.Career1.StartingOccupationalSkills[i2].Name) {
                        found = true;
                    }
                }

                if (!found) {
                    $scope.HROSkillC1 = true;
                    $scope.HROSkill = true;
                    break;
                }
            }
        }
        
        if ('StartingOccupationalSkills' in $scope.Career2) {
            for (var i = 0; i < $scope.Career2.OccupationalSkills.length; i++) {
                found = false;

                for (var i2 = 0; i2 < $scope.Career2.StartingOccupationalSkills.length; i2++) {
                    if ($scope.Career2.OccupationalSkills[i].Name == $scope.Career2.StartingOccupationalSkills[i2].Name) {
                        found = true;
                    }
                }

                if (!found) {
                    $scope.HROSkillC2 = true;
                    $scope.HROSkill = true;
                    break;
                }
            }
        }

        // Check for starting spells and, if found, add the house rule for swapping them.
        if ('StartingSpells' in $scope.Career1) {
            $scope.HRSpellC1 = true;
            $scope.HRSpell = true;
        }
        
        if ('StartingSpells' in $scope.Career2) {
            $scope.HRSpellC2 = true;
            $scope.HRSpell = true;
        }
    }

    $scope.checkBenefit = function() {
        if ($scope.Benefit === null) {
            return false;
        } else {
            return true;
        }
    }

    $scope.checkRacialStatIncrease = function() {
        if ($scope.Character === nulll || !('RacialStatIncreaseChosen' in $scope.Character) || $scope.Character.RacialStatIncreaseChosen === null) {
            return false;
        } else {
            return true;
        }
    }

    $scope.selectRacialStatIncrease = function() {
        if ($scope.Character !== null && $scope.Character.RacialStatIncreaseChosen !== null) {
            setAPFields();
        }
    }

    $scope.showAP = function() {
        if (!$scope.RacialStatIncreaseRequired) {
            return true;
        } else {
            if ($scope.Character === null || (('RacialStatIncreaseChosen' in $scope.Character) && $scope.Character.RacialStatIncreaseChosen === null)) {
                return false;
            } else {
                return true;
            }
        }
    }

    $scope.changeAP = function() {
        recalcAPs();
    }

    function setAPFields() {
        $scope.APFields.PHY.Starting = $scope.Race.Stats.PHY.Starting;
        $scope.APFields.SPD.Starting = $scope.Race.Stats.SPD.Starting;
        $scope.APFields.STR.Starting = $scope.Race.Stats.STR.Starting;
        $scope.APFields.AGL.Starting = $scope.Race.Stats.AGL.Starting;
        $scope.APFields.PRW.Starting = $scope.Race.Stats.PRW.Starting;
        $scope.APFields.POI.Starting = $scope.Race.Stats.POI.Starting;
        $scope.APFields.INT.Starting = $scope.Race.Stats.INT.Starting;
        
        if ($scope.Character.Archetype == 'Gifted') {
            if ($scope.Character.ArcaneTradition == 'Focuser') {
                $scope.APFields.ARC.Starting = 2;
            } else {
                $scope.APFields.ARC.Starting = 3;
            }
        } else {
            $scope.APFields.ARC.Starting = '-';
            $scope.APFields.ARC.Disabled = true;
        }

        $scope.APFields.PER.Starting = $scope.Race.Stats.PER.Starting;

        $scope.APFields.PHY.Max = $scope.Race.Stats.PHY.MaxHero;
        $scope.APFields.SPD.Max = $scope.Race.Stats.SPD.MaxHero;
        $scope.APFields.STR.Max = $scope.Race.Stats.STR.MaxHero;
        $scope.APFields.AGL.Max = $scope.Race.Stats.AGL.MaxHero;
        $scope.APFields.PRW.Max = $scope.Race.Stats.PRW.MaxHero;
        $scope.APFields.POI.Max = $scope.Race.Stats.POI.MaxHero;
        $scope.APFields.INT.Max = $scope.Race.Stats.INT.MaxHero;

        if ($scope.Character.Archetype == 'Gifted') {
            $scope.APFields.ARC.Max = $scope.Race.Stats.ARC.MaxHero;
        } else {
            $scope.APFields.ARC.Max = '-';
        }

        $scope.APFields.PER.Max = $scope.Race.Stats.PER.MaxHero;

        if ('StatIncreases' in $scope.Race) {
            for (g1 = 0; g1 < $scope.Race.StatIncreases.length; g1++) {
                switch($scope.Race.StatIncreases[g1]) {
                    case 'PHY':
                        $scope.APFields.PHY.Starting += 1;
                        break;
                    case 'SPD':
                        $scope.APFields.SPD.Starting += 1;
                        break;
                    case 'STR':
                        $scope.APFields.STR.Starting += 1;
                        break;
                    case 'AGL':
                        $scope.APFields.AGL.Starting += 1;
                        break;
                    case 'PRW':
                        $scope.APFields.PRW.Starting += 1;
                        break;
                    case 'POI':
                        $scope.APFields.POI.Starting += 1;
                        break;
                    case 'INT':
                        $scope.APFields.INT.Starting += 1;
                        break;
                    case 'ARC':
                        $scope.APFields.ARC.Starting += 1;
                        break;
                    case 'PER':
                        $scope.APFields.PER.Starting += 1;
                        break;
                }
            }
        }

        if ($scope.Character.RacialStatIncreaseChosen !== null) {
            switch($scope.Character.RacialStatIncreaseChosen) {
                case 'PHY':
                    $scope.APFields.PHY.Starting += 1;
                    break;
                case 'SPD':
                    $scope.APFields.SPD.Starting += 1;
                    break;
                case 'STR':
                    $scope.APFields.STR.Starting += 1;
                    break;
                case 'AGL':
                    $scope.APFields.AGL.Starting += 1;
                    break;
                case 'PRW':
                    $scope.APFields.PRW.Starting += 1;
                    break;
                case 'POI':
                    $scope.APFields.POI.Starting += 1;
                    break;
                case 'INT':
                    $scope.APFields.INT.Starting += 1;
                    break;
                case 'ARC':
                    $scope.APFields.ARC.Starting += 1;
                    break;
                case 'PER':
                    $scope.APFields.PER.Starting += 1;
                    break;
            }
        }

        if ('StatIncreases' in $scope.Career1) {
            for (a = 0; a < $scope.Career1.StatIncreases.length; a++) {
                $scope.APFields[$scope.Career1.StatIncreases[a][0]].Starting += $scope.Career1.StatIncreases[a][1];
            }
        }

        if ('StatIncreases' in $scope.Career2) {
            for (b = 0; b < $scope.Career2.StatIncreases.length; b++) {
                $scope.APFields[$scope.Career2.StatIncreases[b][0]].Starting += $scope.Career2.StatIncreases[b][1];
            }
        }

        if ('StatMaxIncreases' in $scope.Career1) {
            for (c = 0; c < $scope.Career1.StatMaxIncreases.Hero.length; c++) {
                $scope.APFields[$scope.Career1.StatMaxIncreases.Hero[c][0]].Max += $scope.Career1.StatMaxIncreases.Hero[c][1];
            }
        }

        if ('StatMaxIncreases' in $scope.Career2) {
            for (d = 0; d < $scope.Career2.StatMaxIncreases.Hero.length; d++) {
                $scope.APFields[$scope.Career2.StatMaxIncreases.Hero[d][0]].Max += $scope.Career2.StatMaxIncreases.Hero[d][1];
            }
        }

        recalcAPs();
    }

    function recalcAPs() {
        totalAPs = 0;

        for (var stat in $scope.APFields) {
            if ($scope.APFields.hasOwnProperty(stat)) {
                totalAPs += parseInt($scope.APFields[stat].Points);
            }
        }

        $scope.AdvancementPoints = 3 - totalAPs;
       
        fieldLowered = false;

        for (var stat in $scope.APFields) {
            if ($scope.APFields.hasOwnProperty(stat)) {
                if (stat == 'ARC') {
                    if ($scope.Character.Archetype != 'Gifted') {
                        $scope.APFields[stat].Disabled = true;
                    } else {
                        if ($scope.AdvancementPoints == 0) {
                            if ($scope.APFields[stat].Points == 0) {
                                $scope.APFields[stat].FieldMax = 0;
                                $scope.APFields[stat].Disabled = true;
                            } else {
                                $scope.APFields[stat].FieldMax = $scope.APFields[stat].Points;
                                $scope.APFields[stat].Disabled = false;
                            }
                        } else {
                            $scope.APFields[stat].FieldMax = Math.min(($scope.APFields[stat].Max - $scope.APFields[stat].Starting), 3);
                            $scope.APFields[stat].Disabled = false;
                        }
                    }
                } else {
                    if ($scope.APFields[stat].Points > ($scope.APFields[stat].Max - $scope.APFields[stat].Starting)) {
                        $scope.APFields[stat].FieldMax = $scope.APFields[stat].Max - $scope.APFields[stat].Starting;
                        $scope.APFields[stat].Points = $scope.APFields[stat].FieldMax;
                        fieldLowered = true;
                        break;
                    } else {
                        if ($scope.AdvancementPoints == 0) {
                            if ($scope.APFields[stat].Points == 0) {
                                $scope.APFields[stat].FieldMax = 0;
                                $scope.APFields[stat].Disabled = true;
                            } else {
                                $scope.APFields[stat].FieldMax = $scope.APFields[stat].Points;
                                $scope.APFields[stat].Disabled = false;
                            }
                        } else {
                            $scope.APFields[stat].FieldMax = Math.min(($scope.APFields[stat].Max - $scope.APFields[stat].Starting), 3);
                            $scope.APFields[stat].Disabled = false;
                        }
                    }
                }
            }
        }

        if (fieldLowered) {
            recalcAPs();
        }
    }

    $scope.checkLang1 = function() {
        if ($scope.Character === null || $scope.Character.LanguagesChosen[0] === null) {
            return false;
        } else {
            return true;
        }
    }

    $scope.selectLang1 = function() {
        if ($scope.Language2Required) {
            for (h = 0; h < $scope.Language1Choices.length; h++) {
                if ($scope.Language1Choices[h] !== $scope.Character.LanguagesChosen[0]) {
                    $scope.Language2Choices.push($scope.Language1Choices[h]);
                }
            }
        }
    }

    $scope.changeLang1 = function() {
        if ($scope.Character.LanguagesChosen[1] === null) {
            $scope.resetLang1();
        } else {
            $('#changeLang1').modal();
        }
    }

    $scope.resetLang1 = function() {
        $scope.Character.LanguagesChosen = [null, null, null];
        $scope.Language2Choices = [];
        $scope.Language3Choices = [];
    }

    $scope.showLang2 = function() {
        if ($scope.Language2Required && $scope.Character.LanguagesChosen[0] !== null) {
            return true;
        } else {
            return false;
        }
    }

    $scope.selectLang2 = function() {
        if ($scope.Language3Required) {
            for (i = 0; i < $scope.Language2Choices.legnth; i++) {
                if ($scope.Language2Choices[i] !== $scope.Character.LanguagesChosen[1]) {
                    $scope.Language3Choices.push($scope.Language2Choices[i]);
                }
            }
        }
    }

    $scope.changeLang2 = function() {
        if ($scope.Character.LanguagesChosen[2] === null) {
            $scope.resetLang2();
        } else {
            $('#changeLang2').modal();
        }
    }

    $scope.resetLang2 = function() {
        $scope.Character.LanguagesChosen[1] = null;
        $scope.Character.LanguagesChosen[2] = null;
        $scope.Language3Choices = [];
    }

    $scope.checkLang2 = function() {
        if ($scope.Character === null || $scope.Character.LanguagesChosen[1] === null) {
            return false;
        } else {
            return true;
        }
    }

    $scope.checkRacialStatIncrease = function() {
        if ($scope.Character === null || !('RacialStatIncreaseChosen' in $scope.Character) || $scope.Character.RacialStatIncreaseChosen === null) {
            return false;
        } else {
            return true;
        }
    }

    $scope.checkCareer1MSkills = function() {
        if ($scope.Career1MSkillsRequired && $scope.Career1MSkillsChosen.length < $scope.Career1.StartingMSkillChoices) {
            return false;
        } else {
            return true;
        }
    }

    $scope.changeCareer1MSkill = function() {
        checked = 0;
        $scope.Career1MSkillsChosen = [];
        
        for (var i = 0; i < $scope.Career1MSkillsCBs.length; i++) {
            if ($scope.Career1MSkillsCBs[i].Checked) {
                checked++;
                $scope.Career1MSkillsChosen.push({ Name: $scope.Career1MSkillsCBs[i].Name, Level: $scope.Career1MSkillsCBs[i].Level });
            }
        }

        if (checked >= $scope.Career1.StartingMSkillChoices) {
            for (var i = 0; i < $scope.Career1MSkillsCBs.length; i++) {
                if (!$scope.Career1MSkillsCBs[i].Checked) {
                    $scope.Career1MSkillsCBs[i].Disabled = true;
                }
            }
        } else {
            for (var i = 0; i < $scope.Career1MSkillsCBs.length; i++) {
                $scope.Career1MSkillsCBs[i].Disabled = false;
            }
        }
    }

    $scope.checkCareer1OSkills = function() {
        if ($scope.Career1OSkillsRequired && $scope.Career1OSkillsChosen.length < $scope.Career1.StartingOSkillChoices) {
            return false;
        } else {
            return true;
        }
    }
    
    $scope.changeCareer1OSkill = function() {
        checked = 0;
        $scope.Career1OSkillsChosen = [];

        for (var i = 0; i < $scope.Career1OSkillsCBs.length; i++) {
            if ($scope.Career1OSkillsCBs[i].Checked) {
                checked++;

                if ('Property' in $scope.Career1OSkillsCBs[i]) {
                    $scope.Career1OSkillsChosen.push({ Name: $scope.Career1OSkillsCBs[i].Name, Level: $scope.Career1OSkillsCBs[i].Level, Property: $scope.Career1OSkillsCBs[i].Property });
                } else {
                    $scope.Career1OSkillsChosen.push({ Name: $scope.Career1OSkillsCBs[i].Name, Level: $scope.Career1OSkillsCBs[i].Level });
                }
            }
        }

        if (checked >= $scope.Career1.StartingOSkillChoices) {
            for (var i = 0; i < $scope.Career1OSkillsCBs.length; i++) {
                if (!$scope.Career1OSkillsCBs[i].Checked) {
                    $scope.Career1OSkillsCBs[i].Disabled = true;
                }
            }
        } else {
            for (var i = 0; i < $scope.Career1OSkillsCBs.length; i++) {
                $scope.Career1OSkillsCBs[i].Disabled = false;
            }
        }
    }

    $scope.checkCareer2MSkills = function() {
        if ($scope.Career2MSkillsRequired && $scope.Career2MSkillsChosen.length < $scope.Career2.StartingMSkillChoices) {
            return false;
        } else {
            return true;
        }
    }
    
    $scope.changeCareer2MSkill = function() {
        checked = 0;
        $scope.Career2MSkillsChosen = [];
        
        for (var i = 0; i < $scope.Career2MSkillsCBs.length; i++) {
            if ($scope.Career2MSkillsCBs[i].Checked) {
                checked++;
                $scope.Career2MSkillsChosen.push({ Name: $scope.Career2MSkillsCBs[i].Name, Level: $scope.Career2MSkillsCBs[i].Level });
            }
        }

        if (checked >= $scope.Career2.StartingMSkillChoices) {
            for (var i = 0; i < $scope.Career2MSkillsCBs.length; i++) {
                if (!$scope.Career2MSkillsCBs[i].Checked) {
                    $scope.Career2MSkillsCBs[i].Disabled = true;
                }
            }
        } else {
            for (var i = 0; i < $scope.Career2MSkillsCBs.length; i++) {
                $scope.Career2MSkillsCBs[i].Disabled = false;
            }
        }
    }

    $scope.checkCareer2OSkills = function() {
        if ($scope.Career2OSkillsRequired && $scope.Career2OSkillsChosen.length < $scope.Career2.StartingOSkillChoices) {
            return false;
        } else {
            return true;
        }
    }
    
    $scope.changeCareer2OSkill = function() {
        checked = 0;
        $scope.Career2OSkillsChosen = [];
        
        for (var i = 0; i < $scope.Career2OSkillsCBs.length; i++) {
            if ($scope.Career2OSkillsCBs[i].Checked) {
                checked++;

                if ('Property' in $scope.Career2OSkillsCBs[i]) {
                    $scope.Career2OSkillsChosen.push({ Name: $scope.Career2OSkillsCBs[i].Name, Level: $scope.Career2OSkillsCBs[i].Level, Property: $scope.Career2OSkillsCBs[i].Property });
                } else {
                    $scope.Career2OSkillsChosen.push({ Name: $scope.Career2OSkillsCBs[i].Name, Level: $scope.Career2OSkillsCBs[i].Level });
                }
            }
        }

        if (checked >= $scope.Career2.StartingOSkillChoices) {
            for (var i = 0; i < $scope.Career2OSkillsCBs.length; i++) {
                if (!$scope.Career2OSkillsCBs[i].Checked) {
                    $scope.Career2OSkillsCBs[i].Disabled = true;
                }
            }
        } else {
            for (var i = 0; i < $scope.Career2OSkillsCBs.length; i++) {
                $scope.Career2OSkillsCBs[i].Disabled = false;
            }
        }
    }

    $scope.checkGenericConnections = function() {
        if ($scope.Character == null || !('Connections' in $scope.Character)) {
            return false;
        } else {
            var generics = false;

            for (var i = 0; i < $scope.Character.Connections.length; i++) {
                if ($scope.Character.Connections[i].Type == 'Generic') {
                    generics = true;
                }
            }

            return generics;
        }
    }

    $scope.checkSpecificConnection = function(con) {
        if (con.Type == 'Specific') {
            return true;
        } else {
            return false;
        }
    }

    $scope.checkCareer1Assets = function() {
        if ($scope.Career1AssetsRequired && $scope.Career1AssetsChosen.length < $scope.Career1.StartingAssetChoices) {
            return false;
        } else {
            return true;
        }
    }

    $scope.changeCareer1AssetChoice = function() {
        checked = 0;
        $scope.Career1AssetsChosen = [];

        for (var i = 0; i < $scope.Career1AssetChoiceCBs.length; i++) {
            if ($scope.Career1AssetChoiceCBs[i].Checked) {
                checked++;
                $scope.Career1AssetsChosen.push($scope.Career1AssetChoiceCBs[i].Name)
            }
        }

        if (checked >= $scope.Career1.StartingAssetChoices) {
            for (var i = 0; i < $scope.Career1AssetChoiceCBs.length; i++) {
                if (!$scope.Career1AssetChoiceCBs[i].Checked) {
                    $scope.Career1AssetChoiceCBs[i].Disabled = true;
                }
            }
        } else {
            for (var i = 0; i < $scope.Career1AssetChoiceCBs.length; i++) {
                $scope.Career1AssetChoiceCBs[i].Disabled = false;
            }
        }
    }

    $scope.checkCareer2Assets = function() {
        if ($scope.Career2AssetsRequired && $scope.Career2AssetsChosen.length < $scope.Career2.StartingAssetChoices) {
            return false;
        } else {
            return true;
        }
    }
    
    $scope.changeCareer2AssetChoice = function() {
        checked = 0;
        $scope.Career2AssetsChosen = [];

        for (var i = 0; i < $scope.Career2AssetChoiceCBs.length; i++) {
            if ($scope.Career2AssetChoiceCBs[i].Checked) {
                checked++;
                $scope.Career2AssetsChosen.push($scope.Career2AssetChoiceCBs[i].Name)
            }
        }

        if (checked >= $scope.Career2.StartingAssetChoices) {
            for (var i = 0; i < $scope.Career2AssetChoiceCBs.length; i++) {
                if (!$scope.Career2AssetChoiceCBs[i].Checked) {
                    $scope.Career2AssetChoiceCBs[i].Disabled = true;
                }
            }
        } else {
            for (var i = 0; i < $scope.Career2AssetChoiceCBs.length; i++) {
                $scope.Career2AssetChoiceCBs[i].Disabled = false;
            }
        }
    }

    $scope.selectHRAbSwap = function() {
        if (!$scope.HRAbilityChecked) {
            $scope.HRCareer1AbToReplace = null;
            $scope.HRCareer1AbReplacedWith = null;
            $scope.HRCareer2AbToReplace = null;
            $scope.HRCareer2AbReplacedWith = null;
        }
    }

    $scope.checkHRAbCareer1From = function() {
        if ($scope.HRCareer1AbToReplace === null) {
            return false;
        } else {
            return true;
        }
    }

    $scope.selectHRAbCareer1From = function() {
        $scope.HRAbCareer1List = [];

        if ($scope.HRCareer1AbToReplace !== null) {
            for (j = 0; j < $scope.Career1.Abilities.length; j++) {
                if ($scope.Career1.Abilities[j].Name != $scope.HRCareer1AbToReplace.Name) {
                    $scope.HRAbCareer1List.push($scope.Career1.Abilities[j]);
                }
            }
        } else {
            $scope.HRCareer1AbReplacedWith = null;
        }
    }

    $scope.checkHRAbCareer2From = function() {
        if ($scope.HRCareer2AbToReplace === null) {
            return false;
        } else {
            return true;
        }
    }

    $scope.selectHRAbCareer2From = function() {
        $scope.HRAbCareer2List = [];

        if ($scope.HRCareer2AbToReplace !== null) {
            for (j = 0; j < $scope.Career2.Abilities.length; j++) {
                if ($scope.Career2.Abilities[j].Name != $scope.HRCareer2AbToReplace.Name) {
                    $scope.HRAbCareer2List.push($scope.Career2.Abilities[j]);
                }
            }
        } else {
            $scope.HRCareer2AbReplacedWith = null;
        }
    }
    
    $scope.selectHRMSkillSwap = function() {
        if (!$scope.HRMSkillChecked) {
            $scope.HRCareer1MSkillToReplace = null;
            $scope.HRCareer1MSkillReplacedWith = null;
            $scope.HRCareer2MSkillToReplace = null;
            $scope.HRCareer2MSkillReplacedWith = null;
        }
    }

    $scope.checkHRMSkillCareer1From = function() {
        if ($scope.HRCareer1MSkillToReplace === null) {
            return false;
        } else {
            return true;
        }
    }

    $scope.selectHRMSkillCareer1From = function() {
        $scope.HRMSkillCareer1List = [];

        if ($scope.HRCareer1MSkillToReplace !== null) {
            for (j = 0; j < $scope.Career1.MilitarySkills.length; j++) {
                if ($scope.Career1.MilitarySkills[j].Name != $scope.HRCareer1MSkillToReplace.Name) {
                    $scope.HRMSkillCareer1List.push($scope.Career1.MilitarySkills[j]);
                }
            }
        } else {
            $scope.HRCareer1MSkillReplacedWith = null;
        }
    }

    $scope.checkHRMSkillCareer2From = function() {
        if ($scope.HRCareer2MSkillToReplace === null) {
            return false;
        } else {
            return true;
        }
    }

    $scope.selectHRMSkillCareer2From = function() {
        $scope.HRMSkillCareer2List = [];

        if ($scope.HRCareer2MSkillToReplace !== null) {
            for (j = 0; j < $scope.Career2.MilitarySkills.length; j++) {
                if ($scope.Career2.MilitarySkills[j].Name != $scope.HRCareer2MSkillToReplace.Name) {
                    $scope.HRMSkillCareer2List.push($scope.Career2.MilitarySkills[j]);
                }
            }
        } else {
            $scope.HRCareer2MSkillReplacedWith = null;
        }
    }
    
    $scope.selectHROSkillSwap = function() {
        if (!$scope.HROSkillChecked) {
            $scope.HRCareer1OSkillToReplace = null;
            $scope.HRCareer1OSkillReplacedWith = null;
            $scope.HRCareer2OSkillToReplace = null;
            $scope.HRCareer2OSkillReplacedWith = null;
        }
    }

    $scope.checkHROSkillCareer1From = function() {
        if ($scope.HRCareer1OSkillToReplace === null) {
            return false;
        } else {
            return true;
        }
    }

    $scope.selectHROSkillCareer1From = function() {
        $scope.HROSkillCareer1List = [];

        if ($scope.HRCareer1OSkillToReplace !== null) {
            for (var i = 0; i < $scope.Career1.OccupationalSkills.length; i++) {
                if ($scope.Career1.OccupationalSkills[i].Name != $scope.HRCareer1OSkillToReplace.Name) {
                    if ($scope.Career1.OccupationalSkills[i].Name == 'General Skills') {
                        for (var i1 = 0; i1 < $scope.GeneralSkills.length; i1++) {
                            if ('HasProperty' in $scope.GeneralSkills[i1]) {
                                $scope.HROSkillCareer1List.push({ Name: $scope.GeneralSkills[i1].Name, Type: 'Generic', Property: 'any', Level: $scope.Career1.OccupationalSkills[i].Level });
                            } else {
                                $scope.HROSkillCareer1List.push({ Name: $scope.GeneralSkills[i1].Name, Level: $scope.Career1.OccupationalSkills[i].Level });
                            }
                        }
                    } else {
                        $scope.HROSkillCareer1List.push($scope.Career1.OccupationalSkills[i]);
                    }
                }
            }

            $scope.HROSkillCareer1List.sort(byName);
        } else {
            $scope.HRCareer1OSkillReplacedWith = null;
        }
    }

    $scope.checkHROSkillCareer2From = function() {
        if ($scope.HRCareer2OSkillToReplace === null) {
            return false;
        } else {
            return true;
        }
    }

    $scope.selectHROSkillCareer2From = function() {
        $scope.HROSkillCareer2List = [];

        if ($scope.HRCareer2OSkillToReplace !== null) {
            for (var i = 0; i < $scope.Career2.OccupationalSkills.length; i++) {
                if ($scope.Career2.OccupationalSkills[i].Name != $scope.HRCareer2OSkillToReplace.Name) {
                    if ($scope.Career2.OccupationalSkills[i].Name == 'General Skills') {
                        for (var i1 = 0; i1 < $scope.GeneralSkills.length; i1++) {
                            if ('HasProperty' in $scope.GeneralSkills[i1]) {
                                $scope.HROSkillCareer2List.push({ Name: $scope.GeneralSkills[i1].Name, Type: 'Generic', Property: 'any', Level: $scope.Career2.OccupationalSkills[i].Level });
                            } else {
                                $scope.HROSkillCareer2List.push({ Name: $scope.GeneralSkills[i1].Name, Level: $scope.Career2.OccupationalSkills[i].Level });
                            }
                        }
                    } else {
                        $scope.HROSkillCareer2List.push($scope.Career2.OccupationalSkills[i]);
                    }
                }
            }

            $scope.HROSkillCareer2List.sort(byName);
        } else {
            $scope.HRCareer2OSkillReplacedWith = null;
        }
    }

    $scope.selectHRSpellSwap = function() {
        if (!$scope.HRSpellChecked) {
            $scope.HRCareer1SpellToReplace = null;
            $scope.HRCareer1SpellReplacedWith = null;
            $scope.HRCareer2SpellToReplace = null;
            $scope.HRCareer2SpellReplacedWith = null;
        }
    }

    $scope.checkHRSpellCareer1From = function() {
        if ($scope.HRCareer1SpellToReplace === null) {
            return false;
        } else {
            return true;
        }
    }

    $scope.selectHRSpellCareer1From = function() {
        $scope.HRSpellCareer1List = [];

        if ($scope.HRCareer1SpellToReplace !== null) {
            for (var i = 0; i < $scope.Career1.SpellList.length; i++) {
                for (var i2 = 0; i2 < $scope.Spells.length; i2++) {
                    if ($scope.Career1.SpellList[i] == $scope.Spells[i2].Name) {
                        if ($scope.Spells[i2].Cost <= 2) {
                            $scope.HRSpellCareer1List.push($scope.Career1.SpellList[i]);
                        }
                    }
                }
            }
            
            $scope.HRSpellCareer1List.sort();
        } else {
            $scope.HRCareer1SpellReplacedWith = null;
        }
    }

    $scope.checkHRSpellCareer2From = function() {
        if ($scope.HRCareer2SpellToReplace === null) {
            return false;
        } else {
            return true;
        }
    }

    $scope.selectHRSpellCareer2From = function() {
        $scope.HRSpellCareer2List = [];

        if ($scope.HRCareer2SpellToReplace !== null) {
            for (var i = 0; i < $scope.Career2.SpellList.length; i++) {
                for (var i2 = 0; i2 < $scope.Spells.length; i2++) {
                    if ($scope.Career2.SpellList[i] == $scope.Spells[i2].Name) {
                        if ($scope.Spells[i2].Cost <= 2) {
                            $scope.HRSpellCareer2List.push($scope.Career2.SpellList[i]);
                        }
                    }
                }
            }

            $scope.HRSpellCareer2List.sort();
        } else {
            $scope.HRCareer2SpellReplacedWith = null;
        }
    }

    $scope.checkError = function() {
        if ($scope.Error !== null) {
            return true;
        } else {
            return false;
        }
    }

    $scope.cancelConfirm = function() {
        $("#cancelConfirm").modal();
    }

    $scope.returnToHome = function() {
        window.location.href = '/index.php';
    }

    $scope.submitCheck = function() {
        disableSubmit = false;

        if ($scope.Character === null) {
            disableSubmit = true;
        } else {
            if ($scope.Benefit === null) {
                disableSubmit = true;
            }

            if ($scope.Language1Required && $scope.Character.LanguagesChosen[0] === null) {
                disableSubmit = true;
            }

            if ($scope.Language2Required && $scope.Character.LanguagesChosen[1] === null) {
                disableSubmit = true;
            }

            if ($scope.Language3Required && $scope.Character.LanguagesChosen[2] === null) {
                disableSubmit = true;
            }

            if ($scope.RacialStatIncreaseRequired && $scope.Character.RacialStatIncreaseChosen === null) {
                disableSubmit = true;
            }

            if ($scope.Career1MSkillsRequired && $scope.Career1MSkillsChosen.length < $scope.Career1.StartingMSkillChoices) {
                disableSubmit = true;
            }

            if ($scope.Career1OSkillsRequired && $scope.Career1OSkillsChosen.length < $scope.Career1.StartingOSkillChoices) {
                disableSubmit = true;
            }

            if ($scope.Career2MSkillsRequired && $scope.Career2MSkillsChosen.length < $scope.Career2.StartingMSkillChoices) {
                disableSubmit = true;
            }

            if ($scope.Career2OSkillsRequired && $scope.Career2OSkillsChosen.length < $scope.Career2.StartingOSkillChoices) {
                disableSubmit = true;
            }

            if ($scope.Career1AssetsRequired && $scope.Career1AssetsChosen.length < $scope.Career1.StartingAssetChoices) {
                disableSubmit = true;
            }

            if ($scope.Career2AssetsRequired && $scope.Career2AssetsChosen.length < $scope.Career2.StartingAssetChoices) {
                disableSubmit = true;
            }

            if ($scope.AdvancementPoints != 0) {
                disableSubmit = true;
            }

            if ($scope.HRCareer1AbToReplace !== null && $scope.HRCareer1AbReplacedWith === null) {
                disableSubmit = true;
            }

            if ($scope.HRCareer2AbToReplace !== null && $scope.HRCareer2AbReplacedWith === null) {
                disableSubmit = true;
            }

            if ($scope.HRCareer1OSkillToReplace !== null && $scope.HRCareer1OSkillReplacedWith === null) {
                disableSubmit = true;
            }

            if ($scope.HRCareer2OSkillToReplace !== null && $scope.HRCareer2OSkillReplacedWith === null) {
                disableSubmit = true;
            }

            if ($scope.HRCareer1MSkillToReplace !== null && $scope.HRCareer1MSkillReplacedWith === null) {
                disableSubmit = true;
            }

            if ($scope.HRCareer2MSkillToReplace !== null && $scope.HRCareer2MSkillReplacedWith === null) {
                disableSubmit = true;
            }

            if ($scope.HRCareer1SpellToReplace !== null && $scope.HRCareer1SpellReplacedWith === null) {
                disableSubmit = true;
            }

            if ($scope.HRCareer2SpellToReplace !== null && $scope.HRCareer2SpellReplacedWith === null) {
                disableSubmit = true;
            }
        }

        return disableSubmit;
    }

    $scope.UpdateChar = function() {
        for (var stat in $scope.APFields) {
            if ($scope.APFields.hasOwnProperty(stat)) {
                if ($scope.APFields[stat].Points == 1) {
                    if ($scope.Character.AP1Stat == null) {
                        $scope.Character.AP1Stat = stat;
                    } else if ($scope.Character.AP2Stat == null) {
                        $scope.Character.AP2Stat = stat;
                    } else if ($scope.Character.AP3Stat == null) {
                        $scope.Character.AP3Stat = stat;
                    }
                } else if ($scope.APFields[stat].Points == 2) {
                    if ($scope.Character.AP1Stat == null) {
                        $scope.Character.AP1Stat = stat;
                        $scope.Character.AP2Stat = stat;
                    } else if ($scope.Character.AP2Stat = null) {
                        $scope.Character.AP2Stat = stat;
                        $scope.Character.AP3Stat = stat;
                    }
                } else if ($scope.APFields[stat].Points == 3) {
                    if ($scope.Character.AP1Stat == null) {
                        $scope.Character.AP1Stat = stat;
                        $scope.Character.AP2Stat = stat;
                        $scope.Character.AP3Stat = stat;
                    }
                }
            }
        }

        // Create the benefits list.
        $scope.Character.Benefits = [];
        $scope.Character.Benefits.push({ Name: $scope.Benefit.Name });
        
        if ('Benefits' in $scope.Race) {
            for (var i = 0; i < $scope.Race.Benefits.length; i++) {
                var found = false;

                for (var i1 = 0; i1 < $scope.Character.Benefits.length; i1++) {
                    if ($scope.Race.Benefits[i].Name == $scope.Character.Benefits[i1].Name) {
                        for (var i2 = 0; i2 < $scope.Archetypes.length; i2++) {
                            for (var i3 = 0; i3 < $scope.Archetypes[i2].Benefits.length; i3++) {
                                if ($scope.Archetypes[i2].Benefits[i3].Name == $scope.Race.Benefits[i].Name) {
                                    if (!('HasProperty' in $scope.Archetypes[i2].Benefits[i3])) {
                                        found = true;
                                    }
                                }
                            }
                        }
                    }
                }

                if (!found) {
                    $scope.Character.Benefits.push({ Name: $scope.Race.Benefits[i].Name });
                }
            }
        }

        if ('FreeBenefits' in $scope.Career1) {
            for (var i = 0; i < $scope.Career1.FreeBenefits.length; i++) {
                var found = false;

                for (var i1 = 0; i1 < $scope.Character.Benefits.length; i1++) {
                    if ($scope.Career1.FreeBenefits[i].Name == $scope.Character.Benefits[i1].Name) {
                        for (var i2 = 0; i2 < $scope.Archetypes.length; i2++) {
                            for (var i3 = 0; i3 < $scope.Archetypes[i2].Benefits.length; i3++) {
                                if ($scope.Archetypes[i2].Benefits[i3].Name == $scope.Career1.FreeBenefits[i].Name) {
                                    if (!('HasProperty' in $scope.Archetypes[i2].Benefits[i3])) {
                                        found = true;
                                    }
                                }
                            }
                        }
                    }
                }

                if (!found) {
                    $scope.Character.Benefits.push({ Name: $scope.Career1.FreeBenefits[i].Name });
                }
            }
        }

        if ('FreeBenefits' in $scope.Career2) {
            for (var i = 0; i < $scope.Career2.FreeBenefits.length; i++) {
                var found = false;
                
                for (var i1 = 0; i1 < $scope.Character.Benefits.length; i1++) {
                    if ($scope.Career2.FreeBenefits[i].Name == $scope.Character.Benefits[i1].Name) {
                        for (var i2 = 0; i2 < $scope.Archetypes.length; i2++) {
                            for (var i3 = 0; i3 < $scope.Archetypes[i2].Benefits.length; i3++) {
                                if ($scope.Archetypes[i2].Benefits[i3].Name == $scope.Career2.FreeBenefits[i].Name) {
                                    if (!('HasProperty' in $scope.Archetypes[i2].Benefits[i3])) {
                                        found = true;
                                    }
                                }
                            }
                        }
                    }
                }

                if (!found) {
                    $scope.Character.Benefits.push({ Name: $scope.Career2.FreeBenefits[i].Name });
                }
            }
        }

        $scope.Character.Benefits.sort(byName);

        // Create the abilities list.
        if ('StartingAbilities' in $scope.Career1) {
            if (!('Abilities' in $scope.Character)) {
                $scope.Character.Abilities = [];
            }

            for (var i = 0; i < $scope.Career1.StartingAbilities.length; i++) {
                if ($scope.HRCareer1AbToReplace !== null && $scope.Career1.StartingAbilities[i].Name == $scope.HRCareer1AbToReplace.Name) {
                    $scope.Character.Abilities.push($scope.HRCareer1AbReplacedWith);
                } else {
                    $scope.Character.Abilities.push($scope.Career1.StartingAbilities[i]);
                }
            }
        }

        if ('StartingAbilities' in $scope.Career2) {
            if (!('Abilities' in $scope.Character)) {
                $scope.Character.Abilities = [];
            }

            for (var i = 0; i < $scope.Career2.StartingAbilities.length; i++) {
                if ($scope.HRCareer2AbToReplace !== null && $scope.Career2.StartingAbilities[i].Name == $scope.HRCareer2AbToReplace.Name) {
                    $scope.Character.Abilities.push($scope.HRCareer2AbReplacedWith);
                } else {
                    $scope.Character.Abilities.push($scope.Career2.StartingAbilities[i]);
                }
            }
        }
        
        if ('Abilities' in $scope.Character) {
            $scope.Character.Abilities.sort(byName);
        }

        // Create the military skills list.
        if ('StartingMilitarySkills' in $scope.Career1) {
            if (!('MilitarySkills' in $scope.Character)) {
                $scope.Character.MilitarySkills = [];
            }

            for (var i = 0; i < $scope.Career1.StartingMilitarySkills.length; i++) {
                if ($scope.HRCareer1MSkillToReplace !== null && $scope.Career1.StartingMilitarySkills[i].Name == $scope.HRCareer1MSkillToReplace.Name) {
                    var mskill = $scope.HRCareer1MSkillReplacedWith;
                    mskill.Level = $scope.Career1.StartingMilitarySkills[i].Level;

                    var found = false;

                    for (var i1 = 0; i1 < $scope.Character.MilitarySkills.length; i1++) {
                        if (mskill.Name == $scope.Character.MilitarySkills[i1].Name) {
                            $scope.Character.MilitarySkills[i1].Level += mskill.Level;
                            found = true;
                        }
                    }

                    if (!found) {
                        $scope.Character.MilitarySkills.push(mskill);
                    }
                } else {
                    var found = false;

                    for (var i1 = 0; i1 < $scope.Character.MilitarySkills.length; i1++) {
                        if ($scope.Career1.StartingMilitarySkills[i].Name == $scope.Character.MilitarySkills[i1].Name) {
                            $scope.Character.MilitarySkills[i1].Level += $scope.Career1.StartingMilitarySkills[i].Level;
                            found = true;
                        }
                    }

                    if (!found) {
                        $scope.Character.MilitarySkills.push($scope.Career1.StartingMilitarySkills[i]);
                    }
                }
            }
        }

        if ('StartingMilitarySkills' in $scope.Career2) {
            if (!('MilitarySkills' in $scope.Character)) {
                $scope.Character.MilitarySkills = [];
            }

            for (var i = 0; i < $scope.Career2.StartingMilitarySkills.length; i++) {
                if ($scope.HRCareer2MSkillToReplace !== null && $scope.Career2.StartingMilitarySkills[i].Name == $scope.HRCareer2MSkillToReplace.Name) {
                    var mskill = $scope.HRCareer2MSkillReplacedWith;
                    mskill.Level = $scope.Career2.StartingMilitarySkills[i].Level;

                    var found = false;

                    for (var i1 = 0; i1 < $scope.Character.MilitarySkills.length; i1++) {
                        if (mskill.Name == $scope.Character.MilitarySkills[i1].Name) {
                            $scope.Character.MilitarySkills[i1].Level += mskill.Level;
                            found = true;
                        }
                    }

                    if (!found) {
                        $scope.Character.MilitarySkills.push(mskill);
                    }
                } else {
                    var found = false;

                    for (var i1 = 0; i1 < $scope.Character.MilitarySkills.length; i1++) {
                        if ($scope.Career2.StartingMilitarySkills[i].Name == $scope.Character.MilitarySkills[i1].Name) {
                            $scope.Character.MilitarySkills[i1].Level += $scope.Career2.StartingMilitarySkills[i].Level;
                            found = true;
                        }
                    }

                    if (!found) {
                        $scope.Character.MilitarySkills.push($scope.Career2.StartingMilitarySkills[i]);
                    }
               }
            }
        }

        if ($scope.Career1.StartingMSkillChoices > 0) {
            if (!('MilitarySkills' in $scope.Character)) {
                $scope.Character.MilitarySkills = [];
            }

            for (var i = 0; i < $scope.Career1MSkillsChosen.length; i++) {
                var found = false;

                for (var i1 = 0; i1 < $scope.Character.MilitarySkills.length; i1++) {
                    if ($scope.Career1MSkillsChosen[i].Name == $scope.Character.MilitarySkills[i1].Name) {
                        $scope.Character.MilitarySkills[i1].Level += $scope.Career1MSkillsChosen[i].Level;
                        found = true;
                    }
                }

                if (!found) {
                    $scope.Character.MilitarySkills.push($scope.Career1MSkillsChosen[i]);
                }
            }
        }

        if ($scope.Career2.StartingMSkillChoices > 0) {
            if (!('MilitarySkills' in $scope.Character)) {
                $scope.Character.MilitarySkills = [];
            }

            for (var i = 0; i < $scope.Career2MSkillsChosen.length; i++) {
                var found = false;

                for (var i1 = 0; i1 < $scope.Character.MilitarySkills.length; i1++) {
                    if ($scope.Career2MSkillsChosen[i].Name == $scope.Character.MilitarySkills[i1].Name) {
                        $scope.Character.MilitarySkills[i1].Level += $scope.Career2MSkillsChosen[i].Level;
                        found = true;
                    }
                }

                if (!found) {
                    $scope.Character.MilitarySkills.push($scope.Career2MSkillsChosen[i]);
                }
            }
        }
        
        if ('MilitarySkills' in $scope.Character) {
            $scope.Character.MilitarySkills.sort(byName);
        }

        // Create the occupational skills list.
        if ('StartingOccupationalSkills' in $scope.Career1) {
            if (!('OccupationalSkills' in $scope.Character)) {
                $scope.Character.OccupationalSkills = [];
            }

            for (var i = 0; i < $scope.Career1.StartingOccupationalSkills.length; i++) {
                if ($scope.HRCareer1OSkillToReplace !== null && $scope.Career1.StartingOccupationalSkills[i].Name == $scope.HRCareer1OSkillToReplace.Name) {
                    var oskill = $scope.HRCareer1OSkillReplacedWith;
                    oskill.Level = $scope.Career1.StartingOccupationalSkills[i].Level;

                    var found = false;

                    for (var i1 = 0; i1 < $scope.Character.OccupationalSkills.length; i1++) {
                        if (oskill.Name == $scope.Character.OccupationalSkills[i1].Name) {
                            if (!('Type' in oskill)) {
                                $scope.Character.OccupationalSkills[i1].Level += oskill.Level;
                                found = true;
                            }
                        }
                    }

                    if (!found) {
                        $scope.Character.OccupationalSkills.push(oskill);
                    }
                } else {
                    var found = false;

                    for (var i1 = 0; i1 < $scope.Character.OccupationalSkills.length; i1++) {
                        if ($scope.Career1.StartingOccupationalSkills[i].Name == $scope.Character.OccupationalSkills[i1].Name) {
                            if (!('Type' in $scope.Career1.StartingOccupationalSkills[i])) {
                                $scope.Character.OccupationalSkills[i1].Level += $scope.Career1.StartingOccupationalSkills[i].Level;
                                found = true;
                            }
                        }
                    }

                    if (!found) {
                        $scope.Character.OccupationalSkills.push($scope.Career1.StartingOccupationalSkills[i]);
                    }
                }
            }
        }

        if ('StartingOccupationalSkills' in $scope.Career2) {
            if (!('OccupationalSkills' in $scope.Character)) {
                $scope.Character.OccupationalSkills = [];
            }

            for (var i = 0; i < $scope.Career2.StartingOccupationalSkills.length; i++) {
                if ($scope.HRCareer2OSkillToReplace !== null && $scope.Career2.StartingOccupationalSkills[i].Name == $scope.HRCareer2OSkillToReplace.Name) {
                    var oskill = $scope.HRCareer2OSkillReplacedWith;
                    oskill.Level = $scope.Career2.StartingOccupationalSkills[i].Level;

                    var found = false;

                    for (var i1 = 0; i1 < $scope.Character.OccupationalSkills.length; i1++) {
                        if (oskill.Name == $scope.Character.OccupationalSkills[i1].Name) {
                            if (!('Type' in oskill)) {
                                $scope.Character.OccupationalSkills[i1].Level += oskill.Level;
                                found = true;
                            }
                        }
                    }

                    if (!found) {
                        $scope.Character.OccupationalSkills.push(oskill);
                    }
                } else {
                    var found = false;

                    for (var i1 = 0; i1 < $scope.Character.OccupationalSkills.length; i1++) {
                        if ($scope.Career2.StartingOccupationalSkills[i].Name == $scope.Character.OccupationalSkills[i1].Name) {
                            if (!('Type' in $scope.Career2.StartingOccupationalSkills[i])) {
                                $scope.Character.OccupationalSkills[i1].Level += $scope.Career2.StartingOccupationalSkills[i].Level;
                                found = true;
                            }
                        }
                    }

                    if (!found) {
                        $scope.Character.OccupationalSkills.push($scope.Career2.StartingOccupationalSkills[i]);
                    }
                }
            }
        }

        if ($scope.Career1.StartingOSkillChoices > 0) {
            if (!('OccupationalSkills' in $scope.Character)) {
                $scope.Character.OccupationalSkills = [];
            }

            for (var i = 0; i < $scope.Career1OSkillsChosen.length; i++) {
                var found = false;

                for (var i1 = 0; i1 < $scope.Character.OccupationalSkills.length; i1++) {
                    if ($scope.Career1OSkillsChosen[i].Name == $scope.Character.OccupationalSkills[i1].Name) {
                        if (!('Type' in $scope.Career1OSkillsChosen[i])) {
                            $scope.Character.OccupationalSkills[i1].Level += $scope.Career1OSkillsChosen[i].Level;
                            found = true;
                        }
                    }
                }

                if (!found) {
                    $scope.Character.OccupationalSkills.push($scope.Career1OSkillsChosen[i]);
                }
            }
        }

        if ($scope.Career2.StartingOSkillChoices > 0) {
            if (!('OccupationalSkills' in $scope.Character)) {
                $scope.Character.OccupationalSkills = [];
            }

            for (var i = 0; i < $scope.Career2OSkillsChosen.length; i++) {
                var found = false;

                for (var i1 = 0; i1 < $scope.Character.OccupationalSkills.length; i1++) {
                    if ($scope.Career2OSkillsChosen[i].Name == $scope.Character.OccupationalSkills[i1].Name) {
                        if (!('Type' in $scope.Career2OSkillsChosen[i])) {
                            $scope.Character.OccupationalSkills[i1].Level += $scope.Career2OSkillsChosen[i].Level;
                            found = true;
                        }
                    }
                }

                if (!found) {
                    $scope.Character.OccupationalSkills.push($scope.Career2OSkillsChosen[i]);
                }
            }
        }
        
        if ('OccupationalSkills' in $scope.Character) {
            $scope.Character.OccupationalSkills.sort(byName);
        }
        
        // Create the spells list.
        if ('StartingSpells' in $scope.Career1) {
            if (!('Spells' in $scope.Character)) {
                $scope.Character.Spells = [];
            }

            for (var i = 0; i < $scope.Career1.StartingSpells.length; i++) {
                if ($scope.HRCareer1SpellToReplace !== null && $scope.HRCareer1SpellToReplace == $scope.Career1.StartingSpells[i]) {
                    var found = false;

                    for (var i1 = 0; i1 < $scope.Character.Spells.length; i1++) {
                        if ($scope.Career1.StartingSpells[i] == $scope.HRCareer1SpellReplacedWith) {
                            found = true;
                        }
                    }

                    if (!found) {
                        $scope.Character.Spells.push($scope.HRCareer1SpellReplacedWith);
                    }
                } else {
                    var found = false;

                    for (var i1 = 0; i1 < $scope.Character.Spells.length; i1++) {
                        if ($scope.Career1.StartingSpells[i] == $scope.Character.Spells[i1]) {
                            found = true;
                        }
                    }

                    if (!found) {
                        $scope.Character.Spells.push($scope.Career1.StartingSpells[i]);
                    }
                }
            }
        }

        if ('StartingSpells' in $scope.Career2) {
            if (!('Spells' in $scope.Character)) {
                $scope.Character.Spells = [];
            }

            for (var i = 0; i < $scope.Career2.StartingSpells.length; i++) {
                if ($scope.HRCareer2SpellToReplace !== null && $scope.HRCareer2SpellToReplace == $scope.Career2.StartingSpells[i]) {
                    var found = false;

                    for (var i1 = 0; i1 < $scope.Character.Spells.length; i1++) {
                        if ($scope.Career2.StartingSpells[i] == $scope.HRCareer2SpellReplacedWith) {
                            found = true;
                        }
                    }

                    if (!found) {
                        $scope.Character.Spells.push($scope.HRCareer2SpellReplacedWith);
                    }
                } else {
                    var found = false;

                    for (var i1 = 0; i1 < $scope.Character.Spells.length; i1++) {
                        if ($scope.Career2.StartingSpells[i] == $scope.Character.Spells[i2]) {
                            found = true;
                        }
                    }

                    if (!found) {
                        $scope.Character.Spells.push($scope.Career2.StartingSpells[i]);
                    }
                }
            }
        }

        if ('Spells' in $scope.Character) {
            $scope.Character.Spells.sort();
        }

        // Create the assets list.
        if ('StartingAssets' in $scope.Career1) {
            if (!('Assets' in $scope.Character)) {
                $scope.Character.Assets = [];
            }

            for (var i = 0; i < $scope.Career1.StartingAssets.length; i++) {
                $scope.Character.Assets.push($scope.Career1.StartingAssets[i]);
            }
        }
        
        if ('StartingAssets' in $scope.Career2) {
            if (!('Assets' in $scope.Character)) {
                $scope.Character.Assets = [];
            }

            for (var i = 0; i < $scope.Career2.StartingAssets.length; i++) {
                $scope.Character.Assets.push($scope.Career2.StartingAssets[i]);
            }
        }

        if ($scope.Career1.StartingAssetChoices > 0) {
            if (!('Assets' in $scope.Character)) {
                $scope.Character.Assets = [];
            }

            for (var i = 0; i < $scope.Career1AssetsChosen.length; i++) {
                $scope.Character.Assets.push($scope.Career1AssetsChosen[i]);
            }
        }

        if ($scope.Career2.StartingAssetChoices > 0) {
            if (!('Assets' in $scope.Character)) {
                $scope.Character.Assets = [];
            }

            for (var i = 0; i < $scope.Career2AssetsChosen.length; i++) {
                $scope.Character.Assets.push($scope.Career2AssetsChosen[i]);
            }
        }

        // Set starting gold.
        $scope.Character.Gold = 0;

        if ('StartingGold' in $scope.Career1) {
            $scope.Character.Gold += $scope.Career1.StartingGold;
        }

        if ('StartingGold' in $scope.Career2) {
            $scope.Character.Gold += $scope.Career2.StartingGold;
        }

        // Build request.
        var charRequest = { ReqType: 'BuildChar', CharacterID: $scope.CharacterID, Status: 'Complete', PageComplete: 2, Character: $scope.Character };
        var goToPage3 = false;

        // Check for conditions that would require us to go to page 3.
        for (var i = 0; i < $scope.Character.Benefits.length; i++) {
            for (var i2 = 0; i2 < $scope.Archetypes.length; i2++) {
                for (var i3 = 0; i3 < $scope.Archetypes[i2].Benefits.length; i3++) {
                    if ($scope.Character.Benefits[i].Name == $scope.Archetypes[i2].Benefits[i3].Name && ('HasProperty' in $scope.Archetypes[i2].Benefits[i3])) {
                        goToPage3 = true;
                        break;
                    }
                }

                if (goToPage3) {
                    break;
                }
            }
        }

        if ('Abilities' in $scope.Character) {
            for (var i = 0; i < $scope.Character.Abilities.length; i++) {
                if ('Type' in $scope.Character.Abilities[i]) {
                    if ($scope.Character.Abilities[i].Type != 'Specific') {
                        goToPage3 = true;
                        break;
                    }
                }
            }
        }

        if ('OccupationalSkills' in $scope.Character) {
            for (var i = 0; i < $scope.Character.OccupationalSkills.length; i++) {
                if ('Type' in $scope.Character.OccupationalSkills[i]) {
                    if ($scope.Character.OccupationalSkills[i].Type != 'Specific') {
                        goToPage3 = true;
                        break;
                    }
                }
            }
        }

        if ($scope.Race.RacialAbilityChoices > 0) {
            goToPage3 = true;
        }

        if (goToPage3) {
            charRequest.Status = 'Incomplete';
        }

        // Post that shit.
        $http.post($scope.Url, charRequest).success(function(data, status) {
            if (status != 200 || data != '') {
                $scope.Error == data;
            } else {
                var action = '';

                if (goToPage3) {
                    action = "/character_builder3.php?CharacterID=" + $scope.CharacterID;
                } else {
                    action = "/character_sheet.php?CharacterID=" + $scope.CharacterID;
                }

                window.location.href = action;
            }
        }).error(function(data, status) {
            $scope.Error = "Status: " + status + "; Data: " + data || "Request failed.";
        });

        return false;
    }

    function byName(objA, objB) {
        if (objA.Name > objB.Name) {
            return 1;
        } else if (objA.Name < objB.Name) {
            return -1;
        }
    }
}
