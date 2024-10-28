export interface DoctorScheduleUpdateRequestDto {
	table: {
		day: string;
		time_range: string;
		mode?: 'odd' | 'even' | 'all';
	}[];
}
