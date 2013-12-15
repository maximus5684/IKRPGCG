// Stats: [0] = Starting, [1] = Max @ Hero, [2] = Max @ Veteran, [3] = Max @ Epic
raceArr =
[
    {
        Name:'Human', 
        Stats:
        {
            PHY: { Starting: 5, MaxHero: 7, MaxVet: 8, MaxEpic: 8 },
            SPD: { Starting: 6, MaxHero: 7, MaxVet: 7, MaxEpic: 7 },
            STR: { Starting: 4, MaxHero: 6, MaxVet: 7, MaxEpic: 8 },
            AGL: { Starting: 3, MaxHero: 5, MaxVet: 6, MaxEpic: 7 },
            PRW: { Starting: 4, MaxHero: 5, MaxVet: 6, MaxEpic: 7 },
            POI: { Starting: 4, MaxHero: 5, MaxVet: 6, MaxEpic: 7 },
            INT: { Starting: 3, MaxHero: 5, MaxVet: 6, MaxEpic: 7 },
            ARC: { Starting: 0, MaxHero: 4, MaxVet: 6, MaxEpic: 8 },
            PER: { Starting: 3, MaxHero: 5, MaxVet: 6, MaxEpic: 7 }
        },
        LangChoices: 2,
        AbilityChoices: 0,
        StatIncreaseChoices: 1,
        StatIncreaseChoiceOptions: ['PHY','AGL','INT'],
        HeightMale: [61,75],
        HeightFemale: [55,69],
        WeightMale: [110,200],
        WeightFemale: [90,170],
        AdditionalChars: ['Exceptional Potential - Humans are extremely adaptable and talented individuals. Your character begins the game with your choice of +1 PHY, +1 AGL, or +1 INT. Note this bonus does not increase the character\'s racial maximum, just the starting value.'],
        ResCareers: ['Fell Caller','Mage Hunter']
    },
    { 
        Name:'Dwarf',
        Stats:
        {
            PHY: { Starting: 6, MaxHero: 7, MaxVet: 7, MaxEpic: 8 },
            SPD: { Starting: 4, MaxHero: 5, MaxVet: 6, MaxEpic: 6 },
            STR: { Starting: 5, MaxHero: 6, MaxVet: 7, MaxEpic: 8 },
            AGL: { Starting: 3, MaxHero: 5, MaxVet: 6, MaxEpic: 7 },
            PRW: { Starting: 4, MaxHero: 5, MaxVet: 6, MaxEpic: 7 },
            POI: { Starting: 3, MaxHero: 4, MaxVet: 5, MaxEpic: 6 },
            INT: { Starting: 4, MaxHero: 5, MaxVet: 6, MaxEpic: 7 },
            ARC: { Starting: 0, MaxHero: 4, MaxVet: 6, MaxEpic: 7 },
            PER: { Starting: 3, MaxHero: 4, MaxVet: 6, MaxEpic: 7 }
        },
        LangChoices: 1,
        StartLangs: ['Rhulic'],
        Abilities: [{ Name: 'Load Bearing' }],
        AbilityChoices: 0,
        Connections: [{ Name: 'clan', Type: 'Generic' }],
        StatIncreaseChoices: 0,
        HeightMale: [52,60],
        HeightFemale: [47,55],
        WeightMale: [150,190],
        WeightFemale: [105,145],
        AdditionalChars:
        [
            'Load Bearing - Dwarf Characters start the game with the Load Bearing ability. This ability is in addition to any others the character gains from his starting careers.',
            'Connections (clan) - Dwarf characters begin with Connection (dwarven clan). This is in addition to any other connections the character starts with.'
        ],
        ResCareers:
        [
            'Aristocrat',
            'Fell Caller',
            'Iron Fang',
            'Knight',
            'Mage Hunter',
            'Priest of Morrow',
            'Priest of Menoth',
            'Stormblade',
            'Trencher'
        ]
    },
    {
        Name:'Gobber',
        Stats:
        {
            PHY: { Starting: 4, MaxHero: 6, MaxVet: 7, MaxEpic: 7 },
            SPD: { Starting: 6, MaxHero: 7, MaxVet: 7, MaxEpic: 7 },
            STR: { Starting: 3, MaxHero: 4, MaxVet: 5, MaxEpic: 6 },
            AGL: { Starting: 4, MaxHero: 5, MaxVet: 6, MaxEpic: 7 },
            PRW: { Starting: 4, MaxHero: 5, MaxVet: 6, MaxEpic: 7 },
            POI: { Starting: 3, MaxHero: 5, MaxVet: 6, MaxEpic: 7 },
            INT: { Starting: 3, MaxHero: 4, MaxVet: 5, MaxEpic: 6 },
            ARC: { Starting: 0, MaxHero: 0, MaxVet: 0, MaxEpic: 0 },
            PER: { Starting: 3, MaxHero: 4, MaxVet: 4, MaxEpic: 5 }
        },
        ResArchetypes: ['Gifted'],
        LangChoices: 1,
        StartLangs: ['Gobberish'],
        AbilityChoices: 0,
        Benefits: [{ Name: 'Deft' }],
        DefMod: 1,
        StatIncreaseChoices: 0,
        HeightMale: [34,42],
        HeightFemale: [32,40],
        WeightMale: [42,60],
        WeightFemale: [38,55],
        AdditionalChars:
        [
            'Deft - Whether or not they have the Skilled archetype, gobber characters start the game with the Deft archetype benefit. This benefit is in addition to any other archetype benefits the character starts with.',
            'Gobbers have a racial modifier of +1 DEF.',
            'Gobbers cannot use great weapons or rifles.'
        ],
        ResCareers:
        [
            'Aristocrat',
            'Fell Caller',
            'Iron Fang',
            'Knight',
            'Mage Hunter',
            'Priest of Morrow',
            'Priest of Menoth',
            'Stormblade',
            'Trencher'
        ]
    },
    {
        Name:'Iosan',
        Stats:
        {
            PHY: { Starting: 5, MaxHero: 7, MaxVet: 7, MaxEpic: 7 },
            SPD: { Starting: 6, MaxHero: 7, MaxVet: 7, MaxEpic: 7 },
            STR: { Starting: 4, MaxHero: 5, MaxVet: 6, MaxEpic: 7 },
            AGL: { Starting: 3, MaxHero: 5, MaxVet: 6, MaxEpic: 7 },
            PRW: { Starting: 4, MaxHero: 5, MaxVet: 6, MaxEpic: 7 },
            POI: { Starting: 4, MaxHero: 5, MaxVet: 6, MaxEpic: 7 },
            INT: { Starting: 4, MaxHero: 6, MaxVet: 6, MaxEpic: 7 },
            ARC: { Starting: 0, MaxHero: 4, MaxVet: 6, MaxEpic: 8 },
            PER: { Starting: 3, MaxHero: 5, MaxVet: 6, MaxEpic: 7 }
        },
        LangChoices: 1,
        StartLangs: ['Shyr'],
        AbilityChoices: 1,
        StatIncreaseChoices: 0,
        HeightMale: [65,75],
        HeightFemale: [60,70],
        WeightMale: [125,180],
        WeightFemale: [85,140],
        AdditionalChars: ['Iosan characters begin the game with an additional ability selected from one of their careers.'],
        ResCareers:
        [
            'Aristocrat',
            'Fell Caller',
            'Iron Fang',
            'Priest of Morrow',
            'Priest of Menoth',
            'Stormblade',
            'Trencher'
        ]
    },
    {
        Name:'Nyss',
        Stats:
        {
            PHY: { Starting: 5, MaxHero: 7, MaxVet: 7, MaxEpic: 8 },
            SPD: { Starting: 6, MaxHero: 7, MaxVet: 7, MaxEpic: 7 },
            STR: { Starting: 4, MaxHero: 6, MaxVet: 7, MaxEpic: 8 },
            AGL: { Starting: 4, MaxHero: 5, MaxVet: 6, MaxEpic: 7 },
            PRW: { Starting: 4, MaxHero: 5, MaxVet: 6, MaxEpic: 7 },
            POI: { Starting: 4, MaxHero: 5, MaxVet: 6, MaxEpic: 7 },
            INT: { Starting: 3, MaxHero: 5, MaxVet: 6, MaxEpic: 6 },
            ARC: { Starting: 0, MaxHero: 4, MaxVet: 6, MaxEpic: 7 },
            PER: { Starting: 3, MaxHero: 5, MaxVet: 6, MaxEpic: 6 }
        },
        ResArchetypes: ['Intellectual'],
        LangChoices: 1,
        StartLangs: ['Aeric'],
        AbilityChoices: 0,
        InitMod: 1,
        StatIncreases: [['PER',1]],
        StatIncreaseChoices: 0,
        HeightMale: [67,77],
        HeightFemale: [62,72],
        WeightMale: [140,195],
        WeightFemale: [95,130],
        AdditionalChars:
        [
            'Nyss with the Gifted archetype cannot have the Arcane Mechanik, Arcanist, Gun Mage, or Warcaster careers.',
            'Reduce the cost of Nyss bows and Nyss claymores by 10gc during character creation.',
            'Nyss gain +1 on Initiative and PER rolls.',
            'Nyss gain +3 ARM against cold damage.',
            'Nyss suffer -3 ARM against fire damage.'
        ],
        ResCareers:
        [
            'Aristocrat',
            'Fell Caller',
            'Iron Fang',
            'Knight',
            'Mage Hunter',
            'Priest of Morrow',
            'Priest of Menoth',
            'Stormblade',
            'Trencher',
            'Arcane Mechanik',
            'Arcanist',
            'Gun Mage',
            'Warcaster'
        ]
    },
    {
        Name:'Ogrun',
        Stats:
        {
            PHY: { Starting: 6, MaxHero: 7, MaxVet: 8, MaxEpic: 9 },
            SPD: { Starting: 5, MaxHero: 6, MaxVet: 6, MaxEpic: 6 },
            STR: { Starting: 6, MaxHero: 8, MaxVet: 9, MaxEpic: 10 },
            AGL: { Starting: 3, MaxHero: 5, MaxVet: 5, MaxEpic: 6 },
            PRW: { Starting: 4, MaxHero: 5, MaxVet: 6, MaxEpic: 7 },
            POI: { Starting: 3, MaxHero: 4, MaxVet: 5, MaxEpic: 6 },
            INT: { Starting: 3, MaxHero: 5, MaxVet: 5, MaxEpic: 6 },
            ARC: { Starting: 0, MaxHero: 0, MaxVet: 0, MaxEpic: 0 },
            PER: { Starting: 2, MaxHero: 4, MaxVet: 5, MaxEpic: 6 }
        },
        ResArchetypes: ['Gifted','Intellectual'],
        LangChoices: 1,
        StartLangs: ['Molgur-Og','Rhulic'],
        AbilityChoices: 0,
        StatIncreaseChoices: 0,
        HeightMale: [90,105],
        HeightFemale: [82,97],
        WeightMale: [450,500],
        WeightFemale: [330,380],
        AdditionalChars: ['Huge Stature - An ogrun can wield a weapon in one hand that usually requires two hands to wield but he suffers -2 on attack rolls with that weapon.'],
        ResCareers:
        [
            'Aristocrat',
            'Fell Caller',
            'Iron Fang',
            'Knight',
            'Mage Hunter',
            'Priest of Morrow',
            'Priest of Menoth',
            'Stormblade'
        ]
    },
    {
        Name:'Trollkin',
        Stats:
        {
            PHY: { Starting: 6, MaxHero: 8, MaxVet: 9, MaxEpic: 10 },
            SPD: { Starting: 5, MaxHero: 6, MaxVet: 6, MaxEpic: 6 },
            STR: { Starting: 5, MaxHero: 7, MaxVet: 8, MaxEpic: 9 },
            AGL: { Starting: 3, MaxHero: 5, MaxVet: 6, MaxEpic: 7 },
            PRW: { Starting: 4, MaxHero: 5, MaxVet: 6, MaxEpic: 7 },
            POI: { Starting: 2, MaxHero: 4, MaxVet: 5, MaxEpic: 6 },
            INT: { Starting: 3, MaxHero: 4, MaxVet: 5, MaxEpic: 6 },
            ARC: { Starting: 0, MaxHero: 4, MaxVet: 6, MaxEpic: 7 },
            PER: { Starting: 3, MaxHero: 4, MaxVet: 5, MaxEpic: 6 }
        },
        ResArchetypes: ['Intellectual'],
        LangChoices: 1,
        StartLangs: ['Molgur-Trul'],
        AbilityChoices: 0,
        Benefits: [{ Name: 'Tough' }, { Name: 'Feat: Revitalize' }],
        StatIncreaseChoices: 0,
        HeightMale: [71,84],
        HeightFemale: [63,76],
        WeightMale: [250,330],
        WeightFemale: [150,230],
        AdditionalChars:
        [
            'Trollkin with the gifted archetype cannot have the Arcane Mechanik, Arcanist, or Warcaster careers.',
            'Tough - Whether or not they have the Mighty archetype, trollkin characters start the game with the Tough archetype benefit. This is in addition to any other archetype benefits selected for the character.',
            'Feat: Revitalize - Whether or not they have the Mighty archetype, trollkin characters start the game with the Feat: Revitalize archetype benefit. This is in addition to any other archetype benefits selected for the character.'
        ],
        ResCareers:
        [
            'Aristocrat',
            'Iron Fang',
            'Knight',
            'Mage Hunter',
            'Priest of Morrow',
            'Priest of Menoth',
            'Stormblade',
            'Arcane Mechanik',
            'Arcanist',
            'Warcaster'
        ]
    }
];
