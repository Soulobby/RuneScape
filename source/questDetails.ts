import { URLSearchParams } from "node:url";
import { request } from "undici";

interface RawQuestDetail {
	loggedIn: "true" | "false";
	quests: Quest[];
}

/**
 * Represents the difficulty of a quest.
 */
export enum QuestDifficulty {
	/**
	 * The novice difficulty.
	 */
	Novice,
	/**
	 * The intermediate difficulty.
	 */
	Intermediate,
	/**
	 * The experienced difficulty.
	 */
	Experienced,
	/**
	 * The master difficulty.
	 */
	Master,
	/**
	 * The grandmaster difficulty.
	 */
	Grandmaster,
	/**
	 * The special difficulty.
	 */
	Special = 250,
}

/**
 * Represents the status of a quest.
 */
export enum QuestStatus {
	/**
	 * The status of a quest not being started.
	 */
	NotStarted = "NOT_STARTED",
	/**
	 * The status of a quest being started.
	 */
	Started = "STARTED",
	/**
	 * The status of a quest being completed.
	 */
	Completed = "COMPLETED",
}

/**
 * Represents the title of a quest.
 */
export enum QuestTitle {
	AClockworkSyringe = "A Clockwork Syringe",
	AFairyTaleIGrowingPains = "A Fairy Tale I - Growing Pains",
	AFairyTaleIICureaQueen = "A Fairy Tale II - Cure a Queen",
	AFairyTaleIIIBattleatOrksRift = "A Fairy Tale III - Battle at Ork's Rift",
	Aftermath = "Aftermath (miniquest)",
	AGuildOfOurOwn = "A Guild of Our Own (miniquest)",
	AShadowoverAshdale = "A Shadow over Ashdale",
	ASoulsBane = "A Soul's Bane",
	ATailOfTwoCats = "A Tail of Two Cats",
	AVoidDance = "A Void Dance",
	AllFiredUp = "All Fired Up",
	AnimalMagnetism = "Animal Magnetism",
	AnotherSliceOfHAM = "Another Slice of H.A.M.",
	AsaFirstResort = "As a First Resort",
	AzzanadrasQuest = "Azzanadra's Quest",
	BackToMyRoots = "Back to my Roots",
	BackToTheFreezer = "Back to the Freezer",
	BarCrawl = "Bar Crawl (miniquest)",
	BattleOfTheMonolith = "Battle of the Monolith (miniquest)",
	BeneathCursedTides = "Beneath Cursed Tides",
	BenedictsWorldTour = "Benedict's World Tour (miniquest)",
	BetweenARock = "Between a Rock...",
	BigChompyBirdHunting = "Big Chompy Bird Hunting",
	Biohazard = "Biohazard",
	BirthrightOfTheDwarves = "Birthright of the Dwarves",
	BloodRunsDeep = "Blood Runs Deep",
	BoricsTaskI = "Boric's Task I (miniquest)",
	BoricsTaskII = "Boric's Task II (miniquest)",
	BoricsTaskIII = "Boric's Task III (miniquest)",
	BringingHomeTheBacon = "Bringing Home the Bacon",
	BrokenHome = "Broken Home",
	BuyersandCellars = "Buyers and Cellars",
	CabinFever = "Cabin Fever",
	CallOfTheAncestors = "Call of the Ancestors",
	CarnilleanRising = "Carnillean Rising",
	CatapultConstruction = "Catapult Construction",
	ChefsAssistant = "Chef's Assistant",
	ChildrenOfMah = "Children of Mah",
	CityOfSenntisten = "City of Senntisten",
	CivilWarI = "Civil War I (miniquest)",
	CivilWarII = "Civil War II (miniquest)",
	ClockTower = "Clock Tower",
	ColdWar = "Cold War",
	Contact = "Contact!",
	CooksAssistant = "Cook's Assistant",
	CreatureOfFenkenstrain = "Creature of Fenkenstrain",
	CrocodileTears = "Crocodile Tears",
	CurseOfTheBlackStone = "Curse of the Black Stone",
	DamageControl = "Damage Control (miniquest)",
	DaughterOfChaos = "Daughter of Chaos",
	DeadliestCatch = "Deadliest Catch",
	DealingwithScabaras = "Dealing with Scabaras",
	DeathPlateau = "Death Plateau",
	DeathToTheDorgeshuun = "Death to the Dorgeshuun",
	DefenderOfVarrock = "Defender of Varrock",
	DemonSlayer = "Demon Slayer",
	DesertSlayerDungeon = "Desert Slayer Dungeon (miniquest)",
	DesertTreasure = "Desert Treasure",
	DesperateMeasures = "Desperate Measures",
	DesperateTimes = "Desperate Times",
	DeviousMinds = "Devious Minds",
	DiamondInTheRough = "Diamond in the Rough",
	DimensionOfDisaster = "Dimension of Disaster",
	DimensionOfDisasterCoinOfTheRealm = "Dimension of Disaster: Coin of the Realm",
	DimensionOfDisasterCurseOfArrav = "Dimension of Disaster: Curse of Arrav",
	DimensionOfDisasterDefenderOfVarrock = "Dimension of Disaster: Defender of Varrock",
	DimensionOfDisasterDemonSlayer = "Dimension of Disaster: Demon Slayer",
	DimensionOfDisasterShieldOfArrav = "Dimension of Disaster: Shield of Arrav",
	DishonourAmongThieves = "Dishonour among Thieves",
	DoNoEvil = "Do No Evil",
	DoricsTaskI = "Doric's Task I (miniquest)",
	DoricsTaskII = "Doric's Task II (miniquest)",
	DoricsTaskIII = "Doric's Task III (miniquest)",
	DoricsTaskIV = "Doric's Task IV (miniquest)",
	DoricsTaskV = "Doric's Task V (miniquest)",
	DoricsTaskVI = "Doric's Task VI (miniquest)",
	DoricsTaskVII = "Doric's Task VII (miniquest)",
	DoricsTaskVIII = "Doric's Task VIII (miniquest)",
	DragonSlayer = "Dragon Slayer",
	DreamMentor = "Dream Mentor",
	DruidicRitual = "Druidic Ritual",
	DwarfCannon = "Dwarf Cannon",
	EadgarsRuse = "Eadgar's Ruse",
	EaglesPeak = "Eagles' Peak",
	ElementalWorkshopI = "Elemental Workshop I",
	ElementalWorkshopII = "Elemental Workshop II",
	ElementalWorkshopIII = "Elemental Workshop III",
	ElementalWorkshopIV = "Elemental Workshop IV",
	EnakhrasLament = "Enakhra's Lament",
	EnlightenedJourney = "Enlightened Journey",
	EnterTheAbyss = "Enter the Abyss (miniquest)",
	ErnestTheChicken = "Ernest the Chicken",
	EvilDavesBigDayOut = "Evil Dave's Big Day Out",
	Extinction = "Extinction",
	EyeForAnEye = "Eye for an Eye (miniquest)",
	EyeOfHetI = "Eye of Het I (miniquest)",
	EyeOfHetII = "Eye of Het II (miniquest)",
	FamilyCrest = "Family Crest",
	FateOfTheGods = "Fate of the Gods",
	FatherAndSon = "Father and Son",
	FightArena = "Fight Arena",
	FinalDestination = "Final Destination (miniquest)",
	Finale = "Finale",
	FishingContest = "Fishing Contest",
	FlagFall = "Flag Fall (miniquest)",
	Flashback = "Flashback",
	Foreshadowing = "Foreshadowing",
	ForgettableTaleOfADrunkenDwarf = "Forgettable Tale of a Drunken Dwarf",
	ForgivenessOfAChaosDwarf = "Forgiveness of a Chaos Dwarf",
	Fortunes = "Fortunes",
	FromTinyAcorns = "From Tiny Acorns (miniquest)",
	FurNSeek = "Fur 'n Seek",
	GardenOfTranquillity = "Garden of Tranquillity",
	GertrudesCat = "Gertrude's Cat",
	GhostsAhoy = "Ghosts Ahoy",
	GhostsfromThePast = "Ghosts from the Past (miniquest)",
	GloriousMemories = "Glorious Memories",
	GoblinDiplomacy = "Goblin Diplomacy",
	GowerQuest = "Gower Quest",
	GrimTales = "Grim Tales",
	GunnarsGround = "Gunnar's Ground",
	Harbinger = "Harbinger (miniquest)",
	HauntedMine = "Haunted Mine",
	HazeelCult = "Hazeel Cult",
	HeadOfTheFamily = "Head of the Family (miniquest)",
	HeartOfStone = "Heart of Stone",
	Heartstealer = "Heartstealer",
	HelpingLaniakea = "Helping Laniakea",
	HerosWelcome = "Hero's Welcome",
	HeroesQuest = "Heroes' Quest",
	HolyGrail = "Holy Grail",
	HopespearsWill = "Hopespear's Will (miniquest)",
	HorrorfromTheDeep = "Horror from the Deep",
	HuntforRedRaktuber = "Hunt for Red Raktuber",
	IcthlarinsLittleHelper = "Icthlarin's Little Helper",
	ImpCatcher = "Imp Catcher",
	ImpressingTheLocals = "Impressing the Locals",
	InAidOfTheMyreque = "In Aid of the Myreque",
	InMemoryOfTheMyreque = "In Memory of the Myreque (miniquest)",
	InPyreNeed = "In Pyre Need",
	InSearchOfTheMyreque = "In Search of the Myreque",
	JedHunter = "Jed Hunter (miniquest)",
	JunglePotion = "Jungle Potion",
	KennithsConcerns = "Kennith's Concerns",
	KindredSpirits = "Kindred Spirits",
	KingOfTheDwarves = "King of the Dwarves",
	KingsRansom = "King's Ransom",
	KoscheisTroubles = "Koschei's Troubles (miniquest)",
	LairOfTarnRazorlor = "Lair of Tarn Razorlor (miniquest)",
	LandOfTheGoblins = "Land of the Goblins",
	LegacyOfSeergaze = "Legacy of Seergaze",
	LegendsQuest = "Legends' Quest",
	LetThemEatPie = "Let Them Eat Pie",
	LostCity = "Lost City",
	LostHerMarbles = "Lost Her Marbles (miniquest)",
	LoveStory = "Love Story",
	LunarDiplomacy = "Lunar Diplomacy",
	MahjarratMemories = "Mahjarrat Memories (miniquest)",
	MakingHistory = "Making History",
	MeetingHistory = "Meeting History",
	MerlinsCrystal = "Merlin's Crystal",
	MissingMyMummy = "Missing My Mummy",
	MissingPresumedDeath = "Missing, Presumed Death",
	MonksFriend = "Monk's Friend",
	MonkeyMadness = "Monkey Madness",
	MountainDaughter = "Mountain Daughter",
	MourningsEndPartI = "Mourning's End Part I",
	MourningsEndPartII = "Mourning's End Part II",
	MurderMystery = "Murder Mystery",
	MyArmsBigAdventure = "My Arm's Big Adventure",
	MythsOfTheWhiteLands = "Myths of the White Lands",
	Nadir = "Nadir (saga)",
	NatureSpirit = "Nature Spirit",
	NomadsElegy = "Nomad's Elegy",
	NomadsRequiem = "Nomad's Requiem",
	ObservatoryQuest = "Observatory Quest",
	OlafsQuest = "Olaf's Quest",
	OnceUponaSlime = "Once Upon a Slime",
	OnceUponaTimeInGielinor = "Once Upon a Time in Gielinor",
	OneFootInTheGrave = "One Foot in the Grave (miniquest)",
	OneOfAKind = "One of a Kind",
	OnePiercingNote = "One Piercing Note",
	OneSmallFavour = "One Small Favour",
	OurManInTheNorth = "Our Man in the North",
	PerilsOfIceMountain = "Perils of Ice Mountain",
	PhiteClub = "'Phite Club",
	PiecesOfHate = "Pieces of Hate",
	PiratesTreasure = "Pirate's Treasure",
	PlagueCity = "Plague City",
	PlaguesEnd = "Plague's End",
	PriestInPeril = "Priest in Peril",
	PurpleCat = "Purple Cat (miniquest)",
	QuietBeforeTheSwarm = "Quiet Before the Swarm",
	RagandBoneMan = "Rag and Bone Man",
	RakshaTheShadowColossus = "Raksha, the Shadow Colossus (miniquest)",
	RatCatchers = "Rat Catchers",
	RebuildingEdgeville = "Rebuilding Edgeville (miniquest)",
	RecipeforDisaster = "Recipe for Disaster",
	RecipeforDisasterAnotherCooksQuest = "Recipe for Disaster: Another Cook's Quest",
	RecipeforDisasterDefeatingTheCulinaromancer = "Recipe for Disaster: Defeating the Culinaromancer",
	RecipeforDisasterFreeingEvilDave = "Recipe for Disaster: Freeing Evil Dave",
	RecipeforDisasterFreeingKingAwowogei = "Recipe for Disaster: Freeing King Awowogei",
	RecipeforDisasterFreeingPiratePete = "Recipe for Disaster: Freeing Pirate Pete",
	RecipeforDisasterFreeingSirAmikVarze = "Recipe for Disaster: Freeing Sir Amik Varze",
	RecipeforDisasterFreeingSkrachUglogwee = "Recipe for Disaster: Freeing Skrach Uglogwee",
	RecipeforDisasterFreeingTheGoblinGenerals = "Recipe for Disaster: Freeing the Goblin Generals",
	RecipeforDisasterFreeingTheLumbridgeSage = "Recipe for Disaster: Freeing the Lumbridge Sage",
	RecipeforDisasterFreeingTheMountainDwarf = "Recipe for Disaster: Freeing the Mountain Dwarf",
	RecruitmentDrive = "Recruitment Drive",
	Regicide = "Regicide",
	RitualOfTheMahjarrat = "Ritual of the Mahjarrat",
	RiverOfBlood = "River of Blood",
	RockingOut = "Rocking Out",
	RovingElves = "Roving Elves",
	RoyalTrouble = "Royal Trouble",
	RumDeal = "Rum Deal",
	RuneMechanics = "Rune Mechanics",
	RuneMemories = "Rune Memories",
	RuneMysteries = "Rune Mysteries",
	SaltInTheWound = "Salt in the Wound",
	ScorpionCatcher = "Scorpion Catcher",
	SeaSlug = "Sea Slug",
	ShadesOfMortton = "Shades of Mort'ton",
	ShadowOfTheStorm = "Shadow of the Storm",
	SheepHerder = "Sheep Herder",
	SheepShearer = "Sheep Shearer (miniquest)",
	ShieldOfArrav = "Shield of Arrav",
	ShiloVillage = "Shilo Village",
	SinsOfTheFather = "Sins of the Father (miniquest)",
	SliskesEndgame = "Sliske's Endgame",
	SmokingKills = "Smoking Kills",
	SomeLikeItCold = "Some Like It Cold",
	SongfromTheDepths = "Song from the Depths",
	SpiritOfSummer = "Spirit of Summer",
	SpiritsOfTheElid = "Spirits of the Elid",
	SpiritualEnlightenment = "Spiritual Enlightenment (miniquest)",
	StolenHearts = "Stolen Hearts",
	SummersEnd = "Summer's End",
	SwanSong = "Swan Song",
	SweptAway = "Swept Away",
	TaiBwoWannaiTrio = "Tai Bwo Wannai Trio",
	TalesOfNomad = "Tales of Nomad (miniquest)",
	TalesOfTheGodWars = "Tales of the God Wars (miniquest)",
	TearsOfGuthix = "Tears of Guthix",
	TempleOfIkov = "Temple of Ikov",
	TheBloodPact = "The Blood Pact",
	TheBranchesOfDarkmeyer = "The Branches of Darkmeyer",
	TheBrinkOfExtinction = "The Brink of Extinction",
	TheChosenCommander = "The Chosen Commander",
	TheCurseOfArrav = "The Curse of Arrav",
	TheCurseOfZaros = "The Curse of Zaros (miniquest)",
	TheDarknessOfHallowvale = "The Darkness of Hallowvale",
	TheDeathOfChivalry = "The Death of Chivalry",
	TheDigSite = "The Dig Site",
	TheElderKiln = "The Elder Kiln",
	TheEyesOfGlouphrie = "The Eyes of Glouphrie",
	TheFeud = "The Feud",
	TheFiremakersCurse = "The Firemaker's Curse",
	TheFremennikIsles = "The Fremennik Isles",
	TheFremennikTrials = "The Fremennik Trials",
	TheGeneralsShadow = "The General's Shadow (miniquest)",
	TheGiantDwarf = "The Giant Dwarf",
	TheGolem = "The Golem",
	TheGrandTree = "The Grand Tree",
	TheGreatBrainRobbery = "The Great Brain Robbery",
	TheHandInTheSand = "The Hand in the Sand",
	TheHuntforSurok = "The Hunt for Surok (miniquest)",
	TheJackOfSpades = "The Jack of Spades",
	TheKnightsSword = "The Knight's Sword",
	TheLightWithin = "The Light Within",
	TheLordOfVampyrium = "The Lord of Vampyrium",
	TheLostToys = "The Lost Toys (miniquest)",
	TheLostTribe = "The Lost Tribe",
	TheMightyFall = "The Mighty Fall",
	TheNeedleSkips = "The Needle Skips",
	ThePathOfGlouphrie = "The Path of Glouphrie",
	ThePrisonerOfGlouphrie = "The Prisoner of Glouphrie",
	TheRestlessGhost = "The Restless Ghost",
	TheSlugMenace = "The Slug Menace",
	TheTaleOfTheMuspah = "The Tale of the Muspah",
	TheTempleatSenntisten = "The Temple at Senntisten",
	TheTouristTrap = "The Tourist Trap",
	TheVaultOfShadows = "The Vault of Shadows (miniquest)",
	TheVoidStaresBack = "The Void Stares Back",
	TheWorldWakes = "The World Wakes",
	ThokItToEm = "Thok It To 'Em (saga)",
	ThokYourBlockOff = "Thok Your Block Off (saga)",
	ThreesCompany = "Three's Company (saga)",
	ThroneOfMiscellania = "Throne of Miscellania",
	TokTzKetDill = "TokTz-Ket-Dill",
	TortleCombat = "Tortle Combat (miniquest)",
	TowerOfLife = "Tower of Life",
	TreeGnomeVillage = "Tree Gnome Village",
	TribalTotem = "Tribal Totem",
	TrollRomance = "Troll Romance",
	TrollStronghold = "Troll Stronghold",
	TuaiLeitsOwn = "Tuai Leit's Own (miniquest)",
	TwilightOfTheGods = "Twilight of the Gods",
	UndergroundPass = "Underground Pass",
	UnstableFoundations = "Unstable Foundations",
	VampyreSlayer = "Vampyre Slayer",
	Vengeance = "Vengeance (saga)",
	VioletisBlue = "Violet is Blue",
	VioletisBlueToo = "Violet is Blue Too",
	WanderingGaal = "Wandering Ga'al (miniquest)",
	Wanted = "Wanted!",
	Watchtower = "Watchtower",
	WaterfallQuest = "Waterfall Quest",
	WhatLiesBelow = "What Lies Below",
	WhatsMineisYours = "What's Mine is Yours",
	WhileGuthixSleeps = "While Guthix Sleeps",
	WitchsHouse = "Witch's House",
	WitchsPotion = "Witch's Potion (miniquest)",
	WithinTheLight = "Within the Light",
	WolfWhistle = "Wolf Whistle",
	YouAreIt = "You Are It",
	ZogreFleshEaters = "Zogre Flesh Eaters",
}

