<script lang="ts">
	import Modal from '$lib/components/modal.svelte';
	import TextInput from '$lib/components/text-input.svelte';
	import Button from '$lib/components/button.svelte';
	import _, { filter } from 'lodash';
	import { Plus } from 'svelte-feathers';
	import { m } from '$lib';
	import { fly } from 'svelte/transition';
	import type { MouseEventHandler } from 'svelte/elements';
	import { z } from 'zod';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { queryClient } from '../../../../+layout.svelte';
	import type { Appointment } from '$lib/services/office/interfaces/appointment';
	import { DoctorService } from '$lib/services/doctor/doctor-service.svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import SelectInput from '$lib/components/select-input.svelte';
	import dayjs from 'dayjs';

	let { isOpen, onClose, appointment, doctor_id }: Props = $props();
	const appointmentSchema = z.object({
		first_name: z.string(),
		last_name: z.string(),
		phone_number: z.string(),
		national_code: z.string(),
		schedule_id: z.number().min(0),
	});
	type Schema = z.infer<typeof appointmentSchema>;
	let schedulesQuery = createQuery({
		queryKey: [`/office/doctors/${doctor_id}/schedules`],
		queryFn: async () => DoctorService.getSchedule(doctor_id),
	});
	let scheduleTable = $derived($schedulesQuery.data?.table ?? []);
	let date = $state(-1);
	let today_schedules = $derived(
		scheduleTable.filter((item) => dayjs(item.day).get('day') === date),
	);
	interface Props {
		isOpen?: boolean;
		onClose?(): void;
		appointment?: Appointment;
		doctor_id: string;
	}

	const onMouseMove = _.throttle<MouseEventHandler<HTMLDivElement>>((e) => {
		const { left, top } = e.currentTarget.getBoundingClientRect();
		mouseX = e.x - left;
		mouseY = e.y - top;
	}, 75);

	let mouseX = $state(0);
	let mouseY = $state(0);
	const { form, enhance } = superForm<Schema>(
		{
			first_name: appointment?.patient.first_name ?? '',
			last_name: appointment?.patient.last_name ?? '',
			phone_number: appointment?.patient.phone_number ?? '',
			national_code: appointment?.patient.national_code ?? '',
			schedule_id: -1,
		},
		{
			SPA: true,
			validators: zodClient(appointmentSchema),
			async onUpdate({ form }) {
				if (form.valid) {
					const data = form.data;
					if (appointment) {
						const res = await DoctorService.updateAppointment(
							{
								...form.data,
								id: doctor_id,
								apid: appointment.id ?? '',
							},
							{
								id: doctor_id,
								appointment: {
									patient: {
										first_name: data.first_name,
										last_name: data.last_name,
										national_code: data.national_code,
										phone_number: data.phone_number,
									},
									schedule_id: data.schedule_id,
								},
							},
						);
						if (res) {
							queryClient.invalidateQueries({
								queryKey: [`/office/doctors/${doctor_id}/appointments`],
							});
							onClose?.();
						}
					} else {
						const res = await DoctorService.addAppointment({
							id: doctor_id,
							appointment: {
								patient: {
									first_name: data.first_name,
									last_name: data.last_name,
									national_code: data.national_code,
									phone_number: data.phone_number,
								},
								schedule_id: data.schedule_id,
							},
						});
						if (res) {
							queryClient.invalidateQueries({
								queryKey: [`/office/doctors/${doctor_id}/appointments`],
							});
							onClose?.();
						}
						if (res) {
							queryClient.invalidateQueries({
								queryKey: [`/office/doctors/${doctor_id}/appointments`],
							});
							onClose?.();
						}
					}
				}
			},
		},
	);
	const week_days = [
		m.week_saturday(),
		m.week_sunday(),
		m.week_monday(),
		m.week_monday(),
		m.week_tuesday(),
		m.week_wednesday(),
		m.week_thursday(),
	];

	$effect(() => {
		console.log(date);
	});
</script>

<Modal {isOpen} {onClose}>
	<div
		transition:fly|global={{ y: 25 }}
		role="dialog"
		onmousemove={onMouseMove}
		style:--mouse-y={mouseY + 'px'}
		style:--mouse-x={mouseX + 'px'}
		class="gradient-border absolute left-1/2 top-1/2 -translate-x-1/2
		-translate-y-1/2 rounded-[20px] bg-[#256159]/10 p-1
		backdrop-blur-lg"
	>
		<div
			class="mask relative z-10 flex h-[569px] w-[495px] flex-col rounded-[16px] bg-transparent pb-8"
		>
			<button
				onclick={onClose}
				class="m-4 mb-8 flex size-8
				items-center justify-center rounded-lg bg-[#256159]
				transition hover:bg-secondary-100 active:scale-90"
			>
				<Plus class="size-6 rotate-45 text-foreground-100" />
			</button>
			<form use:enhance class="flex flex-1 flex-col gap-5 px-9">
				<div class="flex gap-3">
					<TextInput
						bind:value={$form.first_name}
						placeholder={m.general_name()}
						class="bg-foreground-100"
					/>
					<TextInput
						bind:value={$form.last_name}
						placeholder={m.general_lastname()}
						class="bg-foreground-100"
					/>
				</div>
				<TextInput
					bind:value={$form.phone_number}
					placeholder={m.general_phone_number()}
					class="bg-foreground-100"
				/>
				<TextInput
					bind:value={$form.national_code}
					placeholder={m.general_national_code()}
					class="bg-foreground-100"
				/>
				<SelectInput bind:value={date}>
					{#each week_days as week_day, index}
						{#if scheduleTable.filter((item) => dayjs(item.day).get('day') === index).length}
							<option value={index}> {week_day} </option>
						{/if}
					{/each}
				</SelectInput>
				<SelectInput bind:value={$form.schedule_id}>
					{#each today_schedules as schedule}
						<option value={schedule.id}> {schedule.time_range} </option>
					{/each}
				</SelectInput>
				<Button class="mt-auto">{m.office_modal__submit()}</Button>
			</form>
		</div>
	</div>
</Modal>

<style>
	.gradient-border {
		--secondary: #4bc7b7;
		--secondary-2: #256159;
		&::before {
			content: '';
			position: absolute;
			inset: 0;
			border-radius: 16px;
			border: 4px solid transparent;
			background: linear-gradient(to top, var(--secondary), var(--secondary-2))
				border-box;
			-webkit-mask:
				linear-gradient(#fff 0 0) padding-box,
				linear-gradient(#fff 0 0);
			mask:
				linear-gradient(#fff 0 0) padding-box,
				linear-gradient(#fff 0 0);
			-webkit-mask-composite: destination-out;
			mask-composite: exclude;
		}
		&::after {
			content: '';
			position: absolute;
			inset: 0;
			border-radius: 16px;
			border: 4px solid transparent;
			background: radial-gradient(
					150px circle at var(--mouse-x) var(--mouse-y),
					var(--secondary),
					transparent
				)
				border-box;
			-webkit-mask:
				linear-gradient(#fff 0 0) padding-box,
				linear-gradient(#fff 0 0);
			mask:
				linear-gradient(#fff 0 0) padding-box,
				linear-gradient(#fff 0 0);
			-webkit-mask-composite: destination-out;
			mask-composite: exclude;
			opacity: 0;
			transition: opacity 300ms;
		}
		&:hover {
			&::after {
				opacity: 1;
			}
		}
	}
</style>
