import type { StorageSlot } from './entities/storage-slot';

export class LocalStorageSlot<T> implements StorageSlot<T> {
	value = $state<T>() as T;
	constructor(
		private key: string,
		private initialValue: T,
	) {
		let presistVal: T;
		try {
			presistVal = JSON.parse(localStorage.getItem(key)!);
		} catch {
			presistVal = initialValue;
		}
		this.value = presistVal;
	}
	presist(arg: T): void {
		localStorage.setItem(this.key, JSON.stringify(arg));
	}
	init(): StorageSlot<T> {
		this.value = this.initialValue;
		return this;
	}
}
