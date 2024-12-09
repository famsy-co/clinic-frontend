import type { Patient } from '$lib/services/office/interfaces/patient';
import type { ResponseDto } from '$lib/types/dto/response.dto';

export type SetScheduleResponseDto = ResponseDto<Patient[]>;
