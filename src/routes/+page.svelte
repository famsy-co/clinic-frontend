<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import { useAuth } from '$lib/providers/auth-guard.svelte';
	import { onMount } from 'svelte';

	const auth = useAuth();
	const { user } = useAuth();

	afterNavigate(() => {
		if (!auth.user) {
			goto('/login', {
				replaceState: true,
			});
		}
	});

	onMount(() => {
		if (user?.office) {
			goto('/office', { replaceState: true });
		} else if (user?.doctor) {
			goto('/doctor', { replaceState: true });
		}
	});
</script>
