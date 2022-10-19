import { URLSearchParams } from "node:url";
import { request } from "undici";

interface RawPlayerDetail {
	clan?: string;
	isSuffix: boolean;
	name: string;
	recruiting?: boolean;
	title: string;
}

/**
 * Represents some basic information about a player.
 */
export interface PlayerDetail {
	/**
	 * The clan of the player.
	 */
	clan: string | null;
	/**
	 * Whether the title is suffixed.
	 *
	 * @remarks Since {@link title} appears to always be `null`, this also appears to always be `false`.
	 */
	isSuffix: boolean;
	/**
	 * The name of the player.
	 */
	name: string;
	/**
	 * Whether the player's clan is set to display that they are recruiting.
	 */
	recruiting: boolean | null;
	/**
	 * The title of the player.
	 *
	 * @remarks This appears to always be `null`.
	 */
	title: string | null;
}

/**
 * Returns the player's details.
 *
 * @param names - An array of RSNs to check.
 * @returns An array containing objects of the resulting player details.
 */
export async function playerDetails(names: string[]): Promise<PlayerDetail[]> {
	const urlSearchParams = new URLSearchParams();
	urlSearchParams.set("names", JSON.stringify(names.map((name) => name.replaceAll(" ", "_"))));
	urlSearchParams.set("callback", "jQuery000000000000000_0000000000");

	const html = await request(`https://secure.runescape.com/m=website-data/playerDetails.ws?${urlSearchParams}`).then(
		async ({ body }) => body.text(),
	);

	const json: RawPlayerDetail[] = JSON.parse(html.slice(html.indexOf("["), html.indexOf("]") + 1));

	return json.map(({ isSuffix, recruiting, name, clan, title }) => ({
		isSuffix,
		recruiting: recruiting ?? null,
		name,
		clan: clan ?? null,
		title: title || null,
	}));
}
