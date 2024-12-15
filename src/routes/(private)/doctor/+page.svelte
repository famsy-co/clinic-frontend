<script lang="ts">
	import { useAuth } from '$lib/providers/auth-guard.svelte';
	import { LogOut } from 'svelte-feathers';
	import Navbar from '../office/doctors/[id]/navbar.svelte';
	import DoctorSchedule from '$lib/components/doctor/doctor-schedule.svelte';
	import AppointmentsTable from '$lib/components/doctor/appointments-table.svelte';
	import type { Appointment } from '$lib/services/office/interfaces/appointment';

	const auth = useAuth();
	const { user } = useAuth();

	let selectedAppointment: Appointment | undefined = $state();
	function openAddModal(Appointment?: Appointment) {
		selectedAppointment = Appointment;
	}
</script>

<!-- HTML -->
<header
	class="sticky left-0 right-0 top-0 z-50 flex h-16 items-center justify-between bg-dark-main-100 px-5 text-2xl text-foreground-100"
>
	<p>{user?.doctor.name + ' ' + user?.doctor.last_name}</p>

	<button onclick={auth.logout}>
		<LogOut class="size-5" />
	</button>
</header>

<div class="flex">
	<Navbar doctor={user?.doctor} />

	<div class="flex flex-col items-center">
		{#if user?.doctor}
			<DoctorSchedule doctor_id={user.doctor.id} />
			<AppointmentsTable
				doctor_id={user.doctor.id}
                isDoctor={true}
				onAddAppointment={openAddModal}
			/>
		{/if}
	</div>
</div>
