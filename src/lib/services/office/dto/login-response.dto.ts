import type { Office } from '../interfaces/office';

export type LoginResponseDto = {
	access_token: string;
	office: Office;
};
