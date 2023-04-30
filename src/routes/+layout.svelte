<script lang="ts">
	// import ASScroll from '@ashthornton/asscroll'
	import { onMount } from 'svelte'
	import '../app.css'
	import MenuButton from '@components/MenuButton.svelte'
	import { currentScene } from '@components/tools/Stores'
	import Menu from '@components/Menu.svelte'
	import Cursor from '@components/Cursor.svelte'
  import { hoverExit } from '@components/tools/Hover'

	let show = true
	let renderMenu = false
	let animateMenu = false
	let sceneOnClose: number

	// const initialFunction = () => {
	// 	const asscroll = new ASScroll()
	// 	asscroll.enable()
	// }

	onMount(() => {
		// initialFunction()
		setTimeout(() => {
			show = false
		}, 1000)
	})

	const openMenu = () => {
		if (!renderMenu) {
			renderMenu = true
			animateMenu = true
			sceneOnClose = $currentScene
			$currentScene = -1
		} else {
			animateMenu = false
			setTimeout(() => {
				renderMenu = false
			}, 500)
			hoverExit()
			$currentScene = sceneOnClose
		}
	}
</script>

<div class="layout">
	{#if renderMenu}
		<div class={`menu-screen ${animateMenu ? 'open' : 'closed'}`}>
			<Menu closeMenu={openMenu} />
		</div>
	{/if}
	<div class="menu-button">
		<MenuButton {openMenu} />
	</div>
	<slot />
	<Cursor />
</div>

<!-- <div class="layout-container">
	<div class={(show ? 'show' : 'hide') + ' page-transition'}>
		<h1>Title</h1>
	</div>
	<div asscroll-container="true">
	</div>
</div> -->
<style>
	.layout {
		overflow: hidden;
		width: 100vw;
		height: 100vh;
		position: relative;
	}

	.menu-button {
		position: absolute;
		width: 150px;
		top: 0;
		right: 0;
		z-index: 10;
		transition: all 2s cubic-bezier(0.075, 0.82, 0.165, 1);
	}

	.closed {
		animation-name: hideAnimation;
		animation-duration: 0.5s;
		animation-timing-function: ease-in-out;
		opacity: 0;
	}

	.open {
		animation-name: blur;
		animation-duration: 8s;
		animation-timing-function: ease-in-out;
		opacity: 1;
	}

	.menu-screen {
		position: absolute;
		z-index: 5;
		background-color: white;
		width: 100vw;
		height: 100vh;
		top: 0;
		left: 0;
	}

	@keyframes blur {
		0% {
			filter: blur(20px);
			opacity: 0;
		}
		10% {
			opacity: 0.2;
		}
		25%,
		100% {
			filter: blur(0px);
			opacity: 1;
		}
	}

	@keyframes hideAnimation {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
			filter: blur(20px);
			display: none;
		}
	}
</style>
