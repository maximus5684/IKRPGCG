spellsArr = [
    {
        Name: 'Arcane Bolt',
        Description: 'Magical bolts of energy streak toward the target.'
    },
    {
        Name: 'Arcane Strike',
        Description: 'An arcane force blasts toward the target.'
    },
    {
        Name: 'Arcantrik Bolt',
        Description: 'A steamjack damaged by this attack becomes stationary for one round.'
    },
    {
        Name: 'Ashen Cloud',
        Description: 'Place a 3" AOE cloud effect anywhere completely in the spellcaster\'s control area. Characters without Immunity: Fire suffer -2 on attack rolls while within the AOE.'
    },
    {
        Name: 'Ashes to Ashes',
        Description: 'If target character is hit, he and d6 of the nearest enemies within 5" of the target suffer a POW 10 fire damage roll.'
    },
    {
        Name: 'Aura of Protection',
        Description: 'While in the spellcaster\'s control area, friendly characters gain +2 ARM.'
    },
    {
        Name: 'Awareness',
        Description: 'While in the spellcaster\'s control area, the front arcs of characters in his battlegroup are extended to 360. When determining LOS, those characters ignore cloud effects, forests and intervening characters. Awareness lasts for one round.'
    },
    {
        Name: 'Banishing Ward',
        Description: 'Enemy upkeep spells on the targeted friendly character expire. The affected character cannot be targeted by enemy spells or animi.'
    },
    {
        Name: 'Barrier of Flames',
        Description: 'Friendly characters in the spellcaster\'s control area gain +1 DEF. When a friendly character is hit by a melee attack while in the spellcaster\'s control area, the attacker suffers the Fire continuous effect. Barrier of Flames lasts for one round.'
    },
    {
        Name: 'Battering Ram',
        Description: 'When a character is hit by Battering Ram, he can be pushed 3" directly away from the spell\'s point of origin.'
    },
    {
        Name: 'Batten Down the Hatches',
        Description: 'While in the spellcaster\'s control area, characters in his battlegroup cannot be knocked down and gain +3 ARM but suffer -2 DEF. Batten Down the Hatches lasts for one round.'
    },
    {
        Name: 'Black Out',
        Description: 'Mechanika devices in the possession of enemy characters in the spellcaster\'s control area immediately deactivate. If an enemy enters the spellcaster\'s control area, mechanika devices in his possession immediately deactivate. While in teh spellcaster\'s control area, enemy characters cannot activate mechanika devices. Black Out has no effect on steamjacks or mechanika armor. Black Out lasts for one round.'
    },
    {
        Name: 'Blade of Radiance',
        Description: 'Infernal and Undead characters hit by this spell suffer an additional die of damage.'
    },
    {
        Name: 'Blazing Effigy',
        Description: 'Enemies within 2" of the targeted friendly character suffer a POW 14 fire damage roll.'
    },
    {
        Name: 'Blessing of Health',
        Description: 'Target character gains +3 on PHY rolls to resist poison, disease, and infection. Additionally, if the affected character is currently suffering from the effects of a poison, he immediately makes a PHY roll against the toxin rating of the poison. If the roll succeeds, the effects of the poison immediately expire.'
    },
    {
        Name: 'Blessing of Morrow',
        Description: 'While in the spellcaster\'s control area, friendly living characters do not suffer the effects of lost aspects.'
    },
    {
        Name: 'Blessings of War',
        Description: 'Target character\'s weapons gain Blessed. (When making an attack with a weapon with Blessed, ignore spell effects that add to the defending character\'s ARM or DEF).'
    },
    {
        Name: 'Blizzard',
        Description: 'Center a 3" AOE cloud effect on target character. The AOE remains centered on the character. If the target character is destroyed, remove the AOE from play. Blizzard lasts for one round.'
    },
    {
        Name: 'Brittle Frost',
        Description: 'The next time target enemy suffers damage, halve its base ARM when calculating damage from the damage roll. After applying this damage, Brittle Frost expires.'
    },
    {
        Name: 'Boundless Charge',
        Description: 'During his turn, target character can charge without spending focus or being forced and gains +2" movement and Pathfinder when it charges. Boundless Charge lasts for one round.'
    },
    {
        Name: 'Broadside',
        Description: 'The spellcaster and steamjacks under the spellcaster\'s control currently in his control area can immediately make one normal ranged attack. Broadside can be cast only once per turn.'
    },
    {
        Name: 'Celerity',
        Description: 'Target character gains one additional quick action during each of his turns.'
    },
    {
        Name: 'Chain Lightning',
        Description: 'A character hit by Chain Lightning suffers a POW 10 electrical damage roll, and lightning arcs from that character to d6 additional characters. The lightning arcs to the nearest character it has not already arced to within 4" of the last model it arced to, ignoring the spellcaster. Each character the lightning arcs to suffers a POW 10 electrical damage roll.'
    },
    {
        Name: 'Chiller',
        Description: 'While within 2" of the targeted friendly character, enemy characters suffer -2 DEF unless they have Immunity: Cold.'
    },
    {
        Name: 'Cleansing Fire',
        Description: 'Cleansing Fire causes fire damage. On a critical hit, characters hit suffer teh fire continuous effect.'
    },
    {
        Name: 'Convection',
        Description: 'When Convection destroys a living character, you can allocate 1 focus point to a steamjack in the spellcaster\'s battlegroup that is in his control area.'
    },
    {
        Name: 'Crevasse',
        Description: 'If Crevasse incapacitates its original target, you can make a SP 6 attack using the incapacitated character as the attack\'s point of origin. Characters hit suffer a POW 12 magic damage roll.'
    },
    {
        Name: 'Crusader\'s Call',
        Description: 'Friendly characters beginning a charge while in the spellcaster\'s control area gain +2 movement. Crusader\'s Call lasts for one round.'
    },
    {
        Name: 'Daylight',
        Description: 'While in the spellcaster\'s control area, Infernal and Undead characters suffer -3 DEF and ARM. Additionally, the area around the spellcaster glows with enouhg light for anyone in his control area to see in darkness. Daylight lasts for one round.'
    },
    {
        Name: 'Deceleration',
        Description: 'While in the spellcaster\'s control area, friendly characters gain +2 DEF and ARM against ranged attacks. Deceleration lasts for one round.'
    },
    {
        Name: 'Deep Freeze',
        Description: 'Characters within 2" of the spellcaster suffer a POW 12 cold damage roll. Characters damaged by this spell cannot run, charge, or make power attacks for one round.'
    },
    {
        Name: 'Earthquake',
        Description: 'Characters in the AOE are knocked down.'
    },
    {
        Name: 'Earth\'s Cradle',
        Description: 'The spellcaster gains cover, does not suffer blast damage, and does not block LOS. Earth\'s Cradle expires if this character moves, is placed, or is engaged.'
    },
    {
        Name: 'Earthsplitter',
        Description: 'Characters hit suffer a POW 14 fire damage roll. The AOE is a cloud effect that remains in play for one round. Characters entering or ending their turn in the AOE suffer an unboostable POW 14 fire damage roll.'
    },
    {
        Name: 'Electrical Blast',
        Description: 'Electrical Blast causes electrical damage. Steamjacks damaged by Electrical Blast suffer Disruption. (A steamjack suffering Disruption loses its focus points and cannot be allocated focus or channel spells for one round.)'
    },
    {
        Name: 'Electrify',
        Description: 'If target character is hit by a melee attack, after the attack is resolved the attacker is pushed d3" directly away from the affected character and suffers an unboostable POW 14 electrical damage roll, then Electrify expires.'
    },
    {
        Name: 'Eliminator',
        Description: 'Immediately after this attack is resolved, the spellcaster can advance up to 2" for each enemy incapacitated by the attack.'
    },
    {
        Name: 'Entangle',
        Description: 'Target character suffers -1 SPD and cannot run or charge for one round.'
    },
    {
        Name: 'Eyes of Truth',
        Description: 'This character\'s PER rolls are boosted. Additionally, the target number for Deception rolls against this character is increased by 3.'
    },
    {
        Name: 'Extinguisher',
        Description: 'Fire continuous effects in the spellcaster\'s control area immediately expire.'
    },
    {
        Name: 'Fail Safe',
        Description: 'Target steamjack gains +2 ARM and does not suffer the effects of crippled systems.'
    },
    {
        Name: 'Fair Winds',
        Description: 'The spellcaster gains +1 SPD this turn.'
    },
    {
        Name: 'Fire Group',
        Description: 'While in the spellcaster\'s control area, his weapons and the ranged weapons of steamjacks under his control gain +2 RNG. Fire Group lasts for one round.'
    },
    {
        Name: 'Fire Starter',
        Description: 'The spellcaster starts a small fire within the range of the spell and in line of sight. This spell can be used to target an enemy, in which case it requires an attack roll. If the enemy is hit, he suffers the Fire continuous effect.'
    },
    {
        Name: 'Flames of Wrath',
        Description: 'When target character incapacitates an enemy with a melee attack, enemy characters within 1" of the incapacitated character suffer the Fire continuous effect. Flames of Wrath lasts for one round.'
    },
    {
        Name: 'Flare',
        Description: 'Enemies in the spellcaster\'s control area suffering the Fire continuous effect immediatley suffer an additional unboostable POW 12 fire damage roll. This spell can be cast only once per turn.'
    },
    {
        Name: 'Fog of War',
        Description: 'Characters gain concealment while in the spellcaster\'s control area. '
    },
    {
        Name: 'Force Field',
        Description: 'The spellcaster does not suffer blast or collateral damage and cannot be knocked down. When an enemy AOE ranged attack deviates from a point in the spellcaster\'s control area, after the deviation distance is rolled the spellcaster\'s player chooses the deviation direction.'
    },
    {
        Name: 'Force Hammer',
        Description: 'If Force Hammer hits a non-incorporeal target, instead of suffering a normal damage roll, that target is slammed d6" directly away from the spell\'s point of origin regardless of its base size and suffers a POW 12 damage roll. Collateral damage from this slam is POW 12.'
    },
    {
        Name: 'Force of Faith',
        Description: 'Enemies currently in the spellcaster\'s control area are immediately pushed d6" directly away from the spellcaster in the order he chooses.'
    },
    {
        Name: 'Fortify',
        Description: 'Target steamjack under the spellcaster\'s control gains +2 ARM. The affected steamjack and any friendly character B2B with it cannot be knocked down, pushed, or slammed.'
    },
    {
        Name: 'Foxhole',
        Description: 'Place a 5" AOE anywhere completely in the spellcaster\'s control area. Characters completely in the AOE have cover and do not suffer blast damage. When drawing LOS to a character not completely within the AOE, ignore intervening characters completely within the AOE.'
    },
    {
        Name: 'Freezing Grip',
        Description: 'Target character hit becomes stationary for one round unless the target has Immunity: Cold.'
    },
    {
        Name: 'Freezing Mist',
        Description: 'While in the spellcaster\'s control area, enemy characters without Immunity: Cold suffer -2 SPD and DEF. Freezing Mist lasts for one round.'
    },
    {
        Name: 'Frozen Ground',
        Description: 'Enemies that move more than 2" and end their movement in the spellcaster\'s control area are knocked down at the end of their movement. Frozen Ground lasts for one round.'
    },
    {
        Name: 'Frostbite',
        Description: 'Frostbite causes cold damage.'
    },
    {
        Name: 'Fuel the Flames',
        Description: 'Fire continuous effects on enemies in the spellcaster\'s control area never expire.'
    },
    {
        Name: 'Full Throttle',
        Description: 'Steamjacks under the spellcaster\'s control beginning their turn in his control area can run, charge, or make slam or trample power attacks without spending focus or being driven that activation. The spellcaster and steamjacks under the spellcaster\'s control in his control area gain boosted melee attack rolls. Full Throttle lasts for one turn.'
    },
    {
        Name: 'Grind',
        Description: 'When a steamjack is hit by Grind, it suffers 1 damage to its first available movement box.'
    },
    {
        Name: 'Guided Blade',
        Description: 'Target friendly character gains +1 on his melee attack rolls and his melee weapons gain Magical Weapon. Guided Blade lasts for one round.'
    },
    {
        Name: 'Guided Fire',
        Description: 'The spellcaster and steamjacks under the spellcaster\'s control in his control area gain boosted ranged attack rolls. Guided fire lasts for one round.'
    },
    {
        Name: 'Hand of Fate',
        Description: 'Target character gains an additional die on attack and damage rolls. Discard the low die in each roll.'
    },
    {
        Name: 'Heal',
        Description: 'Target friendly incapacitated character B2B with the spellcaster is no longer incapacitated and regains 1 vitality point in each aspect. The character no longer suffers from the results of his most recent roll on the Injury Table. The target character becomes knocked down. Each time a character is targeted by this spell make a d6 roll on the Price of Healing table below, adding +1 to the roll for each time the character has been targeted by this spell after the first time.'
    },
    {
        Name: 'Heightened Reflexes',
        Description: 'Target character cannot be knocked down or made stationary.'
    },
    {
        Name: 'Hex Blast',
        Description: 'Upkeep spells and animi on the character directly hit by Hex Blast immediately expire.'
    },
    {
        Name: 'Hoarfrost',
        Description: 'Hoarfrost causes cold damage. On a critical hit, the characters hit become stationary for one round unless they have Immunity: Cold.'
    },
    {
        Name: 'Howling Flames',
        Description: 'Howling Flames causes fire damage. On a critical hit, the character hit suffers the Fire continuous effect.'
    },
    {
        Name: 'Hymn of Battle',
        Description: 'Target steamjack gains +2 on attack and damage rolls. Hymn of Battle lasts for one round.'
    },
    {
        Name: 'Hymn of Passage',
        Description: 'Target steamjack cannot be targeted by non-magical ranged attacks. Hymn of Passage lasts for one round.'
    },
    {
        Name: 'Hymn of Shielding',
        Description: 'While in this character\'s control area, friendly characters cannot be targeted by enemy spells. Hymn of Shielding lasts for one round.'
    },
    {
        Name: 'Ice Bolt',
        Description: 'Ice Bolt causes cold damage. On a critical hit, the character hit becomes stationary for one round unless he has Immunity: Cold.'
    },
    {
        Name: 'Ice Shield',
        Description: 'Target character gains +2 ARM. Ice Shield immediately expires if the affected character moves or is damaged.'
    },
    {
        Name: 'Icy Grip',
        Description: 'Target character without Immunity: Cold suffers a -2 DEF and cannot run or make power attacks.'
    },
    {
        Name: 'Ignite',
        Description: 'Target character gains +2 on melee attack damage rolls. The affected character gains Critical Fire on his normal melee attacks.'
    },
    {
        Name: 'Immolation',
        Description: 'Immolation causes fire damage. On a critical hit, the character hit suffers the Fire continuous effect.'
    },
    {
        Name: 'Inferno',
        Description: 'All characters hit suffer a POW 12 fire damage roll. The AOE remains in play for one round. Characters entering or ending their turns in teh AOE suffer an unboostable POW 12 fire damage roll.'
    },
    {
        Name: 'Influence',
        Description: 'The spellcaster makes a contested Willpower roll against target living enemy hit by this spell. If the spellcaster loses, nothing happens. If the spellcaster wins, his player takes control of the character hit. The character immediately makes one normal melee attack, then Influence expires.'
    },
    {
        Name: 'Inhospitable Ground',
        Description: 'While in the spellcaster\'s control area, other characters treat open terrain as rough terrain. Inhospitable Ground lasts for one round.'
    },
    {
        Name: 'Iron Aggression',
        Description: 'Target steamjack can run, charge, or make slam or trample power attacks without spending focus or being driven and gains boosted melee attack rolls.'
    },
    {
        Name: 'Jackhammer',
        Description: 'The targeted friendly steamjack can immediately make one melee attack.'
    },
    {
        Name: 'Jump Start',
        Description: 'The spellcaster and steamjacks under the spellcaster\'s control in his control area can immediately turn to face any direction. Affected steamjacks that are stationary or knocked down are no longer stationary and stand up.'
    },
    {
        Name: 'Lamentation',
        Description: 'While in this character\'s control area, enemies pay double the fatigue, focus, or fury points to cast or upkeep spells.'
    },
    {
        Name: 'Light in the Darkness',
        Description: 'The area around the spellcaster glows with enough light for anyone in his control area to see in darkness.'
    },
    {
        Name: 'Lightning Tendrils',
        Description: 'The targeted friendly character gains Immunity: Electricity and the character\'s melee weapons gain Reach and Electro Leap. (When a character is hit by a weapon with Electro Leap, you can have lightning arc to the nearest character within 4" of the character hit, ignoring the attacker. The character the lightning arcs to suffers an unboostable POW 10 electrical damage roll.'
    },
    {
        Name: 'Locomotion',
        Description: 'The spellcaster spends up to 3 focus points to cast Locomotion. Target steamjack immediately advances up to 1" for each focus point spent. A steamjack can be targeted by Locomotion only once per round.'
    },
    {
        Name: 'Mirage',
        Description: 'During the spellcaster Control Phase after upkeep has been paid, the targeted friendly character\'s controller can place him anywhere completely within 2" of his current location.'
    },
    {
        Name: 'Obliteration',
        Description: 'The force of this attack blasts apart the earth itself.'
    },
    {
        Name: 'Occultation',
        Description: 'Target character gains stealth and +3 on his Sneak rolls.'
    },
    {
        Name: 'Overmind',
        Description: 'The spellcaster immediately makes a contested Willpower roll against all living enemies in his control area. Roll one for the spellcaster. If the spellcaster beats an enemy\'s Willpower roll, he can cause that character to advance up to 3" and perform one non-spell, non-feat quick action. If the enemy beats or ties the spellcaster\'s roll, he is not affected. This spell can be cast only once per round.'
    },
    {
        Name: 'Polarity Shield',
        Description: 'Target character cannot be targeted by a charge made by a character in his front arc.'
    },
    {
        Name: 'Positive Charge',
        Description: 'Target steamjack gains +2 on melee attack and melee damage rolls. While within 3" of the affected steamjack, friendly characters gain +2 on melee attack and melee damage rolls. Positive Charge lasts for one round.'
    },
    {
        Name: 'Power Booster',
        Description: 'If the target steamjack the spellcaster controls has no focus points, it gains 1 focus point. If the steamjack is Disrupted, it is no longer Disrupted.'
    },
    {
        Name: 'Prayer For Guidance',
        Description: 'Target character gains two additional dice on his next skill roll. Discard the lowest two dice in the roll. Prayer for guidance can be cast only once per day.'
    },
    {
        Name: 'Protection from Cold',
        Description: 'Target character gains Immunity: Cold.'
    },
    {
        Name: 'Protection from Corrosion',
        Description: 'Target character gains Immunity: Corrosion.'
    },
    {
        Name: 'Protection From Electricity',
        Description: 'Target character gains Immunity: Electricity and cannot be disrupted.'
    },
    {
        Name: 'Protection From Fire',
        Description: 'Target character gains Immunity: Fire.'
    },
    {
        Name: 'Purification',
        Description: 'Continuous effects, animi, and upkeep spells in the spellcaster\'s control area immediately expire.'
    },
    {
        Name: 'Raging Winds',
        Description: 'While in the spellcaster\'s control area, enemies suffer -2 DEF. Enemies beginning their turn in the spellcaster\'s control area cannot run or charge. Raging winds lasts for one round.'
    },
    {
        Name: 'Razor Wind',
        Description: 'A blade of wind slices through the target.'
    },
    {
        Name: 'Redline',
        Description: 'The targeted friendly steamjack gains +2 STR and SPD and can run, charge, or make power attack slams or tramples without spending focus or being driven. When the steamjack ends its turn, it suffers d3 damage points.'
    },
    {
        Name: 'Refuge',
        Description: 'When target character directly hits another character with an attack during his turn, immediately after his turn ends the character affected by this spell can make a full advance. The character cannot be targeted by free strikes during this movement.'
    },
    {
        Name: 'Return Fire',
        Description: 'When target character is targeted by an enemy ranged attack, after the attack is resolved the affected character can make one melee or ranged attack, then Return Fire expires. Return Fire lasts for one round.'
    },
    {
        Name: 'Rift',
        Description: 'The AOE is rough terrain and remains in play for one round.'
    },
    {
        Name: 'Righteous Flames',
        Description: 'Target character gains Immunity: Fire. When a character without Immunity: Fire ends his turn within 2" of the affected character, the character without Immunity: Fire suffers the Fire continous effect. Righteous Flames lasts for one round.'
    },
    {
        Name: 'Rime',
        Description: 'Target character gains Immunity: Cold. When a character without Immunity: Cold ends his turn within 2" of the affected character, the character without Immunity: Cold becomes stationary until the end of his next turn. Rime lasts for one round.'
    },
    {
        Name: 'Rock Hammer',
        Description: 'On a critical hit, characters hit are knocked down.'
    },
    {
        Name: 'Rock Wall',
        Description: 'Place a wall template anywhere completely in the spellcaster\'s control area where it does not touch a character\'s base, an obstruction, or an obstacle. The wall is a linear obstacle that provides cover.'
    },
    {
        Name: 'Rune Shot: Accuracy',
        Description: 'The spellcaster\'s next run shot ranged attack roll this turn is boosted.'
    },
    {
        Name: 'Rune Shot: Black Penny',
        Description: 'The spellcaster\'s next run shot ranged attack roll this turn ignores the firing into melee penalty.'
    },
    {
        Name: 'Rune Shot: Brutal',
        Description: 'The spellcaster\'s next rune shot ranged attack gains a boosted ranged attack damage roll against the target directly hit.'
    },
    {
        Name: 'Rune Shot: Detonator',
        Description: 'If the spellcaster directly hits the target with its next rune shot ranged attack this turn, center a 4" AOE on the target. Characters other than the original target within the AOE suffer an unboostable damage roll with a POW equal to the POW of the ranged weapon.'
    },
    {
        Name: 'Rune Shot: Earth Shaker',
        Description: 'If this character directly hits a target with its next rune shot ranged attack this turn, the attack becomes AOE 5 and POW 0. Characters hit by the AOE suffer no damage but are knocked down.'
    },
    {
        Name: 'Rune Shot: Fire Beacon',
        Description: 'The spellcaster\'s next rune shot ranged attack this turn becomes AOE 5 and POW -. While a character is within the AOE, he loses Camouflage and stealth, and other characters can ignore cloud effects when determining LOS to him. The AOE lasts for one round.'
    },
    {
        Name: 'Rune Shot: Freeze Fire',
        Description: 'If the spellcaster\'s next rune shot ranged attack this turn hits, the target directly hit becomes stationary for one round.'
    },
    {
        Name: 'Rune Shot: Heart Stopper',
        Description: 'Damage exceeding the ARM of the character hit by the spellcaster\'s next rune shot ranged attack this turn is doubled. A character disabled by this attack cannot make a tough roll.'
    },
    {
        Name: 'Rune Shot: Molten Shot',
        Description: 'If the spellcaster\'s next rune shot ranged attack this turn hits, the target directly hit suffers the Fire continuous effect. '
    },
    {
        Name: 'Rune Shot: Momentum',
        Description: 'If the spellcaster hits with his next run shot ranged attack this turn, the character directly hit is slammed d6" directly away from the caster regardless of his base size and suffers a damage roll with a POW equal to the ranged weapon. Collateral damage from this slam is equal to the POW of the ranged weapon.'
    },
    {
        Name: 'Rune Shot: Phantom Seeker',
        Description: 'The spellcaster\'s next rune shot ranged attack th is turn ignores LOS when making ranged attacks. The attack also ignores concealment and cover.'
    },
    {
        Name: 'Rune Shot: Shadow Fire',
        Description: 'If the spellcaster hits a target with his next rune shot ranged attack this turn, friendly characters can ignore the target when determining LOS and making ranged or magic attacks for one round.'
    },
    {
        Name: 'Rune Shot: Silencer',
        Description: 'The spellcaster\'s next rune shot ranged attack is completely silent, and gives no sign of being fired. Neither the firing of the weapon, nor the impact of its ammunition causes a sound. Any immediate sound from a target that is hit, such as a scream, shout, or the fall of a body, is silenced.'
    },
    {
        Name: 'Rune Shot: Spell Cracker',
        Description: 'If the spellcaster directly hits a target with his next rune shot ranged attack this turn, upkeep spells and animi on the target hit immediately expire.'
    },
    {
        Name: 'Rune Shot: Spontaneous Combustion',
        Description: 'If the spellcaster destroys a living character with his next rune shot ranged attack, center a 3" AOE cloud effect on the destroyed character, then remove the destroyed character from the table. The AOE remains in play for one round.'
    },
    {
        Name: 'Rune Shot: Thunderbolt',
        Description: 'If the spellcaster directly hits a target with his next rune shot ranged attack this turn, the target is pushed d3" directly away from this character. On a critical hit, the target is knocked down after being pushed.'
    },
    {
        Name: 'Rune Shot: Trick Shot',
        Description: 'If the spellcaster directly hits a target with its rune shot next ranged attack this turn, choose a character within 4" of the target that was hit. After the attack is resolved, the spellcaster immediately makes a ranged attack roll against the chosen character. If the chosen character is hit, it suffers a magical damage roll with a POW equal to that of his ranged weapon but does not suffer any effects of other Rune Shot spells cast on the original attack. The point of origin for this damage is the character originally hit.'
    },
    {
        Name: 'Sanguine Blessing',
        Description: 'When a friendly character in the spellcaster\'s control area would suffer a damage roll, the spellcaster can suffer the damage roll instead. Decide whether the spellcaster suffers the damage before the roll is made.'
    },
    {
        Name: 'Sea of Fire',
        Description: 'Enemy characters without Immunity: Fire within 5" of the spellcaster suffer the Fire continuous effect.'
    },
    {
        Name: 'Shatter Storm',
        Description: 'When target character directly hits and destroys an enemy with a ranged or melee attack, center a 3" AOE on the destroyed character, then remove that character from the table. Characters in the AOE are hit and suffer an unboostable POW 8 blast damage roll.'
    },
    {
        Name: 'Shield of Faith',
        Description: 'Target character gains +2 ARM against magic attacks and attacks made by Infernal or Undead characters.'
    },
    {
        Name: 'Shock Wave',
        Description: 'Characters within 5" of the spellcaster suffer a POW 13 damage roll. Each enemy damaged by Shock Wave is pushed d6" directly away from the spellcaster in the order you choose.'
    },
    {
        Name: 'Short Out',
        Description: 'Mechanika devices in the possession of target character hit immediately deactivate. Short Out has no effect on steamjacks or mechanika armor.'
    },
    {
        Name: 'Snipe',
        Description: 'Target character\'s ranged weapons gain +4 RNG.'
    },
    {
        Name: 'Solid Ground',
        Description: 'While in the spellcaster\'s control area, friendly characters cannot be knocked down and do not suffer blast damage.'
    },
    {
        Name: 'Solovin\'s Boon',
        Description: 'The spellcaster can reroll failed medicine skill rolls. Each failed roll can be rerolled only once as a result of Solovin\'s Boon.'
    },
    {
        Name: 'Star Fire',
        Description: 'Enemies that move and end their movement closer to the spellcaster than they began suffer an unboostable POW 12 damage roll. Star Fire lasts for one round.'
    },
    {
        Name: 'Staying Winter\'s Hand',
        Description: 'While in the spellcaster\'s control area, friendly characters gain +2 ARM against cold damage. Additionally, while affected by this spell, characters never suffer the effects of exposure to cold weather and are kept warm.'
    },
    {
        Name: 'Stone Stance',
        Description: 'Target character cannot be knocked down, pushed, or slammed for one round.'
    },
    {
        Name: 'Stone Strength',
        Description: 'Target character gains +1 STR and ARM.'
    },
    {
        Name: 'Storm Tossed',
        Description: 'When an enemy character is hit by Storm Tossed, he is pushed 3" directly away from the spell\'s point of origin.'
    },
    {
        Name: 'Sunburst',
        Description: 'Blast damage from this spell only affects enemies.'
    },
    {
        Name: 'Superiority',
        Description: 'The targeted friendly steamjack gains +2 SPD, MAT, and DEF and cannot be knocked down.'
    },
    {
        Name: 'Telekinesis',
        Description: 'Place target character completely within 2" of its current location. When Telekinesis targets an enemy character, it is an offensive spell and requires a magic attack roll. A character can be affected by telekinesis only once per round.'
    },
    {
        Name: 'Temper Metal',
        Description: 'The targeted friendly steamjack gains +2 ARM and is immune to continuous effects.'
    },
    {
        Name: 'Tempest',
        Description: 'Characters hit by tempest are knocked down and suffer a POW 12 damage roll.'
    },
    {
        Name: 'Tide of Steel',
        Description: 'The spellcaster and steamjacks under his control currently in his control area can immediately advance up to 3".'
    },
    {
        Name: 'Tornado',
        Description: 'Instead of suffering a normal damage roll, a non-incorporeal character hit by Tornado is thrown d6" directly away from the spell\'s point of origin regardless of its base size and suffers a POW 13 damage roll. Collateral damage from this throw is POW 13.'
    },
    {
        Name: 'Transference',
        Description: 'The spellcaster can allow other friendly living characters in his control area to spend focus points on him to boost melee attack or melee damage rolls during their turns at a rate of 1 focus point per boost.'
    },
    {
        Name: 'Triage',
        Description: 'The spellcaster must be B2B with an incapacitated character who needs to be stabilized to cast this spell. When this spell is cast the incapacitated character is immediately stabilized.'
    },
    {
        Name: 'True Path',
        Description: 'Friendly characters beginning their turns in the spellcaster\'s control area gain +2" movement and Pathfinder during their turns. True Path lasts for one round.'
    },
    {
        Name: 'True Sight',
        Description: 'This character ignores concealment, Camouflage and stealth. The character can also see in complete darkness.'
    },
    {
        Name: 'Vision',
        Description: 'The next time target character is directly hit by an attack, he suffers no damage roll from the attack, then Vision expires.'
    },
    {
        Name: 'Voltaic Lock',
        Description: 'Target steamjack hit cannot advance and suffers -4 DEF. A steamjack beginning an advance within 3" of the steamjack hit cannot run or charge and can only advance directly toward it. Voltaic lock lasts for one round.'
    },
    {
        Name: 'Wall of Fire',
        Description: 'Place the wall template anywhere completely in the spellcaster\'s control area where it does not touch a character\'s base, an obstruction, or an obstacle. When a character enters or ends his turn in the wall area, he suffers an unboostable POW 12 fire damage roll and the Fire continuous effect. Characters within the wall template gain concealment.'
    },
    {
        Name: 'White Out',
        Description: 'While in the spellcaster\'s control area, enemies have their LOS reduced to 5".'
    },
    {
        Name: 'Wind Blast',
        Description: 'Place a 5" AOE anywhere completely in the spellcaster\'s control area. Cloud effects overlapping the AOE expire. Characters suffer -3 RAT while within the AOE. The AOE remains in play for one round.'
    },
    {
        Name: 'Wind Strike',
        Description: 'This spell does not inflict damage. An enemy hit by this spell can be pushed 1" directly away from the spellcaster. After the enemy is pushed, the spellcaster can advance up to 1" toward the pushed enemy.'
    },
    {
        Name: 'Wings of Air',
        Description: 'Place the spellcaster anywhere completely within 5" of his current location. Wings of Air can be cast only once per turn.'
    },
    {
        Name: 'Winter Storm',
        Description: 'Enemies that begin their turns in the spellcaster\'s control range lose Eyeless Sight, Flight, and Pathfinder during their turns. Winter Storm lasts for one round.'
    },
    {
        Name: 'Zephyr',
        Description: 'Target character can immediately advance up to 5". A character can be affected by Zephyr only once per round.'
    }
]
