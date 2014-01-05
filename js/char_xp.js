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

    /////////////////////////////////////////////////////////////////////
    /////                                                           /////
    /////       Private Functions                                   /////
    /////                                                           /////
    /////////////////////////////////////////////////////////////////////

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
