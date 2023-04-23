<script lang="ts">
	import '@fontsource/urbanist'
	import { Canvas, Fog } from '@threlte/core'
	import { onMount } from 'svelte'
	import { T, OrbitControls, PerspectiveCamera } from '@threlte/core'
	import { writable } from 'svelte/store'
	import AboutScene from '@components/scenes/AboutScene.svelte'
	import AnimatedText from '@animation/AnimatedText.svelte'
	import NameScene from '@components/scenes/NameScene.svelte'
	import WorksScene from '@components/scenes/WorksScene.svelte'
	import Menu from '@components/Menu.svelte'
	import { tweened } from 'svelte/motion'
	import { cubicOut } from 'svelte/easing'
	import { goto } from '$app/navigation'
	import { ContactShadows, Grid } from '@threlte/extras'
  import Background from '@components/assets/Background.svelte'

	let currentScene = 0
	let mouse = writable({ x: 0, y: 0 })
	let innerWidth = 0
	let innerHeight = 0
	let disabledScrolling = false
	let transitioning = false

	onMount(() => {
		disabledScrolling = true
		setTimeout(() => {
			disabledScrolling = false
		}, 4000)
	})

	const handleMousemove = (event: any) => {
		if (!transitioning) {
			$mouse.x = event.clientX
			$mouse.y = event.clientY
		}
	}

	const handleMouseWheel = (e: any) => {
		if (!disabledScrolling && !transitioning) {
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

	const cameraX = tweened(0, {
		duration: 2000,
		easing: cubicOut
	})
	const cameraY = tweened(0, {
		duration: 2000,
		easing: cubicOut
	})
	const cameraZ = tweened(0, {
		duration: 2000,
		easing: cubicOut
	})
	const positionX = tweened(15, {
		duration: 2000,
		easing: cubicOut
	})
	const positionZ = tweened(15, {
		duration: 4000,
		easing: cubicOut
	})
	const positionY = tweened(15, {
		duration: 3000,
		easing: cubicOut
	})

	const trigger = (pos: number[], page: string) => {
		transitioning = true
		positionX.set(pos[0])
		positionY.set(pos[1])
		positionZ.set(pos[2])
		cameraY.set(pos[3])
		cameraX.set(pos[4])
		setTimeout(() => {
			goto(page)
		}, 3000)
	}
</script>

<svelte:window bind:innerWidth bind:innerHeight />
<div class="container" on:mousemove={handleMousemove} on:mousewheel={handleMouseWheel} on:dragenter={(e) => console.log(e)}>
	<!-- <div class="container"> -->
	<Canvas>
		<PerspectiveCamera
			position={{
				x: ($positionX + $mouse.x / innerWidth) * 1.5,
				z: ($positionZ + (1 - $mouse.x / innerWidth)) * 1.5,
				y: ($positionY + (0.5 - $mouse.y / innerHeight)) * 1.5
			}}
			fov={12}
			lookAt={{ y: $cameraY, x: $cameraX, z: $cameraZ }}
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

		<Background color="#F5F5F5" />

		<NameScene active={currentScene === 0} />
		<AboutScene active={currentScene === 1} />
		<WorksScene active={currentScene === 2} moveCamera={trigger} />
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
	.test {
		background-color: black;
		width: 100vw;
		height: 100vh;
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
