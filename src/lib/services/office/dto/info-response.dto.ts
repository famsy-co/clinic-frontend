import type { ResponseDto } from '$lib/types/dto/response.dto';
import type { Doctor } from '../interfaces/doctor';
import type { Office } from '../interfaces/office';

export type InfoResponseDto = ResponseDto<{ office: Office; doctor: Doctor }>;
