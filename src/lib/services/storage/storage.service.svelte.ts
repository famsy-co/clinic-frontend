import type { LoginResponseDto } from '../office/dto/login-response.dto';
import type { StorageSlot } from './entities/storage-slot';
import { LocalStorageSlot } from './local-storage-slot.svelte';

class _StorageService {
	public user = new LocalStorageSlot<LoginResponseDto | null>('user', null);
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
}
export const StorageService = new _StorageService();
