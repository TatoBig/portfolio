<script lang="ts">
	import { CubeSpring } from '@animation/CubeSpring'
	import AnimatedText from '@animation/AnimatedText.svelte'
	import TopCube from '@animation/TopCube.svelte'
	import TopCubeLink from '@animation/TopCubeLink.svelte'
	import type CubeProperties from 'src/types/CubeProperties'

	export let moveCamera: (pos: number[], page: string) => void
	export let active: boolean
	export let alreadyActive: number = 0
	$: active ? triggerAnimation() : hideAnimation()

	let cubeTimeouts: NodeJS.Timeout[] = []
	let hideTitles: boolean = false
	const height = [13, 11.5, 11.5, 11.5]
	const cubes: CubeProperties[] = [0.6, 1, 1, 1].map((cube, index) => ({
		timing: cube,
		height: height[index],
		spring: CubeSpring({ initial: alreadyActive !== 0 ? height[index] : 0 })
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

	const trigger = (pos: number[], page: string) => {
		if (!hideTitles) {
			hideTitles = true
			moveCamera(pos, page)
		}
	}
</script>

<div>
	<TopCube animate={$cube0} x={1} z={7} width={3} color="red" rotate>
		<AnimatedText delay={0}><span class="cube-text">WORKS</span></AnimatedText>
	</TopCube>
	<TopCubeLink
		animate={$cube1}
		x={7}
		z={3}
		width={3}
		color="red"
		alreadyActive={alreadyActive === 3}
		trigger={() => trigger([4, 3.4, 2, 4, 3.4, 2], '/works/oonee')}
	>
		<AnimatedText hide={hideTitles} controlled delay={0}
			><span class="cube-text">OONEE</span></AnimatedText
		>
	</TopCubeLink>
	<TopCubeLink
		animate={$cube2}
		x={6}
		z={4.5}
		width={3.5}
		color="red"
		alreadyActive={alreadyActive === 2}
		trigger={() => trigger([4, 4, 4, 6, 4, 4], '/works/robusto')}
	>
		<AnimatedText hide={hideTitles} controlled delay={0}
			><span class="cube-text">ROBUSTO</span></AnimatedText
		>
	</TopCubeLink>
	<TopCubeLink
		animate={$cube3}
		x={5}
		z={6}
		width={3}
		alreadyActive={alreadyActive === 1}
		trigger={() => trigger([4, 2, 5, 4, 2, 5], '/works/gabriel')}
	>
		<AnimatedText hide={hideTitles} delay={0}><span class="cube-text">GABRIEL</span></AnimatedText>
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
