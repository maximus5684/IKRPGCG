function CB3Ctrl($scope, $http) {
    $scope.Url = 'ajax/characters.php';
    $scope.Error = null;
    $scope.CharacterID = null;
    $scope.Character = null;
    $scope.Race = null;
    $scope.Career1 = null;
    $scope.Career2 = null;
    $scope.HasOSkillsWithProperties = false;
    $scope.OSkillsWithProperties = [];
    $scope.HasBenefitsWithProperties = false;
    $scope.BenefitsWithProperties = [];
    $scope.HasAbilitiesWithProperties = false;
    $scope.AbilitiesWithProperties = [];
    $scope.HasRacialAbilityChoice = false;
    $scope.RacialAbilityChoices = [];
    $scope.RacialAbilityChoice = null;
    $scope.RacialAbilityProperty = null;
    $scope.RacialAbilityPropertyList = [];
    $scope.LeavePressed = false;

    $scope.Races = raceArr;
    $scope.Careers = careerArr;
    $scope.Archetypes = archArr;
    $scope.Abilities = abilArr;
    $scope.Languages = langArr;

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
        if ($scope.Error === null) {
            return true;
        } else {
            return false;
        }
    }

    $scope.selectRacialAbility = function() {
        if ($scope.RacialAbilityChoice !== null) {
            if ('PropertyType' in $scope.RacialAbilityChoice && $scope.RacialAbilityChoice.PropertyType == 'Language') {
                for (var i = 0; i < $scope.Languages.length; i++) {
                    if ($scope.Character.LanguagesChosen.indexOf($scope.Languages[i]) == -1) {
                        $scope.RacialAbilityPropertyList.push($scope.Languages[i]);
                    }
                }
            } else {
                $scope.RacialAbilityProperty = null;
                $scope.RacialAbilityPropertyList = [];
            }
        } else {
            $scope.RacialAbilityProperty = null;
            $scope.RacialAbilityPropertyList = [];
        }
    }
    
    $scope.checkRacialAbilityForProperty = function() {
        if ($scope.RacialAbilityChoice == null) {
            return false;
        } else {
            if ('Type' in $scope.RacialAbilityChoice) {
                if ($scope.RacialAbilityChoice.Type != 'Specific') {
                    return true;
                } else {
                    return false;
                }
            } else if ('PropertyType' in $scope.RacialAbilityChoice) {
                return true;
            } else {
                return false;
            }
        }
    }

    $scope.checkAbilityForPropType = function(ability) {
        if (ability == null || (!('PropertyType' in ability))) {
            return false;
        } else {
            return true;
        }
    }

    $scope.cancelConfirm = function() {
        $("#cancelConfirm").modal();
    }

    $scope.returnToHome = function() {
        $scope.LeavePressed = true;

        window.location.href = '/index.php';
    }

    $scope.submitCheck = function() {
        disableSubmit = false;

        if ($scope.HasOSkillsWithProperties) {
            for (var i = 0; i < $scope.OSkillsWithProperties.length; i++) {
                if ($scope.OSkillsWithProperties[i].Property == null || $scope.OSkillsWithProperties[i].Property == '') {
                    disableSubmit = true;
                }
            }
        }

        if ($scope.HasBenefitsWithProperties) {
            for (var i = 0; i < $scope.BenefitsWithProperties.length; i++) {
                if ($scope.BenefitsWithProperties[i].Property == null || $scope.BenefitsWithProperties[i].Property == '') {
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

        if ($scope.HasRacialAbilityChoice) {
            if ($scope.RacialAbilityChoice == null) {
                disableSubmit = true;
            } else {
                if ('Type' in $scope.RacialAbilityChoice || 'PropertyType' in $scope.RacialAbilityChoice) {
                    if ($scope.RacialAbilityProperty == null || $scope.RacialAbilityProperty == '') {
                        disableSubmit = true;
                    }
                }
            }
        }

        return disableSubmit;
    }

    $scope.UpdateChar = function() {
        // No need to update the Occupational Skills with properties, Benefits with properties,
        // or Abilities with properties since the items in those lists are references to the actual
        // items in the character's lists. The only thing to do is strip off the PropertiesList from
        // Benefits and Abilities, if they have it.

        $scope.LeavePressed = true;

        if ($scope.HasBenefitsWithProperties) {
            for (var i = 0; i < $scope.BenefitsWithProperties.length; i++) {
                if ('PropertiesList' in $scope.BenefitsWithProperties[i]) {
                    delete $scope.BenefitsWithProperties[i].PropertiesList;
                }
            }
        }

        if ($scope.HasAbilitiesWithProperties) {
            for (var i = 0; i < $scope.AbilitiesWithProperties.length; i++) {
                if ('PropertiesList' in $scope.AbilitiesWithProperties[i]) {
                    delete $scope.AbilitiesWithProperties[i].PropertiesList;
                }
            }
        }

        // Update Racial Benefit choice.
        if ($scope.HasRacialAbilityChoice) {
            if ($scope.RacialAbilityProperty == null) {
                $scope.Character.Abilities.push({ Name: $scope.RacialAbilityChoice.Name });
            } else {
                $scope.Character.Abilities.push({ Name: $scope.RacialAbilityChoice.Name, Type: 'Generic', Property: $scope.RacialAbilityProperty });
            }

            $scope.Character.Abilities.sort(byName);
        }

        // Build request.
        var charRequest = { ReqType: 'BuildChar', CharacterID: $scope.CharacterID, Status: 'Complete', PageComplete: 3, Character: $scope.Character };

        // Post it like a sticky note.
        $http.post($scope.Url, charRequest).success(function(data, status) {
            if (status !== 200 || data != '') {
                $scope.Error = data;
            } else {
                var action = '/character_sheet.php?CharacterID=' + $scope.CharacterID;
                window.location.href = action;
            }
        }).error(function(data, status) {
            $scope.Error = 'Status: ' + status + '; Data: ' + data || 'Request failed.';
        });
    }

    /////////////////////////////////////////////////////////////////////
    /////                                                           /////
    /////       Private Functions                                   /////
    /////                                                           /////
    /////////////////////////////////////////////////////////////////////

    function loadCharacterDefaults() {
        // Set race.
        for (var i = 0; i < $scope.Races.length; i++) {
            if ($scope.Races[i].Name == $scope.Character.Race) {
                $scope.Race = $scope.Races[i];
            }
        }

        // Set careers.
        for (var i = 0; i < $scope.Careers.length; i++) {
            if ($scope.Careers[i].Name == $scope.Character.Career1) {
                $scope.Career1 = $scope.Careers[i];
            }

            if ($scope.Careers[i].Name == $scope.Character.Career2) {
                $scope.Career2 = $scope.Careers[i];
            }
        }

        // Check for Occupational Skills with properties.
        for (var i = 0; i < $scope.Character.OccupationalSkills.length; i++) {
            if ('Type' in $scope.Character.OccupationalSkills[i]) {
                if ($scope.Character.OccupationalSkills[i].Type != 'Specific') {
                    $scope.OSkillsWithProperties.push($scope.Character.OccupationalSkills[i]);
                    $scope.HasOSkillsWithProperties = true;
                }
            }
        }

        // Check for benefits with properties.
        for (var i = 0; i < $scope.Character.Benefits.length; i++) {
            for (var i1 = 0; i1 < $scope.Archetypes.length; i1++) {
                for (var i2 = 0; i2 < $scope.Archetypes[i1].Benefits.length; i2++) {
                    if ($scope.Character.Benefits[i].Name == $scope.Archetypes[i1].Benefits[i2].Name && ('HasProperty' in $scope.Archetypes[i1].Benefits[i2])) {
                        $scope.Character.Benefits[i].PropertyType = $scope.Archetypes[i1].Benefits[i2].PropertyType;
                        $scope.Character.Benefits[i].Property = null;
                        $scope.Character.Benefits[i].PropertiesList = getBenefitPropertiesList($scope.Archetypes[i1].Benefits[i2].PropertyType);
                        $scope.BenefitsWithProperties.push($scope.Character.Benefits[i]);
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
                                if ('PropertyType' in $scope.Abilities[i1]) {
                                    $scope.Character.Abilities[i].Property = null;
                                    $scope.Character.Abilities[i].PropertyType = $scope.Character.Abilities[i].PropertyType;
                                    $scope.Character.Abilities[i].PropertiesList = getAbilityPropertiesList($scope.Abilities[i1].PropertyType);
                                } else {
                                    $scope.Character.Abilities[i].Property = $scope.Character.Abilities[i].Property;
                                }

                                $scope.AbilitiesWithProperties.push($scope.Character.Abilities[i]);
                                $scope.HasAbilitiesWithProperties = true;
                            }
                        }
                    }
                }
            }
        }

        // Check for racial ability choice and build abilities list.
        if ($scope.Race.AbilityChoices > 0) {
            $scope.HasRacialAbilityChoice = true;

            // Build stat list - necessary for stat prereq check.

            var stats = { PHY: 0, SPD: 0, STR: 0, AGL: 0, PRW: 0, POI: 0, INT: 0, ARC: 0, PER: 0 };
            stats.PHY = $scope.Race.Stats.PHY.Starting;
            stats.SPD = $scope.Race.Stats.SPD.Starting;
            stats.STR = $scope.Race.Stats.STR.Starting;
            stats.AGL = $scope.Race.Stats.AGL.Starting;
            stats.PRW = $scope.Race.Stats.PRW.Starting;
            stats.POI = $scope.Race.Stats.POI.Starting;
            stats.INT = $scope.Race.Stats.INT.Starting;

            if ($scope.Character.Archetype == 'Gifted') {
                if ($scope.Character.ArcaneTradition == 'Focuser') {
                    stats.ARC = 2;
                } else if ($scope.Character.ArcaneTradition == 'Will Weaver') {
                    stats.ARC = 3;
                }
            } else {
                stats.ARC = 0;
            }

            stats.PER = $scope.Race.Stats.PER.Starting;

            if ('StatIncreases' in $scope.Race) {
                for (var i = 0; i < $scope.Race.StatIncreases.length; i++) {
                    stats[$scope.Race.StatIncreases[i][0]] += $scope.Race.StatIncreases[i][1];
                }
            }

            // If race grants chooseable stat increases, add them.
            if ('RacialStatIncreaseChosen' in $scope.Character) {
                stats[$scope.Character.RacialStatIncreaseChosen] += 1;
            }

            // If careers grant stat increases add them.
            if ('StatIncreases' in $scope.Career1) {
                for (var i = 0; i < $scope.Career1.StatIncreases.length; i++) {
                    stats[$scope.Career1.StatIncreases[i][0]] += $scope.Career1.StatIncreases[i][1];
                }
            }

            if ('StatIncreases' in $scope.Career2) {
                for (var i = 0; i < $scope.Career2.StatIncreases.length; i++) {
                    stats[$scope.Career2.StatIncreases[i][0]] += $scope.Career2.StatIncreases[i][1];
                }
            }

            // Add advancement points.
            stats[$scope.Character.AP1Stat] += 1;
            stats[$scope.Character.AP2Stat] += 1;
            stats[$scope.Character.AP3Stat] += 1;

            $scope.RacialAbilityChoices = getAbilities();
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
                    if (AbilitiesList[i].PrereqStats[i1].Level > stats[AbilitiesList[i].PrereqStats[i1].Name]) {
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
                abilList.push(Abilities[i]);
            }
        }

        return abilList;
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
            if ('MilitarySkills' in $scope.Career1) {
                for (var i = 0; i < $scope.Career1.MilitarySkills.length; i++) {
                    tempList.push($scope.Career1.MilitarySkills[i].Name);
                }
            }

            if ('MilitarySkills' in $scope.Career2) {
                for (var i = 0; i < $scope.Career2.MilitarySkills.length; i++) {
                    var found = false;

                    for (var i1 = 0; i1 < tempList.length; i1++) {
                        if ($scope.Career2.MilitarySkills[i].Name == tempList[i1]) {
                            found = true;
                        }
                    }

                    if (!found) {
                        tempList.push($scope.Career2.MilitarySkills[i].Name);
                    }
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
        } else if (propertyType == 'Career') {
            for (var i = 0; i < $scope.Careers.length; i++) {
                if ($scope.Careers[i].Name != $scope.Career1.Name && $scope.Careers[i].Name != $scope.Career2.Name) {
                    tempList.push($scope.Careers[i].Name);
                }
            }
        }

        return tempList;
    }

    function byName(objA, objB) {
        if (objA.Name > objB.Name) {
            return 1
        } else if (objA.Name < objB.Name) {
            return -1
        }
    }

    $(window).bind('beforeunload', function() {
        if (!$scope.LeavePressed) {
            return 'Leaving this page without saving will lose all progress.';
        }
    });
}
