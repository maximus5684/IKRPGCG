function CB3Ctrl($scope, $http) {
    $scope.Url = 'ajax/characters.php';
    $scope.Error = null;
    $scope.CharacterID = null;
    $scope.Character = null;
    $scope.Career1 = null;
    $scope.Career2 = null;
    $scope.HasBenefitsWithProperties = false;
    $scope.BenefitsWithProperties = [];
    $scope.HasAbilitiesWithProperties = false;
    $scope.AbilitiesWithProperties = [];
    $scope.HasRacialAbilityChoice = false;

    $scope.Careers = careerArr;
    $scope.Archetypes = archArr;
    $scope.Abilities = abilArr;
    $scope.Languages = langArr;

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
        // Set careers.
        for (var i = 0; i < $scope.Careers.length; i++) {
            if ($scope.Careers[i].Name == $scope.Character.Career1) {
                $scope.Career1 = $scope.Careers[i];
            }

            if ($scope.Careers[i].Name == $scope.Character.Career2) {
                $scope.Career2 = $scope.Careers[i];
            }
        }

        // Check for benefits with properties.
        for (var i = 0; i < $scope.Character.Benefits.length; i++) {
            for (var i1 = 0; i1 < $scope.Archetypes.length; i1++) {
                for (var i2 = 0; i2 < $scope.Archetypes[i1].Benefits.length; i2++) {
                    if ($scope.Character.Benefits[i].Name == $scope.Archetypes[i1].Benefits[i2].Name && ('HasProperty' in $scope.Archetypes[i1].Benefits[i2])) {
                        var tempBen = { Name: $scope.Character.Benefits[i].Name, PropertyType: $scope.Archetypes[i1].Benefits[i2].PropertyType };
                        tempBen.Property = null;
                        tempBen.PropertiesList = getBenefitPropertiesList($scope.Archetypes[i1].Benefits[i2].PropertyType);
                        $scope.BenefitsWithProperties.push(tempBen);
                        $scope.HasBenefitsWithProperties = true;
                    }
                }
            }
        }
        
        // Check for abilities with properties.
        if ('Abilities' in $scope.Character) {
            for (var i = 0; i < $scope.Character.Abilities.length; i++) {
                for (var i1 = 0; i1 < $scope.Abilities.length; i1++) {
                    if ($scope.Character.Abilities[i].Name == $scope.Abilities[i1].Name) {
                        if ('HasProperty' in $scope.Abilities[i1]) {
                            if ($scope.Character.Abilities[i].Type != 'Specific') {
                                var tempAbil = { Name: $scope.Character.Abilities[i].Name, Type: $scope.Character.Abilities[i].Type };

                                if ('PropertyType' in $scope.Abilities[i1]) {
                                    tempAbil.Property = null;
                                    tempAbil.PropertyType = $scope.Character.Abilities[i].PropertyType;
                                    tempAbil.PropertiesList = getAbilityPropertiesList($scope.Abilities[i1].PropertyType);
                                } else {
                                    tempAbil.Property = $scope.Character.Abilities[i].Property;
                                }

                                $scope.AbilitiesWithProperties.push(tempAbil);
                                $scope.HasAbilitiesWithProperties = true;
                            }
                        }
                    }
                }
            }
        }
    }

    function getBenefitPropertiesList(propertyType) {
        var tempList = [];

        if (propertyType == 'Spell') {
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
        } else if (propertyType == 'Military Skill') {
            if ('MilitarySkills' in $scope.Character) {
                for (var i = 0; i < $scope.Character.MilitarySkills; i++) {
                    tempList.push($scope.Character.MilitarySkills[i]);
                }
            }
        }

        tempList.sort();

        return tempList;
    }

    function getAbilityPropertiesList(propertyType) {
        var tempList = [];

        if (propertyType == 'Language') {
            for (var i = 0; i < $scope.Languages.length; i++) {
                if ($scope.Character.LanguagesChosen.indexOf($scope.Languages[i]) == -1) {
                    tempList.push($scope.Languages[i]);
                }
            }
        }

        return tempList;
    }
    
    $scope.checkAbilityForPropType = function(ability) {
        if ('PropertyType' in ability) {
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

        if ($scope.HasBenefitsWithProperties) {
            for (var i = 0; i < $scope.BenefitsWithProperties.length; i++) {
                if ($scope.BenefitsWithProperties[i].Property == null) {
                    disableSubmit = true;
                }
            }
        }

        if ($scope.HasAbilitiesWithProperties) {
            for (var i = 0; i < $scope.AbilitiesWithProperties.length; i++) {
                if ($scope.AbilitiesWithProperties[i].Property == null || $scope.AbilitiesWithProperties[i].Property == '') {
                    disableSubmit = true;
                }
            }
        }

        return disableSubmit;
    }
}
