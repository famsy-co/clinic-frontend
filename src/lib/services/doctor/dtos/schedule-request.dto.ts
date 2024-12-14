export interface DoctorScheduleDto {
	table: {
		id: string;
		day: string;
		time_range: string;
		mode?: 'odd' | 'even' | 'all';
	}[];
}
