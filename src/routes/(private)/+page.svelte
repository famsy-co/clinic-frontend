<script>
	import { m } from '$lib';
	import { useAuth } from '$lib/providers/auth-guard.svelte';
	const auth = useAuth();
</script>

<h1 class="flex bg-red-100 text-black">Welcome to SvelteKit</h1>
<p>
	Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the
	documentation
</p>
{m.hello_world({
	name: auth.user?.name ?? '',
})}

<button onclick={auth.logout}>logout</button>
