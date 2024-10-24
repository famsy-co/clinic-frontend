<script lang="ts">
	import LoginLayout from './login-layout.svelte';
	import TextInput from './text-input.svelte';
	import PasswordInput from './password-input.svelte';
	import Button from './button.svelte';
	import ErrorMessage from './error-message.svelte';
	import { m } from '$lib';
	import { useAuth } from '$lib/providers/auth-guard.svelte';
	import { z } from 'zod';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	const auth = useAuth();

	const loginSchema = z.object({
		username: z.string().min(1, m.error_field_required()),
		password: z.string().min(1, m.error_field_required()),
	});
	type LoginSchema = z.infer<typeof loginSchema>;

	const { form, enhance, errors } = superForm<LoginSchema>(
		{
			username: '',
			password: '',
		},
		{
			SPA: true,
			validators: zodClient(loginSchema),
			onUpdate({ form }) {
				if (form.valid) {
					auth.login({
						name: form.data.username,
					});
				}
			},
		},
	);
</script>

<LoginLayout>
	<form
		use:enhance
		method="POST"
		class="flex w-full max-w-[405px] flex-col gap-6"
	>
		<h1 class="w-full pb-4 text-start text-4xl text-foreground-100">
			{m.login__login()}
		</h1>
		<div>
			<TextInput
				bind:value={$form.username}
				placeholder={m.login__username()}
			/>
			<ErrorMessage message={$errors.username?.join(',')}></ErrorMessage>
		</div>
		<div>
			<PasswordInput
				bind:value={$form.password}
				placeholder={m.login__password()}
			/>
			<ErrorMessage message={$errors.password?.join(',')}></ErrorMessage>
		</div>
		<Button>
			{m.login__login()}
		</Button>
	</form>
</LoginLayout>
