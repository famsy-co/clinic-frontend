import type { DoctorDto } from './doctor.dto';

export type DoctorCreateRequestDto = Omit<DoctorDto, 'id'>;
