<script module lang="ts">
	import { QueryClientProvider, QueryClient } from '@tanstack/svelte-query';
	export const queryClient = new QueryClient();
</script>

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
	import { Toaster } from 'svelte-french-toast';

	onMount(() => {
		dayjs.extend(jalaliday).calendar('jalali');
		dayjs.extend(minMax);
		dayjs.locale('fa');
	});
	StorageService.usePresist();

	let { children } = $props();
</script>

<ParaglideJS {i18n}>
	<QueryClientProvider client={queryClient}>
		{@render children()}
	</QueryClientProvider>
</ParaglideJS>
<Toaster />

<style>
	:global(body) {
		font-family: 'Vazirmatn Variable', sans-serif;
	}
</style>
