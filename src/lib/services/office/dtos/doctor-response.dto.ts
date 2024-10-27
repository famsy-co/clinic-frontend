import type { ResponseDto } from '$lib/types/dto/response.dto';
import type { DoctorDto } from './doctor.dto';

export type DoctorResponseDto = ResponseDto<DoctorDto>;
