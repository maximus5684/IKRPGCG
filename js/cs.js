function CSCtrl($scope, $http) {

    /////////////////////////////////////////////////////////////////////
    /////                                                           /////
    /////       Initial Values                                      /////
    /////                                                           /////
    /////////////////////////////////////////////////////////////////////

    $scope.CharUrl = 'ajax/characters.php';
    $scope.Error = null;
    $scope.Character = null;
    $scope.Archetype = null;
    $scope.Race = null;
    $scope.Career1 = null;
    $scope.Career2 = null;
    $scope.Career3 = null;
    $scope.Career4 = null;
    $scope.Level = 'Hero';
    $scope.NewWornArmorSpd = 0;
    $scope.NewWornArmorDef = 0;
    $scope.NewWornArmorArm = 0;
    $scope.MeleeWeapon1 = '';
    $scope.MeleeWeapon2 = '';
    $scope.RangedWeapon1 = '';
    $scope.RangedWeapon2 = '';

    // Totals
    
    $scope.TotalDEF = 0;
    $scope.TotalInit = 0;
    $scope.TotalARM = 0;
    $scope.TotalCMD = 0;
    
    /////////////////////////////////////////////////////////////////////
    /////                                                           /////
    /////       User Arrays/Objects                                 /////
    /////                                                           /////
    /////////////////////////////////////////////////////////////////////

    $scope.Stats = {
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

    // Example: { Name: "Test Skill", BaseStat: "PHY", Level: 0, Total: 0 }
    $scope.CharMSkills = [];
    $scope.CharOSkills = [];

    $scope.CharBenefits = [];
    $scope.CharAbilities = [];

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
    /////       Lookup Arrays/Objects                               /////
    /////                                                           /////
    /////////////////////////////////////////////////////////////////////

    $scope.Races = raceArr; // In races.js
    $scope.Archetypes = archArr; // In archetypes.js
    $scope.Careers = careerArr; // In careers.js

    $scope.MilitarySkills = milSkillsArr; // from skills.js
    $scope.OccupationalSkills = occSkillsArr; // from skills.js

    /////////////////////////////////////////////////////////////////////
    /////                                                           /////
    /////       Public/Scope Functions                              /////
    /////                                                           /////
    /////////////////////////////////////////////////////////////////////

    // Get character from AJAX function and load defaults.
    $scope.GetChar = function(CharID) {
        $http.post($scope.CharUrl, { ReqType: 'GetChar', CharacterID: CharID }).success(function(data, status) {
            if (typeof data !== 'object') {
                $scope.Error = data;
            } else {
                $scope.Character = data;
                $scope.loadCharacterDefaults();
                $scope.calcTotalDEF();
                $scope.calcTotalInit();
                $scope.calcTotalARM();
                $scope.calcTotalCMD();
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
        $scope.Character.LanguagesChosen = JSON.parse($scope.Character.LanguagesChosen);
        
        if ($scope.Character.Career1MSkillsChosen !== null) {
            $scope.Character.Career1MSkillsChosen = JSON.parse($scope.Character.Career1MSkillsChosen);
        }

        if ($scope.Character.Career2MSkillsChosen !== null) {
            $scope.Character.Career2MSkillsChosen = JSON.parse($scope.Character.Career2MSkillsChosen);
        }

        if ($scope.Character.Career1OSkillsChosen !== null) {
            $scope.Character.Career1OSkillsChosen = JSON.parse($scope.Character.Career1OSkillsChosen);
        }

        if ($scope.Character.Career2OSkillsChosen !== null) {
            $scope.Character.Career2OSkillsChosen = JSON.parse($scope.Character.Career2OSkillsChosen);
        }

        if ($scope.Character.Career1AssetsChosen !== null) {
            $scope.Character.Career1AssetsChosen = JSON.parse($scope.Character.Career1AssetsChosen);
        }

        if ($scope.Character.Career2AssetsChosen !== null) {
            $scope.Character.Career2AssetsChosen = JSON.parse($scope.Character.Career2AssetsChosen);
        }

        $scope.Level = $scope.xpLevel($scope.Character.XP);

        for (a = 0; a < $scope.Races.length; a++) {
            if ($scope.Character.Race == $scope.Races[a].Name) {
                $scope.Race = $scope.Races[a];
            }
        }
    
        for (b = 0; b < $scope.Archetypes.length; b++) {
            if ($scope.Character.Archetype == $scope.Archetypes[b].Name) {
                $scope.Archetype = $scope.Archetypes[b];
            }
        }

        for (c = 0; c < $scope.Careers.length; c++) {
            if ($scope.Character.Career1 == $scope.Careers[c].Name) {
                $scope.Career1 = $scope.Careers[c];
            }

            if ($scope.Character.Career2 == $scope.Careers[c].Name) {
                $scope.Career2 = $scope.Careers[c];
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
        for (d = 0; d < $scope.Race.StatIncreases.length; d++) {
            $scope.Stats[$scope.Race.StatIncreases[d][0]].Current += $scope.Race.StatIncreases[d][1];
        }
        
        // If race grants choseable stat increases add them.
        if ($scope.Character.RacialStatIncreaseChosen !== null) {
            $scope.Stats[$scope.Character.RacialStatIncreaseChosen].Current += 1;
        }

        // If careers grant stat increases add them.
        for (e = 0; e < $scope.Career1.StatIncreases.length; e++) {
            $scope.Stats[$scope.Career1.StatIncreases[e][0]].Current += $scope.Career1.StatIncreases[e][1];
        }

        for (f = 0; f < $scope.Career2.StatIncreases.length; f++) {
            $scope.Stats[$scope.Career2.StatIncreases[f][0]].Current += $scope.Career2.StatIncreases[f][1];
        }

        // If careers add to stat maximums add them.
        for (g = 0; g < $scope.Career1.StatMaxIncreases[$scope.Level].length; g++) {
            $scope.Stats[$scope.Career1.StatMaxIncreases[$scope.Level][g][0]].Max += $scope.Career1.StatMaxIncreases[$scope.Level][g][1];
        }

        for (h = 0; h < $scope.Career2.StatMaxIncreases[$scope.Level].length; h++) {
            $scope.Stats[$scope.Career2.StatMaxIncreases[$scope.Level][h][0]].Max += $scope.Career2.StatMaxIncreases[$scope.Level][h][1];
        }

        // Add advancement points.
        $scope.Stats[$scope.Character.AP1Stat].Current += 1;
        $scope.Stats[$scope.Character.AP2Stat].Current += 1;
        $scope.Stats[$scope.Character.AP3Stat].Current += 1;

        // Populate military skills list.
        tempMSkills = [];

        for (i = 0; i < $scope.Career1.StartingMilitarySkills.length; i++) {
            if ($scope.Character.HRCareer1MSkillToReplace !== null) {
                if ($scope.Character.Career1MSkillToReplace == $scope.Career1.StartingMilitarySkills[i][0]) {
                    tempMSkills.push([$scope.Character.HRCareer1MSkillReplacedWith, $scope.Career1.StartingMilitarySkills[i][1]]);
                } else {
                    tempMSkills.push($scope.Career1.StartingMilitarySkills[i]);
                }
            } else {
                tempMSkills.push($scope.Career1.StartingMilitarySkills[i]);
            }
        }

        for (j = 0; j < $scope.Career2.StartingMilitarySkills.length; j++) {
            tempSkill = [];

            if ($scope.Character.HRCareer2MSkillToReplace !== null) {
                if ($scope.Character.HRCareer2MSkillToReplace == $scope.Career2.StartingMilitarySkills[j][0]) {
                    tempSkill = [$scope.Character.HRCareer2MSkillReplacedWith, $scope.Career2.StartingMilitarySkills[j][1]];
                } else {
                    tempSkill = $scope.Career2.StartingMilitarySkills[j];
                }
            } else {
                tempSkill = $scope.Career2.StartingMilitarySkills[j];
            }
            
            index = -1;

            for (k = 0; k < tempMSkills.length; k++) {
                if (tempSkill[0] == tempMSkills[k][0]) {
                    index = k;
                }
            }

            if (index > -1) {
                tempMSkills[index][1] += tempSkill[1];
            } else {
                tempMSkills.push(tempSkill);
            }
        }
       
        if ($scope.Character.Career1MSkillsChosen !== null) {
            for (j = 0; j < $scope.Character.Career1MSkillsChosen.length; j++) {
                found = false;
                index = -1;

                for (k = 0; k < tempMSkills.length; k++) {
                    if ($scope.Character.Career1MSkillsChosen[j][0] == tempMSkills[k][0]) {
                        found = true;
                        index = k;
                    }
                }

                if (found) {
                    tempMSkills[index][1] += $scope.Character.Career1MSkillsChosen[j][1];
                } else {
                    tempMSkills.push($scope.Character.Career1MSkillsChosen[j]);
                }
            }
        }

        if ($scope.Character.Career2MSkillsChosen !== null) {
            for (j = 0; j < $scope.Character.Career2MSkillsChosen.length; j++) {
                found = false;
                index = -1;

                for (k = 0; k < tempMSkills.length; k++) {
                    if ($scope.Character.Career2MSkillsChosen[j][0] == tempMSkills[k][0]) {
                        found = true;
                        index = k;
                    }
                }

                if (found) {
                    tempMSkills[index][1] += $scope.Character.Career2MSkillsChosen[j][1];
                } else {
                    tempMSkills.push($scope.Character.Career2MSkillsChosen[j]);
                }
            }
        }

        tempMSkills.sort();

        for (l = 0; l < tempMSkills.length; l++) {
            baseStat = '';

            for (m = 0; m < $scope.MilitarySkills.length; m++) {
                if (tempMSkills[l][0] == $scope.MilitarySkills[m].Name) {
                    baseStat = $scope.MilitarySkills[m].BaseStat;
                }
            }

            $scope.CharMSkills.push({ Name: tempMSkills[l][0], BaseStat: baseStat, Level: tempMSkills[l][1], Total: tempMSkills[l][1] });
        }
        
        // Populate occupational skills list.
        tempOSkills = [];

        for (n = 0; n < $scope.Career1.StartingOccupationalSkills.length; n++) {
            if ($scope.Character.HRCareer1OSkillToReplace !== null) {
                if ($scope.Career1.StartingOccupationalSkills[n][0] == $scope.Character.HRCareer1OSkillToReplace) {
                    tempOSkills.push([$scope.Character.HRCareer1OSkillReplacedWith, $scope.Career1.StartingOccupationalSkills[n][1]]);
                } else {
                    tempOSkills.push($scope.Career1.StartingOccupationalSkills[n]);
                }
            } else {
                tempOSkills.push($scope.Career1.StartingOccupationalSkills[n]);
            }
        }

        for (o = 0; o < $scope.Career2.StartingOccupationalSkills.length; o++) {
            tempSkill = [];
            
            if ($scope.Character.HRCareer2OSkillToReplace !== null) {
                if ($scope.Character.HRCareer2OSkillToReplace == $scope.Career2.StartingOccupationalSkills[o][0]) {
                    tempSkill = [$scope.Character.HRCareer2OSkillReplacedWith, $scope.Career2.StartingOccupationalSkills[o][1]];
                } else {
                    tempSkill = $scope.Career2.StartingOccupationalSkills[o];
                }
            } else {
                tempSkill = $scope.Career2.StartingOccupationalSkills[o];
            }
           
            index = -1;

            for (p = 0; p < tempOSkills.length; p++) {
                if (tempSkill[0] == tempOSkills[p][0]) {
                    index = p;
                }
            }

            if (index > -1) {
                tempOSkills[index][1] += tempSkill[1];
            } else {
                tempOSkills.push(tempSkill);
            }
        }
       
        if ($scope.Character.Career1OSkillsChosen !== null) {
            for (q = 0; q < $scope.Character.Career1OSkillsChosen.length; q++) {
                found = false;
                index = -1;

                for (r = 0; r < tempOSkills.length; r++) {
                    if ($scope.Character.Career1OSkillsChosen[q][0] == tempOSkills[r][0]) {
                        found = true;
                        index = k;
                    }
                }

                if (found) {
                    tempOSkills[index][1] += $scope.Character.Career1OSkillsChosen[q][1];
                } else {
                    tempOSkills.push($scope.Character.Career1OSkillsChosen[q]);
                }
            }
        }

        if ($scope.Character.Career2OSkillsChosen !== null) {
            for (s = 0; s < $scope.Character.Career2OSkillsChosen.length; s++) {
                found = false;
                index = -1;

                for (t = 0; t < tempOSkills.length; t++) {
                    if ($scope.Character.Career2OSkillsChosen[s][0] == tempOSkills[t][0]) {
                        found = true;
                        index = k;
                    }
                }

                if (found) {
                    tempOSkills[index][1] += $scope.Character.Career2OSkillsChosen[s][1];
                } else {
                    tempOSkills.push($scope.Character.Career2OSkillsChosen[s]);
                }
            }
        }

        tempOSkills.sort();

        for (u = 0; u < tempOSkills.length; u++) {
            baseStat = '';

            for (v = 0; v < $scope.OccupationalSkills.length; v++) {
                if (tempOSkills[u][0] == $scope.OccupationalSkills[v].Name) {
                    baseStat = $scope.OccupationalSkills[v].BaseStat;
                }
            }

            $scope.CharOSkills.push({ Name: tempOSkills[u][0], BaseStat: baseStat, Level: tempOSkills[u][1], Total: tempOSkills[u][1] });
        }

        // Populate benefits list.
        tempBenefits = [];

        for (w = 0; w < $scope.Race.Benefits.length; w++) {
            tempBenefits.push({ Name: $scope.Race.Benefits[w], Property: '' });
        }

        for (x = 0; x < $scope.Career1.FreeBenefits.length; x++) {
            found = false;
            
            for (y = 0; y < tempBenefits.length; y++) {
                if ($scope.Career1.FreeBenefits[x] == tempBenefits[y].Name) {
                    found = true;
                }
            }

            if (!found) {
                tempBenefits.push({ Name: $scope.Career1.FreeBenefits[x], Property: '' });
            }
        }

        for (z = 0; z < $scope.Career2.FreeBenefits.length; z++) {
            found = false;
            
            for (aa = 0; aa < tempBenefits.length; aa++) {
                if ($scope.Career2.FreeBenefits[z] == tempBenefits[aa].Name) {
                    found = true;
                }
            }

            if (!found) {
                tempBenefits.push({ name: $scope.Career2.FreeBenefits[z], Property: '' });
            }
        }

        if ($scope.Character.BenefitAssocObj !== null) {
            tempBenefits.push({ Name: $scope.Character.Benefit, Property: $scope.Character.BenefitAssocObj });
        } else {
            tempBenefits.push({ Name: $scope.Character.Benefit, Property: '' });
        }

        tempBenefits.sort(compareByNameAsc);

        for (ab = 0; ab < tempBenefits.length; ab++) {
            for (ac = 0; ac < $scope.Archetypes.length; ac++) {
                for (ad = 0; ad < $scope.Archetypes[ac].Benefits.length; ad++) {
                    if ($scope.Archetypes[ac].Benefits[ad].Name == tempBenefits[ab].Name) {
                        $scope.CharBenefits.push({ Name: tempBenefits[ab].Name, HasProperty: $scope.Archetypes[ac].Benefits[ad].HasProperty, Property: tempBenefits[ab].Property, Book: $scope.Archetypes[ac].Benefits[ad].Book, Page: $scope.Archetypes[ac].Benefits[ad].Page });
                    }
                }
            }
        }

        // Populate abilities list.
        tempAbilities = [];
        
        for (ae = 0; ae < $scope.Race.Abilities.length; ae++) {
            tempAbilities.push({ Name: $scope.Race.Abilities[ae], AbAssocObj: '' });
        }

        for (af = 0; af < $scope.Career1.StartingAbilities.length; af++) {
            if ($scope.Character.HRCareer1AbToReplace !== null && $scope.Character.HRCareer1AbToReplace == $scope.Career1.StartingAbilities[af]) {
                tempAbilities.push({ Name: $scope.Character.HRCareer1AbReplacedWith, AbAssocObj: $scope.Character.HRCareer1AbReplacedWithAssocObj });
            } else {
                tempAbilities.push({ Name: $scope.Career1.StartingAbilities[af], AbAssocObj: '' });
            }
        }

        for (ag = 0; ag < $scope.Career2.StartingAbilities.length; ag++) {
            if ($scope.Character.HRCareer2AbToReplace !== null && $scope.Character.HRCareer2AbToReplace == $scope.Career2.StartingAbilities[ag]) {
                if ($scope.Character.HRCareer2AbReplacedWithAssocObj !== null) {
                    tempAbilities.push({ Name: $scope.Character.HRCareer2AbReplacedWith, AbAssocObj: $scope.Character.HRCareer2AbReplacedWithAssocObj });
                } else {
                    tempAbilities.push({ Name: $scope.Character.HRCareer2AbReplacedWith, AbAssocObj: '' });
                }
            } else {
                tempAbilities.push({ Name: $scope.Career2.StartingAbilities[ag], AbAssocObj: '' });
            }
        }

        if ($scope.Character.RacialAbilityChosen !== null) {
            if ($scope.Character.RacialAbilityAssocObj !== null) {
                tempAbilities.push({ Name: $scope.Character.RacialAbilityChosen, AbAssocObj: $scope.Character.RacialAbilityAssocObj });
            } else {
                tempAbilities.push({ Name: $scope.Character.RacialAbilityChosen, AbAssocObj: '' });
            }
        }

        tempAbilities.sort(compareByNameAsc);

        $scope.CharAbilities = tempAbilities;
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
    
    $scope.displaySkillBase = function(baseStat) {
        if (baseStat == 'Social') {
            return 'SOC';
        } else {
            return $scope.Stats[baseStat].Current;
        }
    };

    $scope.displaySkillTotal = function(skill) {
        if (skill.BaseStat == 'Social') {
            return '-';
        } else {
            return skill.Level + $scope.Stats[baseStat].Current;
        }
    }

    $scope.displayBenefitProperty = function(benefit) {
        bao = '';
        
        if (benefit.HasProperty) {
            bao = ' (' + benefit.Property + ')'
        }

        return bao;
    }

    $scope.getCommandSkill = function() {
        skillLvl = 0;
        
        for (a = 0; a < $scope.CharOSkills.length; a++) {
            if ($scope.CharOSkills[a].Name == 'Command') {
                skillLvl = $scope.CharOSkills[a].Level;
            }
        }

        return skillLvl;
    }

    // Functions to calculate totals.
    $scope.calcTotalDEF = function() {
        $scope.TotalDEF = $scope.Stats.SPD.Current + $scope.Stats.AGL.Current + $scope.Stats.PER.Current + $scope.Race.DefMod;
    }

    $scope.calcTotalInit = function() {
        $scope.TotalInit = $scope.Stats.SPD.Current + $scope.Stats.PRW.Current + $scope.Stats.PER.Current + $scope.Race.InitMod;
    }

    $scope.calcTotalARM = function() {
        $scope.TotalARM = $scope.Stats.PHY.Current;
    }

    $scope.calcTotalCMD = function() {
        $scope.TotalCMD = $scope.Stats.INT.Current + $scope.getCommandSkill();
    }

    // Functions to show/hide weapons.
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
    
    function compareByNameAsc(objA, objB) {
        if (objA.Name > objB.Name) {
            return 1;
        } else {
            return -1;
        }
    }
    
    function compareByNameDesc(objA, objB) {
        if (objA.Name < objB.Name) {
            return 1;
        } else {
            return -1;
        }
    }
}
