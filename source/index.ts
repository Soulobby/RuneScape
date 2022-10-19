import { URLSearchParams } from "node:url";
import { request } from "undici";

interface RawPlayerDetail {
	clan?: string;
	isSuffix: boolean;
	name: string;
	recruiting?: boolean;
	title: string;
}

interface PlayerDetail {
	RSN: string;
	clan: string | null;
	isSuffix: boolean;
	recruiting: boolean | null;
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

	return json.map((data) => ({
		isSuffix: data.isSuffix,
		recruiting: data.recruiting ?? null,
		RSN: data.name,
		clan: data.clan ?? null,
		title: data.title || null,
	}));
}
