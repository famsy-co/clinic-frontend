<script lang="ts">
	import '../app.css';
	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import '@fontsource-variable/vazirmatn';

	let { children } = $props();
</script>

<ParaglideJS {i18n}>
	{@render children()}
</ParaglideJS>

<style>
	:global(body) {
		font-family: 'Vazirmatn Variable', sans-serif;
	}
</style>
