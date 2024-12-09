import type { DoctorScheduleDto } from './schedule-request.dto';

export interface SetScheduleRequestDto {
	id: string;
	schedule: DoctorScheduleDto[];
}
