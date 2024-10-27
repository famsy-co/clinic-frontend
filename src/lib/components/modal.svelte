<script lang="ts">
	import type { Snippet } from 'svelte';
	import { blur } from 'svelte/transition';
	interface ModalProps {
		children: Snippet;
		isOpen?: boolean;
		onClose?(): void;
	}

	const { children, isOpen, onClose }: ModalProps = $props();
</script>

{#if isOpen}
	<div class="fixed inset-0">
		<button
		    transition:blur|global
			onclick={onClose}
			aria-label="close modal"
			class="absolute
			inset-0 backdrop-blur-[2px]"
		>
		</button>
		<div class="absolute inset-0 contents">
			{@render children()}
		</div>
	</div>
{/if}
