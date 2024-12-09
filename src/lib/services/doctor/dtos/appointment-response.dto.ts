import type { Appointment } from '$lib/services/office/interfaces/appointment';
import type { ResponseDto } from '$lib/types/dto/response.dto';

export type AppointmentResponseDto = ResponseDto<Appointment>;
