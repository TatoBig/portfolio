<script lang="ts">
	import Cube from '@animation/Cube.svelte'
	import { CubeSpring } from '@animation/CubeSpring'
	import { Canvas, T, OrbitControls } from '@threlte/core'
	import { onMount } from 'svelte'
	import { spring } from 'svelte/motion'

	let cube1 = CubeSpring()
	let cube2 = CubeSpring()
	let cube3 = CubeSpring()
	let cube4 = CubeSpring()

	onMount(() => {
		triggerAnimation()
	})

	const triggerAnimation = () => {
		setTimeout(() => {
			$cube1 = 8
		}, 1000)
		setTimeout(() => {
			$cube2 = 6
		}, 1500)
		setTimeout(() => {
			$cube3 = 10
		}, 1500)
		setTimeout(() => {
			$cube4 = 7
		}, 1500)
	}
</script>

<div class="container">
	<Canvas>
		<T.PerspectiveCamera makeDefault position={[20, 20, 20]} fov={12}>
			<OrbitControls enableZoom={true} />
		</T.PerspectiveCamera>

		<T.DirectionalLight castShadow position={[3, 8, 10]} />
		<T.AmbientLight intensity={0.2} />

		<Cube animate={$cube3} x={-3} y={7.5} z={4} depth={2} color="green" />
		<Cube animate={$cube1} x={0} y={8} z={0} />
		<Cube animate={$cube2} x={4} y={3} />
		<Cube animate={$cube4} x={2} y={2} z={-2} color="yellow" />
	</Canvas>

  <div class="title">

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
</style>
