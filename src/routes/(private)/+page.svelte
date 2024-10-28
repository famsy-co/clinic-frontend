<script lang="ts">
	import { useAuth } from '$lib/providers/auth-guard.svelte';
	import { LogOut } from 'svelte-feathers';
	import Information from './information.svelte';
	import DoctorsTable from './doctors-table.svelte';
	import DoctorAddModal from './doctor-add-modal.svelte';
	import type { Doctor } from '$lib/services/office/interfaces/doctor';
	const auth = useAuth();
	let isAddModalOpen = $state(false);
	function closeAddModal() {
		isAddModalOpen = false;
		selectedDoctor = undefined;
	}
	let selectedDoctor: Doctor | undefined = $state();
	function openAddModal(doctor?: Doctor) {
		selectedDoctor = doctor;
		isAddModalOpen = true;
	}
	const { user } = useAuth();
</script>

<!-- HTML -->
<header
	class="flex h-16 items-center justify-between bg-dark-main-100 px-5 text-2xl text-foreground-100"
>
	<p>{user?.office.name}</p>
	<button onclick={auth.logout}>
		<LogOut class="size-5" />
	</button>
</header>

<Information />
<DoctorsTable onAddDoctor={openAddModal} />
{#key selectedDoctor}
	<DoctorAddModal
		doctor={selectedDoctor}
		isOpen={!!selectedDoctor || isAddModalOpen}
		onClose={closeAddModal}
	/>
{/key}
