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
 * Represents what may provide a clan page.
 */
export enum ClanPage {
	RuneScape = "RuneScape",
	RunePixels = "Runepixels",
}

/**
 * Represents the options to provide for retrieving a clan page.
 */
export interface ClanPageOptions {
	/**
	 * The clan.
	 */
	clan: string;
	/**
	 * Where the clan page should be retrieved from.
	 *
	 * @defaultValue `ClanPage.RuneScape`
	 */
	source?: ClanPage;
}

/**
 * Retrieves a clan page.
 *
 * @param options - The options to provide
 * @returns A link to a clan's home page.
 */
export function clanPage({ clan, source = ClanPage.RuneScape }: ClanPageOptions) {
	switch (source) {
		case ClanPage.RuneScape:
			return `https://services.runescape.com/m=clan-home/clan/${clan}`;
		case ClanPage.RunePixels:
			return `https://runepixels.com/clans/${clan}/about`;
	}
}

/**
 * Represents what may provide a player's page.
 */
export enum PlayerPage {
	RuneScape = "RuneScape",
	RuneMetrics = "RuneMetrics",
	RuneTracker = "RuneTracker",
	RunePixels = "Runepixels",
}

/**
 * Represents the options to provide for retrieving a player's page.
 */
export interface PlayerPageOptions {
	/**
	 * The player's name.
	 */
	name: string;
	/**
	 * Where the player's page should be retrieved from.
	 *
	 * @defaultValue `PlayerPage.RuneScape`
	 */
	source?: PlayerPage;
}

/**
 * Retrieves a player's page.
 *
 * @param options - The options to provide
 * @returns A link to the player's page.
 */
export function playerPage({ name, source = PlayerPage.RuneScape }: PlayerPageOptions) {
	switch (source) {
		case PlayerPage.RuneScape:
			// eslint-disable-next-line no-case-declarations
			const urlSearchParams = new URLSearchParams();
			urlSearchParams.set("user1", name);
			return `https://secure.runescape.com/m=hiscore/compare?${urlSearchParams}`;
		case PlayerPage.RuneMetrics:
			return `https://apps.runescape.com/runemetrics/app/overview/player/${name}`;
		case PlayerPage.RuneTracker:
			return `https://runetracker.org/track-${transformName(name)}`;
		case PlayerPage.RunePixels:
			return `https://runepixels.com/players/${name}/skills`;
	}
}
