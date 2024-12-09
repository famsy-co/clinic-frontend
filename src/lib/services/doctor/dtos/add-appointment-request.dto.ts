import type { Appointment } from '$lib/services/office/interfaces/appointment';

export interface AddAppointmentRequestDto {
	id: string;
	appointment: Appointment;
}
