import { HttpService } from '../http/http.service';
import type { DoctorCreateRequestDto } from './dto/doctor-create-request.dto';
import type { DoctorListResponseDto } from './dto/doctor-list-response.dto';
import type { DoctorUpdateRequestDto } from './dto/doctor-update-request.dto';
import type { LoginResponseDto } from './dto/login-response.dto';
import type { OfficeLoginRequestDto } from './dto/office-login-request.dto';
import type { Doctor } from './interfaces/doctor';
import type { Office } from './interfaces/office';

export class OfficeService {
	public static async login(
		dto: OfficeLoginRequestDto,
	): Promise<LoginResponseDto | undefined> {
		const response = await HttpService.post<LoginResponseDto>(
			'/office/auth/login',
			dto,
		);
		if (response.status < 300) {
			return response.data;
		}
	}

	public static async getOffice(): Promise<Office | undefined> {
		const response = await HttpService.get<Office>('/auth/office/self');

		if (response.status < 300 && response.data) {
			return;
		}
	}

	public static async getDoctors(): Promise<DoctorListResponseDto> {
		const response =
			await HttpService.get<DoctorListResponseDto>('/office/doctors');
		return response.data;
	}

	public static async addDoctor(
		dto: DoctorCreateRequestDto,
	): Promise<Doctor | undefined> {
		const response = await HttpService.post<Doctor>('/office/doctors', dto);
		if (response.status < 300 && response.data) {
			return response.data;
		}
	}

	public static async updateDoctor(
		dto: DoctorUpdateRequestDto,
	): Promise<Doctor | undefined> {
		const response = await HttpService.patch<Doctor>(
			'/office/doctors/' + dto.id,
			dto,
		);
		if (response.status < 300 && response.data) {
			return response.data;
		}
	}

	public static async deleteDoctor(id: string): Promise<boolean | undefined> {
		const response = await HttpService.delete<Doctor>('/office/doctors/' + id);
		if (response.status < 300) {
			return true;
		}
	}
}
