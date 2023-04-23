<script lang="ts">
	import { CubeSpring } from '@animation/CubeSpring'
	import AnimatedText from '@animation/AnimatedText.svelte'
	import Cube from '@animation/Cube.svelte'
  import type CubeProperties from 'src/types/CubeProperties'

	export let active: boolean
	$: active ? triggerAnimation() : hideAnimation()

	let cubeTimeouts: NodeJS.Timeout[] = []
	const height = [8, 8, 10, 11, 8]
	const cubes: CubeProperties[] = [0.6, 1.2, 1, 1.6, 1.1].map((cube, index) => ({
		timing: cube,
		height: height[index],
		spring: CubeSpring()
	}))

	$: cube1 = cubes[0].spring
	$: cube2 = cubes[1].spring
	$: cube3 = cubes[2].spring
	$: cube4 = cubes[3].spring
	$: cube5 = cubes[4].spring

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
	<Cube animate={$cube3} x={-3} z={4} width={3} color="green" rotation={[0, 1.5, 0]}>
		<AnimatedText delay={3.8}><span class="cube-text">FULLSTACK</span></AnimatedText>
		<AnimatedText delay={4}><span class="cube-text">DEVELOPER</span></AnimatedText>
	</Cube>
	<Cube animate={$cube1} x={-2} z={0} />
	<Cube animate={$cube2} x={1} z={0} color="blue" />
	<Cube animate={$cube4} x={3} z={-2} color="yellow" />
	<Cube animate={$cube5} x={4} z={-2} color="purple" />
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
