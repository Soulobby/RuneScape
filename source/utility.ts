import { URLSearchParams } from "node:url";

/**
 * Transforms a name into a variant that is able to be safely sent to the API.
 *
 * @param name - The name to transform
 * @returns The transformed name.
 * @internal
 */
export function transformName(name: string) {
	return name.replaceAll(" ", "_");
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
