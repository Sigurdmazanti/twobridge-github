import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export const axiosError = {
	isAxiosError: true,
	message: 'Not Found',
	response: {
		status: 404,
		data: {
			message: 'Resource Not Found',
		},
	},
} as AxiosError;

export const axiosSuccess = {
	isAxiosError: false,
	message: 'Success',
	status: 200,
	statusText: 'OK',
	headers: {},
	config: {
		headers: {},
	} as AxiosRequestConfig,
	data: {
		message: 'Resource Found',
	},
} as AxiosResponse;
