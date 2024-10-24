<script lang="ts">
	import AuthGuard from '$lib/providers/auth-guard.svelte';
	import type { Snippet } from 'svelte';
	let { children }: { children: Snippet } = $props();
</script>

<AuthGuard>
	{@render children()}
</AuthGuard>
