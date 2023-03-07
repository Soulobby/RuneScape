import { URLSearchParams } from "node:url";

/**
 * Transforms a name into a variant that is able to be safely sent to an API.
 *
 * @param name - The name to transform
 * @returns The transformed name.
 * @internal
 */
export function transformName(name: string) {
	return name.replaceAll(" ", "+");
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

	return `https://secure.runescape.com/m=avatar-rs/${transformName(name)}/chat.png${
		String(urlSearchParams) ? `?${urlSearchParams}` : ""
	}`;
}

/**
 * Represents what may provide a clan's home page.
 */
export enum ClanPage {
	RuneScape = "RuneScape",
	RuneInfo = "RuneInfo",
	RunePixels = "Runepixels",
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
		[ClanPage.RuneScape]: `https://services.runescape.com/m=clan-home/clan/${clan}`,
		[ClanPage.RuneInfo]: `https://runeinfo.com/clan/${clan}`,
		[ClanPage.RunePixels]: `https://runepixels.com/clans/${clan}`,
	};
}

/**
 * Represents what may provide a player's page.
 */
export enum PlayerPage {
	RuneScape = "RuneScape",
	RuneMetrics = "RuneMetrics",
	RuneInfo = "RuneInfo",
	RunePixels = "Runepixels",
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
	urlSearchParams.set("user1", name);

	return {
		[PlayerPage.RuneScape]: `https://secure.runescape.com/m=hiscore/compare?${urlSearchParams}`,
		[PlayerPage.RuneMetrics]: `https://apps.runescape.com/runemetrics/app/overview/player/${name}`,
		[PlayerPage.RuneInfo]: `https://runeinfo.com/profile/${name}`,
		[PlayerPage.RunePixels]: `https://runepixels.com/players/${name}/skills`,
		[PlayerPage.RuneTracker]: `https://runetracker.org/track-${transformName(name)}`,
	};
}
