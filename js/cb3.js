function CB3Ctrl($scope, $http) {
    // Initial function to load character.
     $scope.GetChar = function(CharID) {
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
         if ($scope.Error === null) {
             return true;
         } else {
             return false;
         }
     }

    function loadCharacterDefaults() {

    }

    $scope.selectBenefit = function() {
        if ($scope.Benefit !== null) {
            if ('HasProperty' in $scope.Benefit) {
                if ($scope.Benefit.PropertyType == 'Spell') {
                    if ('SpellList' in $scope.Career1) {
                        for (var i = 0; i < $scope.Career1.SpellList.length; i++) {
                            if ($scope.BenefitPropertySpellList.indexOf($scope.Career1.SpellList[i]) == -1) {
                                $scope.BenefitPropertySpellList.push($scope.Career1.SpellList[i]);
                            }
                        }
                    }

                    if ('SpellList' in $scope.Career2) {
                        for (var i = 0; i < $scope.Career2.SpellList.length; i++) {
                            if ($scope.BenefitPropertySpellList.indexOf($scope.Career2.SpellList[i]) == -1) {
                                $scope.BenefitPropertySpellList.push($scope.Career2.SpellList[i]);
                            }
                        }
                    }

                    $scope.BenefitPropertySpellList.sort();
                } else if ($scope.Benefit.PropertyType == 'Military Skill') {

                }
            } else {
                $scope.BenefitPropertySpellList = [];
                $scope.BenefitPropertyMSkillList = [];
            }
        }
    }
}
