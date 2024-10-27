export interface DoctorDto {
	id: string;
	name: string;
	last_name: string;
	national_code: string;
	doctor_code: string;
	//speciality: SpecialityEnum;
	speciality: string;
	email?: string;
}
