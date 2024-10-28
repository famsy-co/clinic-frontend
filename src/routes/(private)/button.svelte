<script lang="ts">
	import { cn } from '$lib';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { scale } from 'svelte/transition';
	let { class: className, children, ...props }: HTMLButtonAttributes = $props();
</script>

<button
	class={cn(
		'size-7 rounded-lg text-center text-foreground-100 transition active:scale-95',
		className,
	)}
	transition:scale|global
	{...props}
>
	{#if children}
		{@render children()}
	{/if}
</button>

