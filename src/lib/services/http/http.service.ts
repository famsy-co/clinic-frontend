import axios from 'axios';

import { StorageService } from '../storage/storage.service.svelte';

export const HttpService = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	validateStatus: (status) => status < 300,
});

HttpService.interceptors.request.use(
	function (config) {
		const token = StorageService.user_token.value;
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	function (error) {
		return Promise.reject(error);
	},
);

HttpService.interceptors.response.use(
	function (response) {
		return response;
	},
	function (error) {
		if (axios.isCancel(error)) {
			console.warn('Request canceled', error.message);
			return Promise.reject(error);
		}

		console.error('API Error:', error);

		if (error.response && error.response.status === 401) {
			// TODO: save current path
			StorageService.reset();
			location.href = '/login';
		}

		return Promise.reject(error);
	},
);
