<script lang="ts">
	import { m } from '$lib';
	import { useAuth } from '$lib/providers/auth-guard.svelte';
	import { LogOut } from 'svelte-feathers';
	import Information from './information.svelte';
	import DoctorsTable from './doctors-table.svelte';
	const auth = useAuth();
</script>


<!-- HTML -->
<header class="flex justify-between bg-dark-main-100 h-16 text-foreground-100 text-2xl items-center px-5">
    <p>کلینیک رویال</p>
    <button onclick={auth.logout}>
    	<LogOut class="size-5"/>
    </button>
</header>

<Information />
<DoctorsTable />