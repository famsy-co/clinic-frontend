import type { StorageSlot } from './entities/storage-slot';

export class SessionStorageSlot<T> implements StorageSlot<T> {
	value = $state<T>() as T;
	constructor(
		private key: string,
		private initialValue: T,
	) {
		let presistVal: T;
		try {
			presistVal = JSON.parse(sessionStorage.getItem(key)!);
		} catch {
			presistVal = initialValue;
		}
		this.value = presistVal;
	}
	presist(arg: T): void {
		sessionStorage.setItem(this.key, JSON.stringify(arg));
	}
	init(): StorageSlot<T> {
		this.value = this.initialValue;
		return this;
	}
}
