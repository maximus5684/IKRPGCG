careerArr = [
    {
        Name: "Alchemist",
        StartingCareerOnly: false,
        StartingAbilities: [{ Name: 'Grenadier' }, { Name: 'Poison Resistance' }],
        StartingMilitarySkills: [{ Name: 'Hand Weapon', Level: 1 }, { Name: 'Thrown Weapon', Level: 1 }],
        StartingOccupationalSkills: [{ Name: 'Alchemy', Level: 1 }, { Name: 'Medicine', Level: 1 }],
        StartingMSkillChoices: 0,
        StartingOSkillChoices: 0,
        StartingAssets: ['alchemist\'s leather', 'gas mask', 'traveling alchemist\'s kit', 'any five alchemical grenades', 'grenadier\'s bandolier'],
        StartingAssetChoices: 0,
        StartingGold: 50,
        Abilities:
        [
            { Name: 'Bomber' },
            { Name: 'Brew Master' },
            { Name: 'Fast Cook' },
            { Name: 'Field Alchemist' },
            { Name: 'Fire in the Hole!' },
            { Name: 'Free Style' },
            { Name: 'Grenadier' },
            { Name: 'Poison Resistance' }
        ],
        Connections: [{ Name: 'alchemical order', Type: 'Generic' }],
        MilitarySkills: [{ Name: 'Hand Weapon', Level: 2 }, { Name: 'Thrown Weapon', Level: 4 }, { Name: 'Unarmed Combat', Level: 2 }],
        OccupationalSkills:
        [
            { Name: 'Alchemy', Level: 4 },
            { Name: 'Craft', Level: 4, Type: 'Generic', Property: 'any' },
            { Name: 'Forgery', Level: 2 },
            { Name: 'General Skills', Level: 4 },
            { Name: 'Medicine', Level: 4 },
            { Name: 'Negotiation', Level: 4 },
            { Name: 'Research', Level: 4 }
        ]
    },
    {
        Name: "Arcane Mechanik",
        StartingCareerOnly: false,
        StartingAbilities: [{ Name: 'Inscribe Formulae' }],
        StartingOccupationalSkills: 
        [
            { Name: 'Craft', Level: 1, Type: 'Specific', Property: 'gunsmithing' },
            { Name: 'Craft', Level: 1, Type: 'Specific', Property: 'metalworking' },
            { Name: 'Mechanikal Engineering', Level: 1 }
        ],
        StartingMSkillChoices: 1,
        StartingMSkillChoicesOptions: [{ Name: 'Hand Weapon', Level: 1 }, { Name: 'Rifle', Level: 1 }],
        StartingOSkillChoices: 0,
        StartingSpells: ['Arcantrik Bolt', 'Polarity Shield'],
        StartingAssets: ['Rune Etching Kit'],
        StartingAssetChoices: 1,
        StartingAssetChoiceOptions: ['Mechanika Weapon worth up to 750 gc','Mechanika Suit of Armor worth up to 750 gc'],
        StartingGold: 50,
        Abilities:
        [
            { Name: '\'Jack Marshal' },
            { Name: 'Ace Commander' },
            { Name: 'Arcane Engineer' },
            { Name: 'Drive: Assault' },
            { Name: 'Drive: Pronto' },
            { Name: 'Inscribe Formulae' },
            { Name: 'Resourceful' },
            { Name: 'Steamo' }
        ],
        Connections: [{ Name: 'mechaniks organization', Type: 'General' }],
        MilitarySkills: [{ Name: 'Hand Weapon', Level: 2 }, { Name: 'Light Artillery', Level: 2 }, { Name: 'Rifle', Level: 2 }],
        OccupationalSkills:
        [
            { Name: 'Command', Level: 1 },
            { Name: 'Craft', Level: 4, Type: 'Generic', Property: 'any' },
            { Name: 'Cryptography', Level: 3 },
            { Name: 'General Skills', Level: 4 },
            { Name: 'Mechanikal Engineering', Level: 4 },
            { Name: 'Negotiation', Level: 2 },
            { Name: 'Research', Level: 3 }
        ],
        SpellList:
        [
            'Arcantrik Bolt',
            'Black Out',
            'Broadside',
            'Electrical Blast',
            'Electrify',
            'Fail Safe',
            'Force Field',
            'Fortify',
            'Full Throttle',
            'Grind',
            'Guided Fire',
            'Iron Aggression',
            'Jackhammer',
            'Jump Start',
            'Locomotion',
            'Polarity Shield',
            'Positive Charge',
            'Power Booster',
            'Protection from Electricity',
            'Redline',
            'Refuge',
            'Return Fire',
            'Short Out',
            'Superiority',
            'Temper Metal',
            'Tide of Steel',
            'Voltaic Lock'
        ]
    },
    {
        Name: "Arcanist",
        StartingCareerOnly: false,
        StartingAbilities: [{ Name: 'Great Power' }],
        StartingOccupationalSkills: [{ Name: 'Lore', Type: 'Specific', Property: 'Arcane', Level: 1 },{ Name: 'Research', Level: 1 }],
        StartingMSkillChoices: 0,
        StartingOSkillChoices: 0,
        StartingSpells: ['Arcane Bolt','Aura of Protection','Light in the Darkness'],
        StartingSpecial: 'A character who chooses Arcanist as one of his two starting careers gains the Rune Reader Gifted archetype benefit.',
        StartingAssetChoices: 0,
        StartingGold: 75,
        FreeBenefits: [{ Name: 'Rune Reader' }],
        Abilities: [{ Name: 'Arcane Defenses' },{ Name: 'Arcane Scholar' },{ Name: 'Great Power' },{ Name: 'University Education' }],
        Connections: [{ Name: 'magical order', Type: 'Generic' }],
        OccupationalSkills:
        [
            { Name: 'Craft', Type: 'Generic', Property: 'any', Level: 2 },
            { Name: 'Etiquette', Level: 2 },
            { Name: 'General Skills', Level: 4 },
            { Name: 'Negotiation', Level: 2 },
            { Name: 'Oratory', Level: 2 },
            { Name: 'Research', Level: 4 }
        ],
        SpellList:
        [
            'Arcane Bolt',
            'Arcane Strike',
            'Ashen Cloud',
            'Aura of Protection',
            'Banishing Ward',
            'Blizzard',
            'Celerity',
            'Fire Starter',
            'Fog of War',
            'Force Field',
            'Force Hammer',
            'Foxhole',
            'Guided Blade',
            'Hand of Fate',
            'Hex Blast',
            'Howling Flames',
            'Icy Grip',
            'Influence',
            'Inhospitable Ground',
            'Light in the Darkness',
            'Lightning Tendrils',
            'Mirage',
            'Occultation',
            'Overmind',
            'Protection from Cold',
            'Protection from Electricity',
            'Protection from Fire',
            'Rift',
            'Rock Hammer',
            'Rock Wall',
            'Storm Tossed',
            'Telekinesis',
            'Tempest',
            'True Sight',
            'Vision',
            'Wind Blast',
            'Zephyr'
        ]
    },
    {
        Name: "Aristocrat",
        StartingCareerOnly: true,
        StartingAbilities: [{ Name: 'Good Breeding' }, { Name: 'Language', Type: 'Generic', Property: 'any' }, { Name: 'Privilege' }],
        StartingConnections: [{ Name: 'nobility', Type: 'Generic' }],
        StartingMilitarySkills: [{ Name: 'Hand Weapon', Level: 1 }],
        StartingOccupationalSkills: [{ Name: 'Command', Level: 1 },{ Name: 'Etiquette', Level: 1 }],
        StartingMSkillChoices: 1,
        StartingMSkillChoicesOptions: [{ Name: 'Archery', Level: 1 },{ Name: 'Pistol', Level: 1 },{ Name: 'Rifle', Level: 1 }],
        StartingOSkillChoices: 0,
        StartingSpecial: 'A character who choses Aristocrat as one of his two starting careers gains 50 gc each month from his family holdings.',
        StartingAssetChoices: 0,
        StartingGold: 200,
        Abilities:
        [
            { Name: 'Advisor' },
            { Name: 'Appraise' },
            { Name: 'Battle Plan: Call to Action' },
            { Name: 'Expert Rider' },
            { Name: 'Good Breeding' },
            { Name: 'Language', Type: 'Generic', Property: 'any' },
            { Name: 'Natural Leader' },
            { Name: 'Poison Resistance' },
            { Name: 'Privilege' },
            { Name: 'Rallying Cry' },
            { Name: 'Swift Rider' }
        ],
        Connections: [{ Name: 'any', Type: 'Generic' }],
        MilitarySkills:
        [
            { Name: 'Archery', Level: 2 },
            { Name: 'Hand Weapon', Level: 3 },
            { Name: 'Lance', Level: 3 },
            { Name: 'Pistol', Level: 2 },
            { Name: 'Rifle', Level: 3 }
        ],
        OccupationalSkills:
        [
            { Name: 'Bribery', Level: 4 },
            { Name: 'Command', Level: 4 },
            { Name: 'Cryptography', Level: 2 },
            { Name: 'Deception', Level: 4 },
            { Name: 'Etiquette', Level: 4 },
            { Name: 'General Skills', Level: 4 },
            { Name: 'Law', Level: 4 },
            { Name: 'Negotiation', Level: 4 },
            { Name: 'Oratory', Level: 4 },
            { Name: 'Seduction', Level: 4 }
        ]
    },
    {
        Name: "Bounty Hunter",
        StartingCareerOnly: false,
        StartingAbilities: [{ Name: 'Binding' }, { Name: 'Take Down' }],
        StartingOccupationalSkills: [{ Name: 'Detection', Level: 1 },{ Name: 'Intimidation', Level: 1 },{ Name: 'Rope Use', Level: 1 },{ Name: 'Tracking', Level: 1 }],
        StartingMSkillChoices: 2,
        StartingMSkillChoicesOptions: 
        [
            { Name: 'Crossbow', Level: 1 },
            { Name: 'Hand Weapon', Level: 1 },
            { Name: 'Pistol', Level: 1 },
            { Name: 'Rifle', Level: 1 },
            { Name: 'Unarmed Combat', Level: 1 }
        ],
        StartingOSkillChoices: 0,
        StartingAssetChoices: 0,
        StartingGold: 75,
        Abilities:
        [
            { Name: 'Binding' },
            { Name: 'Crossbowman' },
            { Name: 'Head-Butt' },
            { Name: 'Language', Type: 'Specific', Property: 'Five Cant' },
            { Name: 'Pursuit' },
            { Name: 'Roll With It' },
            { Name: 'Take Down' },
            { Name: 'Waylay' }
        ],
        Connections: [{ Name: 'any', Type: 'Generic' }],
        MilitarySkills:
        [
            { Name: 'Crossbow', Level: 3 },
            { Name: 'Hand Weapon', Level: 2 },
            { Name: 'Pistol', Level: 2 },
            { Name: 'Rifle', Level: 3 },
            { Name: 'Unarmed Combat', Level: 4 }
        ],
        OccupationalSkills:
        [
            { Name: 'Bribery', Level: 2 },
            { Name: 'Deception', Level: 2 },
            { Name: 'Disguise', Level: 2 },
            { Name: 'General Skills', Level: 4 },
            { Name: 'Interrogation', Level: 2 },
            { Name: 'Law', Level: 2 },
            { Name: 'Negotiation', Level: 4 },
            { Name: 'Rope Use', Level: 4 },
            { Name: 'Sneak', Level: 3 },
            { Name: 'Streetwise', Level: 4 },
            { Name: 'Tracking', Level: 4 }
        ]
    },
    {
        Name: "Cutthroat",
        StartingCareerOnly: false,
        StartingAbilities: [{ Name: 'Anatomical Precision' }, { Name: 'Backstab' }, { Name: 'Prowl' }],
        StartingMilitarySkills: [{ Name: 'Hand Weapon', Level: 1 }],
        StartingOccupationalSkills: [{ Name: 'Intimidation', Level: 1 }, { Name: 'Sneak', Level: 1 }, { Name: 'Streetwise', Level: 1 }],
        StartingMSkillChoices: 1,
        StartingMSkillChoicesOptions: [{ Name: 'Crossbow', Level: 1 }, { Name: 'Thrown Weapon', Level: 1 }, { Name: 'Unarmed Combat', Level: 1 }],
        startingOSkillChoices: 0,
        StartingAssetChoices: 0,
        StartingGold: 75,
        Abilities:
        [
            { Name: 'Anatomical Precision' },
            { Name: 'Backstab' },
            { Name: 'Blood Spiller' },
            { Name: 'Camouflage' },
            { Name: 'Chain Attack: Bleed Out' },
            { Name: 'Fast Draw' },
            { Name: 'Language', Type: 'Specific', Property: 'Five Cant' },
            { Name: 'Prowl' },
            { Name: 'Specialization', Type: 'Specific', Property: 'Assassin Blade' },
            { Name: 'Two-Weapon Fighting' },
            { Name: 'Waylay' }
        ],
        Connections: [{ Name: 'criminal', Type: 'Generic' }],
        MilitarySkills:
        [
            { Name: 'Crossbow', Level: 2 },
            { Name: 'Hand Weapon', Level: 4 },
            { Name: 'Thrown Weapon', Level: 3 },
            { Name: 'Unarmed Combat', Level: 3 }
        ],
        OccupationalSkills:
        [
            { Name: 'General Skills', Level: 4 },
            { Name: 'Interrogation', Level: 2 },
            { Name: 'Sneak', Level: 4 },
            { Name: 'Streetwise', Level: 4 }
        ]
    },
    {
        Name: "Duelist",
        StartingCareerOnly: false,
        StartingAbilities: [{ Name: 'Parry' }, { Name: 'Riposte' }],
        StartingMilitarySkills: [{ Name: 'Hand Weapon', Level: 1 }, { Name: 'Pistol', Level: 1 }],
        StartingOccupationalSkills: [{ Name: 'Gambling', Level: 1 }, { Name: 'Intimidation', Level: 1 }, { Name: 'Jumping', Level: 1 }],
        StartingMSkillChoices: 0,
        StartingOSkillChoices: 0,
        StartingAssetChoices: 0,
        StartingGold: 75,
        Abilities:
        [
            { Name: 'Acrobatics' },
            { Name: 'Fast Draw' },
            { Name: 'Gunfighter' },
            { Name: 'Parry' },
            { Name: 'Precision Strike' },
            { Name: 'Quick Work' },
            { Name: 'Riposte' },
            { Name: 'Roll With It' },
            { Name: 'Two-Weapon Fighting' }
        ],
        MilitarySkills:
        [
            { Name: 'Hand Weapon', Level: 4 },
            { Name: 'Pistol', Level: 4 },
            { Name: 'Thrown Weapon', Level: 3 },
            { Name: 'Unarmed Combat', Level: 2 }
        ],
        OccupationalSkills:
        [
            { Name: 'Etiquette', Level: 2 },
            { Name: 'General Skills', Level: 4 },
            { Name: 'Law', Level: 2 },
            { Name: 'Oratory', Level: 2 },
            { Name: 'Seduction', Level: 3 },
            { Name: 'Streetwise', Level: 2 }
        ]
    },
    {
        Name: "Explorer",
        StartingCareerOnly: false,
        StartingAbilities: [{ Name: 'Big Game Hunter' }, { Name: 'Language', Type: 'Generic', Property: 'any' }, { Name: 'Port of Call' }],
        StartingConnections: [{ Name: 'patron', Type: 'Generic' }],
        StartingOccupationalSkills: [{ Name: 'Detection', Level: 1 }, { Name: 'Medicine', Level: 1 }, { Name: 'Navigation', Level: 1 }, { Name: 'Survival', Level: 1 }],
        StartingMSkillChoices: 1,
        StartingMSkillChoicesOptions: [{ Name: 'Archery', Level: 1 }, { Name: 'Hand Weapon', Level: 1 }, { Name: 'Pistol', Level: 1 }, { Name: 'Rifle', Level: 1 }],
        StartingOSkillChoices: 0,
        StartingSpecial: 'A character who chooses Explorer as one of his two starting careers gains 25 gc each month from his patron for as long as he continues to explore new regions, report back regularly, and bring his patron occasional gifts from exotic places.',
        StartingAssets: ['map case','spyglass'],
        StartingAssetChoices: 0,
        StartingGold: 150,
        Abilities:
        [
            { Name: 'Battle Plan: Reconnaissance' },
            { Name: 'Big Game Hunter' },
            { Name: 'Disease Resistance' },
            { Name: 'Expert Rider' },
            { Name: 'Language', Type: 'Generic', Property: 'any' },
            { Name: 'Natural Leader' },
            { Name: 'Poison Resistance' },
            { Name: 'Port of Call' },
            { Name: 'Signal Language' },
            { Name: 'Swift Rider' }
        ],
        Connections: [{ Name: 'wealthy patrons', Type: 'Generic' }, { Name: 'isolated tribe or people', Type: 'Generic' }],
        MilitarySkills:
        [
            { Name: 'Archery', Level: 2 },
            { Name: 'Crossbow', Level: 2 },
            { Name: 'Hand Weapon', Level: 2 },
            { Name: 'Pistol', Level: 2 },
            { Name: 'Rifle', Level: 3 },
            { Name: 'Thrown Weapon', Level: 2 },
            { Name: 'Unarmed Combat', Level: 2 }
        ],
        OccupationalSkills:
        [
            { Name: 'Command', Level: 4 },
            { Name: 'Craft', Type: 'Generic', Property: 'any', Level: 2 },
            { Name: 'Cryptography', Level: 2 },
            { Name: 'Etiquette', Level: 2 },
            { Name: 'General Skills', Level: 4 },
            { Name: 'Medicine', Level: 2 },
            { Name: 'Navigation', Level: 4 },
            { Name: 'Negotiation', Level: 4 },
            { Name: 'Rope Use', Level: 4 },
            { Name: 'Survival', Level: 4 }
        ]
    },
    {
        Name: "Fell Caller",
        StartingCareerOnly: false,
        StartingAbilities: [{ Name: 'Fell Call: Signal Call' }, { Name: 'Fell Call: Sonic Blast' }],
        StartingOccupationalSkills: 
        [
            { Name: 'Command', Level: 1 },
            { Name: 'Fell Calling', Level: 2 },
            { Name: 'Lore', Type: 'Specific', Property: 'Trollkin', Level: 1 },
            { Name: 'Oratory', Level: 1 }
        ],
        StartingMSkillChoices: 1,
        StartingMSkillChoicesOptions: [{ Name: 'Great Weapon', Level: 1 }, { Name: 'Hand Weapon', Level: 1 }],
        StartingOSkillChoices: 0,
        StartingAssetChoices: 0,
        StartingGold: 75,
        Abilities: 
        [
            { Name: 'Battle Plan: Call to Action' },
            { Name: 'Fell Call: Cacophony' },
            { Name: 'Fell Call: Call of Defiance' },
            { Name: 'Fell Call: Ground Shaker' },
            { Name: 'Fell Call: Heroic Ballad' },
            { Name: 'Fell Call: Reverberation' },
            { Name: 'Fell Call: Signal Call' },
            { Name: 'Fell Call: Sonic Blast' },
            { Name: 'Legacy of Bragg' },
            { Name: 'Natural Leader' }
        ],
        Connections: [{ Name: 'Kriel', Type: 'Specific' }],
        MilitarySkills: 
        [
            { Name: 'Great Weapon', Level: 3 },
            { Name: 'Hand Weapon', Level: 3 },
            { Name: 'Thrown Weapon', Level: 3 },
            { Name: 'Unarmed Combat', Level: 3 }
        ],
        OccupationalSkills: 
        [
            { Name: 'Command', Level: 4 },
            { Name: 'Fell Calling', Level: 4 },
            { Name: 'General Skills', Level: 4 },
            { Name: 'Oratory', Level: 4 },
            { Name: 'Seduction', Level: 2 }
        ]
    },
    {
        Name: "Field Mechanik",
        StartingCareerOnly: false,
        StartingAbilities: [{ Name: '\'Jack Marshal' }, { Name: 'Bodge' }, { Name: 'Hit the Deck!' }],
        StartingOccupationalSkills:
        [
            { Name: 'Command', Level: 1 },
            { Name: 'Craft', Type: 'Specific', Property: 'metalworking', Level: 1 },
            { Name: 'Mechanikal Engineering', Level: 1 }
        ],
        StartingMSkillChoices: 1,
        StartingMSkillChoicesOptions: [{ Name: 'Hand Weapon', Level: 1 }, { Name: 'Pistol', Level: 1 }],
        StartingOSkillChoices: 0,
        StartingAssets: ['mechanik\'s toolkit','light laborjack with up to 200gc of weapons'],
        StartingAssetChoices: 0,
        StartingGold: 25,
        Abilities: 
        [
            { Name: '\'Jack Masrhal' },
            { Name: 'Ace Commander' },
            { Name: 'Bodge' },
            { Name: 'Dodger' },
            { Name: 'Drive: Ancillary Attack' },
            { Name: 'Drive: Assault' },
            { Name: 'Drive: Off Road' },
            { Name: 'Drive: Pronto' },
            { Name: 'Hit the Deck!' },
            { Name: 'Iron Sentinel' },
            { Name: 'Scrounge' },
            { Name: 'Steamo' },
            { Name: 'Tune Up' }
        ],
        Connections: [{ Name: 'mechaniks organization', Type: 'Generic' }],
        MilitarySkills: [{ Name: 'Hand Weapon', Level: 2 }, { Name: 'Pistol', Level: 2 }],
        OccupationalSkills: 
        [
            { Name: 'Command', Level: 3 },
            { Name: 'Craft', Type: 'Generic', Property: 'any', Level: 4 },
            { Name: 'General Skills', Level: 4 },
            { Name: 'Mechanikal Engineering', Level: 4 },
            { Name: 'Negotiation', Level: 3 }
        ]
    },
    {
        Name: "Gun Mage",
        StartingCareerOnly: false,
        StartingAbilities: [{ Name: 'Craft Rune Shot' }, { Name: 'Fast Reload' }],
        StartingOccupationalSkills: [{ Name: 'Detection', Level: 1}, { Name: 'Intimidation', Level: 1 }],
        StartingMSkillChoices: 1,
        StartingMSkillChoicesOptions: [{ Name: 'Pistol', Level: 1 }, { Name: 'Rifle', Level: 1 }],
        StartingOSkillChoices: 0,
        StartingSpells: ['Rune Shot: Accuracy', 'Rune Shot: Brutal', 'Rune Shot: Thunderbolt'],
        StartingAssets: ['ammo bandolier','rune shot casting kit','powder','10 rounds of ammunition'],
        StartingAssetChoices: 1,
        StartingAssetChoiceOptions: ['magelock pistol','magelock rifle'],
        StartingGold: 25,
        Abilities: 
        [
            { Name: 'Arcane Precision' },
            { Name: 'Craft Rune Shot' },
            { Name: 'Fast Draw' },
            { Name: 'Fast Reload' },
            { Name: 'Gunfighter' },
            { Name: 'Keen Eyed' }
        ],
        Connections: [{ Name: 'gun mage order', Type: 'Generic' }],
        MilitarySkills: [{ Name: 'Pistol', Level: 4 }, { Name: 'Rifle', Level: 4 }],
        OccupationalSkills: [{ Name: 'General Skills', Level: 4 }, { Name: 'Seduction', Level: 2 }],
        SpellList: 
        [
            'Fire Group',
            'Guided Fire',
            'Heightened Reflexes',
            'Refuge',
            'Return Fire',
            'Rune Shot: Accuracy',
            'Rune Shot: Black Penny',
            'Rune Shot: Brutal',
            'Rune Shot: Detonator',
            'Rune Shot: Earth Shaker',
            'Rune Shot: Fire Beacon',
            'Rune Shot: Freeze Fire',
            'Rune Shot: Heart Stopper',
            'Rune Shot: Iron Rot',
            'Rune Shot: Molten Shot',
            'Rune Shot: Momentum',
            'Rune Shot: Phantom Seeker',
            'Rune Shot: Shadow Fire',
            'Rune Shot: Silencer',
            'Rune Shot: Spell Craker',
            'Rune Shot: Spontaneous Combustion',
            'Rune Shot: Thunderbolt',
            'Rune Shot: Trick Shot',
            'Snipe',
            'True Sight'
        ]
    },
    {
        Name: "Highwayman",
        StartingCareerOnly: false,
        StartingAbilities: [{ Name: 'Ambush' }, { Name: 'Saddle Shot' }],
        StartingMilitarySkills: [{ Name: 'Hand Weapon', Level: 1 }],
        StartingOccupationalSkills: 
        [
            { Name: 'Animal Handling', Level: 1 },
            { Name: 'Detection', Level: 1 },
            { Name: 'Intimidation', Level: 1 },
            { Name: 'Riding', Level: 1 }
        ],
        StartingMSkillChoices: 1,
        StartingMSkillChoicesOptions: [{ Name: 'Archery', Level: 1 }, { Name: 'Crossbow', Level: 1 }, { Name: 'Pistol', Level: 1 }],
        StartingOSkillChoices: 0,
        StartingAssets: ['mask','riding horse','tack'],
        StartingAssetChoices: 0,
        StartingGold: 75,
        Abilities: 
        [
            { Name: 'Ambush' },
            { Name: 'Appraise' },
            { Name: 'Binding' },
            { Name: 'Expert Rider' },
            { Name: 'Fast Draw' },
            { Name: 'Fast Reload' },
            { Name: 'Light Cavalry' },
            { Name: 'Prowl' },
            { Name: 'Ride-By Attack' },
            { Name: 'Saddle Shot' },
            { Name: 'Swift Hunter' },
            { Name: 'Swift Rider' },
            { Name: 'Traceless Path' },
            { Name: 'Two-Weapon Fighting' },
            { Name: 'Waylay' }
        ],
        Connections: [{ Name: 'criminal', Type: 'Generic' }],
        MilitarySkills: 
        [
            { Name: 'Archery', Level: 3 },
            { Name: 'Crossbow', Level: 3 },
            { Name: 'Hand Weapon', Level: 3 },
            { Name: 'Pistol', Level: 3 },
            { Name: 'Unarmed Combat', Level: 3 }
        ],
        OccupationalSkills: 
        [
            { Name: 'Bribery', Level: 2 },
            { Name: 'Deception', Level: 3 },
            { Name: 'Disguise', Level: 2 },
            { Name: 'General Skills', Level: 4 },
            { Name: 'Interrogation', Level: 2 },
            { Name: 'Negotiation', Level: 4 },
            { Name: 'Rope Use', Level: 4 },
            { Name: 'Seduction', Level: 4 },
            { Name: 'Sneak', Level: 4 },
            { Name: 'Survival', Level: 2 }
        ]
    },
    {
        Name: "Investigator",
        StartingCareerOnly: false,
        StartingAbilities: [{ Name: 'Astute' }, { Name: 'Language', Type: 'Generic', Property: 'any' }],
        StartingOccupationalSkills: 
        [
            { Name: 'Detection', Level: 1 },
            { Name: 'Forensic Science', Level: 1 },
            { Name: 'Interrogation', Level: 1 },
            { Name: 'Law', Level: 1 },
            { Name: 'Medicine', Level: 1 },
            { Name: 'Sneak', Level: 1 }
        ],
        StartingMSkillChoices: 1,
        StartingMSkillChoicesOptions: [{ Name: 'Hand Weapon', Level: 1 }, { Name: 'Pistol', Level: 1 }],
        StartingOSkillChoices: 0,
        StartingSpecial: 'A character who chooses Investigator as one of his two starting careers gains the Hyper Perception Intellectual archetype benefit.',
        StartingAssetChoices: 0,
        StartingGold: 100,
        FreeBenefits: [{ Name: 'Hyper Perception' }],
        Abilities: 
        [
            { Name: 'Anatomical Precision' },
            { Name: 'Astute' },
            { Name: 'Iron Will' },
            { Name: 'Language', Type: 'Generic', Property: 'any' },
            { Name: 'Prowl' },
            { Name: 'Sign Language' },
            { Name: 'Truth Reader' }
        ],
        Connections: [{ Name: 'any', Type: 'Generic' }],
        MilitarySkills: [{ Name: 'Hand Weapon', Level: 2 }, { Name: 'Pistol', Level: 2 }, { Name: 'Unarmed Combat', Level: 2 }],
        OccupationalSkills: 
        [
            { Name: 'Cryptography', Level: 4 },
            { Name: 'Deception', Level: 4 },
            { Name: 'Etiquette', Level: 2 },
            { Name: 'Forensic Science', Level: 4 },
            { Name: 'General Skills', Level: 4 },
            { Name: 'Interrogation', Level: 4 },
            { Name: 'Law', Level: 4 },
            { Name: 'Medicine', Level: 2 },
            { Name: 'Negotiation', Level: 3 },
            { Name: 'Research', Level: 4 },
            { Name: 'Sneak', Level: 4 },
            { Name: 'Streetwise', Level: 4 }
        ]
    },
    {
        Name: "Iron Fang",
        StartingCareerOnly: true,
        StartingAbilities: [{ Name: 'Fast Rearm', Type: 'Specific', Property: 'Blasting Pike' }, { Name: 'Specialization', Type: 'Specific', Property: 'Blasting Pike' }],
        StartingConnections: [{ Name: 'Khadoran military', Type: 'Specific' }],
        StartingMilitarySkills: [{ Name: 'Great Weapon', Level: 1 }, { Name: 'Sheild', Level: 1 }],
        StartingOccupationalSkills: [{ Name: 'Command', Level: 1 }, { Name: 'Survival', Level: 1 }],
        StartingMSkillChoices: 0,
        StartingOSkillChoices: 0,
        StartingSpecial: 'A character starting with the Iron Fang career must choose between Aristocrat, Military Officer, Soldier, or Warcaster for his second career.',
        StartingAssets: ['blasting pike','spear head','10 blasting heads','Iron Fang full plate','shield'],
        StartingAssetChoices: 0,
        StartingGold: 25,
        ResSecondCareers: ['Aristocrat','Military Officer','Soldier','Warcaster'],
        Abilities: 
        [
            { Name: 'Defensive Line' },
            { Name: 'Fast Arm', Property: 'Blasting Pike' },
            { Name: 'Hyper Awareness' },
            { Name: 'Load Bearing' },
            { Name: 'Precision Strike' },
            { Name: 'Relentless Charge' },
            { Name: 'Rock Solid' },
            { Name: 'Specialization', Property: 'Blasting Pike' },
            { Name: 'Swift Rider' }
        ],
        Connections: [{ Name: 'Khadoran military', Type: 'Specific' }],
        MilitarySkills: [{ Name: 'Great Weapon', Level: 4 }, { Name: 'Lance', Level: 4 }, { Name: 'Shield', Level: 4 }, { Name: 'Unarmed Combat', Level: 3 }],
        OccupationalSkills: [{ Name: 'Command', Level: 4 }, { Name: 'General Skills', Level: 4 }, { Name: 'Survival', Level: 2 }]
    },
    {
        Name: "Knight",
        StartingCareerOnly: false,
        StartingAbilities: [{ Name: 'Cleave' }, { Name: 'Defender' }],
        StartingConnections: [{ Name: 'knightly order', Type: 'Generic' }],
        StartingMilitarySkills: [{ Name: 'Great Weapon', Level: 1 }, { Name: 'Hand Weapon', Level: 1 }, { Name: 'Sheild', Level: 1 }],
        StartingOccupationalSkills: 
        [
            { Name: 'Command', Level: 1 },
            { Name: 'Etiquette', Level: 1 },
            { Name: 'Lore', Type: 'Generic', Property: 'knightly order', Level: 1 }
        ],
        StartingMSkillChoices: 0,
        StartingOSkillChoices: 0,
        StartingAssetChoices: 0,
        StartingGold: 100,
        Abilities: 
        [
            { Name: 'Cavalry Charge' },
            { Name: 'Cleave' },
            { Name: 'Combat Rider' },
            { Name: 'Defender' },
            { Name: 'Defensive Line' },
            { Name: 'Expert Rider' },
            { Name: 'Iron Will' },
            { Name: 'Load Bearing' },
            { Name: 'Natural Leader' },
            { Name: 'Precision Strike' },
            { Name: 'Press the Attack' },
            { Name: 'Relentless Charge' },
            { Name: 'Ride-By Attack' },
            { Name: 'Shield Slam' }
        ],
        Connections: [{ Name: 'knightly order', Type: 'Generic' }],
        MilitarySkills: 
        [
            { Name: 'Great Weapon', Level: 4 },
            { Name: 'Hand Weapon', Level: 4 },
            { Name: 'Lance', Level: 4 },
            { Name: 'Shield', Level: 4 },
            { Name: 'Unarmed Combat', Level: 3 }
        ],
        OccupationalSkills: 
        [
            { Name: 'Command', Level: 4 },
            { Name: 'Etiquette', Level: 2 },
            { Name: 'General Skills', Level: 4 },
            { Name: 'Law', Level: 2 }
        ]
    },
    {
        Name: "Mage Hunter",
        StartingCareerOnly: false,
        StartingAbilities: [{ Name: 'Arcane Assassin' }, { Name: 'Iron Will' }],
        StartingConnections: [{ Name: 'Retribution of Scyrah', Type: 'Specific' }],
        StartingMilitarySkills: [{ Name: 'Hand Weapon', Level: 1 }],
        StartingOccupationalSkills: [{ Name: 'Climbing', Level: 1 }, { Name: 'Jumping', Level: 1 }, { Name: 'Sneak', Level: 1 }, { Name: 'Tracking', Level: 1 }],
        StartingMSkillChoices: 1,
        StartingMSkillChoicesOptions: [{ Name: 'Archery', Level: 1 }, { Name: 'Crossbow', Level: 1 }],
        StartingOSkillChoices: 0,
        StartingAssetChoices: 0,
        StartingGold: 75,
        Abilities: 
        [
            { Name: 'Arcane Assassin' },
            { Name: 'Camouflage' },
            { Name: 'Crackshot' },
            { Name: 'Crossbowman' },
            { Name: 'Fast Draw' },
            { Name: 'Fast Reload' },
            { Name: 'Iron Will' },
            { Name: 'Mage Killer' },
            { Name: 'Parry' },
            { Name: 'Quick Work' },
            { Name: 'Shadow Magic' },
            { Name: 'Traceless Path' }
        ],
        Connections: [{ Name: 'Retribution of Scyrah', Type: 'Specific' }],
        MilitarySkills: 
        [
            { Name: 'Archery', Level: 4 },
            { Name: 'Crossbow', Level: 4 },
            { Name: 'Hand Weapon', Level: 4 },
            { Name: 'Thrown Weapon', Level: 2 }
        ],
        OccupationalSkills: 
        [
            { Name: 'Deception', Level: 2 },
            { Name: 'Disguise', Level: 2 },
            { Name: 'General Skills', Level: 4 },
            { Name: 'Rope Use', Level: 3 },
            { Name: 'Sneak', Level: 4 },
            { Name: 'Survival', Level: 2 },
            { Name: 'Tracking', Level: 4 }
        ]
    },
    {
        Name: "Man-at-Arms",
        StartingCareerOnly: false,
        StartingAbilities: [{ Name: 'Defensive Line' }, { Name: 'Shield Guard' }],
        StartingMilitarySkills: [{ Name: 'Great Weapon', Level: 1 }, { Name: 'Shield', Level: 1 }],
        StartingOccupationalSkills: [{ Name: 'Command', Level: 1 }, { Name: 'Detection', Level: 1 }],
        StartingMSkillChoices: 1,
        StartingMSkillChoicesOptions: [{ Name: 'Hand Weapon', Level: 1 }, { Name: 'Pistol', Level: 1 }],
        StartingOSkillChoices: 0,
        StartingAssetChoices: 0,
        StartingGold: 100,
        Abilities: 
        [
            { Name: 'Bodyguard' },
            { Name: 'Cleave' },
            { Name: 'Defensive Line' },
            { Name: 'Girded' },
            { Name: 'Iron Will' },
            { Name: 'Load Bearing' },
            { Name: 'Retaliatory Strike' },
            { Name: 'Set Defense' },
            { Name: 'Shield Guard' },
            { Name: 'Shield Slam' },
            { Name: 'Specialization', Type: 'Specific', Property: 'Halberd' },
            { Name: 'Specialization', Type: 'Specific', Property: 'Spear' }
        ],
        Connections: [{ Name: 'employer', Type: 'Generic' }],
        MilitarySkills: 
        [
            { Name: 'Great Weapon', Level: 4 },
            { Name: 'Hand Weapon', Level: 3 },
            { Name: 'Pistol', Level: 3 },
            { Name: 'Shield', Level: 4 },
            { Name: 'Unarmed Combat', Level: 3 }
        ],
        OccupationalSkills: 
        [
            { Name: 'Command', Level: 3 },
            { Name: 'Craft', Type: 'Specific', Property: 'metalworking', Level: 2 },
            { Name: 'General Skills', Level: 4 }
        ]
    },
    {
        Name: "Military Officer",
        StartingCareerOnly: false,
        StartingAbilities: [{ Name: 'Battle Plan: Call to Action' }, { Name: 'Natural Leader' }, { Name: 'Team Leader' }],
        StartingMilitarySkills: [{ Name: 'Hand Weapon', Level: 1 }],
        StartingOccupationalSkills: [{ Name: 'Command', Level: 1 }, { Name: 'Medicine', Level: 1 }, { Name: 'Navigation', Level: 1 }],
        StartingMSkillChoices: 1,
        StartingMSkillChoicesOptions: [{ Name: 'Great Weapon', Level: 1 }, { Name: 'Pistol', Level: 1 }],
        StartingOSkillChoices: 0,
        StartingAssets: ['officer\'s uniform'],
        StartingAssetChoices: 0,
        StartingGold: 100,
        Abilities: 
        [
            { Name: '\'Jack Marshal' },
            { Name: 'Ace Commander' },
            { Name: 'Battle Commander' },
            { Name: 'Battle Plan: Call to Action' },
            { Name: 'Battle Plan: Coordinated Strike' },
            { Name: 'Battle Plan: Desperate Pace' },
            { Name: 'Battle Plan: Go to Ground' },
            { Name: 'Cavalry Charge' },
            { Name: 'Defender' },
            { Name: 'Drive: Assault' },
            { Name: 'Drive: Pronto' },
            { Name: 'Expert Rider' },
            { Name: 'Good Breeding' },
            { Name: 'Natural Leader' },
            { Name: 'Port of Call' },
            { Name: 'Ride-By Attack' },
            { Name: 'Saddle Shot' },
            { Name: 'Signal Language' },
            { Name: 'Team Leader' }
        ],
        Connections: [{ Name: 'mercenary company or kingdom\'s military', Type: 'Generic' }],
        MilitarySkills: 
        [
            { Name: 'Great Weapon', Level: 4 },
            { Name: 'Hand Weapon', Level: 4 },
            { Name: 'Pistol', Level: 4 }
        ],
        OccupationalSkills: 
        [
            { Name: 'Command', Level: 4 },
            { Name: 'Cryptography', Level: 4 },
            { Name: 'Etiquette', Level: 4 },
            { Name: 'General Skills', Level: 4 },
            { Name: 'Interrogation', Level: 4 },
            { Name: 'Law', Level: 4 },
            { Name: 'Medicine', Level: 4 },
            { Name: 'Navigation', Level: 4 },
            { Name: 'Oratory', Level: 4 }
        ]
    },
    {
        Name: "Pirate",
        StartingCareerOnly: false,
        StartingAbilities: [{ Name: 'Gang' }, { Name: 'Steady' }, { Name: 'Specialization', Type: 'Specific', Property: 'Cutlass' }],
        StartingMilitarySkills: [{ Name: 'Hand Weapon', Levels: 1 }],
        StartingOccupationalSkills:
        [
            { Name: 'Climbing', Level: 1 },
            { Name: 'Intimidation', Level: 1 },
            { Name: 'Sailing', Level: 1 },
            { Name: 'Swimming', Level: 1 }
        ],
        StartingMSkillChoices: 1,
        StartingMSkillChoicesOptions: [{ Name: 'Pistol', Level: 1 }, { Name: 'Thrown Weapon', Level: 1 }],
        StartingOSkillChoices: 0,
        StartingAssetChoices: 0,
        StartingGold: 75,
        Abilities: 
        [
            { Name: 'Binding' },
            { Name: 'Disease Resistance' },
            { Name: 'Gang' },
            { Name: 'Gunfighter' },
            { Name: 'Head-Butt' },
            { Name: 'Language', Type: 'Generic', Property: 'any' },
            { Name: 'Port of Call' },
            { Name: 'Quick Work' },
            { Name: 'Specialization', Type: 'Specific', Property: 'Cutlass' },
            { Name: 'Steady' },
            { Name: 'Sucker!' },
            { Name: 'Waylay' }
        ],
        Connections: [{ Name: 'pirate crew', Type: 'Generic' }],
        MilitarySkills:
        [
            { Name: 'Hand Weapon', Level: 3 },
            { Name: 'Light Artillery', Level: 2 },
            { Name: 'Pistol', Level: 3 },
            { Name: 'Rifle', Level: 2 },
            { Name: 'Thrown Weapon', Level: 3 },
            { Name: 'Unarmed Combat', Level: 3 }
        ],
        OccupationalSkills:
        [
            { Name: 'Command', Level: 2 },
            { Name: 'Deception', Level: 3 },
            { Name: 'General Skills', Level: 4 },
            { Name: 'Navigation', Level: 4 },
            { Name: 'Negotiation', Level: 2 },
            { Name: 'Rope Use', Level: 4 },
            { Name: 'Sailing', Level: 4 }
        ]
    },
    {
        Name: "Pistoleer",
        StartingCareerOnly: false,
        StartingAbilities: [{ Name: 'Fast Draw' }, { Name: 'Gunfighter' }, { Name: 'Return Fire' }],
        StartingMilitarySkills: [{ Name: 'Pistol', Level: 1 }],
        StartingOccupationalSkills: [{ Name: 'Detection', Level: 1 }, { Name: 'Intimidation', Level: 1 }, { Name: 'Sneak', Level: 1 }],
        StartingMSkillChoices: 0,
        StartingOSkillChoices: 0,
        StartingAssets: ['ammo bandolier','ammunition for 10 shots'],
        StartingAssetChoices: 1,
        StartingAssetChoiceOptions: ['hand cannon','pair of repeating pistols'],
        StartingGold: 50,
        Abilities:
        [
            { Name: 'Chain Attack: Pin Down' },
            { Name: 'Dodger' },
            { Name: 'Fast Draw' },
            { Name: 'Fast Reload' },
            { Name: 'Gunfighter' },
            { Name: 'Return Fire' },
            { Name: 'Swift Hunter' },
            { Name: 'Targeteer' },
            { Name: 'Two-Weapon Fighting' }
        ],
        MilitarySkills: [{ Name: 'Pistol', Level: 4 }],
        OccupationalSkills:
        [
            { Name: 'Craft (gunsmithing)', Type: 'Specific', Property: 'gunsmithing', Level: 2 },
            { Name: 'General Skills', Level: 4, },
            { Name: 'Sneak', Level: 3 }
        ]
    },
    {
        Name: "Priest of Menoth",
        StartingCareerOnly: false,
        StartingAbilities: [{ Name: 'Dispel' }],
        StartingConnections: [{ Name: 'Menite temple', Type: 'Generic' }],
        StartingOccupationalSkills: [{ Name: 'Lore', Type: 'Specific', Property: 'Menite faith', Level: 1 }, { Name: 'Oratory', Level: 1 }],
        StartingMSkillChoices: 1,
        StartingMSkillChoicesOptions: [{ Name: 'Great Weapon', Level: 1 }, { Name: 'Hand Weapon', Level: 1 }],
        StartingOSkillChoices: 0,
        StartingSpells: ['Guided Blade','Ignite','Immolation'],
        StartingAssetChoices: 0,
        StartingGold: 75,
        Abilities:
        [
            { Name: 'Choir' },
            { Name: 'Language', Type: 'Generic', Property: 'any' },
            { Name: 'Natural Leader' },
            { Name: 'Rallying Cry' },
            { Name: 'University Education' }
        ],
        Connections: [{ Name: 'character\'s church', Type: 'Generic' }],
        MilitarySkills: [{ Name: 'Great Weapon', Level: 3 }, { Name: 'Hand Weapon', Level: 3 }, { Name: 'Shield', Level: 2 }],
        OccupationalSkills:
        [
            { Name: 'Command', Level: 2 },
            { Name: 'Cryptography', Level: 2 },
            { Name: 'Etiquette', Level: 4 },
            { Name: 'General Skills', Level: 4 },
            { Name: 'Law', Level: 4 },
            { Name: 'Medicine', Level: 4 },
            { Name: 'Negotiation', Level: 4 },
            { Name: 'Oratory', Level: 4 },
            { Name: 'Research', Level: 4 }
        ],
        SpellList:
        [
            'Ashen Cloud',
            'Ashes to Ashes',
            'Banishing Ward',
            'Blazing Effigy',
            'Cleansing Fire',
            'Crevasse',
            'Crusaders Call',
            'Flames of Wrath',
            'Guided Blade',
            'Hex Blast',
            'Hymn of Battle',
            'Hymn of Passage',
            'Hymn of Shielding',
            'Ignite',
            'Immolation',
            'Influence',
            'Lamentation',
            'Protection from Fire',
            'Purification',
            'Righteous Flames',
            'True Path',
            'Vision',
            'Wall of Fire'
        ]
    },
    {
        Name: "Priest of Morrow",
        StartingCareerOnly: false,
        StartingAbilities: [{ Name: 'Empower' }],
        StartingConnections: [{ Name: 'Morrowan church', Type: 'Generic' }],
        StartingOccupationalSkills: [{ Name: 'Lore', Type: 'Specific', Property: 'Morrowan faith', Level: 1 }, { Name: 'Medicine', Level: 1 }],
        StartingMSkillChoices: 1,
        StartingMSkillChoicesOptions: [{ Name: 'Great Weapon', Level: 1 }, { Name: 'Hand Weapon', Level: 1 }],
        StartingOSkillChoices: 0,
        StartingSpells: ['Blade of Radiance','Solovin\'s Boon','True Sight'],
        StartingAssetChoices: 0,
        StartingGold: 75,
        Abilities:
        [
            { Name: 'Choir' },
            { Name: 'Language', Type: 'Generic', Property: 'any' },
            { Name: 'Natural Leader' },
            { Name: 'Rallying Cry' },
            { Name: 'University Education' }
        ],
        Connections: [{ Name: 'character\'s church', Type: 'Generic' }],
        MilitarySkills: [{ Name: 'Great Weapon', Level: 3 }, { Name: 'Hand Weapon', Level: 3 }, { Name: 'Shield', Level: 2 }],
        OccupationalSkills:
        [
            { Name: 'Command', Level: 2 },
            { Name: 'Cryptography', Level: 2 },
            { Name: 'Etiquette', Level: 4 },
            { Name: 'General Skills', Level: 4 },
            { Name: 'Law', Level: 4 },
            { Name: 'Medicine', Level: 4 },
            { Name: 'Negotiation', Level: 4 },
            { Name: 'Oratory', Level: 4 },
            { Name: 'Research', Level: 4 }
        ],
        SpellList:
        [
            'Aura of Protection',
            'Banishing Ward',
            'Blade of Radiance',
            'Blessing of Health',
            'Blessing of Morrow',
            'Blessings of War',
            'Crusader\'s Call',
            'Daylight',
            'Eyes of Truth',
            'Force of Faith',
            'Guided Blade',
            'Hand of Fate',
            'Heal',
            'Light in the Darkness',
            'Prayer of Guidance',
            'Sanguine Blessing',
            'Shield of Faith',
            'Solovin\'s Boon',
            'Star Fire',
            'Sunburst',
            'Triage',
            'True Path',
            'True Sight'
        ]
    },
    {
        Name: "Ranger",
        StartingCareerOnly: false,
        StartingAbilities: [{ Name: 'Camouflage' }, { Name: 'Pathfinder' }],
        StartingMilitarySkills: [{ Name: 'Hand Weapon', Level: 1 }],
        StartingOccupationalSkills:
        [
            { Name: 'Detection', Level: 1 },
            { Name: 'Sneak', Level: 1 },
            { Name: 'Survival', Level: 1 },
            { Name: 'Tracking', Level: 1 }
        ],
        StartingMSkillChoices: 1,
        StartingMSkillChoicesOptions: [{ Name: 'Archery', Level: 1 }, { Name: 'Crossbow', Level: 1 }, { Name: 'Pistol', Level: 1 }, { Name: 'Rifle', Level: 1 }],
        StartingOSkillChoices: 0,
        StartingAssetChoices: 0,
        StartingGold: 75,
        Abilities:
        [
            { Name: 'Battle Plan: Go to Ground' },
            { Name: 'Battle Plan: Reconnaissance' },
            { Name: 'Battle Plan: Shadow Camouflage' },
            { Name: 'Disease Resistance' },
            { Name: 'Fast Reload' },
            { Name: 'Light Cavalry' },
            { Name: 'Night Fighter' },
            { Name: 'Pathfinder' },
            { Name: 'Prowl' },
            { Name: 'Saddle Shot' },
            { Name: 'Signal Language' },
            { Name: 'Swift Hunter' },
            { Name: 'Swift Rider' },
            { Name: 'Traceless Path' }
        ],
        MilitarySkills:
        [
            { Name: 'Archery', Level: 4 },
            { Name: 'Crossbow', Level: 3 },
            { Name: 'Hand Weapon', Level: 2 },
            { Name: 'Pistol', Level: 2 },
            { Name: 'Rifle', Level: 4 },
            { Name: 'Thrown Weapon', Level: 4 },
            { Name: 'Unarmed Combat', Level: 3 }
        ],
        OccupationalSkills:
        [
            { Name: 'Command', Level: 3 },
            { Name: 'Craft', Type: 'Generic', Property: 'any', Level: 2 },
            { Name: 'Cryptography', Level: 1 },
            { Name: 'General Skills', Level: 4 },
            { Name: 'Medicine', Level: 3 },
            { Name: 'Navigation', Level: 4 },
            { Name: 'Rope Use', Level: 4 },
            { Name: 'Sneak', Level: 4 },
            { Name: 'Survival', Level: 4 },
            { Name: 'Tracking', Level: 4 }
        ]
    },
    {
        Name: "Rifleman",
        StartingCareerOnly: false,
        StartingAbilities: [{ Name: 'Crackshot' }, { Name: 'Dual Shot' }, { Name: 'Marksman' }],
        StartingMilitarySkills: [{ Name: 'Rifle', Level: 1 }],
        StartingOccupationalSkills: [{ Name: 'Climbing', Level: 1 }, { Name: 'Detection', Level: 1 }, { Name: 'Survival', Level: 1 }],
        StartingMSkillChoices: 0,
        StartingOSkillChoices: 0,
        StartingAssets: ['ammo bandolier','powder','ammunition for 10 shots'],
        StartingAssetChoices: 1,
        StartingAssetChoiceOptions: ['heavy rifle','repeating long rifle'],
        StartingGold: 50,
        Abilities:
        [
            { Name: 'Crackshot' },
            { Name: 'Dual Shot' },
            { Name: 'Fast Reload' },
            { Name: 'Marksman' },
            { Name: 'Night Fighter' },
            { Name: 'Return Fire' },
            { Name: 'Saddle Shot' },
            { Name: 'Sniper' },
            { Name: 'Swift Hunter' },
            { Name: 'Targeteer' }
        ],
        MilitarySkills: [{ Name: 'Rifle', Level: 4 }],
        OccupationalSkills:
        [
            { Name: 'Craft', Type: 'Specific', Property: 'gunsmithing', Level: 4 },
            { Name: 'General Skills', Level: 4 },
            { Name: 'Survival', Level: 3 }
        ]
    },
    {
        Name: "Soldier",
        StartingCareerOnly: false,
        StartingAbilities: [{ Name: 'Find Cover' }, { Name: 'Sentry' }],
        StartingOccupationalSkills: [{ Name: 'Detection', Level: 1 }, { Name: 'Driving', Level: 1 }, { Name: 'Medicine', Level: 1 }, { Name: 'Survival', Level: 1 }],
        StartingMSkillChoices: 2,
        StartingMSkillChoicesOptions: 
        [
            { Name: 'Hand Weapon', Level: 1 },
            { Name: 'Pistol', Level: 1 },
            { Name: 'Crossbow', Level: 1 },
            { Name: 'Great Weapon', Level: 1 },
            { Name: 'Rifle', Level: 1 },
            { Name: 'Thrown Weapon', Level: 1 }
        ],
        StartingOSkillChoices: 0,
        StartingAssetChoices: 0,
        StartingGold: 100,
        Abilities: [
            { Name: '\'Jack Marshal' },
            { Name: 'Cautious Advance' },
            { Name: 'Cavalry Charge' },
            { Name: 'Disease Resistance' },
            { Name: 'Fast Reload' },
            { Name: 'Find Cover' },
            { Name: 'Grenadier' },
            { Name: 'Hit the Deck!' },
            { Name: 'Language' },
            { Name: 'Ride-By Attack' },
            { Name: 'Roll With It' },
            { Name: 'Saddle Shot' },
            { Name: 'Sentry' }
        ],
        Connections: [{ Name: 'kingdom military or mercenary company', Type: 'Generic' }],
        MilitarySkills:
        [
            { Name: 'Crossbow', Level: 3 },
            { Name: 'Great Weapon', Level: 4 },
            { Name: 'Light Artillery', Level: 3 },
            { Name: 'Hand Weapon', Level: 3 },
            { Name: 'Pistol', Level: 3 },
            { Name: 'Rifle', Level: 4 },
            { Name: 'Shield', Level: 2 },
            { Name: 'Thrown Weapon', Level: 3 },
            { Name: 'Unarmed Combat', Level: 3 }
        ],
        OccupationalSkills:
        [
            { Name: 'Command', Level: 3 },
            { Name: 'General Skills', Level: 4 },
            { Name: 'Medicine', Level: 3 },
            { Name: 'Navigation', Level: 2 },
            { Name: 'Sneak', Level: 2 },
            { Name: 'Survival', Level: 3 }
        ]
    },
    {
        Name: "Sorcerer (Fire)",
        StartingCareerOnly: true,
        StartingAbilities: [{ Name: 'Immunity: Fire' }],
        StartingOccupationalSkills: [{ Name: 'Detection', Level: 1 }, { Name: 'Survival', Level: 1 }],
        StartingMSkillChoices: 1,
        StartingMSkillChoicesOptions: [{ Name: 'Archery', Level: 1 }, { Name: 'Crossbow', Level: 1 }, { Name: 'Hand Weapon', Level: 1 }],
        StartingOSkillChoices: 0,
        StartingSpells: ['Fire Starter','Howling Flames','Wall of Fire'],
        StartingAssetChoices: 0,
        StartingGold: 75,
        Abilities:
        [
            { Name: 'Camouflage' },
            { Name: 'Dodger' },
            { Name: 'Elemental Mastery' },
            { Name: 'Immunity: Fire' },
            { Name: 'Traceless Path' }
        ],
        MilitarySkills:
        [
            { Name: 'Archery', Level: 3 },
            { Name: 'Crossbow', Level: 3 },
            { Name: 'Hand Weapon', Level: 3 },
            { Name: 'Thrown Weapon', Level: 2 },
            { Name: 'Unarmed Combat', Level: 2 }
        ],
        OccupationalSkills:
        [
            { Name: 'General Skills', Level: 4 },
            { Name: 'Sneak', Level: 3 },
            { Name: 'Survival', Level: 3 }
        ],
        SpellList:
        [
            'Ashen Cloud',
            'Ashes to Ashes',
            'Barrier of Flames',
            'Blazing Effigy',
            'Cleansing Fire',
            'Extinguisher',
            'Fire Starter',
            'Flames of Wrath',
            'Flare',
            'Fuel the Flames',
            'Howling Flames',
            'Ignite',
            'Immolation',
            'Inferno',
            'Protection from Fire',
            'Sea of Fire',
            'Wall of Fire'
        ]
    },
    {
        Name: "Sorcerer (Ice)",
        StartingCareerOnly: true,
        StartingAbilities: [{ Name: 'Immunity: Cold' }],
        StartingOccupationalSkills: [{ Name: 'Detection', Level: 1 }, { Name: 'Survival', Level: 1 }],
        StartingMSkillChoices: 1,
        StartingMSkillChoicesOptions: [{ Name: 'Archery', Level: 1 }, { Name: 'Crossbow', Level: 1 }, { Name: 'Hand Weapon', Level: 1 }],
        StartingOSkillChoices: 0,
        StartingSpells: ['Blizzard','Chiller','Ice Bolt'],
        StartingAssetChoices: 0,
        StartingGold: 75,
        Abilities:
        [
            { Name: 'Camouflage' },
            { Name: 'Dodger' },
            { Name: 'Elemental Mastery' },
            { Name: 'Immunity: Cold' },
            { Name: 'Traceless Path' }
        ],
        MilitarySkills:
        [
            { Name: 'Archery', Level: 3 },
            { Name: 'Crossbow', Level: 3 },
            { Name: 'Hand Weapon', Level: 3 },
            { Name: 'Thrown Weapon', Level: 2 },
            { Name: 'Unarmed Combat', Level: 2 }
        ],
        OccupationalSkills:
        [
            { Name: 'General Skills', Level: 4 },
            { Name: 'Sneak', Level: 3 },
            { Name: 'Survival', Level: 3 }
        ],
        SpellList:
        [
            'Blizzard',
            'Brittle Frost',
            'Chiller',
            'Deep Freeze',
            'Freezing Grip',
            'Freezing Mist',
            'Frostbite',
            'Frozen Ground',
            'Hoarfrost',
            'Ice Shield',
            'Ice Bolt',
            'Icy Grip',
            'Protection from Cold',
            'Shatter Storm',
            'Staying Winter\'s Hand',
            'White Out',
            'Winter Storm'
        ]
    },
    {
        Name: "Sorcerer (Stone)",
        StartingCareerOnly: true,
        StartingOccupationalSkills: [{ Name: 'Detection', Level: 1 }, { Name: 'Survival', Level: 1 }],
        StartingMSkillChoices: 1,
        StartingMSkillChoicesOptions: [{ Name: 'Archery', Level: 1 }, { Name: 'Crossbow', Level: 1 }, { Name: 'Hand Weapon', Level: 1 }],
        StartingOSkillChoices: 0,
        StartingSpells: ['Battering Ram','Solid Ground','Stone Stance'],
        StartingSpecial: 'Stone sorcerers begin with +1 PHY and +1 to their racial maximum PHY at each level.',
        StartingAssetChoices: 0,
        StartingGold: 75,
        StatIncreases: [['PHY',1]],
        StatMaxIncreases: { Hero: [['PHY',1]], Vet: [['PHY',1]], Epic: [['PHY',1]] },
        Abilities:
        [
            { Name: 'Camouflage' },
            { Name: 'Dodger' },
            { Name: 'Elemental Mastery' },
            { Name: 'Traceless Path' }
        ],
        MilitarySkills:
        [
            { Name: 'Archery', Level: 3 },
            { Name: 'Crossbow', Level: 3 },
            { Name: 'Hand Weapon', Level: 3 },
            { Name: 'Thrown Weapon', Level: 2 },
            { Name: 'Unarmed Combat', Level: 2 }
        ],
        OccupationalSkills:
        [
            { Name: 'General Skills', Level: 4 },
            { Name: 'Sneak', Level: 3 },
            { Name: 'Survival', Level: 3 }
        ],
        SpellList:
        [
            'Battering Ram',
            'Crevasse',
            'Earth\'s Cradle',
            'Earthquake',
            'Earthsplitter',
            'Entangle',
            'Fortify',
            'Foxhole',
            'Inhospitable Ground',
            'Obliteration',
            'Rift',
            'Rock Hammer',
            'Rock Wall',
            'Shock Wave',
            'Solid Ground',
            'Stone Stance',
            'Stone Strength'
        ]
    },
    {
        Name: "Sorcerer (Storm)",
        StartingCareerOnly: true,
        StartingOccupationalSkills: [{ Name: 'Detection', Level: 1 }, { Name: 'Survival', Level: 1 }],
        StartingMSkillChoices: 1,
        StartingMSkillChoicesOptions: [{ Name: 'Archery', Level: 1 }, { Name: 'Crossbow', Level: 1 }, { Name: 'Hand Weapon', Level: 1 }],
        StartingOSkillChoices: 0,
        StartingSpells: ['Razor Wind','Storm Tossed','Wind Blast'],
        StartingSpecial: 'Storm sorcerers begin with +1 SPD and +1 to their racial maximum SPD at each level.',
        StartingAssetChoices: 0,
        StartingGold: 75,
        StatIncreases: [['SPD',1]],
        StatMaxIncreases: { Hero: [['SPD',1]], Vet: [['SPD',1]], Epic: [['SPD',1]] },
        Abilities:
        [
            { Name: 'Camouflage' },
            { Name: 'Dodger' },
            { Name: 'Elemental Mastery' },
            { Name: 'Traceless Path' }
        ],
        MilitarySkills:
        [
            { Name: 'Archery', Level: 3 },
            { Name: 'Crossbow', Level: 3 },
            { Name: 'Hand Weapon', Level: 3 },
            { Name: 'Thrown Weapon', Level: 2 },
            { Name: 'Unarmed Combat', Level: 2 }
        ],
        OccupationalSkills:
        [
            { Name: 'General Skills', Level: 4 },
            { Name: 'Sneak', Level: 3 },
            { Name: 'Survival', Level: 3 }
        ],
        SpellList:
        [
            'Boundless Charge',
            'Celerity',
            'Chain Lightning',
            'Deceleration',
            'Fair Winds',
            'Fog of War',
            'Lightning Tendrils',
            'Raging Winds',
            'Razor Wind',
            'Storm Tossed',
            'Telekinesis',
            'Tempest',
            'Tornado',
            'Wind Blast',
            'Wind Strike',
            'Wings of Air',
            'Zephyr'
        ]
    },
    {
        Name: "Spy",
        StartingCareerOnly: false,
        StartingAbilities:
        [
            { Name: 'Battle Plan: Shadow' },
            { Name: 'Cover Identity', Type: 'Generic', Property: 'career' },
            { Name: 'Language', Type: 'Generic', Property: 'any' }
        ],
        StartingConnections: [{ Name: 'intelligence network', Type: 'Generic' }],
        StartingOccupationalSkills:
        [
            { Name: 'Command', Level: 1 },
            { Name: 'Deception', Level: 1 },
            { Name: 'Detection', Level: 1 },
            { Name: 'Disguise', Level: 1 },
            { Name: 'Sneak', Level: 1 }
        ],
        StartingMSkillChoices: 1,
        StartingMSkillChoicesOptions: [{ Name: 'Hand Weapon', Level: 1 }, { Name: 'Pistol', Level: 1 }, { Name: 'Thrown Weapon', Level: 1 }],
        StartingOSkillChoices: 0,
        StartingAssets: ['forged identity papers'],
        StartingAssetChoices: 0,
        StartingGold: 100,
        Abilities:
        [
            { Name: 'Battle Plan: Shadow' },
            { Name: 'Cover Identity', Type: 'Generic', Property: 'career' },
            { Name: 'Iron Will' },
            { Name: 'Language', Type: 'Generic', Property: 'any' },
            { Name: 'Poison Resistance' },
            { Name: 'Prowl' },
            { Name: 'Signal Language' },
            { Name: 'Truth Reader' },
            { Name: 'Waylay' }
        ],
        Connections: [{ Name: 'any', Type: 'Generic' }],
        MilitarySkills:
        [
            { Name: 'Hand Weapon', Level: 3 },
            { Name: 'Pistol', Level: 3 },
            { Name: 'Thrown Weapon', Level: 3 },
            { Name: 'Unarmed Combat', Level: 3 }
        ],
        OccupationalSkills:
        [
            { Name: 'Bribery', Level: 4 },
            { Name: 'Command', Level: 3 },
            { Name: 'Cryptography', Level: 4 },
            { Name: 'Deception', Level: 4 },
            { Name: 'Disguise', Level: 4 },
            { Name: 'Escape Artist', Level: 4 },
            { Name: 'Etiquette', Level: 4 },
            { Name: 'Forgery', Level: 4 },
            { Name: 'General Skills', Level: 4 },
            { Name: 'Interrogation', Level: 4 },
            { Name: 'Law', Level: 4 },
            { Name: 'Lock Picking', Level: 2 },
            { Name: 'Negotiation', Level: 4 },
            { Name: 'Seduction', Level: 4 },
            { Name: 'Sneak', Level: 4 },
            { Name: 'Streetwise', Level: 4 }
        ]
    },
    {
        Name: "Stormblade",
        StartingCareerOnly: true,
        StartingAbilities: [{ Name: 'Blaster' }, { Name: 'Specialization', Type: 'Specific', Property: 'Storm Glaive' }],
        StartingConnections: [{ Name: 'Cygnaran military', Type: 'Specific' }],
        StartingMilitarySkills: [{ Name: 'Great Weapon', Level: 1 }],
        StartingOccupationalSkills: [{ Name: 'Command', Level: 1 }, { Name: 'Detection', Level: 1 }, { Name: 'Etiquette', Level: 1 }],
        StartingMSkillChoices: 0,
        StartingOSkillChoices: 0,
        StartingSpecial: 'A character starting with the Stormblade career must choose between Aristocrat, Knight, Man-at-Arms, Military Officer, Soldier, or Warcaster for his second career.',
        StartingAssets: ['Storm Glaive','Storm Knight Armor'],
        StartingAssetChoices: 0,
        ResSecondCareers: ['Aristocrat','Knight','Man-at-Arms','Military Officer','Soldier','Warcaster'],
        Abilities:
        [
            { Name: '\'Jack Marshal' },
            { Name: 'Blaster' },
            { Name: 'Gunfighter' },
            { Name: 'Load Bearing' },
            { Name: 'Quick Work' },
            { Name: 'Relentless Charge' },
            { Name: 'Specialization', Type: 'Specific', Property: 'Storm Glaive' }
        ],
        Connections: [{ Name: 'Cygnaran military', Type: 'Specific' }],
        MilitarySkills: [{ Name: 'Great Weapon', Level: 4 }],
        OccupationalSkills:
        [
            { Name: 'Command', Level: 4 },
            { Name: 'Etiquette', Level: 2 },
            { Name: 'General Skills', Level: 4 },
            { Name: 'Medicine', Level: 2 }
        ]
    },
    {
        Name: "Thief",
        StartingCareerOnly: false,
        StartingAbilities: [{ Name: 'Conniver' }, { Name: 'Dodger' }],
        StartingOccupationalSkills:
        [
            { Name: 'Bribery', Level: 1 },
            { Name: 'Deception', Level: 1 },
            { Name: 'Escape Artist', Level: 1 },
            { Name: 'Lock Picking', Level: 2 },
            { Name: 'Pickpocket', Level: 2 },
            { Name: 'Sneak', Level: 1 },
            { Name: 'Streetwise', Level: 1 }
        ],
        StartingMSkillChoices: 1,
        StartingMSkillChoicesOptions: [{ Name: 'Hand Weapon', Level: 1 }, { Name: 'Thrown Weapon', Level: 1 }],
        StartingOSkillChoices: 0,
        StartingAssets: ['thief\'s tools'],
        StartingAssetChoices: 0,
        StartingGold: 75,
        Abilities:
        [
            { Name: 'Appraise' },
            { Name: 'Camouflage' },
            { Name: 'Card Sharp' },
            { Name: 'Conniver' },
            { Name: 'Dodger' },
            { Name: 'Fleet Foot' },
            { Name: 'Get Away' },
            { Name: 'Language', Type: 'Specific', Property: 'Five Cant' },
            { Name: 'Parry' },
            { Name: 'Prowl' },
            { Name: 'Traceless Path' }
        ],
        Connections: [{ Name: 'criminal', Type: 'Generic' }],
        MilitarySkills:
        [
            { Name: 'Hand Weapon', Level: 3 },
            { Name: 'Pistol', Level: 2 },
            { Name: 'Thrown Weapon', Level: 3 },
            { Name: 'Unarmed Combat', Level: 2 }
        ],
        OccupationalSkills:
        [
            { Name: 'Bribery', Level: 4 },
            { Name: 'Craft', Type: 'Generic', Property: 'any', Level: 2 },
            { Name: 'Deception', Level: 4 },
            { Name: 'Disguise', Level: 4 },
            { Name: 'Escape Artist', Level: 4 },
            { Name: 'Etiquette', Level: 1 },
            { Name: 'Forgery', Level: 4 },
            { Name: 'General Skills', Level: 4 },
            { Name: 'Law', Level: 2 },
            { Name: 'Lock Picking', Level: 4 },
            { Name: 'Negotiation', Level: 4 },
            { Name: 'Pickpocket', Level: 4 },
            { Name: 'Sneak', Level: 4 },
            { Name: 'Streetwise', Level: 4 }
        ]
    },
    {
        Name: "Trencher",
        StartingCareerOnly: true,
        StartingAbilities: [{ Name: 'Bayonet Charge' }, { Name: 'Dig In' }],
        StartingConnections: [{ Name: 'Cygnaran military', Type: 'Specific' }],
        StartingMilitarySkills: [{ Name: 'Great Weapon', Level: 1 }, { Name: 'Rifle', Level: 1 }, { Name: 'Thrown Weapon', Level: 1 }],
        StartingOccupationalSkills: [{ Name: 'Command', Level: 1 }, { Name: 'Detection', Level: 1 }],
        StartingMSkillChoices: 0,
        StartingOSkillChoices: 0,
        StartingSpecial: 'A character starting with the Trencher career must choose between Military Officer, Ranger, Rifleman, Soldier, or Warcaster for his second career.',
        StartingAssets: ['ammo bandolier','bayonet','entrenching spade','military rifle','3 smoke grenades','Trencher medium infantry armor'],
        StartingAssetChoices: 0,
        StartingGold: 25,
        ResSecondCareers: ['Military Officer','Ranger','Rifleman','Soldier','Warcaster'],
        Abilities:
        [
            { Name: '\'Jack Marshal' },
            { Name: 'Anatomical Precision' },
            { Name: 'Bayonet Charge' },
            { Name: 'Bomber' },
            { Name: 'Dig In' },
            { Name: 'Fire in the Hole!' },
            { Name: 'Grenadier' },
            { Name: 'Hit the Deck!' },
            { Name: 'Relentless Charge' },
            { Name: 'Specialization', Type: 'Specific', Property: 'Bayonet' }
        ],
        Connections: [{ Name: 'Cygnaran military', Type: 'Specific' }],
        MilitarySkills:
        [
            { Name: 'Great Weapon', Level: 3 },
            { Name: 'Light Artillery', Level: 4 },
            { Name: 'Hand Weapon', Level: 3 },
            { Name: 'Pistol', Level: 3 },
            { Name: 'Rifle', Level: 4 },
            { Name: 'Thrown Weapon', Level: 4 },
            { Name: 'Unarmed Combat', Level: 3 }
        ],
        OccupationalSkills:
        [
            { Name: 'Command', Level: 3 },
            { Name: 'General Skills', Level: 4 },
            { Name: 'Interrogation', Level: 3 },
            { Name: 'Medicine', Level: 3 },
            { Name: 'Sneak', Level: 3 },
            { Name: 'Survival', Level: 3 }
        ]
    },
    {
        Name: "Warcaster",
        StartingCareerOnly: true,
        StartingAbilities: [{ Name: 'Bond', Type: 'Generic', Property: 'bond slot' }],
        StartingMilitarySkills: [{ Name: 'Hand Weapon', Level: 1 }, { Name: 'Pistol', Level: 1 }],
        StartingOccupationalSkills: [{ Name: 'Command', Level: 1 }, { Name: 'Detection', Level: 1 }],
        StartingMSkillChoices: 0,
        StartingOSkillChoices: 0,
        StartingSpells: ['Boundless Charge','Convection'],
        StartingSpecial: 'Change the character\'s arcane tradition to focuser if he has another arcane career. A warcaster can boost only with mechanikal weapons they are bonded to.',
        StartingAssetChoices: 1,
        StartingAssetChoiceOptions: [
            'warcaster armor (light)',
            'warcaster armor (medium)',
            'mechanika hand weapon',
            'mechanika hand cannon'
        ],
        Abilities:
        [
            { Name: 'Bond', Type: 'Generic', Property: 'bond slot' },
            { Name: 'Field Marshal: Magical Attack' },
            { Name: 'Field Marshal: Relentless Charge' },
            { Name: 'Field Marshal: Shield Guard' },
            { Name: 'Natural Leader' }
        ],
        Connections: [{ Name: 'kingdom or mercenary company', Type: 'Generic' }],
        MilitarySkills:
        [
            { Name: 'Great Weapon', Level: 3 },
            { Name: 'Hand Weapon', Level: 3 },
            { Name: 'Pistol', Level: 3 },
            { Name: 'Unarmed Combat', Level: 2 }
        ],
        OccupationalSkills:
        [
            { Name: 'Command', Level: 4 },
            { Name: 'General Skills', Level: 4 }
        ],
        SpellList:
        [
            'Arcane Bolt',
            'Arcane Strike',
            'Aura of Protection',
            'Awareness',
            'Batten Down the Hatches',
            'Battering Ram',
            'Boundless Charge',
            'Convection',
            'Eliminator',
            'Fail Safe',
            'Force Hammer',
            'Fortify',
            'Foxhole',
            'Grind',
            'Guided Fire',
            'Iron Aggression',
            'Jump Start',
            'Obliteration',
            'Redline',
            'Refuge',
            'Return Fire',
            'Rift',
            'Snipe',
            'Superiority',
            'Temper Metal',
            'Tide of Steel',
            'Transference'
        ]
    }
];
