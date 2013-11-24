function CB2Ctrl($scope, $http) {
    $scope.Url = 'ajax/characters.php';
    $scope.Error = null;
    $scope.Character = null;
    $scope.Benefits = null;
    $scope.Race = null;
    $scope.Career1 = null;
    $scope.Career2 = null;
    $scope.RacialBenefits = null;
    $scope.CareerBenefits = null;
    $scope.RacialAbilitiesRequired = false;
    $scope.RacialAbilityChoices = [];
    $scope.RacialAbilities = null;
    $scope.CareerAbilities = null;
    $scope.RacialStatIncreaseRequired = false;
    $scope.AdvancementPoints = 3;
    $scope.StartingStats = Array(9);
    $scope.MaxStats = Array(9);
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
    $scope.Career2AssetsRequired = false;
    $scope.HRAbility = false;
    $scope.HRMSkill = false;
    $scope.HROSkill = false;
    $scope.HRSpell = false;

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
                $scope.Benefits = $scope.Archetypes[a].Benefits;
                break;
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

        $scope.StartingStats[0] = $scope.Race.Stats.PHY[0];
        $scope.StartingStats[1] = $scope.Race.Stats.SPD[0];
        $scope.StartingStats[2] = $scope.Race.Stats.STR[0];
        $scope.StartingStats[3] = $scope.Race.Stats.AGL[0];
        $scope.StartingStats[4] = $scope.Race.Stats.PRW[0];
        $scope.StartingStats[5] = $scope.Race.Stats.POI[0];
        $scope.StartingStats[6] = $scope.Race.Stats.INT[0];
        $scope.StartingStats[7] = $scope.Race.Stats.ARC[0];
        $scope.StartingStats[8] = $scope.Race.Stats.PER[0];

        $scope.MaxStats[0] = $scope.Race.Stats.PHY[1];
        $scope.MaxStats[1] = $scope.Race.Stats.SPD[1];
        $scope.MaxStats[2] = $scope.Race.Stats.STR[1];
        $scope.MaxStats[3] = $scope.Race.Stats.AGL[1];
        $scope.MaxStats[4] = $scope.Race.Stats.PRW[1];
        $scope.MaxStats[5] = $scope.Race.Stats.POI[1];
        $scope.MaxStats[6] = $scope.Race.Stats.INT[1];
        $scope.MaxStats[7] = $scope.Race.Stats.ARC[1];
        $scope.MaxStats[8] = $scope.Race.Stats.PER[1];

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
            $scope.RacialAbilitiesRequired = true;
        
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
        }

        if ($scope.Career1.StartingOSkillChoices > 0) {
            $scope.Career1OSkillsRequired = true;
        
            for (j1 = 0; j1 < $scope.Career1.StartingOSkillChoicesOptions.length; j1++) {
                $scope.Career1OSkillsCBs.push({ Name: $scope.Career1.StartingOSkillChoicesOptions[j1][0], Level: $scope.Career1.StartingOSkillChoicesOptions[j1][1], Checked: false, Disabled: false });
            }
        }

        if ($scope.Career2.StartingMSkillChoices > 0) {
            $scope.Career2MSkillsRequired = true;
        
            for (j2 = 0; j2 < $scope.Career2.StartingMSkillChoicesOptions.length; j2++) {
                $scope.Career2MSkillsCBs.push({ Name: $scope.Career2.StartingMSkillChoicesOptions[j2][0], Level: $scope.Career2.StartingMSkillChoicesOptions[j2][1], Checked: false, Disabled: false });
            }
        }
        
        if ($scope.Career2.StartingOSkillChoices > 0) {
            $scope.Career2OSkillsRequired = true;
        
            for (j3 = 0; j3 < $scope.Career2.StartingOSkillChoicesOptions.length; j3++) {
                $scope.Career2OSkillsCBs.push({ Name: $scope.Career2.StartingOSkillChoicesOptions[j3][0], Level: $scope.Career2.StartingOSkillChoicesOptions[j3][1], Checked: false, Disabled: false });
            }
        }

        if ($scope.Career1.StartingAssetChoices > 0) {
            $scope.Career1AssetsRequired = true;
        }

        if ($scope.Career2.StartingAssetChoices > 0) {
            $scope.Career2AssetsRequired = true;
        }
    }

    $scope.checkBenefit = function() {
        if ($scope.Character === null || $scope.Character.Benefit === null) {
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
        $scope.StartingStats[0] = $scope.Race.Stats.PHY[0];
        $scope.StartingStats[1] = $scope.Race.Stats.SPD[0];
        $scope.StartingStats[2] = $scope.Race.Stats.STR[0];
        $scope.StartingStats[3] = $scope.Race.Stats.AGL[0];
        $scope.StartingStats[4] = $scope.Race.Stats.PRW[0];
        $scope.StartingStats[5] = $scope.Race.Stats.POI[0];
        $scope.StartingStats[6] = $scope.Race.Stats.INT[0];
        $scope.StartingStats[7] = $scope.Race.Stats.ARC[0];
        $scope.StartingStats[8] = $scope.Race.Stats.PER[0];
        
        if ($scope.Character.RacialStatIncreaseChosen !== null) {
            switch($scope.Character.RacialStatIncreaseChosen) {
                case 'PHY':
                    $scope.StartingStats[0] += 1;
                    break;
                case 'SPD':
                    $scope.StartingStats[1] += 1;
                    break;
                case 'STR':
                    $scope.StartingStats[2] += 1;
                    break;
                case 'AGL':
                    $scope.StartingStats[3] += 1;
                    break;
                case 'PRW':
                    $scope.StartingStats[4] += 1;
                    break;
                case 'POI':
                    $scope.StartingStats[5] += 1;
                    break;
                case 'INT':
                    $scope.StartingStats[6] += 1;
                    break;
                case 'ARC':
                    $scope.StartingStats[7] += 1;
                    break;
                case 'PER':
                    $scope.StartingStats[8] += 1;
                    break;
            }
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
        if ($scope.Character === null || $scope.Character.RacialAbilitiesChosen === null) {
            return false;
        } else {
            return true;
        }
    }

    $scope.changeCareer1MSkill = function() {
        checked = 0;
        
        for (k = 0; k < $scope.Career1MSkillsCBs.length; k++) {
            if ($scope.Career1MSkillsCBs[k].Checked) {
                checked++;
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
    
    $scope.changeCareer1OSkill = function() {
        checked = 0;
        
        for (k = 0; k < $scope.Career1OSkillsCBs.length; k++) {
            if ($scope.Career1OSkillsCBs[k].Checked) {
                checked++;
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
    
    $scope.changeCareer2MSkill = function() {
        checked = 0;
        
        for (k = 0; k < $scope.Career2MSkillsCBs.length; k++) {
            if ($scope.Career2MSkillsCBs[k].Checked) {
                checked++;
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
    
    $scope.changeCareer2OSkill = function() {
        checked = 0;
        
        for (k = 0; k < $scope.Career2OSkillsCBs.length; k++) {
            if ($scope.Career2OSkillsCBs[k].Checked) {
                checked++;
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
}
