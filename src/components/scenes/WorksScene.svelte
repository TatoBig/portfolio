<script lang="ts">
	import { CubeSpring } from '@animation/CubeSpring'
	import AnimatedText from '@animation/AnimatedText.svelte'
	import TopCube from '@animation/TopCube.svelte'
	import type { Spring } from 'svelte/motion'
	import type CubeProperties from 'src/types/CubeProperties'
  import TopCubeLink from '@animation/TopCubeLink.svelte'

	export let active: boolean
	$: active ? triggerAnimation() : hideAnimation()

	let cubeTimeouts: NodeJS.Timeout[] = []
	const height = [16, 11.5, 11.5, 11.5]
	const cubes: CubeProperties[] = [1, 2, 2, 2].map((cube, index) => ({
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
	<TopCube animate={$cube0} x={4} z={10} width={3} color="red" rotate>
		<AnimatedText delay={0}><span class="cube-text">WORKS</span></AnimatedText>
	</TopCube>
	<TopCubeLink animate={$cube1} x={7} z={3} width={3} color="red" >
		<AnimatedText delay={0}><span class="cube-text">OONEE</span></AnimatedText>
  </TopCubeLink>
	<TopCubeLink animate={$cube2} x={6} z={4.5} width={3.5} color="red">
		<AnimatedText delay={0}><span class="cube-text">ROBUSTO</span></AnimatedText>
  </TopCubeLink>
	<TopCubeLink animate={$cube3} x={5} z={6} width={3} color="red">
		<AnimatedText delay={0}><span class="cube-text">GABRIEL</span></AnimatedText>
  </TopCubeLink>
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
