<script lang="ts">
	import { cn } from '$lib';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	let { class: className, children, ...props }: HTMLButtonAttributes = $props();
</script>

<button
	class={cn(
		'h-10 w-full rounded bg-secondary-100 text-foreground-100 transition active:scale-95',
		className,
	)}
	{...props}
>
	{#if children}
		{@render children()}
	{/if}
</button>
