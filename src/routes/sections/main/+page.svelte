<script lang="ts">
	import Cube from '@animation/Cube.svelte'
	import { Canvas, T, OrbitControls } from '@threlte/core'
	import { onMount } from 'svelte'
	import { spring } from 'svelte/motion'

	let cube1 = spring(0, {
		damping: 0.6,
		stiffness: 0.015,
		precision: 0
	})

	let cube2 = spring(0, {
		damping: 0.6,
		stiffness: 0.015,
		precision: 0
	})

  let cube3 = spring(0, {
		damping: 0.6,
		stiffness: 0.015,
		precision: 0
	})

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
	}
</script>

<div class="container">
	<Canvas>
		<T.PerspectiveCamera makeDefault position={[20, 20, 20]} fov={10}>
			<OrbitControls enableZoom={true} />
		</T.PerspectiveCamera>

		<T.DirectionalLight castShadow position={[3, 8, 10]} />
		<T.AmbientLight intensity={0.2} />

		<Cube animate={$cube1} x={-3} y={9} />
		<Cube animate={$cube2} x={4} y={3} />
		<Cube animate={$cube3} x={-7} y={12} depth={2}/>
		<Cube animate={$cube3} x={-5} y={3} depth={2}/>
	</Canvas>
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
