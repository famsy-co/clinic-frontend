<script lang="ts">
	import LoginLayout from './login-layout.svelte';
	import TextInput from './text-input.svelte';
	import PasswordInput from './password-input.svelte';
	import Button from './button.svelte';
	import { m } from '$lib';
</script>

<LoginLayout>
	<div class="flex w-full max-w-[405px] flex-col gap-6">
		<h1 class="w-full pb-4 text-start text-4xl text-foreground-100">
			{m.login__login()}
		</h1>
		<TextInput placeholder={m.login__username()} />
		<PasswordInput placeholder={m.login__password()} />
		<Button>
			{m.login__login()}
		</Button>
	</div>
</LoginLayout>
