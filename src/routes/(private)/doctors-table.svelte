<script lang="ts">
	import { Search, Plus, Minus, Edit3 } from 'svelte-feathers';
	import { m } from '$lib';
	import { scale , slide , blur } from 'svelte/transition';
	import Button from './button.svelte';
	import TextInput from '$lib/components/text-input.svelte';
	import { setParaglideContext } from '@inlang/paraglide-sveltekit/internal';
	interface Props {
		onAddDoctor?(): void;
	}

	let { onAddDoctor }: Props = $props();

	let search = $state(false);

	const doctors = [
		{
			fullName: 'مهران احمدی',
			doctoralCode: '336584',
			specialty: 'فوق تخصص مغز و اعصاب',
		},
		{
			fullName: 'مهران احمدی',
			doctoralCode: '336584',
			specialty: 'فوق تخصص مغز و اعصاب',
		},
	];
</script>

<div class="m-20 mt-14 min-h-[180px] rounded-2xl border border-dark-main-100">
	<div
		class="flex h-12 flex-grow items-center justify-between rounded-t-2xl bg-gradient-to-l from-dark-main-100 to-main-100
                p-8 text-2xl text-foreground-100"
	>
		<p>{m.office_home_doctors()}</p>

		<div class="flex gap-5">

			{#if search}
				<div class="flex flex-row bg-foreground-100 h-10 rounded -translate-x-2"
				     transition:slide = {{axis: 'x'}}>
					<TextInput class="focus:border-none text-dark-main-100" />
					<button
						onclick={() => { search = false }}
						class="transition active:scale-95"
						transition:scale>
						<Search class="text-dark-main-100 ml-2"/>
					</button>
				</div>

			{:else}
				<button
				    onclick={() => { search = true }}
				    class="transition active:scale-95"
					transition:scale>
					<Search />
				</button>
			{/if}
			

			<button
				onclick={onAddDoctor}
				class="transition active:scale-95"
				transition:scale
			>
				<Plus />
			</button>
		</div>
	</div>

	<table class="w-full table-fixed">
		<thead class="px-8">
			<tr>
				<th class="w-1/5 py-4">{m.general_order()}</th>
				<th class="w-1/5 py-4">{m.office_home_doctor_name()}</th>
				<th class="w-1/5 py-4">{m.office_home_doctoralCode()}</th>
				<th class="w-1/5 py-4">{m.office_home_specialty()}</th>
				<th class="w-1/5 py-4"></th>
			</tr>
		</thead>
		<tbody class="px-8">
			{#each doctors as doctor, index}
				<tr class="border-b-dark-main-10 border-t-[1px] px-8">
					<td class="py-4 text-center">{index + 1}</td>
					<td class="py-4 text-center">{doctor.fullName}</td>
					<td class="py-4 text-center">{doctor.doctoralCode}</td>
					<td class="py-4 text-center">{doctor.specialty}</td>
					<td class="py-4 pl-7 text-left">
						<Button class="ml-4 bg-soft-100">
							<Edit3 class="m-auto size-5" />
						</Button>
						<Button class="bg-error-100">
							<Minus class="m-auto size-5" />
						</Button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

