<script module lang="ts">
	import { StorageService } from '$lib/services/storage/storage.service.svelte';
	export function useAuth() {
		const user = $derived(StorageService.user.value);
		let auth = $state({
			get user() {
				return user;
			},
			logout() {
				StorageService.reset();
				goto('/login', {
					replaceState: true,
				});
			},
			login(u: LoginResponseDto) {
				StorageService.user.value = u;
				if (u.office) {
					goto('/office', {
						replaceState: true,
					});
				} else if (u.doctor) {
					goto('/doctor', { replaceState: true });
				}
			},
		});
		return auth;
	}
</script>

<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import { type Snippet } from 'svelte';
	import type { LoginResponseDto } from '$lib/services/office/dto/login-response.dto';
	let { children }: { children: Snippet } = $props();
	const auth = useAuth();
	afterNavigate(() => {
		if (!auth.user) {
			goto('/login', {
				replaceState: true,
			});
		}
	});
</script>

{#if auth.user}
	{@render children()}
{/if}
