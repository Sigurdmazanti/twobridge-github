import { Response } from 'express';
import { HttpStatus } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { sendResponse, handleError, handleResponse, handleShopifyError, genericErrorMessage } from './return-utils';
import { ApiResponseDto } from 'src/common/dto/api-response.dto';
import { ApiErrorResponseDto } from 'src/common/dto/api-error-response.dto';
import { axiosError, axiosSuccess } from '../axios-object-helper';

jest.mock('express');

describe('Return utility functions', () => {
  
    describe('sendResponse', () => {
        it('should send the correct response with status and body', () => {
            const mockResponse = { 
                statusCode: 200,
                message: 'Success' 
            };

            const mockResult = { 
                status: jest.fn().mockReturnThis(), 
                json: jest.fn() 
            };

            sendResponse(mockResult as unknown as Response, mockResponse);

            expect(mockResult.status).toHaveBeenCalledWith(200);
            expect(mockResult.json).toHaveBeenCalledWith({ 
                message: 'Success' 
            });
        });
    });

    describe('handleError', () => {
        it('should throw an ApiErrorResponseDto with correct status code and message', () => {
            try {
                handleError(axiosError);
            } catch (err) {
                expect(err).toBeInstanceOf(ApiErrorResponseDto);
                expect(err.statusCode).toBe(404);
                expect(err.message).toBe('Resource Not Found');
            }
        });

        it('should throw a default error when no status or message is present', () => {
            const error = {};

            try {
                handleError(error);
            } catch (err) {
                expect(err).toBeInstanceOf(ApiErrorResponseDto);
                expect(err.statusCode).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
                expect(err.message).toBe('An unexpected error occurred');
            }
        });
    });

    describe('handleResponse', () => {
        it('should return a message when the response data is a string', () => {
            const result = handleResponse(axiosSuccess);
            
            expect(result).toEqual({
                message: 'Resource Found',
                statusCode: 200
            });
        });

        it('should return the response data when it is an object', () => {
            const result = handleResponse(axiosSuccess) as ApiResponseDto;
            
            expect(result).toEqual({
                message: 'Resource Found',
                statusCode: 200
            });
        });

        it('should return an empty message if the response data is not a string or object', () => {
            const axiosResponse = {
                ...axiosSuccess,
                data: 1
            };
            
            const result = handleResponse(axiosResponse);
            
            expect(result).toEqual({
                message: '',
                statusCode: 200
            });
        });
    });

    describe('handleShopifyError', () => {
        it('should return an error object with status and data', () => {
            const errorData = { 
                status: HttpStatus.INTERNAL_SERVER_ERROR, 
                error: 'Shopify error' 
            };

            const result = handleShopifyError(errorData);

            expect(result).toEqual({
                data: errorData,
                status: 500
            });
        });
    });

    describe('genericErrorMessage', () => {
        let originalCmsProvider: string | undefined;

        beforeAll(() => {
            // Store the original value of process.env.CMS_PROVIDER before any tests run
            originalCmsProvider = process.env.CMS_PROVIDER;
        });
    
        afterEach(() => {
            // Restore the original value after each test
            process.env.CMS_PROVIDER = originalCmsProvider;
        });
        
        it('should return a generic error message with the CMS provider', () => {
            process.env.CMS_PROVIDER = 'Shopify';
            const result = genericErrorMessage();
            expect(result).toBe('Error handling the request to Shopify');
        });
    });
});
