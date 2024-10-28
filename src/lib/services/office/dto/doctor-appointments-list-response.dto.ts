import type { ListResponseDto } from '$lib/types/dto/list-response.dto';
import type { Appointment } from '../interfaces/appointment';

export type DoctorAppointmentsListResponseDto = ListResponseDto<Appointment>;
