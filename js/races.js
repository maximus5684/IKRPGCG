// Stats: [0] = Starting, [1] = Max @ Hero, [2] = Max @ Veteran, [3] = Max @ Epic
raceArr = [
    {
        Name:'Human', 
        Stats:{
            PHY:[5,7,8,8],
            SPD:[6,7,7,7],
            STR:[4,6,7,8],
            AGL:[3,5,6,7],
            PRW:[4,5,6,7],
            POI:[4,5,6,7],
            INT:[3,5,6,7],
            ARC:[0,4,6,8],
            PER:[3,5,6,7]
        },
        ResArchetypes:[],
        LangChoices:2,
        StartLangs:[],
        Abilities: [],
        AbilityChoices: 0,
        Benefits: [],
        Connections: [],
        StatIncreases: [],
        StatIncreaseChoices: 1,
        StatIncreaseChoiceOptions: ['PHY','AGL','INT'],
        HeightMale:[61,75],
        HeightFemale:[55,69],
        WeightMale:[110,200],
        WeightFemale:[90,170],
        AdditionalChars:['Exceptional Potential - Humans are extremely adaptable and talented individuals. Your character begins the game with your choice of +1 PHY, +1 AGL, or +1 INT. Note this bonus does not increase the character\'s racial maximum, just the starting value.'],
        ResCareers:['Fell Caller','Mage Hunter']
    },
    { 
        Name:'Dwarf',
        Stats:{
            PHY:[6,7,7,8],
            SPD:[4,5,6,6],
            STR:[5,6,7,8],
            AGL:[3,5,6,7],
            PRW:[4,5,6,7],
            POI:[3,4,5,6],
            INT:[4,5,6,7],
            ARC:[0,4,6,7],
            PER:[3,4,6,7]
        },
        ResArchetypes:[],
        LangChoices:1,
        StartLangs:['Rhulic'],
        Abilities: ['Load Bearing'],
        AbilityChoices: 0,
        Benefits: [],
        Connections: ['Connections (clan)'],
        StatIncreases: [],
        StatIncreaseChoices: 0,
        StatIncreaseChoiceOptions: [],
        HeightMale:[52,60],
        HeightFemale:[47,55],
        WeightMale:[150,190],
        WeightFemale:[105,145],
        AdditionalChars:[
            'Load Bearing - Dwarf Characters start the game with the Load Bearing ability. This ability is in addition to any others the character gains from his starting careers.',
            'Connections (clan) - Dwarf characters begin with Connection (dwarven clan). This is in addition to any other connections the character starts with.'],
        ResCareers:[
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
        Stats:{
            PHY:[4,6,7,7],
            SPD:[6,7,7,7],
            STR:[3,4,5,6],
            AGL:[4,5,6,7],
            PRW:[4,5,6,7],
            POI:[3,5,6,7],
            INT:[3,4,5,6],
            ARC:[0,0,0,0],
            PER:[3,4,4,5]
        },
        ResArchetypes:['Gifted'],
        LangChoices:1,
        StartLangs:['Gobberish'],
        Abilities: [],
        AbilityChoices: 0,
        Benefits: ['Deft'],
        Connections: [],
        StatIncreases: [['DEF',1]],
        StatIncreaseChoices: 0,
        StatIncreaseChoiceOptions: [],
        HeightMale:[34,42],
        HeightFemale:[32,40],
        WeightMale:[42,60],
        WeightFemale:[38,55],
        AdditionalChars:[
            'Deft - Whether or not they have the Skilled archetype, gobber characters start the game with the Deft archetype benefit. This benefit is in addition to any other archetype benefits the character starts with.',
            'Gobbers have a racial modifier of +1 DEF.',
            'Gobbers cannot use great weapons or rifles.'
        ],
        ResCareers:[
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
        Stats:{
            PHY:[5,7,7,7],
            SPD:[6,7,7,7],
            STR:[4,5,6,7],
            AGL:[3,5,6,7],
            PRW:[4,5,6,7],
            POI:[4,5,6,7],
            INT:[4,6,6,7],
            ARC:[0,4,6,8],
            PER:[3,5,6,7]
        },
        ResArchetypes:[],
        LangChoices:1,
        StartLangs:['Shyr'],
        Abilities: [],
        AbilityChoices: 1,
        Benefits: [],
        Connections: [],
        StatIncreases: [],
        StatIncreaseChoices: 0,
        StatIncreaseChoiceOptions: [],
        HeightMale:[65,75],
        HeightFemale:[60,70],
        WeightMale:[125,180],
        WeightFemale:[85,140],
        AdditionalChars:['Iosan characters begin the game with an additional ability selected from one of their careers.'],
        ResCareers:[
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
        Stats:{
            PHY:[5,7,7,8],
            SPD:[6,7,7,7],
            STR:[4,6,7,8],
            AGL:[4,5,6,7],
            PRW:[4,5,6,7],
            POI:[4,5,6,7],
            INT:[3,5,6,6],
            ARC:[0,4,6,7],
            PER:[3,5,6,6]
        },
        ResArchetypes:['Intellectual'],
        LangChoices:1,
        StartLangs:['Aeric'],
        Abilities: [],
        AbilityChoices: 0,
        Benefits: [],
        Connections: [],
        StatIncreases: [['Initiative',1],['PER',1]],
        StatIncreaseChoices: 0,
        StatIncreaseChoiceOptions: [],
        HeightMale:[67,77],
        HeightFemale:[62,72],
        WeightMale:[140,195],
        WeightFemale:[95,130],
        AdditionalChars:[
            'Nyss with the Gifted archetype cannot have the Arcane Mechanik, Arcanist, Gun Mage, or Warcaster careers.',
            'Reduce the cost of Nyss bows and Nyss claymores by 10gc during character creation.',
            'Nyss gain +1 on Initiative and PER rolls.',
            'Nyss gain +3 ARM against cold damage.',
            'Nyss suffer -3 ARM against fire damage.'
        ],
        ResCareers:[
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
        Stats:{
            PHY:[6,7,8,9],
            SPD:[5,6,6,6],
            STR:[6,8,9,10],
            AGL:[3,5,5,6],
            PRW:[4,5,6,7],
            POI:[3,4,5,6],
            INT:[3,5,5,6],
            ARC:[0,0,0,0],
            PER:[2,4,5,6]
        },
        ResArchetypes:['Gifted','Intellectual'],
        LangChoices:1,
        StartLangs:['Molgur-Og','Rhulic'],
        Abilities: [],
        AbilityChoices: 0,
        Benefits: [],
        Connections: [],
        StatIncreases: [],
        StatIncreaseChoices: 0,
        StatIncreaseChoiceOptions: [],
        HeightMale:[90,105],
        HeightFemale:[82,97],
        WeightMale:[450,500],
        WeightFemale:[330,380],
        AdditionalChars:['Huge Stature - An ogrun can wield a weapon in one hand that usually requires two hands to wield but he suffers -2 on attack rolls with that weapon.'],
        ResCareers:[
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
        Stats:{
            PHY:[6,8,9,10],
            SPD:[5,6,6,6],
            STR:[5,7,8,9],
            AGL:[3,5,6,7],
            PRW:[4,5,6,7],
            POI:[2,4,5,6],
            INT:[3,4,5,6],
            ARC:[0,4,6,7],
            PER:[3,4,5,6]
        },
        ResArchetypes:['Intellectual'],
        LangChoices: 1,
        StartLangs:['Molgur-Trul'],
        Abilities: [],
        AbilityChoices: 0,
        Benefits: ['Tough','Feat: Revitalize'],
        Connections: [],
        StatIncreases: [],
        StatIncreaseChoices: 0,
        StatIncreaseChoiceOptions: [],
        HeightMale:[71,84],
        HeightFemale:[63,76],
        WeightMale:[250,330],
        WeightFemale:[150,230],
        AdditionalChars:[
            'Trollkin with the gifted archetype cannot have the Arcane Mechanik, Arcanist, or Warcaster careers.',
            'Tough - Whether or not they have the Mighty archetype, trollkin characters start the game with the Tough archetype benefit. This is in addition to any other archetype benefits selected for the character.',
            'Feat: Revitalize - Whether or not they have the Mighty archetype, trollkin characters start the game with the Feat: Revitalize archetype benefit. This is in addition to any other archetype benefits selected for the character.'
        ],
        ResCareers:[
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
