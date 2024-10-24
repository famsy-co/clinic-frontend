<script lang="ts">
	import '../app.css';
	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import '@fontsource-variable/vazirmatn';
	import dayjs from 'dayjs';
	import minMax from 'dayjs/plugin/minMax';
	import jalaliday from 'jalaliday';
	import { onMount } from 'svelte';
	import { StorageService } from '$lib/services/storage/storage.service.svelte';

	onMount(() => {
		dayjs.extend(jalaliday).calendar('jalali');
		dayjs.extend(minMax);
		dayjs.locale('fa');
	});
	StorageService.usePresist();

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
