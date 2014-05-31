archCoreArr = [
    {
        Name: 'Gifted',
        Benefits:
        [
            { 
                Name: 'Additional Study',
                Desc: 'The character delves further into the mysteries of the arcane and is rewarded with a spell from one of his career spell lists. This benefit can be taken multiple times, but a character still cannot exceed twice his INT in spells known.',
                HasProperty: true,
                PropertyType: 'Spell',
                Book: 'Core Rules',
                Page: 115
            },
            {
                Name: 'Combat Caster',
                Desc: 'When this character makes a magic attack roll, he gains an additional die. Discard the lowest die of each roll.',
                Book: 'Core Rules',
                Page: 115
            },
            {
                Name: 'Fast Caster',
                Desc: 'The character gains one extra quick action each activation that can be used only to cast a spell.',
                Book: 'Core Rules',
                Page: 115
            },
            {
                Name: 'Feat: Dominator',
                Desc: 'The character can spend 1 feat point during his turn to double his control area for one round.',
                Book: 'Core Rules',
                Page: 115
            },
            {
                Name: 'Feat: Powerful Caster',
                Desc: 'The character can spend 1 feat point when he casts a spell to increase the RNG (range) of the spell by twelve feet (2"). Spells with a range of CTRL (control area) or SP (spray attack) are not affected.',
                Book: 'Core Rules',
                Page: 115
            },
            {
                Name: 'Feat: Quick Cast',
                Desc: 'The character can spend 1 feat point to immediately cast one upkeep spell at the start of combat before the first round. When casting a spell as a result of this benefit, the character is not required to pay the COST of the spell.',
                Book: 'Core Rules',
                Page: 115
            },
            {
                Name: 'Feat: Strength of Will',
                Desc: 'After failing a fatigue roll, the character can spend 1 feat point to instead automatically succeed on the roll. This character can be taken only by characters with the Will Weaver tradition.',
                ReqArcaneTradition: 'Will Weaver',
                Book: 'Core Rules',
                Page: 115
            },
            {
                Name: 'Magic Sensitivity',
                Desc: 'The character can automatically sense when another character casts a spell within fifty feet for each point of his ARC stat. Such characters can tune out this detection as background noise but are aware of particularly powerful magic. Additionally, a character with the Focuser tradition can sense other Focusers within their detection range.',
                Book: 'Core Rules',
                Page: 115
            },
            {
                Name: 'Rune Reader',
                Desc: 'The character can identify any spell cast in his line of sight by reading the accompanying spell runes (see the "Runes and Formulae" sidebar, p. 228). He can also learn the type of magic cast (the spell list it came from) and the tradition of the character casting the spell.',
                Book: 'Core Rules',
                Page: 115
            },
            {
                Name: 'Warding Circle',
                Desc: 'The character can spend fifteen minutes to create a circle of warding runes around a small room or campsite. The names of the characters he intends to keep safe within the circle are incoprorated into the runes. When any other character enters the circle, all named characters are alerted. While in the circle, all non-named characters lose incorporeal, and non-named undead and infernal characters suffer -2 on attack rolls.',
                Book: 'Core Rules',
                Page: 115
            }
        ]
    },
    {
        Name: 'Intellectual',
        Benefits:
        [
            {
                Name: 'Battlefield Coordination',
                Desc: 'The character is a skilled battlefield commander. He is able to coordinate the movement and attacks of friendly forces to maximum effect. While in his command range, friendly chracters do not suffer the firing into melee penalty for ranged attacks and spells and do not have a chance to hit friendly characters when they miss with ranged or magic attacks while firing into melee.',
                Book: 'Core Rules',
                Page: 115
            },
            {
                Name: 'Feat: Flawless Timing',
                Desc: 'The character can spend 1 feat point to use this benefit during his turn. When he uses Flawless Timing, the character names an enemy. The next time that enemy directly hits him with an attack that encounter, the attack is instead considered to be a miss.',
                Book: 'Core Rules',
                Page: 115
            },
            {
                Name: 'Feat: Prescient',
                Desc: 'The character can spend 1 feat point to win initiative automatically and take the first turn that combat. If two or more characters use this ability, they make initiative rolls to determine which of them goes first.',
                Book: 'Core Rules',
                Page: 116
            },
            {
                Name: 'Feat: Perfect Plot',
                Desc: 'The character is a flawless planner and allows nothing to escape his attention. Assuming he is able to oversee all aspects of his plan, scout out the related sites, and do his research in great detail, he is sure to succeed. Of course this degree of planning takes time and care, but perfection is not without its cost. The character must spend 1 feat point to use this ability. A character following this character\'s plans gains an additional die on non-combat related rolls during the day in which the plan was enacted.',
                Book: 'Core Rules',
                Page: 116
            },
            {
                Name: 'Feat: Plan of Action',
                Desc: 'At the start of combat, the character can spend 1 feat point to use this benefit. During that combat, he and friendly characters who follow his plan gain +2 to their initiative rolls and +2 to their attack rolls during the first round of combat.',
                Book: 'Core Rules',
                Page: 116
            },
            {
                Name: 'Feat: Quick Thinking',
                Desc: 'The character\'s quick thinking enables him to act impossibly fast. Once per round, the character can spend 1 feat point to make one attack or quick action at the start of another character\'s turn.',
                Book: 'Core Rules',
                Page: 116
            },
            {
                Name: 'Feat: Unconventional Warfare',
                Desc: 'The character is quick thinking enough to assess any situation, see every potential angle and outcome, and use the environment itself as a weapon. He can use his attacks to off-balance foes and send them careening off ledges or into nearby vats of molten metal, cause them to stumble over terrain features, hit their weak spots to knock them to the ground, or otherwise maneuver them into a position of weakness and jeopardy. The character must spend 1 feat point to use this ability and explain to the Game Master how he is turning the environment against his enemy. The Game Master then determines the likely effect of the character\'s action or attack. Outcomes include a boosted damage roll (see p. 197), knockdown, push, slam, or fall from a height.',
                Book: 'Core Rules',
                Page: 116
            },
            {
                Name: 'Genius',
                Desc: 'The character posesses an incredible aptitude for intellectual pursuits. The character\'s INT rolls are boosted.',
                Book: 'Core Rules',
                Page: 116
            },
            {
                Name: 'Hyper Perception',
                Desc: 'The character\'s keen senses miss few details. The character\'s PER rolls are boosted.',
                Book: 'Core Rules',
                Page: 116
            },
            {
                Name: 'Photographic Memory',
                Desc: 'The character has a photographic memory and can recall every event in perfect detail. During play he can call upon his memory to ask the Game Master questions pertaining to anything he has seen or experienced.',
                Book: 'Core Rules',
                Page: 116
            }
        ]
    },
    {
        Name: 'Mighty',
        Benefits:
        [
            {
                Name: 'Beat Back',
                Desc: 'When this character hits a target with a melee attack, he can immediately push his target 1" directly away. After the target is pushed, this character can advance up to 1".',
                Book: 'Core Rules',
                Page: 116
            },
            {
                Name: 'Feat: Back Swing',
                Desc: 'Once per turn, this character can spend 1 feat point to gain one additional melee attack.',
                Book: 'Core Rules',
                Page: 116
            },
            {
                Name: 'Feat: Bounding Leap',
                Desc: 'The character is capable of preternatural feats of athleticism. Once during each of his turns in which the character does not run or charge, he can spend 1 feat point to pitch himself over the heads of his enemies into the heart of battle. When the character uses this benefit, place him anywhere within 5" of his current location.',
                Book: 'Core Rules',
                Page: 116
            },
            {
                Name: 'Feat: Counter Charage',
                Desc: 'When an enemy advances and ends its movement within thirty-six feet (6") of this character and in his line of sight, this character can immediately spend 1 feat point to charge the enemy. The character cannot make a counter charge while engaged.',
                Book: 'Core Rules',
                Page: 116
            },
            {
                Name: 'Feat: Invulnerable',
                Desc: 'The character can spend 1 feat point during his turn to gain +3 ARM for one round.',
                Book: 'Core Rules',
                Page: 116
            },
            {
                Name: 'Feat: Revitalize',
                Desc: 'The character can spend 1 feat point during his turn to regain a number of vitality points equal to his PHY stat immediately. If a character suffers damage during his turn, the damage must be resolved before a character can use this feat. An incapacitated character cannot use Revitalize.',
                Book: 'Core Rules',
                Page: 116
            },
            {
                Name: 'Feat: Shield Breaker',
                Desc: 'When this character hits a target that has a shield with a melee attack, the character can spend 1 feat point to use this benefit. When the character uses this benefit, after damage has been delt, the other character\'s shield is completely destroyed as a result of the attack.',
                Book: 'Core Rules',
                Page: 116
            },
            {
                Name: 'Feat: Vendetta',
                Desc: 'The character can spend 1 feat point during his turn to use this benefit. When this ability is used the character names one enemy. For the rest of the encounter, this character gains boosted attack rolls against that enemy. A character can use this benefit only once per encounter unless the original subject of his vendetta is destroyed, at which point the character can spend a feat point to use this benefit again.',
                Book: 'Core Rules',
                Page: 116
            },
            {
                Name: 'Feat: Righteous Anger',
                Desc: 'When one or more characters who are friendly to this character are damaged by an enemy attack while in this charaacter\'s command range, this character gains +2 STR and ARM for one round.',
                Book: 'Core Rules',
                Page: 116
            },
            {
                Name: 'Tough',
                Desc: 'The character is incredibly hardy. When this character is disabled, roll a d6. On a 5 or 6, the character heals 1 vitality point, is no longer disabled, and is knocked down.',
                Book: 'Core Rules',
                Page: 116
            }
        ]
    },
    {
        Name: 'Skilled',
        Benefits:
        [
            {
                Name: 'Ambidexterous',
                Desc: 'The character does not suffer the normal attack roll penalty with a second weapon while using the Two-Weapon fighting ability.',
                Book: 'Core Rules',
                Page: 117
            },
            {
                Name: 'Cagey',
                Desc: 'When this character becomes knocked down, he can immediately move up to twelve feet (2") and cannot be targeted by free strikes during his movement. This benefit has no effect while this character is mounted. While knocked down, this character is not automatically hit by melee attacks and his DEF is not reduced. The character can stand up during his turn without forfeiting his movement or action.',
                Book: 'Core Rules',
                Page: 117
            },
            {
                Name: 'Deft',
                Desc: 'The character has nimble fingers and steady hands. The character gains boosted AGL rolls.',
                Book: 'Core Rules',
                Page: 117
            },
            {
                Name: 'Feat: Defensive Strike',
                Desc: 'When an enemy advances into and ends its movement in this character\'s melee range, this character can spend 1 feat point to immediately make one melee attack targeting it.',
                Book: 'Core Rules',
                Page: 117
            },
            {
                Name: 'Feat: Disarm',
                Desc: 'After directly hitting an enemy with a non-spray, non-AOE (area of effect) ranged or melee attack, instead of making a damage roll, the character can spend 1 feat point to disarm his opponent. When this benefit is used, the enemy\'s weapon, or any object in his hand, flies from his grasp. He suffers no damage from the attack.',
                Book: 'Core Rules',
                Page: 117
            },
            {
                Name: 'Feat: Swashbuckler',
                Desc: 'Once during each of his turns, this character can spend 1 feat point to use Swashbuckler. The next time this character makes an attack with a hand weapon after using this benefit, his front arc extends to 360 degrees, and he can make one melee attack against each enemy in his line of sight in his melee range. Regardless of the number of characters hit, Swashbuckler can trigger the Sidestep benefit only once.',
                Book: 'Core Rules',
                Page: 117
            },
            {
                Name: 'Feat: Untouchable',
                Desc: 'The character can spend 1 feat point during his turn to gain +3 DEF for one round.',
                Book: 'Core Rules',
                Page: 117
            },
            {
                Name: 'Preternatural Awareness',
                Desc: 'The character\'s uncanny perception keeps him constantly aware of his surroundings. The character gains boosted Initiative rolls. Additionally, enemies never gain back strike bonuses against this character.',
                Book: 'Core Rules',
                Page: 117
            },
            {
                Name: 'Sidestep',
                Desc: 'When this character hits an enemy character with a melee weapon, he can advance up to 2" after the attack is resolved. This character cannot be targeted by free strikes during this movement.',
                Book: 'Core Rules',
                Page: 117
            },
            {
                Name: 'Virtuoso',
                Desc: 'Choose a military skill. When making a non-AOE attack with a weapon that uses that skill, this character gains an additional die on his attack and damage rolls. Discard the lowest die of each roll. This benefit can be taken more than once, each time specifying a different military skill.',
                HasProperty: true,
                PropertyType: 'Military Skill',
                Book: 'Core Rules',
                Page: 117
            }
        ]
    }
];
