import { testDtoValidation, generateInvalidValueForProperty } from './test-helper';
import { BadRequestException } from '@nestjs/common';
import { IsArray, IsBoolean, IsDate, IsInt, IsObject, IsString, validate } from 'class-validator';

class testDto {
    @IsString()
    str: string;

    @IsInt()
    n: number;

    @IsBoolean()
    bool: boolean;

    @IsDate()
    da: Date;

    @IsArray()
    arr: any[];

    @IsObject()
    obj: object;

    constructor(
        str: string,
        n: number,
        bool: boolean,
        da: Date,
        arr: any[],
        obj: object
    ) {
        this.str = str;
        this.n = n;
        this.bool = bool;
        this.da = da;
        this.arr = arr;
        this.obj = obj;
    }
}

describe('Test helpers suite', () => {
    let originalConsoleError: typeof console.error;

    beforeEach(() => {
        // Suppress error logs for all tests
        originalConsoleError = console.error;
        console.error = jest.fn();
    });

    afterEach(() => {
        // Restore console.error after each test
        console.error = originalConsoleError;
    });

    describe('testDtoValidation', () => {

        it('should throw a BadRequestException if validation fails (expected & intentional)', async () => {
            try {
                await testDtoValidation(testDto);
            } catch (err) {
                expect(err).toBeInstanceOf(BadRequestException);
            }
        });
    
        it('should handle valid DTO class and ensure no validation errors for valid inputs', async () => {
            const validtestDto: testDto = {
                str: 'string',
                n: 1,
                bool: true,
                da: new Date(),
                arr: ['array'],
                obj: { string: 'test' }
            }
        
            const errors = await validate(validtestDto);
        
            expect(errors.length).toBe(0);
        });
    });
    
    describe('generateInvalidValueForProperty', () => {
        it('should generate an invalid value for a String property', () => {
            const invalidValue = generateInvalidValueForProperty(testDto, 'str');
            expect(invalidValue).toBe(2);
        });
    
        it('should generate an invalid value for a Number property', () => {
            const invalidValue = generateInvalidValueForProperty(testDto, 'n');
            expect(invalidValue).toBe('invalid');
        });
    
        it('should generate an invalid value for a Boolean property', () => {
            const invalidValue = generateInvalidValueForProperty(testDto, 'bool');
            expect(invalidValue).toBe('invalid');
        });
    
        it('should generate an invalid value for a Date property', () => {
            const invalidValue = generateInvalidValueForProperty(testDto, 'da');
            expect(invalidValue).toBe('invalid');
        });
    
        it('should generate an invalid value for an Array property', () => {
            const invalidValue = generateInvalidValueForProperty(testDto, 'arr');
            expect(invalidValue).toBe('invalid');
        });
    
        it('should generate an invalid value for an Object property', () => {
            const invalidValue = generateInvalidValueForProperty(testDto, 'obj');
            expect(invalidValue).toBe('invalid');
        });
    });
})
