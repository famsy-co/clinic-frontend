<script>
	import { m } from '$lib';
	import TextInput from '$lib/components/text-input.svelte';
</script>

<nav
	class="absolute bottom-0 right-0 top-16 w-60 border-l-2 border-l-dark-main-100 p-5 shadow-xl"
>
	<label class="text-xs">{m.office_modal__speciality()}:</label>
	<TextInput
		placeholder={m.office_modal__speciality()}
		class="mb-4 mt-2 border-dark-main-100 placeholder-dark-main-60"
		readonly
	/>

	<label class="text-xs">{m.office_modal__doctoral_code()}:</label>
	<TextInput
		placeholder={m.office_modal__doctoral_code()}
		class="mb-4 mt-2 border-dark-main-100 placeholder-dark-main-60"
		readonly
	/>

	<label class="text-xs">{m.office_modal__national_code()}:</label>
	<TextInput
		placeholder={m.office_modal__national_code()}
		class="mb-4 mt-2 border-dark-main-100 placeholder-dark-main-60"
		readonly
	/>

	<label class="text-xs">{m.office_modal__phone_number()}:</label>
	<TextInput
		placeholder={m.office_modal__phone_number()}
		class="mb-4 mt-2 border-dark-main-100 placeholder-dark-main-60"
		readonly
	/>

	<label class="text-xs">{m.office_modal__email_optional()}:</label>
	<TextInput
		placeholder={m.office_modal__email_optional()}
		class="mb-4 mt-2 border-dark-main-100 text-xs placeholder-dark-main-60"
		readonly
	/>
</nav>
