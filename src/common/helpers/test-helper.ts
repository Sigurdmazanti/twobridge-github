import { validate, ValidationError } from 'class-validator';
import { BadRequestException } from '@nestjs/common';
import 'reflect-metadata';

/**
 * Function to test the validation of a DTO (Data Transfer Object) by
 * assigning invalid values to each of its properties and running the validation process.
 *
 * @param dtoClass - The DTO class to be tested for validation.
 * @throws BadRequestException - Throws an exception containing validation errors if validation fails.
 * @throws Error - If the validation unexpectedly passes on invalid values.
 */
export async function testDtoValidation(dtoClass: any) {
	const dtoInstance = new dtoClass();
	const properties = Object.getOwnPropertyNames(dtoInstance);

	for (const property of properties) {
		const invalidValue = generateInvalidValueForProperty(
			dtoClass,
			property,
		);
		dtoInstance[property] = invalidValue;
	}

	const errors = await validate(dtoInstance as object);

	if (errors.length === 0) {
		throw new Error('Validation passed on all properties.');
	}

	if (!errors.every((error) => error instanceof ValidationError)) {
		throw new Error('An error other than ValidationError was thrown');
	}
	
	throw new BadRequestException(errors);
}

/**
 * Helper function to generate an invalid value for a given property in a DTO class.
 * The invalid value is based on the type of the property (e.g., String, Number, Boolean, etc.).
 *
 * @param dtoClass - The DTO class to which the property belongs.
 * @param property - The property of the DTO class for which the invalid value is generated.
 * @returns An invalid value for the property based on its type.
 */
export function generateInvalidValueForProperty(dtoClass: any, property: string): any {
	const metadata = Reflect.getMetadata(
		'design:type',
		dtoClass.prototype,
		property,
	);

	switch (metadata) {
		case String:
			return 2;
		case Number:
			return 'invalid';
		case Boolean:
			return 'invalid';
		case Array:
			return 'invalid';
		case Date:
			return 'invalid';
		case Object:
			return 'invalid';
		default:
			return null;
	}
}
