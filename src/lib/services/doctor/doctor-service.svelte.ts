import { HttpService } from '../http/http.service';
import type { Appointment } from '../office/interfaces/appointment';
import type { AddAppointmentRequestDto } from './dtos/add-appointment-request.dto';
import type { AppointmentResponseDto } from './dtos/appointment-response.dto';
import type { AppointmentsResponseDto } from './dtos/appointments-response.dto';
import type { DoctorScheduleResponseDto } from './dtos/schedule-response.dto';
import type { SetScheduleRequestDto } from './dtos/set-schedule-request.dto';
import type { SetScheduleResponseDto } from './dtos/set-schedule-response.dto';

interface Ids {
	id: string;
	apid: string;
}

export class DoctorService {
	public static async getSchedule(
		id: string,
	): Promise<DoctorScheduleResponseDto> {
		const response = await HttpService.get<DoctorScheduleResponseDto>(
			`office/doctors/${id}/schedules`,
		);
		return response.data;
	}

	public static async addSchedule(
		dto: SetScheduleRequestDto,
	): Promise<SetScheduleResponseDto> {
		const response = await HttpService.put<SetScheduleResponseDto>(
			`office/doctors/${dto.id}/schedules`,
			dto.schedule,
		);
		return response.data;
	}

	public static async getAppointments(
		id: string,
	): Promise<AppointmentsResponseDto> {
		const response = await HttpService.get<AppointmentsResponseDto>(
			`/office/doctors/${id}/appointments`,
		);
		return response.data;
	}

	public static async addAppointment(
		dto: AddAppointmentRequestDto,
	): Promise<AppointmentResponseDto> {
		const response = await HttpService.post<AppointmentResponseDto>(
			`/office/doctors/${dto.id}/appointments`,
			dto.appointment,
		);
		return response.data;
	}

	public static async updateAppointment(
		ids: Ids,
	): Promise<Appointment | undefined> {
		const response = await HttpService.put<Appointment>(
			`/office/doctors/${ids.id}/appointments/${ids.apid}`,
		);
		if (response.status < 300 && response.data) {
			return response.data;
		}
	}

	public static async deleteAppointment(
		ids: Ids,
	): Promise<boolean | undefined> {
		const response = await HttpService.delete<Appointment>(
			`/office/doctors/${ids.id}/appointments/${ids.apid}`,
		);
		if (response.status < 300) {
			return true;
		}
	}
}
