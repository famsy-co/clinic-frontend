<script lang="ts">
	import { useAuth } from '$lib/providers/auth-guard.svelte';
	import { LogOut } from 'svelte-feathers';
	import Navbar from './navbar.svelte';
	import type { PageData } from './$types';
	import type { Patient } from '$lib/services/office/interfaces/patient';
	import { createQuery } from '@tanstack/svelte-query';
	import { OfficeService } from '$lib/services/office/office.service.svelte';
	import DoctorSchedule from '$lib/components/doctor/doctor-schedule.svelte';
	import PatientsTable from '$lib/components/doctor/patients-table.svelte';
	import type { Appointment } from '$lib/services/office/interfaces/appointment';

	const { data }: { data: PageData } = $props();
	console.log(data.id);

	const auth = useAuth();
	let isAddModalOpen = $state(false);

	let doctorQuery = createQuery({
		queryKey: ['/office/doctors/', data.id],
		queryFn: () => OfficeService.getDoctorInfo(data.id),
	});

	function closeAddModal() {
		isAddModalOpen = false;
		selectedAppointment = undefined;
	}

	let selectedAppointment: Appointment | undefined = $state();
	function openAddModal(Appointment?: Appointment) {
		selectedAppointment = Appointment;
		isAddModalOpen = true;
	}
	const { user } = useAuth();
</script>

<!-- HTML -->
<header
	class="absolute left-0 right-0 top-0 flex h-16 items-center justify-between bg-dark-main-100 px-5 text-2xl text-foreground-100"
>
	<div class="flex gap-4">
		<a href="/office">{user?.office.name}</a>
		<p>/</p>
		<a href={`/office/doctors/${data.id}`}
			>{$doctorQuery.data?.name + ' ' + $doctorQuery.data?.last_name}</a
		>
	</div>
	<button onclick={auth.logout}>
		<LogOut class="size-5" />
	</button>
</header>

<Navbar doctor={$doctorQuery.data} />

<div class="ms-60 mt-16 flex flex-col items-center">
	<DoctorSchedule />
	{#if $doctorQuery.data}
		<PatientsTable
			doctor_id={$doctorQuery.data.id}
			onAddAppointment={openAddModal}
		/>
	{/if}
</div>
