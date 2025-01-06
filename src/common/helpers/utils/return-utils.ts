import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';
import { ApiErrorResponseDto } from 'src/common/dto/api-error-response.dto';

/**
 * Sends an HTTP response with the appropriate status code and body.
 *
 * This function extracts the `statusCode` from the response object,
 * removes it from the response body, and sends the response to the client
 * with the correct status code, ensuring the `statusCode` is not included
 * in the JSON response body.
 *
 * @param res - The Express response object used to send the response.
 * @param response - The response data object, which must contain a `statusCode` property.
 *
 * @returns The HTTP response with the status code applied, and the response body sent as JSON.
 */
export function sendResponse(res: Response, response: any) {
	const { statusCode, ...responseBody } = response;

	return res.status(statusCode).json(responseBody);
}

/**
 * Handles errors thrown during a request, extracts relevant information from the error,
 * and throws a new HTTP exception with the appropriate status code and error message.
 *
 * Used for catching errors during external API calls or processing.
 * It checks the `response` property in the error object for the status code and message,
 * and if not found, it uses default values to throw an exception. This ensures that the
 * application can gracefully handle and respond to errors.
 *
 * @param error - The error object containing information about the failure, such as status code and error message.
 *
 * @throws {HttpException} Throws an `HttpException` with the appropriate status code and error message.
 */
export function handleError<T = any>(error: any): ApiErrorResponseDto {
	const statusCode =
		error.response?.status ||
		error.status ||
		HttpStatus.INTERNAL_SERVER_ERROR;

	const errorMessage =
		error.response?.data ||
		error.data ||
		error.message ||
		'An unexpected error occurred';

	if (typeof errorMessage === 'string') {
		throw new ApiErrorResponseDto(statusCode, errorMessage);
	}

	// If the error message is an object
	if (typeof errorMessage === 'object') {
		throw new ApiErrorResponseDto(statusCode, undefined, errorMessage);
	}

	throw new ApiErrorResponseDto(statusCode, 'Unknown error occurred');
}
/**
 * Handles the response from an Axios request and formats it into a consistent structure.
 *
 * This function processes the response data returned from an external API and wraps it in a
 * standardized format (ApiResponseDto). It checks the type of the response data to determine
 * how to structure the response:
 * - If the response data is a string, it sets the `message` property with the string value.
 * - If the response data is an object (or array), it directly returns the data as part of the response.
 * - If the response is neither a string nor an object, it returns an empty message and the status code.
 *
 * @param response - The AxiosResponse containing the response data from the external API.
 * @returns An ApiResponseDto with a `message` and/or JSON-data from the external API and a `statusCode`.
 *
 * @template T - The type of the response data, which can be any type (string, object, etc.).
 */
export function handleResponse(response: AxiosResponse): ApiResponseDto {
	const statusCode = response.data?.status || response.status || 200;
	const responseData = response.data;

	if (typeof responseData === 'string') {
		return {
			message: responseData,
			statusCode,
		};
	}

	if (responseData && typeof responseData === 'object') {
		return {
			...responseData,
			statusCode,
		};
	}

	return {
		message: '',
		statusCode: statusCode,
	};
}
/**
 * Handles Shopify error responses by returning a structured error object.
 *
 * @param {any} data - The error data received from the Shopify API.
 *                     This is expected to include details about the error, such as a `status` field.
 *
 */
export function handleShopifyError(data: any) {
	return {
		data: data,
		status: data.status,
	};
}

/**
 * Generates a generic error message for use when a specific error message is not available.
 *
 * This function is used as a fallback to provide a consistent error message in cases
 * where the error response does not include a specific title or message. The message
 * includes the provider name (usually the CMS) to indicate where the error occurred.
 *
 * @returns A string containing a generic error message, including the CMS provider.
 */
export function genericErrorMessage() {
	return `Error handling the request to ${process.env.CMS_PROVIDER}`;
}
