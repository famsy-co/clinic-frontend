export interface ListResponseDto<T, U = unknown> {
	count: number;
	result: T[];
	metadata?: U;
}
