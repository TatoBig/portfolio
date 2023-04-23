<script>
	import AnimatedText from '@animation/AnimatedText.svelte'
</script>

<div class="container">
	<AnimatedText delay={0}>
		<h1 class="title">Gabriel</h1>
	</AnimatedText>
</div>

<style>
	.title {
		color: #f5f5f5;
	}

	.container {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #f8201f;
		width: 100vw;
		height: 100vh;
	}
</style>
