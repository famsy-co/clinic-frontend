export interface StorageSlot<T> {
	value: T;
	presist(arg: T): void;
	init(): StorageSlot<T>;
}
