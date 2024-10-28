<script lang="ts">
	import { Search, Plus, Minus, Edit3 } from 'svelte-feathers';
	import { flip } from 'svelte/animate';
	import { m } from '$lib';
	import { fly, scale, slide } from 'svelte/transition';
	import Button from './button.svelte';
	import TextInput from '$lib/components/text-input.svelte';
	import { onMount } from 'svelte';
	import { OfficeService } from '$lib/services/office/office.service.svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import { queryClient } from '../+layout.svelte';
	import type { Doctor } from '$lib/services/office/interfaces/doctor';
	import Fuse from 'fuse.js';
	interface Props {
		onAddDoctor?(doctor?: Doctor): void;
	}

	let { onAddDoctor }: Props = $props();

	onMount(() => {
		OfficeService.getDoctors().then(console.log);
	});
	let search = $state(false);
	let searchValue = $state('');
	let doctorsQuery = createQuery({
		queryKey: ['/office/doctors'],
		queryFn: OfficeService.getDoctors,
	});
	async function removeDoctor(id: string) {
		await OfficeService.deleteDoctor(id.toString());
		queryClient.invalidateQueries({
			queryKey: ['/office/doctors'],
		});
	}
	const doctors = $derived($doctorsQuery.data?.result ?? []);
	let fuse = new Fuse<Doctor>([], {
		keys: ['name', 'last_name'],
	});
	let input: HTMLInputElement | undefined = $state();
	$effect(() => {
		if (input != null && search) {
			input.focus();
		}
	});

	const searchResult = $derived.by(() => {
		fuse.setCollection(doctors);
		const res = fuse.search(searchValue);
		return res.map((item) => item.item);
	});
</script>

<div class="m-20 mt-14 min-h-[180px] rounded-2xl border border-dark-main-100">
	<div
		class="flex h-12 flex-grow items-center justify-between rounded-t-2xl bg-gradient-to-l from-dark-main-100 to-main-100
                p-8 text-2xl text-foreground-100"
	>
		<p>{m.office_home_doctors()}</p>

		<div class="flex gap-5">
			<div class="flex items-center">
				<button
					onclick={() => {
						search = true;
					}}
					class="relative size-6 transition active:scale-95"
				>
					{#key search}
						<div
							transition:fly={{ x: -100 }}
							class="absolute
							top-0 size-full"
						>
							{#if !search}
								<Search />
							{/if}
						</div>
					{/key}
				</button>
				{#if search}
					<div transition:slide={{ axis: 'x' }} class="relative pr-5">
						<TextInput
							bind:ref={input}
							bind:value={searchValue}
							onblur={() => {
								search = false;
							}}
							class="pl-10 text-dark-main-100"
						/>
						<div
							transition:fly|global={{ x: 25 }}
							class="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2
							text-main-100"
						>
							<Search />
						</div>
					</div>
				{/if}
			</div>
			<button
				onclick={() => onAddDoctor?.()}
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
			{#each searchResult.length ? searchResult : doctors as doctor, index (doctor.id)}
				<tr class="border-b-dark-main-10 border-t-[1px] px-8">
					<td class="py-4 text-center">{index + 1}</td>
					<td class="py-4 text-center"
						>{doctor.name + ' ' + doctor.last_name}</td
					>
					<td class="py-4 text-center">{doctor.doctor_code}</td>
					<td class="py-4 text-center">{doctor.speciality}</td>
					<td class="py-4 pl-7 text-left">
						<Button
							onclick={() => onAddDoctor?.(doctor)}
							class="ml-4 bg-soft-100"
						>
							<Edit3 class="m-auto size-5" />
						</Button>
						<Button
							onclick={() => removeDoctor(doctor.id)}
							class="bg-error-100"
						>
							<Minus class="m-auto size-5" />
						</Button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
