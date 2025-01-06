import { stringToArrayOfStrings, stringToBoolean, stringToNumber } from "./transform-helper";

describe('Transformer functions', () => {
    describe('stringToBoolean', () => {
        it('should return true for the string "true"', () => {
            expect(stringToBoolean('true')).toBe(true);
        });

        it('should return false for the string "false"', () => {
            expect(stringToBoolean('false')).toBe(false);
        });

        it('should return false for any non-"true" string', () => {
            expect(stringToBoolean('random')).toBe(false);
            expect(stringToBoolean('')).toBe(false);
        });
    });

    describe('stringToNumber', () => {
        it('should return a number for a valid numeric string', () => {
            expect(stringToNumber('1')).toBe(1);
            expect(stringToNumber('1.23')).toBeCloseTo(1.23);
        });

        it('should return null for an invalid numeric string', () => {
            expect(stringToNumber('abc')).toBeNull();
            expect(stringToNumber('42abc')).toBeNull();
        });

        it('should return 0 for the string "0"', () => {
            expect(stringToNumber('0')).toBe(0);
        });
    });

    describe('stringToArrayOfStrings', () => {
        it('should split a comma-separated string into an array of strings', () => {
            expect(stringToArrayOfStrings('a,b,c')).toEqual(['a', 'b', 'c']);
        });

        it('should handle a string with no commas as a single-item array', () => {
            expect(stringToArrayOfStrings('single')).toEqual(['single']);
        });

        it('should return an empty array for an empty string', () => {
            expect(stringToArrayOfStrings('')).toEqual([]);
        });

        it('should return an empty array for a falsy value', () => {
            expect(stringToArrayOfStrings(null as unknown as string)).toEqual([]);
            expect(stringToArrayOfStrings(undefined as unknown as string)).toEqual([]);
        });
    });
});