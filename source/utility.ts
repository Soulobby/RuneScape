/**
 * Transforms a name into a variant that is able to be safely sent to the API.
 *
 * @param name - The name to transform.
 * @returns The transformed name.
 * @internal
 */

export function transformName(name: string) {
	return name.replaceAll(" ", "_");
}
