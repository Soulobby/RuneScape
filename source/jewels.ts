import { nextInt, runedate } from "./utility/utility.js";

/**
 * The two jewels behind doors.
 */
export enum Jewel {
	ApmekenAmethyst = "Apmeken Amethyst",
	ScabariteCrystal = "Scabarite Crystal",
}

/**
 * Returns the accessible jewel.
 *
 * @param offset - How many days to offset the result.
 * @returns The accessible jewel.
 */
export function jewel(offset = 0) {
	const slot = nextInt(BigInt(runedate(offset)) * 2n ** 32n, 5n);

	switch (slot) {
		case 0n:
			return Jewel.ScabariteCrystal;
		case 2n:
			return Jewel.ApmekenAmethyst;
		default:
			return null;
	}
}
