<script lang="ts">
	import LoginImage from '$lib/assets/login-image.jpg';
</script>

<div class="flex h-dvh w-full flex-col items-center justify-center p-10">
	<main
		class="mx-auto flex h-max max-h-[675px] w-full max-w-[1440px] gap-4
	overflow-hidden rounded-2xl bg-gradient-to-b from-[#0076BA] to-[#002940] p-5"
	>
		<section
			class="flex max-h-[675px] flex-1 flex-col items-center justify-center"
		>
			<slot />
		</section>
		<figure
			class="relative aspect-1 w-full max-w-[635px] flex-shrink-0 overflow-hidden
		rounded-lg"
		>
			<img class="absolute inset-0 object-cover" src={LoginImage} alt="" />
		</figure>
	</main>
</div>
