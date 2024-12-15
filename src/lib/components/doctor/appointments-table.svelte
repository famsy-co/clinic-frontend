<script lang="ts">
	import {
		Search,
		Plus,
		Minus,
		Edit3,
		Check,
		CheckCircle,
		CheckSquare,
	} from 'svelte-feathers';
	import { m, toPersianDate } from '$lib';
	import { fade, fly, scale, slide } from 'svelte/transition';
	import Button from '../../../routes/(private)/office/button.svelte';
	import TextInput from '$lib/components/text-input.svelte';
	import { onMount } from 'svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import { queryClient } from '../../../routes/+layout.svelte';
	import Fuse from 'fuse.js';
	import type { Appointment } from '$lib/services/office/interfaces/appointment';

	import {
		DoctorService,
		type Ids,
	} from '$lib/services/doctor/doctor-service.svelte';

	import dayjs from 'dayjs';
	interface Props {
		doctor_id: string;
		isDoctor: boolean;
		onAddAppointment?(appointment?: Appointment): void;
	}

	let { doctor_id, isDoctor, onAddAppointment }: Props = $props();

	onMount(() => {
		DoctorService.getAppointments(doctor_id).then(console.log);
	});

	let search = $state(false);
	let searchValue = $state('');

	let appointmentsQuery = createQuery({
		queryKey: [`/office/doctors/${doctor_id}/appointments`],
		queryFn: async () => DoctorService.getAppointments(doctor_id),
	});

	let schedulesQuery = createQuery({
		queryKey: [`/office/doctors/${doctor_id}/schedules`],
		queryFn: async () => DoctorService.getSchedule(doctor_id),
	});
	$effect(() => {
		console.log('schedule', $schedulesQuery.data?.table);
	});

	async function removeAppointment(ids: Ids) {
		await DoctorService.deleteAppointment(ids);
		await queryClient.invalidateQueries({
			queryKey: [`/office/doctors/${ids.id}/appointments/${ids.apid}`],
		});
		queryClient.invalidateQueries({
			queryKey: [`/office/doctors/${doctor_id}/appointments`],
		});
	}
	const appointments = $derived($appointmentsQuery.data?.result ?? []);

	let fuse = new Fuse<Appointment>([], {
		keys: ['patient.first_name', 'patient.last_name'],
	});

	let input: HTMLInputElement | undefined = $state();
	$effect(() => {
		if (input != null && search) {
			input.focus();
		}
	});

	const searchResult = $derived.by(() => {
		fuse.setCollection(appointments);
		const res = fuse.search(searchValue);
		return res.map((item) => item.item);
	});
</script>

<div class="m-20 mt-14 min-h-[180px] rounded-2xl border border-dark-main-100">
	<div
		class="flex h-12 flex-grow items-center justify-between rounded-t-2xl bg-gradient-to-l from-dark-main-100 to-main-100
                p-8 text-2xl text-foreground-100"
	>
		<p>{m.doctor_home_patients()}</p>

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
			{#if !isDoctor}
				<button
					onclick={() => onAddAppointment?.()}
					class="transition active:scale-95"
					transition:scale
				>
					<Plus />
				</button>
			{/if}
		</div>
	</div>

	<div class="relative">
		{#key searchValue}
			<table transition:fade class="s-table relative w-full table-fixed">
				<thead class="px-8">
					<tr>
						<th class="w-1/7 py-4">{m.general_order()}</th>
						<th class="w-1/7 py-4">{m.doctor_home_patient_name()}</th>
						<th class="w-1/7 py-4">{m.doctor_home_patient_date()}</th>
						<th class="w-1/7 py-4">{m.doctor_home_patient_day()}</th>
						<th class="w-1/7 py-4">{m.doctor_home_patient_time()}</th>
						<th class="w-1/7 py-4">{m.general_phone_number()}</th>
						<th class="w-1/7 py-4"></th>
					</tr>
				</thead>

				<tbody class="px-8">
					{#each searchResult.length ? searchResult : appointments as appointment, index}
						<tr class="border-b-dark-main-10 border-t-[1px] px-8">
							<td class="py-4 text-center">{index + 1}</td>
							<td class="py-4 text-center">
								{appointment.patient.first_name +
									' ' +
									appointment.patient.last_name}
							</td>
							<td
								class="py-4
								text-center">{toPersianDate(appointment.appointment_time)}</td
							>
							<td
								class="py-4
								text-center">{dayjs(appointment.appointment_time).format('dddd')}</td
							>
							<td
								class="py-4
								text-center"
								>{$schedulesQuery.data?.table.find(
									(item) => item.id === appointment.schedule_id,
								)?.time_range ?? ''}</td
							>
							<td class="py-4 text-center">
								{appointment.patient.phone_number}
							</td>

							<td class="py-4 text-center">
								{#if !isDoctor}
									<Button
										onclick={() => onAddAppointment?.(appointment)}
										class="ml-4 bg-soft-100"
									>
										<Edit3 class="m-auto size-5" />
									</Button>
									<Button
										onclick={() =>
											removeAppointment({
												apid: appointment.id,
												id: doctor_id,
											})}
										class="bg-error-100"
									>
										<Minus class="m-auto size-5" />
									</Button>
								{:else}
									<Button
										class="border-[2px] border-main-100 bg-foreground-100 text-main-100 active:bg-main-100 active:text-foreground-100"
										onclick={() =>
											removeAppointment({
												apid: appointment.id,
												id: doctor_id,
											})}
									>
										<Check class="m-auto size-5" />
									</Button>
								{/if}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{/key}
	</div>
</div>

<style>
	.s-table {
		&:not(:nth-of-type(1)) {
			position: absolute;
			width: 100%;
			top: 0;
		}
	}
</style>
