<script lang="ts">
	import { blur, fade, slide } from 'svelte/transition';
	import { m } from '$lib';
	import { Plus } from 'svelte-feathers';
	import dayjs from 'dayjs';
	import { createQuery } from '@tanstack/svelte-query';
	import { DoctorService } from '$lib/services/doctor/doctor-service.svelte';
	import { isNaN } from 'lodash';
	import Button from '../button.svelte';

	interface Schedule {
		day: string;
		time_range: string;
		mode?: 'even' | 'odd' | 'all' | undefined;
		rate: number;
	}

	interface Props {
		doctor_id: string;
	}

	let mutations = $state<Schedule[] | undefined>();

	let { doctor_id }: Props = $props();
	let schedulesQuery = createQuery({
		queryKey: [`/office/doctors/${doctor_id}/schedules`],
		queryFn: async () => DoctorService.getSchedule(doctor_id),
	});
	let scheduleTable = $derived($schedulesQuery.data?.table ?? []);
	const week_days = [
		m.week_saturday(),
		m.week_sunday(),
		m.week_monday(),
		m.week_monday(),
		m.week_tuesday(),
		m.week_wednesday(),
		m.week_thursday(),
	];
	const time_ranges = [
		'6-8',
		'8-10',
		'10-12',
		'12-14',
		'14-16',
		'16-18',
		'18-24',
	];

	const day_mode_text = {
		even: m.even(),
		odd: m.odd(),
		all: '',
	};

	function reset_table() {
		mutations = undefined;
	}
	function remove_schedule_from_table(time_range: string, day: number) {
		if (!mutations) {
			mutations = scheduleTable ?? [];
		}
		mutations = mutations?.filter(
			(item) =>
				dayjs(item.day).get('day') !== +day || item.time_range !== time_range,
		);
		console.log(mutations);
	}
	function open_rate_modal(time_range: string, day: number) {
		let date = dayjs();
		date = date.set('d', day + 4);
		remove_schedule_from_table(time_range, day);

		const rate = +(prompt('rate:') ?? 0);
		mutations?.push({
			time_range,
			day: date.toISOString(),
			rate: isNaN(rate) ? 10 : rate,
			mode: 'all',
		});
		console.log(mutations);
	}
</script>

<table transition:fade class="mt-10 w-[90%] table-fixed text-dark-main-80">
	<thead class="px-8">
		<tr>
			<th>x</th>
			{#each week_days as week_day}
				<th class="w-1/7 border border-main-100 py-4"> {week_day}</th>
			{/each}
		</tr>
		{#snippet schedule_item(schedule?: Schedule)}
			{#if schedule}
				<button
					transition:blur
					onclick={() =>
						remove_schedule_from_table(
							schedule.time_range,
							dayjs(schedule.day).get('day'),
						)}
					data-mode={schedule.mode}
					class="absolute inset-0 m-1 flex items-center justify-center
					rounded
					border
					border-main-100 bg-main-40 text-sm transition data-[mode=odd]:top-auto
					data-[mode=even]:h-[22px] data-[mode=odd]:h-[22px]
					data-[mode=even]:bg-secondary-60 data-[mode=odd]:bg-error-60
					hover:opacity-80"
				>
					{day_mode_text[schedule.mode ?? 'all']}
					{schedule.rate}
				</button>
			{/if}
		{/snippet}
		{#each time_ranges as time_range}
			<tr>
				<th class="w-1/7 border border-main-100 py-4"> {time_range}</th>
				{#each week_days as _, week_index}
					{@const time_frame_scheules = (mutations ?? scheduleTable).filter(
						(item) =>
							dayjs(item.day).get('day') === week_index &&
							item.time_range === time_range,
					)}
					<td
						class="w-1/7 relative border border-main-100 py-4
						text-center"
					>
						{#each time_frame_scheules as schedule}
							{@render schedule_item(schedule)}
						{/each}
						{#if time_frame_scheules.length === 0 || (time_frame_scheules.length !== 2 && time_frame_scheules[0].mode !== 'all')}
							<button
								onclick={() => open_rate_modal(time_range, week_index)}
								data-mode={time_frame_scheules[0]?.mode}
								class="group absolute inset-0 m-1 rounded
								transition data-[mode=even]:top-auto
								data-[mode=even]:h-[22px]
								data-[mode=odd]:h-[22px] hover:bg-secondary-20
							active:scale-95"
								aria-label="add new schedule"
							>
								<Plus
									class="m-auto size-5 translate-y-2 opacity-0
									transition
									group-hover:translate-y-0
									group-hover:opacity-60
									group-active:scale-105"
								/>
							</button>
						{/if}
					</td>
				{/each}
			</tr>
		{/each}
	</thead>
	<tbody class="px-8"> </tbody>
</table>

{#if mutations}
	<div transition:slide class="mb-10 mt-2 flex w-[90%] items-start gap-2">
		<Button
			onclick={reset_table}
			class="w-fit rounded-[2px] bg-dark-main-80
		px-8">reset</Button
		>
		<Button
			onclick={reset_table}
			class="w-fit rounded-[2px] bg-secondary-80
		px-8">save</Button
		>
	</div>
{/if}
