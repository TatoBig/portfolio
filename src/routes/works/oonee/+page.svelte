<script>
	import AnimatedText from '@animation/AnimatedText.svelte'

	import { hoverExit } from '@components/tools/Hover'
	import { onMount } from 'svelte'
	import oonee1 from '@assets/images/oonee1.jpg'
	import oonee2 from '@assets/images/oonee2.jpg'
	import SquarespaceIcon from '@assets/icons/SquarespaceIcon.svelte'
	import CssIcon from '@assets/icons/CssIcon.svelte'

	onMount(() => {
		hoverExit()
	})
</script>

<div class="container">
	<div class="move-upside">
		<AnimatedText delay={0}>
			<h1 class="title">Oonee.us</h1>
		</AnimatedText>
	</div>
	<div class="content">
		<div class="content-screen" />
		<div class="section">
			<p style="color: white;">
				* Implemented responsive design <br />
				* Fixed existing responsive issues <br />
			</p>
			<div class="tools">
				<div>
					<SquarespaceIcon />
				</div>
				<div>
					<CssIcon />
				</div>
			</div>
		</div>
		<div class="section images">
			<img class="image" src={oonee1} alt="Oonee first view" />
			<img class="image" src={oonee2} alt="Oonee second view" />
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
		display: flex;
		justify-content: center;
		align-items: center;
		height: 40px;
		width: 40px;
		margin: 0 0px;
		padding: 8px;
		border-radius: 100%;
	}

	.section {
		background-color: #f8201f;
		display: flex;
		flex-direction: column;
		padding: 15px;
		align-items: center;
		box-sizing: border-box;
		width: 100%;
	}

	.images {
		flex-direction: row;
		align-items: start;
		justify-content: space-around;
	}

	.content {
		width: 80vw;
		display: flex;
		flex-direction: column;
		position: relative;
	}

	.move-upside {
		animation-delay: 1s;
		animation-duration: 0.6s;
		animation-fill-mode: forwards;
		animation-name: blur;
		animation-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
		left: 50%;
		position: absolute;
		position: absolute;
		top: 50%;
		transform: translate(-50%, -50%);
		z-index: 10;
	}

	.content-screen {
		animation-delay: 1.4s;
		animation-duration: 1s;
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
		width: 30%;
		border-radius: 20px;
		box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
	}

	@keyframes hide-screen {
		100% {
			visibility: hidden;
			transform: translateY(100%);
		}
	}

	@keyframes blur {
		100% {
			top: 20%;
			z-index: 0;
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
		.tools {
			width: fit-content;
		}
	}
</style>
