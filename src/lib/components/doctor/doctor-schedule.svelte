<script lang="ts">
	import { fade } from 'svelte/transition';
	import { m } from '$lib';
	import { Plus } from 'svelte-feathers';
	import Button from '../../../routes/(private)/office/button.svelte';
	import dayjs from 'dayjs';

	interface Schedule {
		day: string;
		time_range: string;
		mode: 'even' | 'odd' | 'all';
		rate: number;
	}

	let scheduleTable = $state<Schedule[]>([
		// {
		// 	day: new Date().toISOString(),
		// 	time_range: '8-10',
		// 	mode: 'odd',
		// 	rate: 10,
		// },
		// {
		// 	day: new Date().toISOString(),
		// 	time_range: '8-10',
		// 	mode: 'even',
		// 	rate: 10,
		// },
		{
			day: dayjs().add(1, 'day').toISOString(),
			time_range: '8-10',
			mode: 'all',
			rate: 10,
		},
	]);
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

	console.log(dayjs().get('day'));
</script>

<table transition:fade class="mt-10 w-[90%] table-fixed text-dark-main-80">
	<thead class="px-8">
		<tr>
			<th>x</th>
			{#each week_days as week_day}
				<th class="w-1/7 border border-main-100 py-4"> {week_day}</th>
			{/each}
			<!-- <th class="w-1/7 border border-main-100 py-4">{m.week_saturday()}</th> -->
			<!-- <th class="w-1/7 border border-main-100 py-4">{m.week_sunday()}</th> -->
			<!-- <th class="w-1/7 border border-main-100 py-4">{m.week_monday()}</th> -->
			<!-- <th class="w-1/7 border border-main-100 py-4">{m.week_tuesday()}</th> -->
			<!-- <th class="w-1/7 border border-main-100 py-4">{m.week_wednesday()}</th> -->
			<!-- <th class="w-1/7 border border-main-100 py-4">{m.week_thursday()}</th> -->
		</tr>
		{#snippet schedule_item(schedule?: Schedule)}
			{#if schedule}
				<button
					data-mode={schedule.mode}
					class="absolute inset-0 m-1 flex items-center justify-center
					rounded
					border
					border-main-100 bg-main-40 text-sm transition data-[mode=odd]:top-auto
					data-[mode=even]:h-[22px] data-[mode=odd]:h-[22px]
					data-[mode=even]:bg-secondary-60 data-[mode=odd]:bg-error-60
					hover:opacity-80"
				>
					{day_mode_text[schedule.mode]}
					{schedule.rate}
				</button>
			{/if}
		{/snippet}
		{#each time_ranges as time_range}
			<tr>
				<th class="w-1/7 border border-main-100 py-4"> {time_range}</th>
				{#each week_days as week_day, week_index}
					{@const time_frame_scheules = scheduleTable.filter(
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

<!-- <div class="mb-10 mt-2 w-[90%]"> -->
<!-- 	<Button class="rounded-[2px] bg-dark-main-80"> -->
<!-- <Plus class="m-auto size-5" /> -->
<!-- 	</Button> -->
<!-- </div> -->
