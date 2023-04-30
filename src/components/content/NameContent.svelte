<script lang="ts">
  import AnimatedText from "@animation/AnimatedText.svelte"

	export let active: boolean = false
</script>

<div class="firstname-container">
	<AnimatedText delay={2.8} hide={!active} controlled>
		<h5>SANTIAGO</h5>
	</AnimatedText>
</div>
<div class="lastname-container">
	<AnimatedText delay={3} hide={!active} controlled>
		<h5>NAVAS</h5>
	</AnimatedText>
</div>
<div class="scroll">Scroll</div>

<style>
	.scroll {
		position: absolute;
		bottom: 4%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.firstname-container {
		top: 7%;
		left: 14.1%;
		position: absolute;
	}

	.lastname-container {
		top: 11%;
		left: 14%;
		position: absolute;
	}
</style>
