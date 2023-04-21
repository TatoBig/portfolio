<script lang="ts">
	import { CubeSpring } from '@animation/CubeSpring'
	import { onMount } from 'svelte'
	import { T, OrbitControls, PerspectiveCamera } from '@threlte/core'
	import AnimatedText from '@animation/AnimatedText.svelte'
	import Cube from '@animation/Cube.svelte'
	import type { Writable } from 'svelte/store'

	export let active: boolean
	$: runScene(active)

	let cube1 = CubeSpring()
	let cube2 = CubeSpring()
	let cube3 = CubeSpring()
	let cube4 = CubeSpring()
	let cube5 = CubeSpring()

	const runScene = (active: boolean) => {
		if (active) {
			triggerAnimation()
		} else {
			$cube1 = 0
			$cube2 = 0
			$cube3 = 0
			$cube4 = 0
			$cube5 = 0
		}
	}

	const triggerAnimation = () => {
		setTimeout(() => {
			$cube1 = 8
		}, 600)
		setTimeout(() => {
			$cube2 = 8
		}, 1200)
		setTimeout(() => {
			$cube3 = 10
		}, 1000)
		setTimeout(() => {
			$cube4 = 11
		}, 1600)
		setTimeout(() => {
			$cube5 = 8
		}, 1100)
	}
</script>

<div>
	<Cube animate={$cube3} x={-3} y={8.5} z={4} width={3} color="green" rotation={[0, 1.5, 0]}>
		<AnimatedText delay={3.8}><span class="cube-text">FULLSTACK</span></AnimatedText>
		<AnimatedText delay={4}><span class="cube-text">DEVELOPER</span></AnimatedText>
	</Cube>
	<Cube animate={$cube1} x={-2} y={9} z={0} />
	<Cube animate={$cube2} x={1} y={7} z={0} color="blue" />
	<Cube animate={$cube4} x={3} y={8} z={-2} color="yellow" />
	<Cube animate={$cube5} x={4} y={8} z={-2} color="purple" />
</div>

<style>
	.cube-text {
		font-size: 15px;
		font-family: Urbanist, sans-serif;
		color: white;
		font-weight: bolder;
		text-shadow: 1px 1px 1px gray;
	}
</style>
