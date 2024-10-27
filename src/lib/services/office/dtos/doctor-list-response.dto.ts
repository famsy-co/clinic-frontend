import type { ListResponseDto } from '$lib/types/dto/list-response.dto';
import type { DoctorDto } from './doctor.dto';

export type DoctorListResponseDto = ListResponseDto<DoctorDto>;