/**
 * Represents the data of a quest.
 */
export interface Quest {
	/**
	 * The difficulty of the quest.
	 */
	difficulty: QuestDifficulty;
	/**
	 * Whether the quest requires membership.
	 */
	members: boolean;
	/**
	 * The amount of quest points the quest rewards.
	 */
	questPoints: number;
	/**
	 * The status of the quest.
	 */
	status: QuestStatus;
	/**
	 * The title of the quest.
	 */
	title: QuestTitle;
	/**
	 * Whether the player is eligible to start the quest.
	 */
	userEligible: boolean;
}

/**
 * Represents data about a player's returned quests.
 */
export interface QuestDetail {
	/**
	 * Whether the player is signed in to RuneMetrics.
	 *
	 * @remarks Because of how this data is retrieved, this may be assumed to always be `false`.
	 */
	loggedIn: boolean;
	/**
	 * An array of quests with respect to the player.
	 */
	quests: Quest[];
}

/**
 * Returns the player's quest data.
 *
 * @param name - The name of the player
 * @returns An object containing the quest data.
 */
export async function questDetails(name: string): Promise<QuestDetail> {
	const urlSearchParams = new URLSearchParams();
	urlSearchParams.set("user", name);

	const { quests, loggedIn } = (await request(`https://apps.runescape.com/runemetrics/quests?${urlSearchParams}`).then(
		async ({ body }) => body.json(),
	)) as RawQuestDetail;

	return {
		quests,
		loggedIn: loggedIn === "true",
	};
}
