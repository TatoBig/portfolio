<script>
	import AnimatedText from '../animation/AnimatedText.svelte'
	import Section from '../components/Section.svelte'
</script>

<main>
	<Section>
		<div class="main-name">
			<AnimatedText>
				<h1>Santiago Navas</h1>
			</AnimatedText>
		</div>
	</Section>
	<Section>
		<h1 class="b">content</h1>
	</Section>
</main>

<style>
	.main-name {
		font-size: 4rem;
		background-color: blue;
	}

	.b {
		background-color: red;
		height: 100%;
	}
</style>
