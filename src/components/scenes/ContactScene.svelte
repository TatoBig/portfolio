<script lang="ts">
	import { CubeSpring } from '@animation/CubeSpring'
	import AnimatedText from '@animation/AnimatedText.svelte'
	import TopCube from '@animation/TopCube.svelte'
	import type { Spring } from 'svelte/motion'
	import type CubeProperties from 'src/types/CubeProperties'
	import TopCubeLink from '@animation/TopCubeLink.svelte'
	import GithubIcon from '@assets/icons/GithubIcon.svelte'
	import { goto } from '$app/navigation'
	import LinkedinIcon from '@assets/icons/LinkedinIcon.svelte'
  import GmailIcon from '@assets/icons/GmailIcon.svelte'
	import { copyText } from 'svelte-copy';

	export let active: boolean
	$: active ? triggerAnimation() : hideAnimation()

	let cubeTimeouts: NodeJS.Timeout[] = []
	const height = [11, 9, 7, 9]
	const cubes: CubeProperties[] = [1, 1.5, 0.7, 1.4].map((cube, index) => ({
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
	<TopCube animate={$cube0} x={2} z={2} width={4} color="yellow" rotate>
		<AnimatedText delay={0}><span class="cube-text">CONTACT</span></AnimatedText>
	</TopCube>
	<TopCubeLink
		animate={$cube1}
		x={3}
		z={2}
		width={1}
		color="white"
		trigger={() => goto('https://github.com/TatoBig')}
	>
		<div class="icon">
			<GithubIcon />
		</div>
	</TopCubeLink>

	<TopCubeLink
		animate={$cube2}
		x={-2}
		z={4}
		width={1}
		color="#0072b1"
		trigger={() => goto('https://www.linkedin.com/in/santiago-navas-682757219/')}
	>
		<div class="icon">
			<LinkedinIcon />
		</div>
	</TopCubeLink>
	<TopCubeLink
		animate={$cube3}
		x={4}
		z={-1}
		width={1}
		color="gray"
		trigger={() => copyText('santiagonavas.dev@gmail.com')}
		customText="Copy"
	>
		<div class="icon">
			<GmailIcon />
		</div>
	</TopCubeLink>
</div>

<style>
	.icon {
		width: 30px;
		display: flex;
		justify-content: center;
	}
	.cube-text {
		font-size: 20px;
		font-family: Urbanist, sans-serif;
		color: white;
		font-weight: bolder;
		text-shadow: 1px 1px 1px gray;
	}
</style>
