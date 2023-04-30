<script lang="ts">
	import AnimatedText from '@animation/AnimatedText.svelte'

	export let active: boolean = false
</script>

<div class="lastname-container">
	<AnimatedText delay={3} hide={!active} controlled large>
		<h6>
			I'm a Full-Stack Software Developer with experience in TypeScript, Node JS, React and Next JS. <br
			/>
			I am a proactive person, autodidact, adaptable to new projects with the ability to work in a
			<br />
			team, responsible and dedicated.
		</h6>
	</AnimatedText>
</div>
<div class="college">
	<AnimatedText delay={3.4} hide={!active} controlled large>
		<h6>
			Currently studying Bachelor's Degree Informatics and Systems <br /> at Universidad Rafael Landívar,
			Quetzaltenango
		</h6>
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

	.college {
		top: 25%;
		left: 14.1%;
		position: absolute;
	}

	.lastname-container {
		top: 11%;
		left: 14%;
		position: absolute;
	}
</style>
