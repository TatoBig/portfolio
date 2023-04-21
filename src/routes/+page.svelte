<script lang="ts">
	import '@fontsource/urbanist'
	import { Canvas } from '@threlte/core'
	import { writable } from 'svelte/store'
	import AnimatedText from '@animation/AnimatedText.svelte'
	import NameScene from '@components/scenes/NameScene.svelte'
	import AboutScene from '@components/scenes/AboutScene.svelte'
	import { T, OrbitControls, PerspectiveCamera } from '@threlte/core'
	import { onMount } from 'svelte'

	let currentScene = 0
	let mouse = writable({ x: 0, y: 0 })
	let innerWidth = 0
	let innerHeight = 0
	let active = false
	let disabledScrolling = false

	onMount(() => {
		disabledScrolling = true
		setTimeout(() => {
			disabledScrolling = false
		}, 4000)
	})

	const handleMousemove = (event: any) => {
		$mouse.x = event.clientX
		$mouse.y = event.clientY
	}

	const handleMouseWheel = (e: any) => {
		if (!disabledScrolling) {
			disabledScrolling = true
			setTimeout(() => {
				disabledScrolling = false
			}, 1000)
			if (e.wheelDeltaY > 0) {
				currentScene--
			} else {
				currentScene++
			}
		}
	}

</script>

<svelte:window bind:innerWidth bind:innerHeight />
<div class="container" on:mousemove={handleMousemove} on:mousewheel={handleMouseWheel}>
	<Canvas>
		<PerspectiveCamera
			position={{
				x: (15 + $mouse.x / innerWidth) * 1.5,
				z: (15 + (1 - $mouse.x / innerWidth)) * 1.5,
				y: (15 + (0.5 - $mouse.y / innerHeight)) * 1.5
			}}
			fov={12}
			lookAt={{}}
		>
			<OrbitControls enableZoom={false} enabled={false} />
		</PerspectiveCamera>

		<T.DirectionalLight
			castShadow
			position={[
				10 * ($mouse.x / innerWidth),
				10 * (1 - $mouse.y / innerHeight),
				10 * (1 - $mouse.x / innerWidth)
			]}
		/>
		<T.AmbientLight intensity={0.2} />

		<NameScene active={currentScene === 0} />
		<AboutScene active={currentScene === 1} />
	</Canvas>

	<div class="firstname-container">
		<AnimatedText delay={2.8} hide={currentScene !== 0} controlled>
			<h1>SANTIAGO</h1>
		</AnimatedText>
	</div>
	<div class="lastname-container">
		<AnimatedText delay={3} hide={currentScene !== 0} controlled>
			<h1>NAVAS</h1>
		</AnimatedText>
	</div>
</div>

<style>
	h1 {
		font-family: Urbanist, sans-serif;
		font-size: 120px;
		letter-spacing: 6px;
		font-weight: 500;
		margin: -4px;
	}

	.button {
		position: absolute;
		top: 0;
		right: 0;
	}

	.container {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100vw;
		height: 100vh;
	}

	.firstname-container {
		top: 5%;
		left: 10%;
		position: absolute;
	}

	.lastname-container {
		top: 17%;
		left: 43%;
		position: absolute;
	}
</style>
