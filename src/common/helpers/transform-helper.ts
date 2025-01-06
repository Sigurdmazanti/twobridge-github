/**
 * Converts a string value to a boolean.
 * Returns `true` if the value is the string 'true', otherwise returns `false`.
 *
 * @param value The string value to be converted.
 * @returns A boolean value (`true` or `false`).
 */
export function stringToBoolean(value: string): boolean {
	return value === 'true'; // Returns true if the value is exactly 'true', otherwise false.
}

/**
 * Converts a string value to a number.
 * If the value is a valid number, it returns the number.
 * If the value is not a valid number, it returns `null`.
 *
 * @param value The string value to be converted.
 * @returns A number if the string is a valid number, otherwise `null`.
 */
export function stringToNumber(value: string): number | null {
	const parsedValue = Number(value);

	return isNaN(parsedValue) ? null : parsedValue;
}

/**
 * Converts a comma-separated string into an array of strings.
 * If the input string is empty or falsy, it returns an empty array.
 *
 * @param value The comma-separated string to be converted.
 * @returns An array of strings split from the original string.
 */
export function stringToArrayOfStrings(value: string): string[] {
	return value ? value.split(',') : [];
}
