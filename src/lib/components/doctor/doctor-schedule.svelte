<script>
	import { fade } from 'svelte/transition';
	import { m } from '$lib';
	import { Plus } from 'svelte-feathers';
	import Button from '../../../routes/(private)/office/button.svelte';
</script>

<table transition:fade class="mt-10 w-[90%] table-fixed text-dark-main-80">
	<thead class="px-8">
		<tr>
			<th class="w-1/7 border border-main-100 py-4"> {m.time_range()}</th>
			<th class="w-1/7 border border-main-100 py-4">{m.week_saturday()}</th>
			<th class="w-1/7 border border-main-100 py-4">{m.week_sunday()}</th>
			<th class="w-1/7 border border-main-100 py-4">{m.week_monday()}</th>
			<th class="w-1/7 border border-main-100 py-4">{m.week_tuesday()}</th>
			<th class="w-1/7 border border-main-100 py-4">{m.week_wednesday()}</th>
			<th class="w-1/7 border border-main-100 py-4">{m.week_thursday()}</th>
		</tr>
	</thead>
	<tbody class="px-8"> </tbody>
</table>

<div class="w-[90%] mt-2 mb-10">
	<Button class="bg-dark-main-80 rounded-[2px]">
		<Plus class="m-auto size-5" />
	</Button>
</div>
