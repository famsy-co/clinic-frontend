import type { ResponseDto } from '$lib/types/dto/response.dto';
import type { DoctorScheduleDto } from './schedule-request.dto';

export type DoctorScheduleResponseDto = ResponseDto<DoctorScheduleDto[]>;
