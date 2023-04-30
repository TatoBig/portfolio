<script>
	import AnimatedText from '@animation/AnimatedText.svelte'
	import FirebaseIcon from '@assets/icons/FirebaseIcon.svelte'
	import JavascriptIcon from '@assets/icons/JavascriptIcon.svelte'
	import MuiIcon from '@assets/icons/MuiIcon.svelte'
	import NextIcon from '@assets/icons/NextIcon.svelte'
	import ReactIcon from '@assets/icons/ReactIcon.svelte'
	import ReduxIcon from '@assets/icons/ReduxIcon.svelte'
	import TailwindIcon from '@assets/icons/TailwindIcon.svelte'
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
			<p style="color: white;">
				* Private administative panel for business <br />
				* Integrated Fel automatic invoices <br />
				* Implemented business operations, logic and security <br />
				* Implemented Material UI design <br />
			</p>
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
			
		</div>
	</div>
</div>

<style>
	.container {
		background-color: #f8201f;
		display: flex;
		height: 100vh;
		justify-content: center;
		overflow-y: auto;
		padding: 30vh 0;
		width: 100vw;
	}

	.title {
		color: #f5f5f5;
	}

	.tools {
		align-items: center;
		background-color: #f5f5f5;
		border-radius: 20px;
		box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		margin-top: 20px;
		width: 100%;
	}

	.tools * {
		align-items: center;
		border-radius: 100%;
		display: flex;
		height: 40px;
		justify-content: center;
		margin: 0 0px;
		padding: 8px;
		width: 40px;
	}

	.section {
		align-items: center;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		padding: 15px;
		width: 100%;
		color: white;
	}

	.content {
		background-color: #f8201f;
		display: flex;
		flex-direction: column;
		height: 120vh;
		padding: 0 10vw;
		position: relative;
		width: 100vw;
	}

	.move-upside {
		animation-delay: 1s;
		animation-duration: 0.6s;
		animation-fill-mode: forwards;
		animation-name: move-up;
		animation-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
		left: 50%;
		top: 50%;
		position: absolute;
		transform: translate(-50%, -50%);
		z-index: 10;
	}

	.content-screen {
		animation-delay: 1.4s;
		animation-duration: 2s;
		animation-fill-mode: forwards;
		animation-name: hide-screen;
		animation-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
		background-color: #f8201f;
		height: 100%;
		left: 0;
		position: absolute;
		width: 100%;
	}

	.image {
		width: 100%;
		border-radius: 20px;
		box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
	}

	@keyframes hide-screen {
		50% {
			transform: translateY(100%);
		}
		100% {
			display: none;
			transform: translateY(100%);
		}
		
	}

	@keyframes move-up {
		100% {
			top: 20%;
			z-index: 0;
		}
	}

	@media (min-width: 768px) {
		@keyframes move-up {
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
		.tools {
			width: fit-content;
		}
	}
</style>
