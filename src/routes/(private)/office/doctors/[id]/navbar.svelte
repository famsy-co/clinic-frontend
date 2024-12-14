<script lang="ts">
	import { m } from '$lib';
	import TextInput from '$lib/components/text-input.svelte';
	import type { Doctor } from '$lib/services/office/interfaces/doctor';

	interface Props {
		doctor: Doctor | undefined;
	}

	let { doctor }: Props = $props();
</script>

<nav
	class="sticky bottom-0 right-0 top-16 h-dvh w-60 flex-shrink-0 border-l-2 border-l-dark-main-100 bg-foreground-100 p-5 shadow-xl"
>
	<label class="text-xs">{m.office_modal__speciality()}:</label>
	<TextInput
		placeholder={doctor?.speciality}
		class="mb-4 mt-2 border-dark-main-100 placeholder-dark-main-60"
		readonly
	/>

	<label class="text-xs">{m.office_modal__doctoral_code()}:</label>
	<TextInput
		placeholder={doctor?.doctor_code}
		class="mb-4 mt-2 border-dark-main-100 placeholder-dark-main-60"
		readonly
	/>

	<label class="text-xs">{m.office_modal__national_code()}:</label>
	<TextInput
		placeholder={doctor?.national_code}
		class="mb-4 mt-2 border-dark-main-100 placeholder-dark-main-60"
		readonly
	/>

	<label class="text-xs">{m.office_modal__email_optional()}:</label>
	<TextInput
		placeholder={doctor?.email ?? 'email'}
		class="mb-4 mt-2 border-dark-main-100 text-xs placeholder-dark-main-60"
		readonly
	/>
</nav>
