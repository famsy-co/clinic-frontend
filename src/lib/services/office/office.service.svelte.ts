import { HttpService } from '../http/http.service';
import type { DoctorCreateRequestDto } from './dtos/doctor-create.dto';
import type { DoctorListResponseDto } from './dtos/doctor-list-response.dto';
import type { DoctorDto } from './dtos/doctor.dto';
import type { LoginResponseDto } from './dtos/login-response.dto';
import type { OfficeLoginRequestDto } from './dtos/office-login.dto';
import type { OfficeResponseDto } from './dtos/office-response.dto';

export class OfficeService {
	public static async login(
		dto: OfficeLoginRequestDto,
	): Promise<LoginResponseDto> {
		const response = await HttpService.post<LoginResponseDto>(
			'/auth/office/login',
			dto,
		);
		return response.data;
	}

	public static async getOffice(): Promise<OfficeResponseDto> {
		const response =
			await HttpService.get<OfficeResponseDto>('/auth/office/self');
		return response.data;
	}

	public static async getDoctors(): Promise<DoctorListResponseDto> {
		//office id?
		const response =
			await HttpService.get<DoctorListResponseDto>('/office/doctors');
		return response.data;
	}

	public static async addDoctor(dto: DoctorCreateRequestDto): Promise<> {
		const response = await HttpService.post<>('/office/doctors', dto);
		return response.data;
	}

	public static async updateDoctor(dto: DoctorDto): Promise<> {
		const response = await HttpService.put<>('/office/doctors/' + dto.id);
		return response.data;
	}

	public static async deleteDoctor(id: string): Promise<> {
		const response = await HttpService.delete<>('/office/doctors/' + id);
		return response.data;
	}
}
