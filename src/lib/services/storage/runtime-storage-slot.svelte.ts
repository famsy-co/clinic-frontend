import type { StorageSlot } from './entities/storage-slot';

export class RuntimeStorageSlot<T> implements StorageSlot<T> {
	value = $state<T>() as T;
	constructor(
		private _key: string,
		private initialValue: T,
	) {
		this.value = initialValue;
	}
	presist(): void {}
	init(): StorageSlot<T> {
		this.value = this.initialValue;
		return this;
	}
}
