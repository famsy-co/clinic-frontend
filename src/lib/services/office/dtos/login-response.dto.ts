import type { ResponseDto } from '$lib/types/dto/response.dto';
import type { OfficeLoginRequestDto } from './office-login.dto';

export type LoginResponseDto = ResponseDto<{
	office: OfficeLoginRequestDto;
	token: string;
}>;
