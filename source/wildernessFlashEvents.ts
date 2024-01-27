const INITIAL_TIMESTAMP = Date.UTC(2_022, 9, 17, 11);

/* eslint-disable typescript-sort-keys/string-enum */
/**
 * The kind of Wilderness Flash Event.
 */
export enum WildernessFlashEvent {
	/**
	 * @see {@link https://runescape.wiki/w/Wilderness_Flash_Events#Spider_Swarm}
	 */
	SpiderSwarm = "Spider Swarm",
	/**
	 * @see {@link https://runescape.wiki/w/Wilderness_Flash_Events#Unnatural_Outcrop}
	 */
	UnnaturalOutcrop = "Unnatural Outcrop",
	/**
	 * @see {@link https://runescape.wiki/w/Wilderness_Flash_Events#Demon_Stragglers}
	 */
	DemonStragglers = "Demon Stragglers",
	/**
	 * @see {@link https://runescape.wiki/w/Wilderness_Flash_Events#Butterfly_Swarm}
	 */
	ButterflySwarm = "Butterfly Swarm",
	/**
	 * @see {@link https://runescape.wiki/w/Wilderness_Flash_Events#King_Black_Dragon_Rampage}
	 */
	KingBlackDragonRampage = "King Black Dragon Rampage",
	/**
	 * @see {@link https://runescape.wiki/w/Wilderness_Flash_Events#Forgotten_Soldiers}
	 */
	ForgottenSoldiers = "Forgotten Soldiers",
	/**
	 * @see {@link https://runescape.wiki/w/Wilderness_Flash_Events#Surprising_Seedlings}
	 */
	SurprisingSeedlings = "Surprising Seedlings",
	/**
	 * @see {@link https://runescape.wiki/w/Wilderness_Flash_Events#Hellhound_Pack}
	 */
	HellhoundPack = "Hellhound Pack",
	/**
	 * @see {@link https://runescape.wiki/w/Wilderness_Flash_Events#Infernal_Star}
	 */
	InfernalStar = "Infernal Star",
	/**
	 * @see {@link https://runescape.wiki/w/Wilderness_Flash_Events#Lost_Souls}
	 */
	LostSouls = "Lost Souls",
	/**
	 * @see {@link https://runescape.wiki/w/Wilderness_Flash_Events#Ramokee_Incursion}
	 */
	RamokeeIncursion = "Ramokee Incursion",
	/**
	 * @see {@link https://runescape.wiki/w/Wilderness_Flash_Events#Displaced_Energy}
	 */
	DisplacedEnergy = "Displaced Energy",
	/**
	 * @see {@link https://runescape.wiki/w/Wilderness_Flash_Events#Evil_Bloodwood_Tree}
	 */
	EvilBloodwoodTree = "Evil Bloodwood Tree",
}
/* eslint-enable typescript-sort-keys/string-enum */

const WILDERNESS_FLASH_EVENTS = Object.values(WildernessFlashEvent);
const WILDERNESS_FLASH_EVENTS_LENGTH = WILDERNESS_FLASH_EVENTS.length;

/**
 * Returns the Wilderness Flash Event.
 *
 * @param offset - How many hours to offset the result.
 * @returns The Wilderness Flash Event.
 */
export function wildernessFlashEvent(offset = 0) {
	const hoursElapsed = Math.floor((Date.now() + 3_600_000 * offset - INITIAL_TIMESTAMP) / 1_000 / 60 / 60);
	return WILDERNESS_FLASH_EVENTS[hoursElapsed % WILDERNESS_FLASH_EVENTS_LENGTH]!;
}
