function CSCtrl($scope) {

    /////////////////////////////////////////////////////////////////////
    /////                                                           /////
    /////       Initial Values                                      /////
    /////                                                           /////
    /////////////////////////////////////////////////////////////////////

    $scope.Race = null;
    $scope.Career1 = null;
    $scope.Career2 = null;
    $scope.Career3 = null;
    $scope.Career4 = null;
    $scope.Level = 'Hero';
    $scope.XP = 0;
    $scope.RaceDefMod = 0;
    $scope.Def = 0;
    $scope.Arm = 0;
    $scope.Initiative = 0;
    $scope.Willpower = 0;
    $scope.CmdRange = 0;
    $scope.NewWornArmorSpd = 0;
    $scope.NewWornArmorDef = 0;
    $scope.NewWornArmorArm = 0;
    $scope.MeleeWeapon1 = '';
    $scope.MeleeWeapon2 = '';
    $scope.RangedWeapon1 = '';
    $scope.RangedWeapon2 = '';

    /////////////////////////////////////////////////////////////////////
    /////                                                           /////
    /////       Lookup Arrays/Objects                               /////
    /////                                                           /////
    /////////////////////////////////////////////////////////////////////

    $scope.Stats = {
        "PHY": { Current: 0, Max: 0 },
        "SPD": { Current: 0, Max: 0 },
        "STR": { Current: 0, Max: 0 },
        "AGL": { Current: 0, Max: 0 },
        "PRW": { Current: 0, Max: 0 },
        "POI": { Current: 0, Max: 0 },
        "INT": { Current: 0, Max: 0 },
        "ARC": { Current: 0, Max: 0 },
        "PER": { Current: 0, Max: 0 }
    };

    $scope.Races = raceArr; // In races.js
    $scope.Archetypes = archArr; // In races.js
    $scope.Careers = careerArr; // In careers.js
    $scope.Career1List = [];
    $scope.Career2List = [];
    $scope.Career3List = [];
    $scope.Career4List = [];

    for (g = 0; g < $scope.Careers.length; g++) {
        $scope.Career1List.push($scope.Careers[g]);
        $scope.Career2List.push($scope.Careers[g]);
        $scope.Career3List.push($scope.Careers[g]);
        $scope.Career4List.push($scope.Careers[g]);
    }

    selectedCareers = ['','','',''];

    /////////////////////////////////////////////////////////////////////
    /////                                                           /////
    /////       User Arrays/Objects                                 /////
    /////                                                           /////
    /////////////////////////////////////////////////////////////////////

    // Example: { Name: "Test Skill", From: ['Base','Highwayman'], BaseStat: "PHY", Level: 0, Total: 0 }
    $scope.MilitarySkills = [
        { Name: "Great Weapon", From: ['Base'], BaseStat: "PRW", Level: 0, Total: 0 },
        { Name: "Hand Weapon", From: ['Base'], BaseStat: "PRW", Level: 0, Total: 0 },
        { Name: "Pistol", From: ['Base'], BaseStat: "POI", Level: 0, Total: 0 },
        { Name: "Rifle", From: ['Base'], BaseStat: "POI", Level: 0, Total: 0 }
    ];

    $scope.OccupationalSkills = [
        { Name: "Command", From: ['Base'], BaseStat: "Social", Level: 0, Total: 0 },
        { Name: "Detection", From: ['Base'], BaseStat: "PER", Level: 0, Total: 0 },
        { Name: "Sneak", From: ['Base'], BaseStat: "AGL", Level: 0, Total: 0 }
    ];

    $scope.MilitarySkillsLookup = milSkillsArr;
    $scope.OccupationalSkillsLookup = occSkillsArr;

    // Example: { Name: "Test Armor", Description: "Blah", SPD: 0, DEF: 0, ARM: 0 }
    $scope.Armor = [];

    // Example: {} TODO: Design data structure.
    $scope.MeleeWeapons = [];

    // Example: {} TODO: Design data structure.
    $scope.RangedWeapons = [];

    // Example: { Name: "Test Gear", Benifit: "Test Benifit" }
    $scope.MiscGear = [];

    /////////////////////////////////////////////////////////////////////
    /////                                                           /////
    /////       Public/Scope Functions                              /////
    /////                                                           /////
    /////////////////////////////////////////////////////////////////////

    $scope.updateXP = function() {
        if ($scope.XP <= 49) {
            $scope.Level = 'Hero';
        } else if ($scope.XP <= 99) {
            $scope.Level = 'Veteran';
        } else if ($scope.XP > 99) {
            $scope.Level = 'Epic';
        }

        if ($scope.XP > -1 && $scope.Race !== null) {
            updateMaxStats();
        }
    };

    $scope.updateRace = function() {
        if ($scope.Race === null) {
            $scope.Stats.PHY.Current = 0;
            $scope.Stats.PHY.Max = 0;
            $scope.Stats.SPD.Current = 0;
            $scope.Stats.SPD.Max = 0;
            $scope.Stats.STR.Current = 0;
            $scope.Stats.STR.Max = 0;
            $scope.Stats.AGL.Current = 0;
            $scope.Stats.AGL.Max = 0;
            $scope.Stats.PRW.Current = 0;
            $scope.Stats.PRW.Max = 0;
            $scope.Stats.POI.Current = 0;
            $scope.Stats.POI.Max = 0;
            $scope.Stats.INT.Current = 0;
            $scope.Stats.INT.Max = 0;
            $scope.Stats.ARC.Current = 0;
            $scope.Stats.ARC.Max = 0;
            $scope.Stats.PER.Current = 0;
            $scope.Stats.PER.Max = 0;
            $scope.RaceDefMod = 0;
            updateDef();
            updateInitiative();
            updateArm();
            updateWillpower();
            updateCmdRange();
            updateSkills();

            $scope.Archetypes = ['Gifted','Intellectual','Mighty','Skilled'];
        } else {
            if ($scope.Race.ResArchetypes.indexOf($scope.Archetype) > -1) {
                $scope.Archetype = null;
            }

            $scope.Stats.PHY.Current = $scope.Race.Stats.PHY[0];
            $scope.Stats.SPD.Current = $scope.Race.Stats.SPD[0];
            $scope.Stats.STR.Current = $scope.Race.Stats.STR[0];
            $scope.Stats.AGL.Current = $scope.Race.Stats.AGL[0];
            $scope.Stats.PRW.Current = $scope.Race.Stats.PRW[0];
            $scope.Stats.POI.Current = $scope.Race.Stats.POI[0];
            $scope.Stats.INT.Current = $scope.Race.Stats.INT[0];
            $scope.Stats.ARC.Current = $scope.Race.Stats.ARC[0];
            $scope.Stats.PER.Current = $scope.Race.Stats.PER[0];
            $scope.RaceDefMod = $scope.Race.DefMod;
            updateDef();
            updateInitiative();
            updateArm();
            updateMaxStats();
            updateWillpower();
            updateCmdRange();
            updateSkills();

            var archList = ['Gifted','Intellectual','Mighty','Skilled'];

            for (var i = 0; i < $scope.Race.ResArchetypes.length; i++) {
                if (archList.indexOf($scope.Race.ResArchetypes[i]) > -1) {
                    archList.splice(archList.indexOf($scope.Race.ResArchetypes[i]),1);
                }
            }

            $scope.Archetypes = archList;
        }
    };

    $scope.updateCareer = function(careerNum) {
        //TODO: A lot of this won't work for >CHANGING< careers. Need to fix.
        if (careerNum == 1) {
            if ($scope.Career1 !== null) {
                selectedCareers[0] = $scope.Career1.Name;
                addCareerSkills($scope.Career1);
                $scope.Career2List.splice($scope.Career2List.indexOf($scope.Career1),1);
                $scope.Career3List.splice($scope.Career3List.indexOf($scope.Career1),1);
                $scope.Career4List.splice($scope.Career4List.indexOf($scope.Career1),1);
            } else {
                reAddMissingCareer($scope.Career1List);
                selectedCareers[0] = '';
            }
        } else if (careerNum == 2) {
            if ($scope.Career2 !== null) {
                selectedCareers[1] = $scope.Career2.Name;
                addCareerSkills($scope.Career2);
                $scope.Career1List.splice($scope.Career1List.indexOf($scope.Career2),1);
                $scope.Career3List.splice($scope.Career3List.indexOf($scope.Career2),1);
                $scope.Career4List.splice($scope.Career4List.indexOf($scope.Career2),1);
            } else {
                reAddMissingCareer($scope.Career2List);
                selectedCareers[1] = '';
            }
        } else if (careerNum == 3) {
            if ($scope.Career3 !== null) {
                selectedCareers[2] = $scope.Career3.Name;
                addCareerSkills($scope.Career3);
                $scope.Career1List.splice($scope.Career1List.indexOf($scope.Career3),1);
                $scope.Career2List.splice($scope.Career2List.indexOf($scope.Career3),1);
                $scope.Career4List.splice($scope.Career4List.indexOf($scope.Career3),1);
            } else {
                reAddMissingCareer($scope.Career3List);
                selectedCareers[2] = '';
            }
        } else if (careerNum == 4) {
            if ($scope.Career4 !== null) {
                selectedCareers[3] = $scope.Career4.Name;
                addCareerSkills($scope.Career4);
                $scope.Career1List.splice($scope.Career1List.indexOf($scope.Career4),1);
                $scope.Career2List.splice($scope.Career2List.indexOf($scope.Career4),1);
                $scope.Career3List.splice($scope.Career3List.indexOf($scope.Career4),1);
            } else {
                reAddMissingCareer($scope.Career4List);
                selectedCareers[3] = '';
            }
        }

        removeCareerSkills();
    };

    $scope.displayEditXP = function() {
        if (($scope.Career1 !== null || $scope.Career2 !== null) && $scope.Race !== null) {
            return true;
        } else {
            return false;
        }
    };

    $scope.displaySkillBase = function(baseStat) {
        if (baseStat == 'Social') {
            return 'SOC';
        } else {
            return $scope.Stats[baseStat].Current;
        }
    };

    $scope.displaySkillTotal = function(skillName,skillType) {
        if (skillType == "M") {
            for(i = 0; i < $scope.MilitarySkills.length; i++) {
                if (skillName == $scope.MilitarySkills[i].Name) {
                    return $scope.MilitarySkills[i].Level;
                }
            }
            throw 'SkillNotFoundError';
        } else if (skillType == "O") {
            for(i = 0; i < $scope.OccupationalSkills.length; i++) {
                if (skillName == $scope.OccupationalSkills[i].Name) {
                    return $scope.OccupationalSkills[i].Level;
                }
            }
            throw 'SkillNotFoundError';
        } else {
            throw 'SkillTypeError';
        }
    };

    $scope.updateSkill = function(skill) {
            if (skill.BaseStat != 'Social') {
                    skill.Total = parseInt(skill.Level, 10) + $scope.Stats[skill.BaseStat].Current;
            } else {
                    skill.Total = skill.Level;
            }

            if (skill.Name == 'Command') {
                    updateCmdRange();
            }
    };

    $scope.removeSkill = function(skillIndex, skillType) {
            if (skillType == "M") {
                    $scope.MilitarySkills.splice(skillIndex,1);
            } else if (skillType == "O") {
                    $scope.OccupationalSkills.splice(skillIndex,1);
            }
    };

    $scope.hideRanged1 = function() {
            if (($scope.MeleeWeapon1 !== '' && $scope.MeleeWeapon2 !== '')) {
                    $scope.RangedWeapon1 = '';
                    return true;
            } else {
                    return false;
            }
    };

    $scope.hideRanged2 = function() {
            if ($scope.MeleeWeapon1 !== '' || $scope.MeleeWeapon2 !== '') {
                    $scope.RangedWeapon2 = '';
                    return true;
            } else {
                    return false;
            }
    };

    $scope.hideMelee1 = function() {
            if ($scope.RangedWeapon1 !== '' && $scope.RangedWeapon2 !== '') {
                    $scope.MeleeWeapon1 = '';
                    return true;
            } else {
                    return false;
            }
    };

    $scope.hideMelee2 = function() {
            if ($scope.RangedWeapon1 !== '' || $scope.RangedWeapon2 !== '') {
                    $scope.MeleeWeapon2 = '';
                    return true;
            } else {
                    return false;
            }
    };

    /////////////////////////////////////////////////////////////////////
    /////                                                           /////
    /////       Private Functions                                   /////
    /////                                                           /////
    /////////////////////////////////////////////////////////////////////

    function updateMaxStats() {
            $scope.Stats.PHY.Max = $scope.Race.Stats.PHY[levelPos()];
            $scope.Stats.SPD.Max = $scope.Race.Stats.SPD[levelPos()];
            $scope.Stats.STR.Max = $scope.Race.Stats.STR[levelPos()];
            $scope.Stats.AGL.Max = $scope.Race.Stats.AGL[levelPos()];
            $scope.Stats.PRW.Max = $scope.Race.Stats.PRW[levelPos()];
            $scope.Stats.POI.Max = $scope.Race.Stats.POI[levelPos()];
            $scope.Stats.INT.Max = $scope.Race.Stats.INT[levelPos()];
            $scope.Stats.ARC.Max = $scope.Race.Stats.ARC[levelPos()];
            $scope.Stats.PER.Max = $scope.Race.Stats.PER[levelPos()];
    }

    function updateWillpower() {
        $scope.Willpower = $scope.Stats.PHY.Current + $scope.Stats.INT.Current;
    }

    function updateDef() {
        $scope.Def = $scope.Stats.SPD.Current + $scope.Stats.AGL.Current + $scope.Stats.PER.Current + $scope.RaceDefMod;
    }

    function updateInitiative() {
        $scope.Initiative = $scope.Stats.SPD.Current + $scope.Stats.PRW.Current + $scope.Stats.PER.Current;
    }

    function updateArm() {
        $scope.Arm = $scope.Stats.PHY.Current;
    }

    function updateCmdRange() {
        for (i = 0; i < $scope.OccupationalSkills.length; i++) {
            if ($scope.OccupationalSkills[i].Name == 'Command') {
                $scope.CmdRange = $scope.Stats.INT.Current + parseInt($scope.OccupationalSkills[i].Level, 10);
            }
        }
    }

    function levelPos() {
        switch ($scope.Level) {
            case 'Hero':
                return 1;
            case 'Veteran':
                return 2;
            case 'Epic':
                return 3;
        }
    }

    function addCareerSkills(career) {
        // Add Military Skills
        for (i = 0; i < career.StartingMilitarySkills.length; i++) {
            var mFound = false;
            
            for (j = 0; j < $scope.MilitarySkills.length; j++) {
                if (career.StartingMilitarySkills[i][0] == $scope.MilitarySkills[j].Name) {
                    $scope.MilitarySkills[j].From.push(career.Name);
                    $scope.MilitarySkills[j].Level += career.StartingMilitarySkills[i][1];
                    $scope.updateSkill($scope.MilitarySkills[j]);
                    mFound = true;
                }
            }

            if (!mFound) {                              
                $scope.MilitarySkills.push({ Name: career.StartingMilitarySkills[i][0],
                                            From: [career.Name],
                                            BaseStat: lookupSkillBaseStat(career.StartingMilitarySkills[i][0], "M"),
                                            Level: career.StartingMilitarySkills[i][1],
                                            Total: 0 });
                $scope.updateSkill($scope.MilitarySkills[$scope.MilitarySkills.length - 1]);
            }
        }

        $scope.MilitarySkills.sort(compareSkillsByName);

        //Add Occupational Skills
        for (k = 0; k < career.StartingOccupationalSkills.length; k++) {
            var oFound = false;
            
            for (l = 0; l < $scope.OccupationalSkills.length; l++) {
                if (career.StartingOccupationalSkills[k][0] == $scope.OccupationalSkills[l].Name) {
                    $scope.OccupationalSkills[l].From.push(career.Name);
                    $scope.OccupationalSkills[l].Level += career.StartingOccupationalSkills[k][1];
                    $scope.updateSkill($scope.OccupationalSkills[l]);
                    oFound = true;
                }
            }

            if (!oFound) {                              
                $scope.OccupationalSkills.push({ Name: career.StartingOccupationalSkills[k][0],
                                                From: [career.Name],
                                                BaseStat: lookupSkillBaseStat(career.StartingOccupationalSkills[k][0], "O"),
                                                Level: career.StartingOccupationalSkills[k][1],
                                                Total: 0 });
                $scope.updateSkill($scope.OccupationalSkills[$scope.OccupationalSkills.length - 1]);
            }
        }

        $scope.OccupationalSkills.sort(compareSkillsByName);
        updateSkills();
    }

    function removeCareerSkills() {
        //Remove Career Skills
        currentCareers = [];

        if ($scope.Career1 !== null) {
            currentCareers.push($scope.Career1.Name);
        }

        if ($scope.Career2 !== null) {
            currentCareers.push($scope.Career2.Name);
        }

        if ($scope.Career3 !== null) {
            currentCareers.push($scope.Career3.Name);
        }

        if ($scope.Career4 !== null) {
            currentCareers.push($scope.Career4.Name);
        }

        var mSkillsToRemove = [];

        for (l = 0; l < $scope.MilitarySkills.length; l++) {
            var mFromsToRemove = [];

            for (m = 0; m < $scope.MilitarySkills[l].From.length; m++) {
                if ($scope.MilitarySkills[l].From[m] != "Base" && currentCareers.indexOf($scope.MilitarySkills[l].From[m]) == -1) {
                    for (n = 0; n < $scope.Careers.length; n++) {
                        if ($scope.Careers[n].Name == $scope.MilitarySkills[l].From[m]) {
                            for (o = 0; o < $scope.Careers[n].StartingMilitarySkills.length; o++) {
                                if ($scope.Careers[n].StartingMilitarySkills[o][0] == $scope.MilitarySkills[l].Name) {
                                    $scope.MilitarySkills[l].Level -= $scope.Careers[n].StartingMilitarySkills[o][1];
                                }
                            }
                        }
                    }

                    mFromsToRemove.push($scope.MilitarySkills[l].From[m]);
                }
            }

            for (p = 0; p < mFromsToRemove.length; p++) {
                $scope.MilitarySkills[l].From.splice($scope.MilitarySkills[l].From.indexOf(mFromsToRemove[p]),1);
            }

            if ($scope.MilitarySkills[l].From.length < 1) {
                mSkillsToRemove.push($scope.MilitarySkills[l]);
            }
        }

        for (q = 0; q < mSkillsToRemove.length; q++) {
            $scope.MilitarySkills.splice($scope.MilitarySkills.indexOf(mSkillsToRemove[q]),1);
        }

        var oSkillsToRemove = [];

        for (l = 0; l < $scope.OccupationalSkills.length; l++) {
            var oFromsToRemove = [];

            for (m = 0; m < $scope.OccupationalSkills[l].From.length; m++) {
                if ($scope.OccupationalSkills[l].From[m] != "Base") {
                    for (n = 0; n < $scope.Careers.length; n++) {
                        if ($scope.Careers[n].Name == $scope.OccupationalSkills[l].From[m]) {
                            for (o = 0; o < $scope.Careers[n].StartingOccupationalSkills.length; o++) {
                                if ($scope.Careers[n].StartingOccupationalSkills[o][0] == $scope.OccupationalSkills[l].Name) {
                                    $scope.OccupationalSkills[l].Level -= $scope.Careers[n].StartingOccupationalSkills[o][1];
                                }
                            }
                        }
                    }

                    oFromsToRemove.push($scope.OccupationalSkills[l].From[m]);
                }
            }

            for (p = 0; p < oFromsToRemove.length; p++) {
                $scope.OccupationalSkills[l].From.splice($scope.OccupationalSkills[l].From.indexOf(oFromsToRemove[p]),1);
            }

            if ($scope.OccupationalSkills[l].From.length < 1) {
                oSkillsToRemove.push($scope.OccupationalSkills[l]);
            }
        }

        for (q = 0; q < oSkillsToRemove.length; q++) {
            $scope.OccupationalSkills.splice($scope.OccupationalSkills.indexOf(oSkillsToRemove[q]),1);
        }
        updateSkills();            
    }

    function lookupSkillBaseStat(skillName, skillType) {
        var skillLookup;
        
        if (skillType == "M") {
            skillLookup = $scope.MilitarySkillsLookup;
        } else if (skillType == "O") {
            skillLookup = $scope.OccupationalSkillsLookup;
        } else {
            throw 'SkillTypeError';
        }

        var foundSkills = [];

        for (k1 = 0; k1 < skillLookup.length; k1++) {
            if (skillLookup[k1].Name == skillName) {
                foundSkills.push(skillLookup[k1]);
            }
        }

        if (foundSkills.length > 1) {
            var lowestStatName = foundSkills[0].BaseStat;
            var lowestStatVal = $scope.Stats[foundSkills[0].BaseStat].Current;

            for (j1 = 1; j1 < foundSkills.length; j1++) {
                if ($scope.Stats[foundSkills.BaseStat].Current < lowestStatVal) {
                    lowestStatName = foundSkills[j1].BaseStat;
                    lowestStatVal = $scope.Stats[foundSkills[j1].BaseStat].Current;
                }
            }

            return lowestStatName;
        } else {
            return foundSkills[0].BaseStat;
        }
    }

    function updateSkills() {
        for (i = 0; i < $scope.MilitarySkills.length; i++) {
            if ($scope.MilitarySkills[i].BaseStat != 'Social') {
                $scope.MilitarySkills[i].Total = parseInt($scope.MilitarySkills[i].Level, 10) + $scope.Stats[$scope.MilitarySkills[i].BaseStat].Current;
            } else {
                $scope.MilitarySkills[i].Total = $scope.MilitarySkills[i].Level;
            }
        }

        for (i = 0; i < $scope.OccupationalSkills.length; i++) {
            if ($scope.OccupationalSkills[i].BaseStat != 'Social') {
                $scope.OccupationalSkills[i].Total = parseInt($scope.OccupationalSkills[i].Level, 10) + $scope.Stats[$scope.OccupationalSkills[i].BaseStat].Current;
            } else {
                $scope.OccupationalSkills[i].Total = $scope.OccupationalSkills[i].Level;
            }
        }
    }
    
    function compareSkillsByName(skillA, skillB) {
        if (skillA.Name > skillB.Name) {
            return 1;
        } else {
            return -1;
        }
    }

    function compareSkillsByType(skillA, skillB) {
        if (skillA.Type > skillB.Type) {
            return 1;
        } else {
            return -1;
        }
    }

    function reAddMissingCareer(careerList) {
        careerLists = [$scope.Career1List,
                        $scope.Career2List,
                        $scope.Career3List,
                        $scope.Career4List
                    ];

        newSelectedCareers = [];
        missingCareer = '';

        if ($scope.Career1 !== null) {
            if (selectedCareers[0] != $scope.Career1.Name) {
                missingCareer = selectedCareers[0];
            }
        } else {
            if (selectedCareers[0] !== '') {
                missingCareer = selectedCareers[0];
            }
        }

        if ($scope.Career2 !== null) {
            if (selectedCareers[1] != $scope.Career2.Name) {
                missingCareer = selectedCareers[1];
            }
        } else {
            if (selectedCareers[1] !== '') {
                missingCareer = selectedCareers[1];
            }
        }

        if ($scope.Career3 !== null) {
            if (selectedCareers[2] != $scope.Career3.Name) {
                missingCareer = selectedCareers[2];
            }
        } else {
            if (selectedCareers[2] !== '') {
                missingCareer = selectedCareers[2];
            }
        }

        if ($scope.Career4 !== null) {
            if (selectedCareers[3] != $scope.Career4.Name) {
                missingCareer = selectedCareers[3];
            }
        } else {
            if (selectedCareers[3] !== '') {
                missingCareer = selectedCareers[3];
            }
        }

        if (missingCareer !== '') {
            for (j = 0; j < $scope.Careers.length; j++) {
                if ($scope.Careers[j].Name == missingCareer) {
                    for (k = 0; k < careerLists.length; k++) {
                        if (careerLists[k] != careerList) {
                            careerLists[k].push($scope.Careers[j]);
                        }                            
                    }
                }
            }
        }
        
        careerList.sort(compareCareersByName);
    }
    
    function compareCareersByName(careerA, careerB) {
        if (careerA.Name < careerB.Name) {
            return 1;
        } else {
            return -1;
        }
    }
}
