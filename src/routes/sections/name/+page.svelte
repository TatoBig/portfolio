<script lang="ts">
	import Cube from '@animation/Cube.svelte'
	import { CubeSpring } from '@animation/CubeSpring'
	import { Canvas, T, OrbitControls, PerspectiveCamera } from '@threlte/core'
	import { onMount } from 'svelte'
	import { spring } from 'svelte/motion'
	import '@fontsource/urbanist'
	import { writable } from 'svelte/store'
	import { HTML } from '@threlte/extras'
	import AnimatedText from '@animation/AnimatedText.svelte'

	let cube1 = CubeSpring()
	let cube2 = CubeSpring()
	let cube3 = CubeSpring()
	let cube4 = CubeSpring()
	let cube5 = CubeSpring()

	let animateFirstname = false
	let animateLastname = false

	onMount(() => {
		triggerAnimation()
	})

	const triggerAnimation = () => {
		setTimeout(() => {
			$cube1 = 8
		}, 1000)
		setTimeout(() => {
			$cube2 = 8
		}, 1500)
		setTimeout(() => {
			$cube3 = 10
		}, 1500)
		setTimeout(() => {
			$cube4 = 11
		}, 2000)
		setTimeout(() => {
			$cube5 = 8
		}, 1500)
	}

	let m = writable({ x: 0, y: 0 })

	let innerWidth = 0
	let innerHeight = 0

	function handleMousemove(event) {
		$m.x = event.clientX
		$m.y = event.clientY
	}
</script>

<svelte:window bind:innerWidth bind:innerHeight />
<div class="container" on:mousemove={handleMousemove}>
	<Canvas>
		<PerspectiveCamera
			position={{
				x: (15 + $m.x / innerWidth) * 1.5,
				z: (15 + (1 - $m.x / innerWidth)) * 1.5,
				y: (15 + (0.5 - $m.y / innerHeight)) * 1.5
			}}
			fov={12}
			lookAt={{}}
		>
			<OrbitControls enableZoom={true} enabled={true} />
		</PerspectiveCamera>

		<T.DirectionalLight
			castShadow
			position={[
				10 * ($m.x / innerWidth),
				10 * (1 - $m.y / innerHeight),
				10 * (1 - $m.x / innerWidth)
			]}
		/>
		<T.AmbientLight intensity={0.2} />

		<Cube animate={$cube3} x={-3} y={8.5} z={4} width={3} color="green" rotation={[0, 1.5, 0]}>
			<AnimatedText delay={4.2}><span class="cube-text">FULLSTACK</span></AnimatedText>
			<AnimatedText delay={4.5}><span class="cube-text">DEVELOPER</span></AnimatedText>
		</Cube>
		<Cube animate={$cube1} x={-2} y={9} z={0} />
		<Cube animate={$cube2} x={1} y={7} z={0} color="blue" />
		<Cube animate={$cube4} x={3} y={8} z={-2} color="yellow" />
		<Cube animate={$cube5} x={4} y={8} z={-2} color="purple" />
	</Canvas>

	<div class="firstname-container">
		<AnimatedText delay={2.8}>
			<h1>SANTIAGO</h1>
		</AnimatedText>
	</div>
	<div class="lastname-container">
		<AnimatedText delay={3}>
			<h1>NAVAS</h1>
		</AnimatedText>
	</div>
</div>

<style>
	.container {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100vw;
		height: 100vh;
	}

	h1 {
		font-family: Urbanist, sans-serif;
		font-size: 120px;
		letter-spacing: 6px;
		font-weight: 500;
		margin: -4px;
	}

	.cube-text {
		font-size: 15px;
		font-family: Urbanist, sans-serif;
		color: white;
		font-weight: bolder;
		text-shadow: 1px 1px 1px gray;
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
		overflow: hidden;
	}
</style>
