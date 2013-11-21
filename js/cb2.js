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
    $scope.Language1 = null;
    $scope.Language1Required = false;
    $scope.Language2 = null;
    $scope.Language2Required = false;
    $scope.Language3 = null;
    $scope.Language3Required = false;
    $scope.RacialStatIncreaseRequired = false;
    $scope.RacialAbilitiesRequired = false;
    $scope.Career1MSkillsRequired = false;
    $scope.Career2MSkillsRequired = false;
    $scope.Career1OSkillsRequired = false;
    $scope.Career2OSkillsRequired = false;
    $scope.Career1AssetsRequired = false;
    $scope.Career2AssetsRequired = false;
    $scope.HRAbility = false;
    $scope.HRMSkill = false;
    $scope.HROSkill = false;
    $scope.HRSpell = false;

    $scope.Races = raceArr;
    $scope.Archetypes = [];    

    for (i3 = 0; i3 < archArr.length; i3++) {
        $scope.Archetypes.push(archArr[i3]);
    }

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

        if ($scope.Race.LangChoices > 0) {
            $scope.Language1Required = true;
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

        if ($scope.Race.AbilityChoices > 0) {
            $scope.RacialAbilitiesRequired = true;
        }

        for (d = 0; d < $scope.Careers.length; d++) {
            if ($scope.Careers[d].Name == $scope.Character.Career1) {
                $scope.Career1 = $scope.Careers[d];
            } else if ($scope.Careers[d].Name == $scope.Character.Career2) {
                $scope.Career2 = $scope.Careers[d];
            }
        }

        //Select career-related values.
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

        if ($scope.Career1.StartingSkillChoices > 0) {
            if ($scope.Career1.StartingSkillChoicesType == 'Military') {
                $scope.Career1MSkillsRequired = true;
            } else if ($scope.Career1.StartingSkillChoicesType == 'Occupational') {
                $scope.Career1OSkillsRequired = true;
            }
        }

        if ($scope.Career2.StartingSkillChoices > 0) {
            if ($scope.Career2.StartingSkillChoicesType == 'Military') {
                $scope.Career2MSkillsRequired = true;
            } else if ($scope.Career2.StartingSkillChoicesType == 'Occupational') {
                $scope.Career2OSkillsRequired = true;
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
}
