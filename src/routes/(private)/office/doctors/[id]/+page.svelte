<script lang="ts">
	import { useAuth } from '$lib/providers/auth-guard.svelte';
	import { LogOut } from 'svelte-feathers';
	import type { Doctor } from '$lib/services/office/interfaces/doctor';
	import Navbar from './navbar.svelte';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
	console.log(data.id);

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
	class="absolute left-0 right-0 top-0 flex h-16 items-center justify-between bg-dark-main-100 px-5 text-2xl text-foreground-100"
>
	<p>{user?.office.name}</p>
	<button onclick={auth.logout}>
		<LogOut class="size-5" />
	</button>
</header>

<Navbar />

<div class="ms-60 mt-16"></div>
