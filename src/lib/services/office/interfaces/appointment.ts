import type { Patient } from './patient';

export interface Appointment {
	id: string;
	patient: Patient;
	appointment_time: string;
}
