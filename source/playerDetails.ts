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
	 * @remarks Since {@link PlayerDetail.title} appears to always be `null`, this also appears to always be `false`.
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
 * Represents the options to provide for fetching player profiles.
 */
export interface PlayerDetailsOptions {
	/**
	 * An array of player names.
	 */
	names: string[];
	/**
	 * The options for the request.
	 */
	requestOptions?: Parameters<typeof request>[1];
}

/**
 * Returns player details.
 *
 * @param options - The options to provide
 * @returns An array containing the resulting player details.
 */
export async function playerDetails({ names, requestOptions }: PlayerDetailsOptions): Promise<PlayerDetail[]> {
	const urlSearchParams = new URLSearchParams();
	urlSearchParams.set("names", JSON.stringify(names));
	urlSearchParams.set("callback", "jQuery000000000000000_0000000000");

	const html = await request(
		`https://secure.runescape.com/m=website-data/playerDetails.ws?${urlSearchParams}`,
		requestOptions,
	).then(async ({ body }) => body.text());

	const json: RawPlayerDetail[] = JSON.parse(html.slice(html.indexOf("["), html.indexOf("]") + 1));

	return json.map(({ isSuffix, recruiting, name, clan, title }) => ({
		isSuffix,
		recruiting: recruiting ?? null,
		name,
		clan: clan ?? null,
		title: title === "" ? null : title,
	}));
}
