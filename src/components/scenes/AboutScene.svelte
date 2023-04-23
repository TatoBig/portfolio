<script lang="ts">
	import { CubeSpring } from '@animation/CubeSpring'
	import AnimatedText from '@animation/AnimatedText.svelte'
	import TopCube from '@animation/TopCube.svelte'
	import type { Spring } from 'svelte/motion'
	import type CubeProperties from 'src/types/CubeProperties'

	export let active: boolean
	$: active ? triggerAnimation() : hideAnimation()

	let cubeTimeouts: NodeJS.Timeout[] = []
	const height = [11, 7, 7, 9]
	const cubes: CubeProperties[] = [1, 1.2, 0.7, 1.4].map((cube, index) => ({
		timing: cube,
		height: height[index],
		spring: CubeSpring()
	}))

	$: cube0 = cubes[0].spring
	$: cube1 = cubes[1].spring
	$: cube2 = cubes[2].spring
	$: cube3 = cubes[3].spring

	const hideAnimation = () => {
		cubes.forEach((cube, index) => {
			cube.spring.set(0)
			clearTimeout(cubeTimeouts[index])
		})
		cubeTimeouts = []
	}

	const triggerAnimation = () => {
		for (const cube of cubes) {
			cubeTimeouts.push(
				setTimeout(() => {
					cube.spring.set(cube.height)
				}, cube.timing * 1000)
			)
		}
	}
</script>

<div>
	<TopCube animate={$cube0} x={5} z={-1} width={4} color="green">
		<AnimatedText delay={0}><span class="cube-text">ABOUT ME</span></AnimatedText>
	</TopCube>
	<TopCube animate={$cube1} x={-2} z={3} width={3} color="blue" rotate />
	<TopCube animate={$cube2} x={-6} z={4} width={1} color="black" />
	<TopCube animate={$cube3} x={1} z={-1} width={1} color="red" />
</div>

<style>
	.cube-text {
		font-size: 20px;
		font-family: Urbanist, sans-serif;
		color: white;
		font-weight: bolder;
		text-shadow: 1px 1px 1px gray;
	}
</style>
