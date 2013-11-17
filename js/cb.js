function CBCtrl($scope) {
    $scope.Sex = 'M';
    $scope.Race = null;
    $scope.Archetype = null;
    $scope.Benefit = null;
    $scope.Career1 = null;
    $scope.Career2 = null;
    $scope.Career1List = [];
    $scope.Career2List = [];
    
    $scope.Races = raceArr;
    $scope.Archetypes = [];    
    
    for (i3 = 0; i3 < archArr.length; i3++) {
        $scope.Archetypes.push(archArr[i3]);
    }
    
    $scope.Careers = careerArr;
    
    $scope.selectSex = function() {
        if ($scope.Race !== null) {
            if ($("#Height").val() !== '') {
                if ($("#Sex").val() == "M") {
                    if ($("#Height").val() < $scope.Race.HeightMale[0]) {
                        $("#Height").val($scope.Race.HeightMale[0]);
                    } else if ($("#Height").val() > $scope.Race.HeightMale[1]) {
                        $("#Height").val($scope.Race.HeightMale[1]);
                    }
                } else if ($("#Sex").val() == "F") {
                    if ($("#Height").val() < $scope.Race.HeightFemale[0]) {
                        $("#Height").val($scope.Race.HeightFemale[0]);
                    } else if ($("#Height").val() > $scope.Race.HeightFemale[1]) {
                        $("#Height").val($scope.Race.HeightFemale[1]);
                    }
                }
            }
            
            if ($("#Weight").val() !== '') {
                if ($("#Sex").val() == "M") {
                    if ($("#Weight").val() < $scope.Race.WeightMale[0]) {
                        $("#Weight").val($scope.Race.WeightMale[0]);
                    } else if ($("#Weight").val() > $scope.Race.WeightMale[1]) {
                        $("#Weight").val($scope.Race.WeightMale[1]);
                    }
                } else if ($("#Sex").val() == "F") {
                    if ($("#Weight").val() < $scope.Race.WeightFemale[0]) {
                        $("#Weight").val($scope.Race.WeightFemale[0]);
                    } else if ($("#Weight").val() > $scope.Race.WeightFemale[1]) {
                        $("#Weight").val($scope.Race.WeightFemale[1]);
                    }
                }                
            }
            
            if ($("#Sex").val() == "M") {
                $("#Height").attr({
                    min: $scope.Race.HeightMale[0],
                    max: $scope.Race.HeightMale[1]
                });
                
                $("#Weight").attr({
                    min: $scope.Race.WeightMale[0],
                    max: $scope.Race.WeightMale[1]
                });
            } else if ($("#Sex").val() == "F") {
                $("#Height").attr({
                    min: $scope.Race.HeightFemale[0],
                    max: $scope.Race.HeightFemale[1]
                });
                
                $("#Weight").attr({
                    min: $scope.Race.WeightFemale[0],
                    max: $scope.Race.WeightFemale[1]
                });
            }
        }
    };
    
    $scope.changeRace = function() {
        if ($scope.Archetype === null && $scope.Career1 === null) {
            $scope.resetRace();
        } else {
            $('#changeRace').modal();
        }
    };
    
    $scope.checkRace = function() {
        if ($scope.Race !== null) {
            return true;
        } else {
            return false;
        }
    };
    
    $scope.resetRace = function() {
        $scope.Race = null;
        $scope.Archetype = null;
        $scope.Benefit = null;
        $scope.Benefits = null;
        $scope.Career1 = null;
        $scope.Career1List = [];
        $scope.Career2 = null;
        $scope.Career2List = [];
        
        $("#Height").attr({
            min: "",
            max: ""
        });
        
        $("#Weight").attr({
            min: "",
            max: ""
        });
        
        $("#Height").val("");
        $("#Weight").val("");
    };
    
    $scope.selectRace = function() {
        if ($scope.Race !== null) {
            popArchetypes();
            
            if ($("#Sex").val() == "M") {
                $("#Height").attr({
                    min: $scope.Race.HeightMale[0],
                    max: $scope.Race.HeightMale[1]
                });
                
                $("#Height").val($scope.Race.HeightMale[0]);
                
                $("#Weight").attr({
                    min: $scope.Race.WeightMale[0],
                    max: $scope.Race.WeightMale[1]
                });
                
                $("#Weight").val($scope.Race.WeightMale[0]);
            } else if ($("#Sex").val() == "F") {
                $("#Height").attr({
                    min: $scope.Race.HeightFemale[0],
                    max: $scope.Race.HeightFemale[1]
                });
                
                $("#Height").val($scope.Race.HeightFemale[0]);
                
                $("#Weight").attr({
                    min: $scope.Race.WeightFemale[0],
                    max: $scope.Race.WeightFemale[1]
                });
                
                $("#Weight").val($scope.Race.WeightFemale[0]);
            }
        }
    };
    
    $scope.changeArchetype = function() {
        if ($scope.Benefit === null && $scope.Career1 === null) {
            $scope.resetArchetype();
        } else {
            $('#changeArchetype').modal();
        }
    };
    
    $scope.checkArchetype = function() {
        if ($scope.Archetype !== null) {
            return true;
        } else {
            return false;
        }
    };
    
    $scope.resetArchetype = function() {
        $scope.Archetype = null;
        $scope.Benefit = null;
        $scope.Benefits = null;
        $scope.Career1 = null;
        $scope.Career1List = [];
        $scope.Career2 = null;
        $scope.Career2List = [];
    };
    
    $scope.selectArchetype = function() {
        if ($scope.Archetype !== null) {
            $scope.Benefits = $scope.Archetype.Benefits;
            popCareers();
        }
    };
    
    $scope.resetBenefit = function() {
        $scope.Benefit = null;
    };
    
    $scope.selectBenefit = function() {
        if ($scope.Benefit == 'Feat: Strength of Will') {
            if ($scope.Career1 !== null) {
                if ($scope.Career1.Name == 'Warcaster') {
                    $('#benefitConflict1').modal();
                } else if ($scope.Career2 !== null) {
                    if ($scope.Career2.Name == 'Warcaster') {
                        $('#benefitConflict2').modal();
                    }
                }
            }
        }
    };
    
    $scope.changeCareer1 = function() {
        if ($scope.Career2 === null) {
            $scope.resetCareer1();
        } else {
            $('#changeCareer1').modal();
        }
    };
    
    $scope.checkCareer1 = function() {
        if ($scope.Career1 !== null) {
            return true;
        } else {
            return false;
        }
    };    
    
    $scope.resetCareer1 = function() {
        $scope.Career2List.push($scope.Career1);
        $scope.Career2List.sort(compareCareersByName);
        
        $scope.Career1 = null;
        $scope.Career2 = null;
    };
    
    $scope.selectCareer1 = function() {
        if ($scope.Career1 !== null) {
            if ($scope.Career2List.indexOf($scope.Career1) > -1) {
                $scope.Career2List.splice($scope.Career2List.indexOf($scope.Career1), 1);
            }
            
            if ($scope.Career1.Name == 'Warcaster') {
                if ($scope.Benefit !== null) {
                    if ($scope.Benefit == 'Feat: Strength of Will') {
                        $('#benefitConflict1').modal();
                    }
                }
            }
        }
    };
    
    $scope.resetCareer2 = function() {
        $scope.Career2 = null;
    };
    
    $scope.selectCareer2 = function() {
        if ($scope.Career2.Name == 'Warcaster') {
            if ($scope.Benefit !== null) {
                if ($scope.Benefit == 'Feat: Strength of Will') {
                    $('#benefitConflict2').modal();
                }
            }
        }
    };
    
    function compareCareersByName(careerA, careerB) {
        if (careerA.Name < careerB.Name) {
            return 1;
        } else {
            return -1;
        }
    }
    
    function popArchetypes() {
        archList = [];
        
        for (i2 = 0; i2 < archArr.length; i2++) {
            archList.push(archArr[i2]);
        }
        
        archsToRemove = [];

        for (i = 0; i < $scope.Race.ResArchetypes.length; i++) {
            for (m = 0; m < archList.length; m++) {
                if ($scope.Race.ResArchetypes[i] == archList[m].Name) {
                    archsToRemove.push(archList[m]);
                }
            }
        }
        
        for (n = 0; n < archsToRemove.length; n++) {
            if (archList.indexOf(archsToRemove[n]) > -1) {
                archList.splice(archList.indexOf(archsToRemove[n]), 1);
            }
        }

        $scope.Archetypes = archList;
    }
    
    function popCareers() {
        for (g = 0; g < $scope.Careers.length; g++) {
            $scope.Career1List.push($scope.Careers[g]);
            $scope.Career2List.push($scope.Careers[g]);
        }
        
        careersToRemove = [];
        
        for (j = 0; j < $scope.Careers.length; j++) {
            if ($scope.Race.ResCareers.indexOf($scope.Careers[j].Name) > -1) {
                careersToRemove.push($scope.Careers[j]);
            }
        }
        
        for (l = 0; l < careersToRemove.length; l++) {
            if ($scope.Career1List.indexOf(careersToRemove[l]) > -1) {
                $scope.Career1List.splice($scope.Career1List.indexOf(careersToRemove[l]), 1);
                $scope.Career2List.splice($scope.Career2List.indexOf(careersToRemove[l]), 1);                
            }
        }
        
        if ($scope.Archetype.Name !== 'Gifted') {
            // Remove careers restricted by archetype
            giftedCareers = [
                'Arcane Mechanik',
                'Arcanist',
                'Gun Mage',
                'Priest of Morrow',
                'Priest of Menoth',
                'Sorcerer (Fire)',
                'Sorcerer (Ice)',
                'Sorcerer (Stone)',
                'Sorcerer (Storm)',
                'Warcaster'
            ];
            careersToRemove = [];
            
            for (k = 0; k < $scope.Careers.length; k++) {
                if (giftedCareers.indexOf($scope.Careers[k].Name) > -1) {
                    careersToRemove.push($scope.Careers[k]);
                }
            }
            
            for (m1 = 0; m1 < careersToRemove.length; m1++) {
                if ($scope.Career1List.indexOf(careersToRemove[m1]) > -1) {
                    $scope.Career1List.splice($scope.Career1List.indexOf(careersToRemove[m1]), 1);
                    $scope.Career2List.splice($scope.Career2List.indexOf(careersToRemove[m1]), 1);                    
                }
            }
        }
    }
}
