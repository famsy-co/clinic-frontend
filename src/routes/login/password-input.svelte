<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import TextInput from './text-input.svelte';
	import { cn } from '$lib';
	import { EyeOff, Eye } from 'svelte-feathers';
	import { scale } from 'svelte/transition';
	let {
		class: className,
		value = $bindable(''),
		...props
	}: ComponentProps<TextInput> = $props();
	let isVisible = $state(false);
</script>

<div class={cn('relative w-full', className)}>
	<TextInput
		bind:value
		class=""
		type={isVisible ? 'text' : 'password'}
		{...props}
	/>
	<button
		type="button"
		class="absolute left-3 top-1/2 size-6 -translate-y-1/2
		"
		onclick={() => (isVisible = !isVisible)}
	>
		{#key isVisible}
			<div transition:scale class="absolute inset-0 text-[#A1ACBD]">
				{#if isVisible}
					<EyeOff />
				{:else}
					<Eye />
				{/if}
			</div>
		{/key}
	</button>
</div>
