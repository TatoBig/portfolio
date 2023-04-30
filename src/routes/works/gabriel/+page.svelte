<script>
	import AnimatedText from '@animation/AnimatedText.svelte'
	import FirebaseIcon from '@components/assets/icons/FirebaseIcon.svelte'
	import JavascriptIcon from '@components/assets/icons/JavascriptIcon.svelte'
	import MuiIcon from '@components/assets/icons/MuiIcon.svelte'
	import NextIcon from '@components/assets/icons/NextIcon.svelte'
	import ReactIcon from '@components/assets/icons/ReactIcon.svelte'
	import ReduxIcon from '@components/assets/icons/ReduxIcon.svelte'
	import TailwindIcon from '@components/assets/icons/TailwindIcon.svelte'
	import { hoverExit } from '@components/tools/Hover'
	import { onMount } from 'svelte'

	onMount(() => {
		hoverExit()
	})
</script>

<div class="container">
	<div class="move-upside">
		<AnimatedText delay={0}>
			<h1 class="title">Gabriel</h1>
		</AnimatedText>
	</div>
	<div class="content">
		<div class="content-screen" />
		<div class="section">
			<p>This is a system</p>
			<div class="tools">
				<div>
					<MuiIcon />
				</div>
				<div>
					<JavascriptIcon />
				</div>
				<div>
					<FirebaseIcon />
				</div>
				<div>
					<NextIcon />
				</div>
				<div>
					<ReactIcon />
				</div>
				<div>
					<ReduxIcon />
				</div>
			</div>
		</div>
		<div class="section">
			<p>
				Nulla eu consectetur leo. Suspendisse pharetra interdum magna. Maecenas efficitur tortor
				turpis, sed eleifend felis auctor in. Ut ut massa nunc. Proin cursus gravida est, sit amet
				accumsan diam aliquet ac. Proin non ex hendrerit, maximus odio quis, lobortis metus. Vivamus
				malesuada libero at tincidunt mattis.
			</p>
		</div>
	</div>
</div>

<style>
	.container {
		padding: 30vh 0;
		display: flex;
		justify-content: center;
		background-color: #f8201f;
		width: 100vw;
		height: 100vh;
		overflow-y: scroll;
	}

	.title {
		color: #f5f5f5;
	}

	.tools {
		width: fit-content;
		height: 60px;
		background-color: #f5f5f5;
		border-radius: 20px;
		/* margin: 0px; */
		align-items: center;
		display: flex;
		justify-content: center;
		box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
	}

	.tools * {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 40px;
		width: 40px;
		margin: 0 3px;
		padding: 8px;
		border-radius: 100%;
	}

	.section {
		background-color: green;
		padding: 15px;
		box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
		height: 50vh;
		width: 100%;
	}

	.content {
		width: 80vw;
		display: flex;
		flex-direction: column;
		position: relative;
	}

	.move-upside {
		position: absolute;
		z-index: 0;
		animation-name: blur;
		animation-duration: 0.6s;
		animation-delay: 1s;
		animation-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
		animation-fill-mode: forwards;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.content-screen {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: #f8201f;
		animation-name: hide-screen;
		animation-duration: 1s;
		animation-delay: 1.6s;
		animation-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
		animation-fill-mode: forwards;
	}

	@keyframes hide-screen {
		100% {
			transform: translateY(100%);
		}
	}

	@keyframes blur {
		100% {
			top: 20%;
		}
	}

	@media (min-width: 768px) {
		@keyframes blur {
			100% {
				top: 15%;
			}
		}

		.content {
			flex-direction: row;
		}
		.container {
			overflow: hidden;
		}
		.content-screen {
			height: 60%;
		}
	}
</style>
