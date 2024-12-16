<script lang="ts">
	import { cn } from '$lib';
	import type { Snippet } from 'svelte';
	import type { HTMLSelectAttributes } from 'svelte/elements';
	interface Props extends HTMLSelectAttributes {
		ref?: HTMLSelectElement;
		children: Snippet;
	}
	let {
		value = $bindable(''),
		class: className,
		ref: ref = $bindable(),
		children,
		...props
	}: Props = $props();
</script>

<select
	bind:value
	class={cn(
		'h-10 w-full rounded border border-transparent bg-foreground-100 px-3 text-sm placeholder-main-60 outline-none transition focus:border-[#256159]',
		className,
	)}
	bind:this={ref}
	{...props}
>
	{@render children()}
</select>
