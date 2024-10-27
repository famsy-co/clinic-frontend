<script lang="ts">
	import { cn } from '$lib';
	import type { HTMLInputAttributes } from 'svelte/elements';
	interface Props extends HTMLInputAttributes {
		ref?: HTMLInputElement;
	}
	let {
		value = $bindable(''),
		class: className,
		ref: ref = $bindable(),
		...props
	}: Props = $props();
</script>

<input
	bind:value
	type="text"
	class={cn(
		'h-10 w-full rounded border border-transparent bg-foreground-100 px-3 text-sm placeholder-main-60 outline-none transition focus:border-[#256159]',
		className,
	)}
	bind:this={ref}
	{...props}
/>
