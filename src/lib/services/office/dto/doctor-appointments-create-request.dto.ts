import type { Appointment } from '../interfaces/appointment';

export type DoctorAppointmentsCreateRequestDto = Omit<Appointment, 'id'>;
