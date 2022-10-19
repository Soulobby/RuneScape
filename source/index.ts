import { request } from "undici";

interface RawPlayerDetail {
	clan?: string;
	isSuffix: boolean;
	name: string;
	recruiting?: boolean;
	title: string;
}

/**
 * Returns the player's details.
 *
 * @param RSN - The RSN.
 * @returns An object containing the player's details.
 */
export async function playerDetails(RSN: string) {
	const html = await request(
		`https://secure.runescape.com/m=website-data/playerDetails.ws?names=%5B%22${RSN.replaceAll(
			" ",
			"_",
		)}%22%5D&callback=jQuery000000000000000_0000000000&_=0`,
	).then(async ({ body }) => body.text());

	const rawData: RawPlayerDetail = JSON.parse(html.slice(html.indexOf("["), html.indexOf("]") + 1))[0];

	return {
		isSuffix: rawData.isSuffix,
		recruiting: rawData.recruiting ?? null,
		RSN: rawData.name,
		clan: rawData.clan ?? null,
		title: rawData.title || null,
	};
}
