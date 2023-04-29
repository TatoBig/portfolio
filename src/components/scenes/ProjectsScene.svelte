<script lang="ts">
	import { CubeSpring } from '@animation/CubeSpring'
	import AnimatedText from '@animation/AnimatedText.svelte'
	import TopCube from '@animation/TopCube.svelte'
	import TopCubeLink from '@animation/TopCubeLink.svelte'
	import type CubeProperties from 'src/types/CubeProperties'
  import Cube from '@animation/Cube.svelte'

	export let moveCamera: (pos: number[], page: string) => void
	export let active: boolean
	$: active ? triggerAnimation() : hideAnimation()

	let cubeTimeouts: NodeJS.Timeout[] = []
	let hideTitles: boolean = false
	const height = [11, 11.5, 11.5, 11.5]
	const cubes: CubeProperties[] = [0.6, 1, 1, 1].map((cube, index) => ({
		timing: cube,
		height: height[index],
		spring: CubeSpring()
	}))

	$: cube0 = cubes[0].spring
	$: cube1 = cubes[1].spring
	$: cube2 = cubes[2].spring
	$: cube3 = cubes[3].spring

	const central = CubeSpring()

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

	const trigger = (pos: number[], page: string) => {
		if (!hideTitles) {
			hideTitles = true
			moveCamera(pos, page)
		}
	}

	const handleCentralCube = (page: string) => {
		$central = 10
		hideAnimation()
		setTimeout(() => {
			trigger([-0.2, -0.2, -0.2, 0, 0, 0], page)
		}, 1000)
	}

</script>

<div>
	<TopCube animate={$cube0} x={5} z={0} width={3.5} color="green">
		<AnimatedText delay={0}><span class="cube-text">PROJECTS</span></AnimatedText>
	</TopCube>
	<TopCubeLink
		rotate
		animate={$cube1}
		x={5}
		z={5}
		width={3.5}
		color="green"
		trigger={() => handleCentralCube('/projects/hackfest')}
	>
		<AnimatedText hide={hideTitles} controlled delay={0}
			><span class="cube-text">HACKFEST</span></AnimatedText
		>
	</TopCubeLink>
	<TopCubeLink
		rotate
		animate={$cube2}
		x={3.5}
		z={6}
		width={3.8}
		color="green"
		trigger={() => handleCentralCube('/projects/stockapp')}
	>
		<AnimatedText hide={hideTitles} controlled delay={0}
			><span class="cube-text">STOCKAPP</span></AnimatedText
		>
	</TopCubeLink>
	<TopCubeLink
		rotate
		animate={$cube3}
		x={2}
		z={7}
		width={5}
		color="green"
		trigger={() => handleCentralCube('/projects/framernote')}
	>
		<AnimatedText hide={hideTitles} delay={0}
			><span class="cube-text">FRAMERNOTE</span></AnimatedText
		>
	</TopCubeLink>
	<Cube
		width={1}
		depth={1}
		animate={$central}
	></Cube>
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
