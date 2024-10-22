<script lang="ts">
	import type { Snippet } from 'svelte';

	let { label, children }: { label: string; children: Snippet } = $props();
	const names = ['yusef', 'mammad', 'hasan', 'ali'];
</script>

<h1>{label}</h1>
<button>
	{@render children()}
</button>

{#each names as name}
	<h1>hello {name}</h1>
{/each}
