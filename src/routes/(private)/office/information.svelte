<script lang="ts">
	import { m } from '$lib';
	import { useAuth } from '$lib/providers/auth-guard.svelte';
	const { user } = useAuth();
</script>

<section
	class="m-20 mb-14 rounded-2xl bg-gradient-to-l from-dark-main-100 to-main-100 p-1 text-dark-main-100 shadow-md"
>
	<div class="rounded-xl bg-foreground-100 p-12">
		<table>
			<tbody>
				<tr>
					<td>{m.office_address()}</td>
					<td class="pr-9">{user?.office.address}</td>
				</tr>
				<tr>
					<td class="pt-5">{m.office_phone_number()}</td>
					<td class="pr-9 pt-5">{user?.office.phone_number}</td>
				</tr>
			</tbody>
		</table>
	</div>
</section>
