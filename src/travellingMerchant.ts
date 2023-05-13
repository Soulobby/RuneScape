import { nextInt, runedate } from "./utility/utility.js";

/**
 * Represents an item used in the shop.
 */
export enum Item {
	AdvancedPulseCore = "Advanced pulse core",
	AnimaCrystal = "Anima crystal",
	BarrelOfBait = "Barrel of bait",
	BrokenFishingRod = "Broken fishing rod",
	CrystalTriskelion = "Crystal triskelion",
	DDTokenDaily = "D&D token (daily)",
	DDTokenWeekly = "D&D token (weekly)",
	DDTokenMonthly = "D&D token (monthly)",
	DeathtouchedDart = "Deathtouched dart",
	DragonkinLamp = "Dragonkin Lamp",
	DungeoneeringWildcard = "Dungeoneering Wildcard",
	GiftForTheReaper = "Gift for the Reaper",
	GoebieBurialCharm = "Goebie burial charm",
	HornOfHonour = "Horn of honour",
	HarmonicDust = "Harmonic dust",
	LargeGoebieBurialCharm = "Large goebie burial charm",
	LividPlant = "Livid plant",
	MenaphiteGiftOfferingLarge = "Menaphite gift offering (large)",
	MenaphiteGiftOfferingMedium = "Menaphite gift offering (medium)",
	MenaphiteGiftOfferingSmall = "Menaphite gift offering (small)",
	MessageInABottle = "Message in a bottle",
	SacredClay = "Sacred clay",
	ShatteredAnima = "Shattered anima",
	SilverhawkDown = "Silverhawk down",
	SlayerVIPCoupon = "Slayer VIP coupon",
	SmallGoebieBurialCharm = "Small goebie burial charm",
	StarvedAncientEffigy = "Starved ancient effigy",
	Taijitu = "Taijitu",
	TangledFishbowl = "Tangled fishbowl",
	UnfocusedDamageEnhancer = "Unfocused damage enhancer",
	UnfocusedRewardEnhancer = "Unfocused reward enhancer",
	UnstableAirRune = "Unstable air rune",
}

const SLOT_1_AND_2 = [
	Item.GiftForTheReaper,
	Item.BrokenFishingRod,
	Item.BarrelOfBait,
	Item.AnimaCrystal,
	Item.SmallGoebieBurialCharm,
	Item.GoebieBurialCharm,
	Item.MenaphiteGiftOfferingSmall,
	Item.MenaphiteGiftOfferingMedium,
	Item.ShatteredAnima,
	Item.DDTokenDaily,
	Item.SacredClay,
	Item.LividPlant,
	Item.SlayerVIPCoupon,
	Item.SilverhawkDown,
	Item.UnstableAirRune,
	Item.AdvancedPulseCore,
	Item.TangledFishbowl,
	Item.UnfocusedDamageEnhancer,
	Item.HornOfHonour,
] as const;

const SLOTS = {
	1: SLOT_1_AND_2,
	2: SLOT_1_AND_2,
	3: [
		Item.Taijitu,
		Item.LargeGoebieBurialCharm,
		Item.MenaphiteGiftOfferingLarge,
		Item.DDTokenWeekly,
		Item.DDTokenMonthly,
		Item.DungeoneeringWildcard,
		Item.MessageInABottle,
		Item.CrystalTriskelion,
		Item.StarvedAncientEffigy,
		Item.DeathtouchedDart,
		Item.DragonkinLamp,
		Item.HarmonicDust,
		Item.UnfocusedRewardEnhancer,
	],
} as const;

/**
 * Retrieves the index used to locate an item for a slot.
 *
 * @param runedate - The Runedate.
 * @param n1 - The first number.
 * @param n2 - The second number.
 * @returns An index used to locate an item for a slot.
 * @internal
 */
function getSlots(runedate: number, n1: number, n2: bigint) {
	const seed = runedate * 2 ** 32 + (runedate % n1);
	return nextInt(BigInt(seed), n2);
}

/**
 * Returns the first slot of the stock.
 *
 * @param offset - How many days to offset the result.
 * @returns The first slot of the stock.
 * @internal
 */
function slot1(offset = 0) {
	const index = Number(getSlots(runedate(offset), 3, 19n));
	return SLOTS[1][index];
}

/**
 * Returns the second slot of the stock.
 *
 * @param offset - How many days to offset the result.
 * @returns The second slot of the stock.
 * @internal
 */
function slot2(offset = 0) {
	const index = Number(getSlots(runedate(offset), 8, 19n));
	return SLOTS[2][index];
}

/**
 * Returns the third slot of the stock.
 *
 * @param offset - How many days to offset the result.
 * @returns The third slot of the stock.
 * @internal
 */
function slot3(offset = 0) {
	const index = Number(getSlots(runedate(offset), 5, 13n));
	return SLOTS[3][index];
}

/**
 * Returns the stock for the travelling merchant.
 *
 * @param offset - How many days to offset the result.
 * @returns An array containing the stock.
 */
export function stock(
	offset = 0,
): [(typeof SLOT_1_AND_2)[number], (typeof SLOT_1_AND_2)[number], (typeof SLOTS)[3][number]] {
	return [slot1(offset)!, slot2(offset)!, slot3(offset)!];
}
