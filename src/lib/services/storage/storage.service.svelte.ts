import type { User } from '$lib/interfaces/user';
import type { StorageSlot } from './entities/storage-slot';
import { LocalStorageSlot } from './local-storage-slot.svelte';

class _StorageService {
	public user = new LocalStorageSlot<User | null>('user', null);
	public reset() {
		Object.entries(this).forEach(
			([, value]: [string, StorageSlot<unknown>]) => {
				value.init();
			},
		);
	}
	public usePresist() {
		$effect(() => {
			Object.entries(this).forEach(
				([, value]: [string, StorageSlot<unknown>]) => {
					value.presist(value.value);
				},
			);
		});
	}

	public user_token = new LocalStorageSlot<string | null>(
		'user_token',
		null,
	  );
	  
}
export const StorageService = new _StorageService();
