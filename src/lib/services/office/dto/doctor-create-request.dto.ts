import type { Doctor } from '../interfaces/doctor';

export type DoctorCreateRequestDto = Omit<Doctor, 'id'>;
