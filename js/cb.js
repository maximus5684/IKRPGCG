function CBCtrl($scope, $http) {
    // Builder Variables
    $scope.Character =
    {
        Name: '',
        Race: '',
        DefiningCharacteristics: '',
        Faith: '',
        Sex: 'M',
        Height: '',
        Weight: '',
        Archetype: '',
        Career1: '',
        Career2: '',
        XP: 0
    };
    $scope.Race = null;
    $scope.Archetype = null;
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
    
    // Ajax Variables
    $scope.Url = 'ajax/characters.php';
    $scope.Error = null;

    // Form Functions
    $scope.selectSex = function() {
        // Set the height and weight min/max values according to the race.
        if ($scope.Race !== null) {
            if ($scope.Character.Height !== '') {
                if (parseInt($scope.Character.Height) < $scope.Race.Height[$scope.Character.Sex].Min) {
                    $scope.Character.Height = $scope.Race.Height[$scope.Character.Sex].Min;
                } else if (parseInt($scope.Character.Height) > $scope.Race.Height[$scope.Character.Sex].Max) {
                    $scope.Character.Height = $scope.Race.Height[$scope.Character.Sex].Max;
                }
            }

            if ($scope.Character.Weight !== '') {
                if (parseInt($scope.Character.Weight) < $scope.Race.Weight[$scope.Character.Sex].Min) {
                    $scope.Character.Weight = $scope.Race.Weight[$scope.Character.Sex].Min;
                } else if (parseInt($scope.Character.Weight) > $scope.Race.Weight[$scope.Character.Sex].Max) {
                    $scope.Character.Weight = $scope.Race.Weight[$scope.Character.Sex].Max;
                }
            }
            
            $("#Height").attr({
                min: $scope.Race.Height[$scope.Character.Sex].Min,
                max: $scope.Race.Height[$scope.Character.Sex].Max
            });
            
            $("#Weight").attr({
                min: $scope.Race.Weight[$scope.Character.Sex].Min,
                max: $scope.Race.Weight[$scope.Character.Sex].Max
            });
        }
    };
    
    $scope.changeRace = function() {
        // If they haven't selected an archetype or first career yet, just reset it;
        // otherwise, warn them.
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
        // Clear everything from race down.
        $scope.Race = null;
        $scope.Character.Race = '';
        $scope.Archetype = null;
        $scope.Character.Archetype = '';
        $scope.Career1 = null;
        $scope.Character.Career1 = '';
        $scope.Career1List = [];
        $scope.Career2 = null;
        $scope.Character.Career2 = '';
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
            
            // Set initial height and weight values.
            $("#Height").attr({
                min: $scope.Race.Height[$scope.Character.Sex].Min,
                max: $scope.Race.Height[$scope.Character.Sex].Max
            });

            $scope.Character.Height = $scope.Race.Height[$scope.Character.Sex].Min;

            $("#Weight").attr({
                min: $scope.Race.Weight[$scope.Character.Sex].Min,
                max: $scope.Race.Weight[$scope.Character.Sex].Max
            });

            $scope.Character.Weight = $scope.Race.Weight[$scope.Character.Sex].Min;

            $scope.Character.Race = $scope.Race.Name;
        } else {
            $scope.Character.Race = '';
        }
    };
    
    $scope.changeArchetype = function() {
        // If they haven't selected a benefit or first career, reset it;
        // otherwise, warn them.
        if ($scope.Career1 === null) {
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
        // Reset everything from archetype down.
        $scope.Archetype = null;
        $scope.Character.Archetype = '';
        $scope.Career1 = null;
        $scope.Character.Career1 = '';
        $scope.Career1List = [];
        $scope.Career2 = null;
        $scope.Character.Career2 = '';
        $scope.Career2List = [];
    };
    
    $scope.selectArchetype = function() {
        if ($scope.Archetype !== null) {
            // Populate the first career drop-down.
            popCareer1();

            $scope.Character.Archetype = $scope.Archetype.Name;
        } else {
            $scope.Character.Archetype = '';
        }
    };
    
    $scope.changeCareer1 = function() {
        // If a second career has not been chosen, reset it;
        // otherwise, warn them.
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

    $scope.checkCareer1Special = function() {
        if ($scope.Career1 === null) {
            return false;
        } else {
            if ('StartingSpecial' in $scope.Career1) {
                return true;
            } else {
                return false;
            }
        }
    }

    $scope.resetCareer1 = function() {
        // Reset first and second careers.
        $scope.Career1 = null;
        $scope.Character.Career1 = '';
        $scope.Career2 = null;
        $scope.Character.Career2 = '';
        $scope.Career2List = [];
    };
    
    $scope.selectCareer1 = function() {
        // Populate second career drop-down.
        if ($scope.Career1 !== null) {
            popCareer2();

            $scope.Character.Career1 = $scope.Career1.Name;
        } else {
            $scope.Character.Career1 = '';
        }
    };
    
    $scope.checkCareer2Special = function() {
        if ($scope.Career2 === null) {
            return false;
        } else {
            if ('StartingSpecial' in $scope.Career2) {
                return true;
            } else {
                return false;
            }
        }
    };
    
    $scope.resetCareer2 = function() {
        $scope.Career2 = null;
        $scope.Character.Career2 = '';
    };

    $scope.selectCareer2 = function() {
        if ($scope.Career2 !== null) {
            $scope.Character.Career2 = $scope.Career2.Name;
        } else {
            $scope.Character.Career2 = '';
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
        // Populates the archetypes drop-down list. Removes archetypes
        // restricted by race.
        archList = [];
        
        for (i2 = 0; i2 < archArr.length; i2++) {
            archList.push(archArr[i2]);
        }
        
        if ('ResArchetypes' in $scope.Race) {
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
        }

        $scope.Archetypes = archList;
    }
    
    function popCareer1() {
        // Populates the first career drop-down list. Removes careers
        // restricted by archetype.
        for (g = 0; g < $scope.Careers.length; g++) {
            $scope.Career1List.push($scope.Careers[g]);
        }
        
        if ('ResCareers' in $scope.Race) {
            careersToRemove = [];
            
            for (j = 0; j < $scope.Careers.length; j++) {
                if ($scope.Race.ResCareers.indexOf($scope.Careers[j].Name) > -1) {
                    careersToRemove.push($scope.Careers[j]);
                }
            }
            
            for (l = 0; l < careersToRemove.length; l++) {
                if ($scope.Career1List.indexOf(careersToRemove[l]) > -1) {
                    $scope.Career1List.splice($scope.Career1List.indexOf(careersToRemove[l]), 1);
                }
            }
        }

        if ($scope.Archetype.Name !== 'Gifted') {
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
                }
            }
        }
    }

    function popCareer2() {
        // Populates the second career drop-down list by copying the first (minus the
        // career selected in the first drop-down) and removing any careers
        // restricted by the "2nd career" restrictions.
        for (g1 = 0; g1 < $scope.Career1List.length; g1++) {
            if ($scope.Career1List[g1].Name != $scope.Career1.Name) {
                $scope.Career2List.push($scope.Career1List[g1]);
            }
        }

        careersToRemove = [];

        // If the first career has a restricted careers list, trim the 2nd career list
        // to only that list. Otherwise, check all the remaining careers for restricted
        // career lists and remove those from the 2nd list if the 1st career is not
        // in their restricted list.
        if ('ResSecondCareers' in $scope.Career1) {
            for (bb2 = 0; bb2 < $scope.Career2List.length; bb2++) {
                if ($scope.Career1.ResSecondCareers.indexOf($scope.Career2List[bb2].Name) == -1) {
                    careersToRemove.push($scope.Career2List[bb2]);
                }
            }

            for (bb3 = 0; bb3 < careersToRemove.length; bb3++) {
                $scope.Career2List.splice($scope.Career2List.indexOf(careersToRemove[bb3]), 1);
            }
        } else {
            for (bb4 = 0; bb4 < $scope.Career2List.length; bb4++) {
                if ('ResSecondCareers' in $scope.Career2List[bb4]) {
                    if ($scope.Career2List[bb4].ResSecondCareers.indexOf($scope.Career1.Name) == -1) {
                        careersToRemove.push($scope.Career2List[bb4]);
                    }
                }
            }

            for (bb5 = 0; bb5 < careersToRemove.length; bb5++) {
                $scope.Career2List.splice($scope.Career2List.indexOf(careersToRemove[bb5]), 1);
            }
        }
    }

    // Submission and AJAX Functions
    $scope.cancelConfirm = function() {
        if ($scope.Race !== null) {
            $('#cancelConfirm').modal();
        } else {
            window.location = '/index.php';
        }
    }

    $scope.returnToHome = function() {
        window.location = '/index.php';
    }
    
    $scope.submitCheck = function() {
        if ($scope.Character.Name != '' && $scope.Career2 !== null) {
            return false;
        } else {
            return true;
        }
    }
    
    $scope.checkError = function() {
        if ($scope.Error === null) {
            return true;
        } else {
            return false;
        }
    }

    $scope.AddChar = function() {
        if ($scope.Archetype.Name == 'Gifted') {
            if ($scope.Career1.Name == 'Warcaster' || $scope.Career2.Name == 'Warcaster') {
                $scope.Character.ArcaneTradition = 'Focuser';
            } else {
                $scope.Character.ArcaneTradition = 'Will Weaver';
            }
        }

        newCharReq = {
            ReqType: 'AddChar',
            Character: $scope.Character
        }

        $http.post($scope.Url, newCharReq).success(function(data, status) {
            if (data.indexOf('Error') == 0) {
                $scope.Error = data;
            } else {
                var action = "/character_builder2.php?CharacterID=" + data; 
                window.location.href = action;
            }
        }).error(function(data, status) {
            $scope.Error = "Status: " + status + "; Data: " + data || 'Request failed.';
        });

        return false;
    }

    $(window).bind('beforeunload', function() {
        if ($scope.Race !== null) {
            return 'Leaving this page without saving will lose all progress.';
        }
    });
}
