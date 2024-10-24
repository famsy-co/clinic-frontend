<script lang="ts">
	import { slide } from 'svelte/transition';

	let { message }: { message?: string } = $props();
</script>

{#if message}
	<div class="pt-2 text-sm text-secondary-100" transition:slide>
		{message}
	</div>
{/if}
