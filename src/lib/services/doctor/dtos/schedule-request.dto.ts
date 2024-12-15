export interface DoctorScheduleDto {
	table: {
		id: string;
		day: string;
		time_range: string;
		rate: number;
		mode?: 'odd' | 'even' | 'all';
	}[];
}
