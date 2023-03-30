<script lang="ts">
	import AnimatedText from '@animation/AnimatedText.svelte'
	import Section from '@components/Section.svelte'
</script>

<main>
	<div class="container">
		<AnimatedText>
			<div class="main-name">Santiago Navas</div>
		</AnimatedText>
	</div>
</main>

<style>
	.main-name {
		font-size: 10rem;
	}
	.container {
		width: 20vw;
		height: 100vh;
		background-color: blue;
	}
</style>
