import { URLSearchParams } from "node:url";

const MULTI = 0x5deece66dn as const;
const MASK = 281_474_976_710_656n as const;
const c0 = 0xe66dn as const;
const c1 = 0xdeecn as const;
const c2 = 0x0005n as const;
const chunk = 65_536n as const;

/**
 * Returns the current Runedate.
 *
 * @param offset - How many days to offset the result.
 * @returns The Runedate.
 */
export function runedate(offset = 0) {
	const date = new Date();
	date.setUTCDate(date.getUTCDate() + offset);
	const runedate = date.getTime() - Date.UTC(2_002, 1, 27);
	return Math.floor(runedate / 86_400_000);
}

/**
 * @param seed - The seed to use.
 * @internal
 */
function multiplyAvoidLimit(seed: bigint) {
	const s0 = seed % chunk;
	const s1 = BigInt(Math.floor(Number(seed / chunk))) % chunk;
	const s2 = BigInt(Math.floor(Number(seed / chunk / chunk)));
	let carry = 11n;
	let r0 = s0 * c0 + carry;
	carry = BigInt(Math.floor(Number(r0 / chunk)));
	r0 %= chunk;
	let r1 = s1 * c0 + s0 * c1 + carry;
	carry = BigInt(Math.floor(Number(r1 / chunk)));
	r1 %= chunk;
	let r2 = s2 * c0 + s1 * c1 + s0 * c2 + carry;
	r2 %= chunk;
	return r2 * chunk * chunk + r1 * chunk + r0;
}

/**
 * @param seed - The seed to use.
 * @param no - The number to use.
 * @param repeats - How many times to repeat.
 * @internal
 */
export function nextInt(seed: bigint, no: bigint, repeats = 1) {
	let computedSeed = seed ^ MULTI % MASK;
	for (let index = 0; index < repeats; index++) computedSeed = multiplyAvoidLimit(computedSeed);
	computedSeed >>= 17n;
	return computedSeed % no;
}

/**
 * Transforms a name into a variant that is able to be safely sent to an API.
 *
 * @param name - The name to transform
 * @param delimiter - The delimiter to use
 * @returns The transformed name.
 * @internal
 */
function transformName(name: string, delimiter: string) {
	return name.replaceAll(" ", delimiter);
}

/**
 * Represents the options to provide for retrieving a player's avatar.
 */
export interface AvatarOptions {
	/**
	 * The player's name.
	 */
	name: string;
	/**
	 * The desired width.
	 *
	 * @remarks 100 is the maximum number the width abides by.
	 */
	width?: number;
	/**
	 * The desired height.
	 *
	 * @remarks 100 is the maximum number the height abides by.
	 */
	height?: number;
}

/**
 * Returns the avatar of a player.
 *
 * @param options - The options to provide
 * @returns The player's avatar link.
 */
export function avatar({ name, width, height }: AvatarOptions) {
	const urlSearchParams = new URLSearchParams();
	if (typeof width === "number") urlSearchParams.set("w", String(width));
	if (typeof height === "number") urlSearchParams.set("h", String(height));

	return `https://secure.runescape.com/m=avatar-rs/${transformName(name, "%20")}/chat.png${
		String(urlSearchParams) ? `?${urlSearchParams}` : ""
	}`;
}

/**
 * Represents what may provide a clan's home page.
 */
export enum ClanPage {
	RuneInfo = "RuneInfo",
	RunePixels = "Runepixels",
	RuneScape = "RuneScape"
}

/**
 * Represents the options to provide for retrieving clan home pages.
 */
export interface ClanPageOptions {
	/**
	 * The clan.
	 */
	clan: string;
}

/**
 * Retrieve a clan's home pages.
 *
 * @param options - The options to provide
 * @returns An object containing sources to their links.
 */
export function clanPage({ clan }: ClanPageOptions) {
	return {
		[ClanPage.RuneScape]: `https://services.runescape.com/m=clan-home/clan/${transformName(clan, "%20")}`,
		[ClanPage.RuneInfo]: `https://runeinfo.com/clan/${transformName(clan, "%20")}`,
		[ClanPage.RunePixels]: `https://runepixels.com/clans/${transformName(clan, "-")}`,
	};
}

/**
 * Represents what may provide a player's page.
 */
export enum PlayerPage {
	RuneInfo = "RuneInfo",
	RuneMetrics = "RuneMetrics",
	RunePixels = "Runepixels",
	RuneScape = "RuneScape",
	RuneTracker = "RuneTracker",
}

/**
 * Represents the options to provide for retrieving player pages.
 */
export interface PlayerPageOptions {
	/**
	 * The player's name.
	 */
	name: string;
}

/**
 * Retrieves a player's pages.
 *
 * @param options - The options to provide
 * @returns An object containing sources to their links.
 */
export function playerPage({ name }: PlayerPageOptions) {
	const urlSearchParams = new URLSearchParams();
	urlSearchParams.set("user1", transformName(name, "%20"));

	return {
		[PlayerPage.RuneScape]: `https://secure.runescape.com/m=hiscore/compare?${urlSearchParams}`,
		[PlayerPage.RuneMetrics]: `https://apps.runescape.com/runemetrics/app/overview/player/${transformName(
			name,
			"%20",
		)}`,
		[PlayerPage.RuneInfo]: `https://runeinfo.com/profile/${transformName(name, "%20")}`,
		[PlayerPage.RunePixels]: `https://runepixels.com/players/${transformName(name, "-")}`,
		[PlayerPage.RuneTracker]: `https://runetracker.org/track-${transformName(name, "+")}`,
	};
}
