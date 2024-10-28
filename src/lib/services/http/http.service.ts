import axios from 'axios';
import { PUBLIC_API_URL } from '$env/static/public';

import { StorageService } from '../storage/storage.service.svelte';

export const HttpService = axios.create({
	baseURL: PUBLIC_API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
	validateStatus: (status) => status < 500 && status !== 401,
});

HttpService.interceptors.request.use(
	function (config) {
		const token = StorageService.user.value?.access_token;
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
