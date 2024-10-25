<script lang="ts">
	import type { Snippet } from 'svelte';
	import { fly } from 'svelte/transition';
	interface ModalProps {
		children: Snippet;
		isOpen?: boolean;
		onClose?(): void;
	}

	const { children, isOpen, onClose }: ModalProps = $props();
</script>

{#if isOpen}
	<div transition:fly={{ y: 50 }} class="fixed inset-0 backdrop-blur-sm">
		<button
			onclick={onClose}
			aria-label="close modal"
			class="absolute
			inset-0"
		>
		</button>
		<div class="absolute inset-0 contents">
			{@render children()}
		</div>
	</div>
{/if}
