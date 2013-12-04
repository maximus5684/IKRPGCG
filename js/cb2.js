function CB2Ctrl($scope, $http) {
    $scope.Url = 'ajax/characters.php';
    $scope.Error = null;
    $scope.Character = null;
    $scope.Benefits = [];
    $scope.AdditionalStudySpellList = [];
    $scope.Race = null;
    $scope.Career1 = null;
    $scope.Career2 = null;
    $scope.RacialBenefits = null;
    $scope.CareerBenefits = null;
    $scope.RacialAbilityRequired = false;
    $scope.RacialAbilityChoices = [];
    $scope.RacialAbilities = null;
    $scope.CareerAbilities = null;
    $scope.RacialConnections = false;
    $scope.Career1Connections = false;
    $scope.Career2Connections = false;
    $scope.RacialStatIncreaseRequired = false;
    $scope.AdvancementPoints = 3;
    // [0] = Starting, [1] = Max, [2] = AP Points, [3] = Field Min, [4] = Field Max
    $scope.APFields = {
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
    $scope.Career2MSkillsRequired = false;
    $scope.Career2MSkillsCBs = [];
    $scope.Career1OSkillsRequired = false;
    $scope.Career1OSkillsCBs = [];
    $scope.Career2OSkillsRequired = false;
    $scope.Career2OSkillsCBs = [];
    $scope.Career1AssetsRequired = false;
    $scope.Career1AssetChoiceCBs = [];
    $scope.Career2AssetsRequired = false;
    $scope.Career2AssetChoiceCBs = [];
    $scope.HRAbilityC1 = false;
    $scope.HRAbilityC2 = false;
    $scope.HRAbility = false;
    $scope.HRAbCareer1List = [];
    $scope.HRAbCareer2List = [];
    $scope.HRMSkillC1 = false;
    $scope.HRMSkillC2 = false;
    $scope.HRMSkill = false;
    $scope.HRMSkillCareer1List = [];
    $scope.HRMSkillCareer2List = [];
    $scope.HROSkillC1 = false;
    $scope.HROSkillC2 = false;
    $scope.HROSkill = false;
    $scope.HROSkillCareer1List = [];
    $scope.HROSkillCareer2List = [];
    $scope.HRSpellC1 = false;
    $scope.HRSpellC2 = false;
    $scope.HRSpell = false;
    $scope.HRSpellCareer1List = [];
    $scope.HRSpellCareer2List = [];

    $scope.Races = raceArr;
    $scope.Archetypes = archArr;    
    $scope.Careers = careerArr;

    // Initial function to load character.
    $scope.GetChar = function(CharID) {
        $http.post($scope.Url, { ReqType: 'GetChar', CharacterID: CharID }).success(function(data, status) {
            if (typeof data !== 'object') {
                $scope.Error = data;
            } else {
                $scope.Character = data;
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

    $scope.checkError = function() {
        if ($scope.Error === null) {
            return true;
        } else {
            return false;
        }
    }

    $scope.loadCharacterDefaults = function() {
        $scope.Character.LanguagesChosen = [null, null, null];
        
        for (a = 0; a < $scope.Archetypes.length; a++) {
            if ($scope.Archetypes[a].Name == $scope.Character.Archetype) {
                if ($scope.Character.ArcaneTradition !== null) {
                    for (a1 = 0; a1 < $scope.Archetypes[a].Benefits.length; a1++) {
                        if ($scope.Archetypes[a].Benefits[a1].ReqArcaneTradition == '' || $scope.Archetypes[a].Benefits[a1].ReqArcaneTradition == $scope.Character.ArcaneTradition) {
                            $scope.Benefits.push($scope.Archetypes[a].Benefits[a1]);
                        }
                    }
                } else {
                    $scope.Benefits = $scope.Archetypes[a].Benefits;
                    break;
                }
            }
        }

        for (b = 0; b < $scope.Races.length; b++) {
            if ($scope.Races[b].Name == $scope.Character.Race) {
                $scope.Race = $scope.Races[b];
                break;
            }
        }
        
        // Set race-related values.
        for (c = 0; c < $scope.Race.Benefits.length; c++) {
            if ($scope.RacialBenefits === null) {
                $scope.RacialBenefits = $scope.Race.Benefits[c];
            } else {
                $scope.RacialBenefits += ', ' + $scope.Race.Benefits[c];
            }
        }

        for (c1 = 0; c1 < $scope.Race.Abilities.length; c1++) {
            if ($scope.RacialAbilities === null) {
                $scope.RacialAbilities = $scope.Race.Abilities[c1];
            } else {
                $scope.RacialAbilities += ', ' + $scope.Race.Abilities[c1];
            }
        }

        if ($scope.Race.LangChoices > 0) {
            $scope.Language1Required = true;
            
            for (g = 0; g < langArr.length; g++) {
                if ($scope.Race.StartLangs.indexOf(langArr[g]) == -1) {
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

        if ($scope.Race.Connections.length > 0) {
            $scope.RacialConnections = true;
        }

        if ($scope.Race.StatIncreaseChoices > 0) {
            $scope.RacialStatIncreaseRequired = true;
        }

        for (d = 0; d < $scope.Careers.length; d++) {
            if ($scope.Careers[d].Name == $scope.Character.Career1) {
                $scope.Career1 = $scope.Careers[d];
            } else if ($scope.Careers[d].Name == $scope.Character.Career2) {
                $scope.Career2 = $scope.Careers[d];
            }
        }

        //Select career-related values.
        if ($scope.Race.AbilityChoices > 0) {
            $scope.RacialAbilityRequired = true;
        
            $scope.RacialAbilityChoices = $scope.Career1.Abilities;

            for (e1 = 0; e1 < $scope.Career2.Abilities.length; e1++) {
                if ($scope.RacialAbilityChoices.indexOf($scope.Career2.Abilities[e1]) == -1) {
                    $scope.RacialAbilityChoices.push($scope.Career2.Abilities[e1]);
                }
            }

            $scope.RacialAbilityChoices.sort();
        }

        for (e = 0; e < $scope.Career1.FreeBenefits.length; e++) {
            if ($scope.CareerBenefits === null) {
                $scope.CareerBenefits = $scope.Career1.FreeBenefits[e];
            } else {
                $scope.CareerBenefits += ', ' + $scope.Career1.FreeBenefits[e];
            }
        }
                
        for (f = 0; f < $scope.Career2.FreeBenefits.length; f++) {
            if ($scope.CareerBenefits === null) {
                $scope.CareerBenefits = $scope.Career2.FreeBenefits[f];
            } else {
                $scope.CareerBenefits += ', ' + $scope.Career2.FreeBenefits[f];
            }
        }

        for (f1 = 0; f1 < $scope.Career1.StartingAbilities.length; f1++) {
            if ($scope.CareerAbilities === null) {
                $scope.CareerAbilities = $scope.Career1.StartingAbilities[f1];
            } else {
                $scope.CareerAbilities += ', ' + $scope.Career1.StartingAbilities[f1];
            }
        }

        for (f2 = 0; f2 < $scope.Career2.StartingAbilities.length; f2++) {
            if ($scope.CareerAbilities === null) {
                $scope.CareerAbilities = $scope.Career2.StartingAbilities[f2];
            } else {
                $scope.CareerAbilities += ', ' + $scope.Career2.StartingAbilities[f2];
            }
        }

        if ($scope.Career1.StartingMSkillChoices > 0) {
            $scope.Career1MSkillsRequired = true;

            for (j = 0; j < $scope.Career1.StartingMSkillChoicesOptions.length; j++) {
                $scope.Career1MSkillsCBs.push({ Name: $scope.Career1.StartingMSkillChoicesOptions[j][0], Level: $scope.Career1.StartingMSkillChoicesOptions[j][1], Checked: false, Disabled: false });
            }

            $scope.Character.Career1MSkillsChosen = [];
        }

        if ($scope.Career1.StartingOSkillChoices > 0) {
            $scope.Career1OSkillsRequired = true;
        
            for (j1 = 0; j1 < $scope.Career1.StartingOSkillChoicesOptions.length; j1++) {
                $scope.Career1OSkillsCBs.push({ Name: $scope.Career1.StartingOSkillChoicesOptions[j1][0], Level: $scope.Career1.StartingOSkillChoicesOptions[j1][1], Checked: false, Disabled: false });
            }

            $scope.Character.Career1OSkillsChosen = [];
        }

        if ($scope.Career2.StartingMSkillChoices > 0) {
            $scope.Career2MSkillsRequired = true;
        
            for (j2 = 0; j2 < $scope.Career2.StartingMSkillChoicesOptions.length; j2++) {
                $scope.Career2MSkillsCBs.push({ Name: $scope.Career2.StartingMSkillChoicesOptions[j2][0], Level: $scope.Career2.StartingMSkillChoicesOptions[j2][1], Checked: false, Disabled: false });
            }

            $scope.Character.Career2MSkillsChosen = [];
        }
        
        if ($scope.Career2.StartingOSkillChoices > 0) {
            $scope.Career2OSkillsRequired = true;
        
            for (j3 = 0; j3 < $scope.Career2.StartingOSkillChoicesOptions.length; j3++) {
                $scope.Career2OSkillsCBs.push({ Name: $scope.Career2.StartingOSkillChoicesOptions[j3][0], Level: $scope.Career2.StartingOSkillChoicesOptions[j3][1], Checked: false, Disabled: false });
            }

            $scope.Character.Career2OSkillsChosen = [];
        }

        if ($scope.Career1.StartingConnections.length > 0) {
            $scope.Career1Connections = true;
        }

        if ($scope.Career2.StartingConnections.length > 0) {
            $scope.Career2Connections = true;
        }

        if ($scope.Career1.StartingAssetChoices > 0) {
            $scope.Career1AssetsRequired = true;
        
            for (j5 = 0; j5 < $scope.Career1.StartingAssetChoiceOptions.length; j5++) {
                $scope.Career1AssetChoiceCBs.push({ Name: $scope.Career1.StartingAssetChoiceOptions[j5], Checked: false, Disabled: false });
            }
        
            $scope.Character.Career1AssetsChosen = [];
        }

        if ($scope.Career2.StartingAssetChoices > 0) {
            $scope.Career2AssetsRequired = true;
        
            for (j5 = 0; j5 < $scope.Career2.StartingAssetChoiceOptions.length; j5++) {
                $scope.Career2AssetChoiceCBs.push({ Name: $scope.Career2.StartingAssetChoiceOptions[j5], Checked: false, Disabled: false });
            } 
        
            $scope.Character.Career2AssetsChosen = [];
        }
        
        $scope.setAPFields();

        if ($scope.Career1.StartingAbilities.length > 0 && ($scope.Career1.StartingAbilities.length < $scope.Career1.Abilities.length)) {
            $scope.HRAbilityC1 = true;
            $scope.HRAbility = true;
        }
        
        if ($scope.Career2.StartingAbilities.length > 0 && ($scope.Career2.StartingAbilities.length < $scope.Career2.Abilities.length)) {
            $scope.HRAbilityC2 = true;
            $scope.HRAbility = true;
        }

        if ($scope.Career1.StartingMilitarySkills.length > 0 && ($scope.Career1.StartingMilitarySkills.length < $scope.Career1.MilitarySkills.length)) {
            $scope.HRMSkillC1 = true;
            $scope.HRMSkill = true;
        }
        
        if ($scope.Career2.StartingMilitarySkills.length > 0 && ($scope.Career2.StartingMilitarySkills.length < $scope.Career2.MilitarySkills.length)) {
            $scope.HRMSkillC2 = true;
            $scope.HRMSkill = true;
        }

        if ($scope.Career1.StartingOccupationalSkills.length > 0 && ($scope.Career1.StartingOccupationalSkills.length < $scope.Career1.OccupationalSkills.length)) {
            $scope.HROSkillC1 = true;
            $scope.HROSkill = true;
        }
        
        if ($scope.Career2.StartingOccupationalSkills.length > 0 && ($scope.Career2.StartingOccupationalSkills.length < $scope.Career2.OccupationalSkills.length)) {
            $scope.HROSkillC2 = true;
            $scope.HROSkill = true;
        }

        if ($scope.Career1.StartingSpells.length > 0) {
            $scope.HRSpellC1 = true;
            $scope.HRSpell = true;
        }
        
        if ($scope.Career2.StartingSpells.length > 0) {
            $scope.HRSpellC2 = true;
            $scope.HRSpell = true;
        }
    }

    $scope.selectBenefit = function() {
        if ($scope.Character.Benefit !== null && $scope.Character.Benefit == 'Additional Study') {
            for (j = 0; j < $scope.Career1.SpellList.length; j++) {
                for (i = 0; i < $scope.Career1.SpellList[j].Spells.length; i++) {
                    if ($scope.AdditionalStudySpellList.indexOf($scope.Career1.SpellList[j].Spells[i]) == -1) {
                        $scope.AdditionalStudySpellList.push($scope.Career1.SpellList[j].Spells[i]);
                    }
                }
            }

            for (j = 0; j < $scope.Career2.SpellList.length; j++) {
                for (i = 0; i < $scope.Career2.SpellList[j].Spells.length; i++) {
                    if ($scope.AdditionalStudySpellList.indexOf($scope.Career2.SpellList[j].Spells[i]) == -1) {
                        $scope.AdditionalStudySpellList.push($scope.Career2.SpellList[j].Spells[i]);
                    }
                }
            }

            $scope.AdditionalStudySpellList.sort();
        } else {
            $scope.AdditionalStudySpellList = [];
            $scope.Character.BenefitAssocObj = null;
        }
    }

    $scope.checkBenefit = function() {
        if ($scope.Character === null || $scope.Character.Benefit === null) {
            return false;
        } else {
            return true;
        }
    }

    $scope.checkAdditionalStudy = function() {
        if ($scope.Character !== null && $scope.Character.Benefit == 'Additional Study') {
            return true;
        } else {
            return false;
        }
    }

    $scope.checkAdditionalStudySpell = function() {
        if ($scope.Character === null || $scope.Character.BenefitAssocObj === null) {
            return false;
        } else {
            return true;
        }
    }

    $scope.checkRacialStatIncrease = function() {
        if ($scope.Character === null || $scope.Character.RacialStatIncreaseChosen === null) {
            return false;
        } else {
            return true;
        }
    }

    $scope.selectRacialStatIncrease = function() {
        if ($scope.Character !== null && $scope.Character.RacialStatIncreaseChosen !== null) {
            $scope.setAPFields();
        }
    }

    $scope.showAP = function() {
        if (!$scope.RacialStatIncreaseRequired) {
            return true;
        } else {
            if ($scope.Character === null || $scope.Character.RacialStatIncreaseChosen === null) {
                return false;
            } else {
                return true;
            }
        }
    }

    $scope.changeAP = function() {
        $scope.recalcAPs();
    }

    $scope.setAPFields = function() {
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

        if ($scope.Race.StatIncreases.length > 0) {
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

        for (a = 0; a < $scope.Career1.StatIncreases.length; a++) {
            $scope.APFields[$scope.Career1.StatIncreases[a][0]].Starting += $scope.Career1.StatIncreases[a][1];
        }

        for (b = 0; b < $scope.Career2.StatIncreases.length; b++) {
            $scope.APFields[$scope.Career2.StatIncreases[b][0]].Starting += $scope.Career2.StatIncreases[b][1];
        }

        for (c = 0; c < $scope.Career1.StatMaxIncreases.Hero.length; c++) {
            $scope.APFields[$scope.Career1.StatMaxIncreases.Hero[c][0]].Max += $scope.Career1.StatMaxIncreases.Hero[c][1];
        }

        for (d = 0; d < $scope.Career2.StatMaxIncreases.Hero.length; d++) {
            $scope.APFields[$scope.Career2.StatMaxIncreases.Hero[d][0]].Max += $scope.Career2.StatMaxIncreases.Hero[d][1];
        }

        $scope.recalcAPs();
    }

    $scope.recalcAPs = function() {
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
            $scope.recalcAPs();
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
        if ($scope.Character === null || $scope.Character.RacialStatIncreaseChosen === null) {
            return false;
        } else {
            return true;
        }
    }

    $scope.checkRacialAbility = function() {
        if ($scope.Character === null || $scope.Character.RacialAbilityChosen === null) {
            return false;
        } else {
            return true;
        }
    }

    $scope.checkCareer1MSkills = function() {
        if ($scope.Character == null || ($scope.Career1MSkillsRequired && $scope.Character.Career1MSkillsChosen.length < $scope.Career1.StartingMSkillChoices)) {
            return false;
        } else {
            return true;
        }
    }

    $scope.changeCareer1MSkill = function() {
        checked = 0;
        $scope.Character.Career1MSkillsChosen = [];
        
        for (k = 0; k < $scope.Career1MSkillsCBs.length; k++) {
            if ($scope.Career1MSkillsCBs[k].Checked) {
                checked++;
                $scope.Character.Career1MSkillsChosen.push([$scope.Career1MSkillsCBs[k].Name, $scope.Career1MSkillsCBs[k].Level]);
            }
        }

        if (checked >= $scope.Career1.StartingMSkillChoices) {
            for (l = 0; l < $scope.Career1MSkillsCBs.length; l++) {
                if (!$scope.Career1MSkillsCBs[l].Checked) {
                    $scope.Career1MSkillsCBs[l].Disabled = true;
                }
            }
        } else {
            for (m = 0; m < $scope.Career1MSkillsCBs.length; m++) {
                $scope.Career1MSkillsCBs[m].Disabled = false;
            }
        }
    }

    $scope.checkCareer1OSkills = function() {
        if ($scope.Character == null || ($scope.Career1OSkillsRequired && $scope.Character.Career1OSkillsChosen.length < $scope.Career1.StartingOSkillChoices)) {
            return false;
        } else {
            return true;
        }
    }
    
    $scope.changeCareer1OSkill = function() {
        checked = 0;
        $scope.Character.Career1OSkillsChosen = [];

        for (k = 0; k < $scope.Career1OSkillsCBs.length; k++) {
            if ($scope.Career1OSkillsCBs[k].Checked) {
                checked++;
                $scope.Character.Career1OSkillsChosen.push([$scope.Career1OSkillsCBs[k].Name, $scope.Career1OSkillsCBs[k].Level]);
            }
        }

        if (checked >= $scope.Career1.StartingOSkillChoices) {
            for (l = 0; l < $scope.Career1OSkillsCBs.length; l++) {
                if (!$scope.Career1OSkillsCBs[l].Checked) {
                    $scope.Career1OSkillsCBs[l].Disabled = true;
                }
            }
        } else {
            for (m = 0; m < $scope.Career1OSkillsCBs.length; m++) {
                $scope.Career1OSkillsCBs[m].Disabled = false;
            }
        }
    }

    $scope.checkCareer2MSkills = function() {
        if ($scope.Character == null || ($scope.Career2MSkillsRequired && $scope.Character.Career2MSkillsChosen.length < $scope.Career2.StartingMSkillChoices)) {
            return false;
        } else {
            return true;
        }
    }
    
    $scope.changeCareer2MSkill = function() {
        checked = 0;
        $scope.Character.Career2MSkillsChosen = [];
        
        for (k = 0; k < $scope.Career2MSkillsCBs.length; k++) {
            if ($scope.Career2MSkillsCBs[k].Checked) {
                checked++;
                $scope.Character.Career2MSkillsChosen.push([$scope.Career2MSkillsCBs[k].Name, $scope.Career2MSkillsCBs[k].Level]);
            }
        }

        if (checked >= $scope.Career2.StartingMSkillChoices) {
            for (l = 0; l < $scope.Career2MSkillsCBs.length; l++) {
                if (!$scope.Career2MSkillsCBs[l].Checked) {
                    $scope.Career2MSkillsCBs[l].Disabled = true;
                }
            }
        } else {
            for (m = 0; m < $scope.Career2MSkillsCBs.length; m++) {
                $scope.Career2MSkillsCBs[m].Disabled = false;
            }
        }
    }

    $scope.checkCareer2OSkills = function() {
        if ($scope.Character == null || ($scope.Career2OSkillsRequired && $scope.Character.Career2OSkillsChosen.length < $scope.Career2.StartingOSkillChoices)) {
            return false;
        } else {
            return true;
        }
    }
    
    $scope.changeCareer2OSkill = function() {
        checked = 0;
        $scope.Character.Career2OSkillsChosen = [];
        
        for (k = 0; k < $scope.Career2OSkillsCBs.length; k++) {
            if ($scope.Career2OSkillsCBs[k].Checked) {
                checked++;
                $scope.Character.Career2OSkillsChosen.push([$scope.Career2OSkillsCBs[k].Name, $scope.Career2OSkillsCBs[k].Level]);
            }
        }

        if (checked >= $scope.Career2.StartingOSkillChoices) {
            for (l = 0; l < $scope.Career2OSkillsCBs.length; l++) {
                if (!$scope.Career2OSkillsCBs[l].Checked) {
                    $scope.Career2OSkillsCBs[l].Disabled = true;
                }
            }
        } else {
            for (m = 0; m < $scope.Career2OSkillsCBs.length; m++) {
                $scope.Career2OSkillsCBs[m].Disabled = false;
            }
        }
    }

    $scope.checkCareer1Assets = function() {
        if ($scope.Character == null || ($scope.Career1AssetsRequired && $scope.Character.Career1AssetsChosen.length < $scope.Career1.StartingAssetChoices)) {
            return false;
        } else {
            return true;
        }
    }

    $scope.changeCareer1AssetChoice = function() {
        checked = 0;
        $scope.Character.Career1AssetsChosen = [];

        for (k = 0; k < $scope.Career1AssetChoiceCBs.length; k++) {
            if ($scope.Career1AssetChoiceCBs[k].Checked) {
                checked++;
                $scope.Character.Career1AssetsChosen.push($scope.Career1AssetChoiceCBs[k].Name)
            }
        }

        if (checked >= $scope.Career1.StartingAssetChoices) {
            for (l = 0; l < $scope.Career1AssetChoiceCBs.length; l++) {
                if (!$scope.Career1AssetChoiceCBs[l].Checked) {
                    $scope.Career1AssetChoiceCBs[l].Disabled = true;
                }
            }
        } else {
            for (m = 0; m < $scope.Career1AssetChoiceCBs.length; m++) {
                $scope.Career1AssetChoiceCBs[m].Disabled = false;
            }
        }
    }

    $scope.checkCareer2Assets = function() {
        if ($scope.Character == null || ($scope.Career2AssetsRequired && $scope.Character.Career2AssetsChosen.length < $scope.Career2.StartingAssetChoices)) {
            return false;
        } else {
            return true;
        }
    }
    
    $scope.changeCareer2AssetChoice = function() {
        checked = 0;
        $scope.Character.Career2AssetsChosen = [];

        for (k = 0; k < $scope.Career2AssetChoiceCBs.length; k++) {
            if ($scope.Career2AssetChoiceCBs[k].Checked) {
                checked++;
                $scope.Character.Career2AssetsChosen.push($scope.Career2AssetChoiceCBs[k].Name)
            }
        }

        if (checked >= $scope.Career2.StartingAssetChoices) {
            for (l = 0; l < $scope.Career2AssetChoiceCBs.length; l++) {
                if (!$scope.Career2AssetChoiceCBs[l].Checked) {
                    $scope.Career2AssetChoiceCBs[l].Disabled = true;
                }
            }
        } else {
            for (m = 0; m < $scope.Career2AssetChoiceCBs.length; m++) {
                $scope.Career2AssetChoiceCBs[m].Disabled = false;
            }
        }
    }

    $scope.selectHRAbSwap = function() {
        if (!$scope.HRAbilityChecked) {
            $scope.Character.HRCareer1AbToReplace = null;
            $scope.Character.HRCareer1AbReplacedWith = null;
            $scope.Character.HRCareer2AbToReplace = null;
            $scope.Character.HRCareer2AbReplacedWith = null;
        }
    }

    $scope.checkHRAbCareer1From = function() {
        if ($scope.Character === null || $scope.Character.HRCareer1AbToReplace === null || $scope.HRAbilityChecked == false) {
            return false;
        } else {
            return true;
        }
    }

    $scope.selectHRAbCareer1From = function() {
        $scope.HRAbCareer1List = [];

        if ($scope.Character !== null && $scope.Character.HRCareer1AbToReplace !== null) {
            for (j = 0; j < $scope.Career1.Abilities.length; j++) {
                if ($scope.Career1.Abilities[j] != $scope.Character.HRCareer1AbToReplace) {
                    $scope.HRAbCareer1List.push($scope.Career1.Abilities[j]);
                }
            }
        } else {
            if ($scope.Character !== null) {
                $scope.Character.HRCareer1AbReplacedWith = null;
            }
        }
    }

    $scope.checkHRAbCareer2From = function() {
        if ($scope.Character === null || $scope.Character.HRCareer2AbToReplace === null || $scope.HRAbilityChecked == false) {
            return false;
        } else {
            return true;
        }
    }

    $scope.selectHRAbCareer2From = function() {
        $scope.HRAbCareer2List = [];

        if ($scope.Character !== null && $scope.Character.HRCareer2AbToReplace !== null) {
            for (j = 0; j < $scope.Career2.Abilities.length; j++) {
                if ($scope.Career2.Abilities[j] != $scope.Character.HRCareer2AbToReplace) {
                    $scope.HRAbCareer2List.push($scope.Career2.Abilities[j]);
                }
            }
        } else {
            if ($scope.Character !== null) {
                $scope.Character.HRCareer2AbReplacedWith = null;
            }
        }
    }
    
    $scope.selectHRMSkillSwap = function() {
        if (!$scope.HRMSkillChecked) {
            $scope.Character.HRCareer1MSkillToReplace = null;
            $scope.Character.HRCareer1MSkillReplacedWith = null;
            $scope.Character.HRCareer2MSkillToReplace = null;
            $scope.Character.HRCareer2MSkillReplacedWith = null;
        }
    }

    $scope.checkHRMSkillCareer1From = function() {
        if ($scope.Character === null || $scope.Character.HRCareer1MSkillToReplace === null || $scope.HRMSkillChecked == false) {
            return false;
        } else {
            return true;
        }
    }

    $scope.selectHRMSkillCareer1From = function() {
        $scope.HRMSkillCareer1List = [];

        if ($scope.Character !== null && $scope.Character.HRCareer1MSkillToReplace !== null) {
            for (j = 0; j < $scope.Career1.MilitarySkills.length; j++) {
                if ($scope.Career1.MilitarySkills[j][0] != $scope.Character.HRCareer1MSkillToReplace[0]) {
                    $scope.HRMSkillCareer1List.push($scope.Career1.MilitarySkills[j]);
                }
            }
        } else {
            if ($scope.Character !== null) {
                $scope.Character.HRCareer1MSkillReplacedWith = null;
            }
        }
    }

    $scope.checkHRMSkillCareer2From = function() {
        if ($scope.Character === null || $scope.Character.HRCareer2MSkillToReplace === null || $scope.HRMSkillChecked == false) {
            return false;
        } else {
            return true;
        }
    }

    $scope.selectHRMSkillCareer2From = function() {
        $scope.HRMSkillCareer2List = [];

        if ($scope.Character !== null && $scope.Character.HRCareer2MSkillToReplace !== null) {
            for (j = 0; j < $scope.Career2.MilitarySkills.length; j++) {
                if ($scope.Career2.MilitarySkills[j][0] != $scope.Character.HRCareer2MSkillToReplace[0]) {
                    $scope.HRMSkillCareer2List.push($scope.Career2.MilitarySkills[j]);
                }
            }
        } else {
            if ($scope.Character !== null) {
                $scope.Character.HRCareer2MSkillReplacedWith = null;
            }
        }
    }
    
    $scope.selectHROSkillSwap = function() {
        if (!$scope.HROSkillChecked) {
            $scope.Character.HRCareer1OSkillToReplace = null;
            $scope.Character.HRCareer1OSkillReplacedWith = null;
            $scope.Character.HRCareer2OSkillToReplace = null;
            $scope.Character.HRCareer2OSkillReplacedWith = null;
        }
    }

    $scope.checkHROSkillCareer1From = function() {
        if ($scope.Character === null || $scope.Character.HRCareer1OSkillToReplace === null || $scope.HROSkillChecked == false) {
            return false;
        } else {
            return true;
        }
    }

    $scope.selectHROSkillCareer1From = function() {
        $scope.HROSkillCareer1List = [];

        if ($scope.Character !== null && $scope.Character.HRCareer1OSkillToReplace !== null) {
            for (j = 0; j < $scope.Career1.OccupationalSkills.length; j++) {
                if ($scope.Career1.OccupationalSkills[j][0] != $scope.Character.HRCareer1OSkillToReplace[0]) {
                    $scope.HROSkillCareer1List.push($scope.Career1.OccupationalSkills[j]);
                }
            }
        } else {
            if ($scope.Character !== null) {
                $scope.Character.HRCareer1OSkillReplacedWith = null;
            }
        }
    }

    $scope.checkHROSkillCareer2From = function() {
        if ($scope.Character === null || $scope.Character.HRCareer2OSkillToReplace === null || $scope.HROSkillChecked == false) {
            return false;
        } else {
            return true;
        }
    }

    $scope.selectHROSkillCareer2From = function() {
        $scope.HROSkillCareer2List = [];

        if ($scope.Character !== null && $scope.Character.HRCareer2OSkillToReplace !== null) {
            for (j = 0; j < $scope.Career2.OccupationalSkills.length; j++) {
                if ($scope.Career2.OccupationalSkills[j][0] != $scope.Character.HRCareer2OSkillToReplace[0]) {
                    $scope.HROSkillCareer2List.push($scope.Career2.OccupationalSkills[j]);
                }
            }
        } else {
            if ($scope.Character !== null) {
                $scope.Character.HRCareer2OSkillReplacedWith = null;
            }
        }
    }

    $scope.selectHRSpellSwap = function() {
        if (!$scope.HRSpellChecked) {
            $scope.Character.HRCareer1SpellToReplace = null;
            $scope.Character.HRCareer1SpellReplacedWith = null;
            $scope.Character.HRCareer2SpellToReplace = null;
            $scope.Character.HRCareer2SpellReplacedWith = null;
        }
    }

    $scope.checkHRSpellCareer1From = function() {
        if ($scope.Character === null || $scope.Character.HRCareer1SpellToReplace === null || $scope.HRSpellChecked == false) {
            return false;
        } else {
            return true;
        }
    }

    $scope.selectHRSpellCareer1From = function() {
        $scope.HRSpellCareer1List = [];

        if ($scope.Character !== null && $scope.Character.HRCareer1SpellToReplace !== null) {
            for (j = 0; j < $scope.Career1.SpellList.length; j++) {
                if ($scope.Career1.SpellList[j].Cost == 1 || $scope.Career1.SpellList[j].Cost == 2) {
                    for (i = 0; i < $scope.Career1.SpellList[j].Spells.length; i++) {
                        if ($scope.Career1.SpellList[j].Spells[i] != $scope.Character.HRCareer1SpellToReplace) {
                            $scope.HRSpellCareer1List.push($scope.Career1.SpellList[j].Spells[i]);
                        }
                    }
                }
            }
            
            $scope.HRSpellCareer1List.sort();
        } else {
            if ($scope.Character !== null) {
                $scope.Character.HRCareer1SpellReplacedWith = null;
            }
        }
    }

    $scope.checkHRSpellCareer2From = function() {
        if ($scope.Character === null || $scope.Character.HRCareer2SpellToReplace === null || $scope.HRSpellChecked == false) {
            return false;
        } else {
            return true;
        }
    }

    $scope.selectHRSpellCareer2From = function() {
        $scope.HRSpellCareer2List = [];

        if ($scope.Character !== null && $scope.Character.HRCareer2SpellToReplace !== null) {
            for (j = 0; j < $scope.Career2.SpellList.length; j++) {
                if ($scope.Career2.SpellList[j].Cost == 1 || $scope.Career2.SpellList[j].Cost == 2) {
                    for (i = 0; i < $scope.Career2.SpellList[j].Spells.length; i++) {
                        if ($scope.Career2.SpellList[j].Spells[i] != $scope.Character.HRCareer2SpellToReplace) {
                            $scope.HRSpellCareer2List.push($scope.Career2.SpellList[j].Spells[i]);
                        }
                    }
                }
            }
            
            $scope.HRSpellCareer2List.sort();
        } else {
            if ($scope.Character !== null) {
                $scope.Character.HRCareer2SpellReplacedWith = null;
            }
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

        if ($scope.Character == null) {
            disableSubmit = true;
        } else {
            if ($scope.Character.Benefit == null) {
                disableSubmit = true;
            }

            if ($scope.Character.Benefit == 'Additional Study' && $scope.Character.BenefitAssocObj == null) {
                disableSubmit = true;
            }

            if ($scope.Language1Required && $scope.Character.LanguagesChosen[0] == null) {
                disableSubmit = true;
            }

            if ($scope.Language2Required && $scope.Character.LanguagesChosen[1] == null) {
                disableSubmit = true;
            }

            if ($scope.Language3Required && $scope.Character.LanguagesChosen[2] == null) {
                disableSubmit = true;
            }

            if ($scope.RacialStatIncreaseRequired && $scope.Character.RacialStatIncreaseChosen == null) {
                disableSubmit = true;
            }

            if ($scope.RacialAbilityRequired && $scope.Character.RacialAbilityChosen == null) {
                disableSubmit = true;
            }

            if ($scope.Career1MSkillsRequired && $scope.Character.Career1MSkillsChosen.length < $scope.Career1.StartingMSkillChoices) {
                disableSubmit = true;
            }

            if ($scope.Career1OSkillsRequired && $scope.Character.Career1OSkillsChosen.length < $scope.Career1.StartingOSkillChoices) {
                disableSubmit = true;
            }

            if ($scope.Career2MSkillsRequired && $scope.Character.Career2MSkillsChosen.length < $scope.Career2.StartingMSkillChoices) {
                disableSubmit = true;
            }

            if ($scope.Career2OSkillsRequired && $scope.Character.Career2OSkillsChosen.length < $scope.Career2.StartingOSkillChoices) {
                disableSubmit = true;
            }

            if ($scope.Career1AssetsRequired && $scope.Character.Career1AssetsChosen.length < $scope.Career1.StartingAssetChoices) {
                disableSubmit = true;
            }

            if ($scope.Career2AssetsRequired && $scope.Character.Career2AssetsChosen.length < $scope.Career2.StartingAssetChoices) {
                disableSubmit = true;
            }

            if ($scope.AdvancementPoints != 0) {
                disableSubmit = true;
            }

            if ($scope.Character.HRCareer1AbToReplace !== null && $scope.Character.HRCareer1AbReplacedWith == null) {
                disableSubmit = true;
            }

            if ($scope.Character.HRCareer2AbToReplace !== null && $scope.Character.HRCareer2AbReplacedWith == null) {
                disableSubmit = true;
            }

            if ($scope.Character.HRCareer1OSkillToReplace !== null && $scope.Character.HRCareer1OSkillReplacedWith == null) {
                disableSubmit = true;
            }

            if ($scope.Character.HRCareer2OSkillToReplace !== null && $scope.Character.HRCareer2OSkillReplacedWith == null) {
                disableSubmit = true;
            }

            if ($scope.Character.HRCareer1MSkillToReplace !== null && $scope.Character.HRCareer1MSkillReplacedWith == null) {
                disableSubmit = true;
            }

            if ($scope.Character.HRCareer2MSkillToReplace !== null && $scope.Character.HRCareer2MSkillReplacedWith == null) {
                disableSubmit = true;
            }

            if ($scope.Character.HRCareer1SpellToReplace !== null && $scope.Character.HRCareer1SpellReplacedWith == null) {
                disableSubmit = true;
            }

            if ($scope.Character.HRCareer2SpellToReplace !== null && $scope.Character.HRCareer2SpellReplacedWith == null) {
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

        $http.post($scope.Url, { ReqType: 'BuildChar', Character: $scope.Character }).success(function(data, status) {
            if (status != 200 || data != '') {
                $scope.Error == data;
            } else {
                var action = "/character_sheet.php?CharacterID=" + $scope.Character.CharacterID;
                window.location.href = action;
            }
        }).error(function(data, status) {
            $scope.Error = "Status: " + status + "; Data: " + data || "Request failed.";
        });

        return false;
    }
}
