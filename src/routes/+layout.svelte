<script lang="ts">
	// import ASScroll from '@ashthornton/asscroll'
	import { onMount } from 'svelte'
	import '../app.css'
	import Menu from '@components/Menu.svelte'

	let show = true

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
</script>

<div class="menu">
	<Menu />
</div>
<slot />

<!-- <div class="layout-container">
	<div class={(show ? 'show' : 'hide') + ' page-transition'}>
		<h1>Title</h1>
	</div>
	<div asscroll-container="true">
	</div>
</div> -->
<style>
	.menu {
		position: absolute;
		width: 10%;
		top: 0;
		right: 0%;
	}

	.show {
		background-color: blueviolet;
		transform: translateX(0%);
	}

	.hide {
		transform: translateX(100%);
		background-color: blueviolet;
	}

	.page-transition {
		align-items: center;
		display: flex;
		height: 100vh;
		justify-content: center;
		position: fixed;
		transition: transform 1.1s cubic-bezier(0, 0, 0, 0.995); /* custom */
		width: 100vw;
		z-index: 100;
	}

	.layout-container {
		overflow: hidden;
		background-color: beige;
	}
</style>
