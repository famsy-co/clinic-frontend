<script lang="ts">
	import ReverseAuthGuard from '$lib/providers/reverse-auth-guard.svelte';
	import type { Snippet } from 'svelte';
	let { children }: { children: Snippet } = $props();
</script>

<ReverseAuthGuard>
	{@render children()}
</ReverseAuthGuard>
