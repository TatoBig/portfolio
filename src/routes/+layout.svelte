<script lang="ts">
	// import ASScroll from '@ashthornton/asscroll'
	import { onMount } from 'svelte'
	import '../app.css'
	import Menu from '@components/Menu.svelte'
	import { currentScene } from '@components/tools/Stores'

	let show = true
	let menu = false
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
		if (!menu) {
			menu = true
			sceneOnClose = $currentScene
			$currentScene = -1
		} else {
			menu = false
			$currentScene = sceneOnClose
		}
	}
</script>

<div class="layout">
	<div class={`menu-screen ${menu ? 'open' : 'closed'}`} />
	<div class="menu-button">
		<Menu {openMenu} />
	</div>
	<slot />
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
		width: 10%;
		top: 0;
		right: 0%;
		z-index: 10;
	}

	.closed {
		transform: translateX(100%);
	}

	.open {
		transform: translateY(0%);
	}

	.menu-screen {
		position: absolute;
		z-index: 5;
		background-color: red;
		width: 100vw;
		height: 100vh;
		top: 0;
		left: 0;
	}
</style>
