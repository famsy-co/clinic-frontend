import type { Patient } from './patient';

export interface Appointment {
	id?: string;
	patient: Patient;
	schedule_id: number;
	appointment_time: string;
}
