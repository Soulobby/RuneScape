/**
 * Returns if a Guthixian Cache will be a full reward.
 *
 * @param offset - How many hours to offset the result.
 * @returns Whether the occurrence will be a full reward.
 * @see {@link https://runescape.wiki/w/Guthixian_Cache}
 */
export function guthixianCache(offset = 0) {
	return (new Date().getUTCHours() + offset) % 3 === 0;
}
