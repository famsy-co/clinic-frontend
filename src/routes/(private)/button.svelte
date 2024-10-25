<script lang="ts">
    import { cn } from '$lib';
    import type { HTMLButtonAttributes } from 'svelte/elements';
	import { scale } from 'svelte/transition';
    let { class: className, children, ...props }: HTMLButtonAttributes = $props();

</script>

<button
	class={cn(
		'text-foreground-100 size-7 text-center rounded-lg transition active:scale-95',
		className,
	)}
	transition:scale
	{...props}
>
	{#if children}
		{@render children()}
	{/if}
</button>