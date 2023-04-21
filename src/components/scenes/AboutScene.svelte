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
		}, 500)
		setTimeout(() => {
			$cube2 = 8
		}, 1600)
		setTimeout(() => {
			$cube3 = 10
		}, 500)
		setTimeout(() => {
			$cube4 = 11
		}, 2000)
		setTimeout(() => {
			$cube5 = 8
		}, 1500)
	}
</script>

<div>
	<Cube animate={$cube3} x={-3} y={8.5} z={4} width={3} color="green" rotation={[0, 1.5, 0]}>
		<AnimatedText delay={4.2}><span class="cube-text">About</span></AnimatedText>
	</Cube>
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
