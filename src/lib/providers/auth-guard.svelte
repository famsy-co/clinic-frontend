<script module lang="ts">
	import { StorageService } from '$lib/services/storage/storage.service.svelte';
	import type { User } from '$lib/interfaces/user';
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
			login(u: User) {
				StorageService.user.value = u;
				goto('/', {
					replaceState: true,
				});
			},
		});
		return auth;
	}
</script>

<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import { type Snippet } from 'svelte';
	let { children }: { children: Snippet } = $props();
	const auth = useAuth();
	afterNavigate(() => {
		if (!auth.user) {
			goto('/login');
		}
	});
</script>

{#if auth.user}
	{@render children()}
{/if}
