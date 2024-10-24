<script lang="ts">
	import { useAuth } from './auth-guard.svelte';
	import { afterNavigate, goto } from '$app/navigation';
	import { type Snippet } from 'svelte';
	let { children }: { children: Snippet } = $props();
	const auth = useAuth();
	afterNavigate(() => {
		if (auth.user) {
			goto('/');
		}
	});
</script>

{#if !auth.user}
	{@render children()}
{/if}
