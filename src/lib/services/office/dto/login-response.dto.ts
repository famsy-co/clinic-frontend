import type { Doctor } from '../interfaces/doctor';
import type { Office } from '../interfaces/office';

export type LoginResponseDto = {
	access_token: 'string';
	refresh_token: 'string';
	office: Office;
	doctor: Doctor;
};
