<script lang="ts">
	import '@fontsource/urbanist'
	import { Canvas, Fog } from '@threlte/core'
	import { onMount } from 'svelte'
	import { T, OrbitControls, PerspectiveCamera } from '@threlte/core'
	import { writable } from 'svelte/store'
	import AboutScene from '@components/scenes/AboutScene.svelte'
	import NameScene from '@components/scenes/NameScene.svelte'
	import WorksScene from '@components/scenes/WorksScene.svelte'
	import { tweened, type Tweened } from 'svelte/motion'
	import { cubicOut } from 'svelte/easing'
	import { goto } from '$app/navigation'
	import Background from '@components/assets/Background.svelte'
	import ProjectsScene from '@components/scenes/ProjectsScene.svelte'
	import NameContent from '@components/content/NameContent.svelte'
	import Url from '@components/tools/Url'
	import ContactScene from '@components/scenes/ContactScene.svelte'
	import { currentScene } from '@components/tools/Stores'

	let mouse = writable({ x: 0, y: 0 })
	let innerWidth = 0
	let innerHeight = 0
	let disabledScrolling = false
	let transitioning = false
	let alreadyActive = 0

	let cameraX: Tweened<number>
	let cameraY: Tweened<number>
	let cameraZ: Tweened<number>
	let positionX: Tweened<number>
	let positionY: Tweened<number>
	let positionZ: Tweened<number>

	$: changeCurrentScene($Url?.hash ?? '/')

	const changeCurrentScene = (hash: string) => {
		if (!transitioning) {
			console.log(hash)
			switch (hash) {
				case '#works/gabriel':
					initCamera([5, 5, 5, 4, 5, 2])
					alreadyActive = 1
					$currentScene = 2
					setTimeout(() => {
						moveCamera([15, 15, 15, 0, 0, 0])
						alreadyActive = 0
					}, 500)
					break
				case '#works/robusto':
					initCamera([6, 4.2, 5, 4, 5, 2])
					alreadyActive = 2
					$currentScene = 2
					setTimeout(() => {
						moveCamera([15, 15, 15, 0, 0, 0])
						alreadyActive = 0
					}, 500)
					break
					// [4, 3.4, 2, 4, 3.4, 2]
				case '#works/oonee':
					initCamera([6.7,4 , 2, 5, 3, 4])
					alreadyActive = 3
					$currentScene = 2
					setTimeout(() => {
						moveCamera([15, 15, 15, 0, 0, 0])
						alreadyActive = 0
					}, 500)
					break
				case '#works':
					$currentScene = 2
					initCamera()
					break
				case '':
					$currentScene = 0
					initCamera()
					break
				case '#about':
					$currentScene = 1
					initCamera()
					break
				case '#projects':
					$currentScene = 3
					initCamera()
					break
				case '#contact':
					$currentScene = 4
					initCamera()
					break
				default:
					$currentScene = 0
					initCamera()
					break
			}
		}
	}

	const initCamera = (pos: number[] = [0, 0, 0, 15, 15, 15]) => {
		cameraX = tweened(pos[0], {
			duration: 2000,
			easing: cubicOut
		})
		cameraY = tweened(pos[1], {
			duration: 2000,
			easing: cubicOut
		})
		cameraZ = tweened(pos[2], {
			duration: 2000,
			easing: cubicOut
		})
		positionX = tweened(pos[3], {
			duration: 2000,
			easing: cubicOut
		})
		positionZ = tweened(pos[4], {
			duration: 3000,
			easing: cubicOut
		})
		positionY = tweened(pos[5], {
			duration: 4000,
			easing: cubicOut
		})
	}

	onMount(() => {
		disabledScrolling = true
		setTimeout(() => {
			disabledScrolling = false
		}, 3000)
	})

	const handleMousemove = (event: any) => {
		if (!transitioning) {
			$mouse.x = event.clientX
			$mouse.y = event.clientY
		}
	}

	const handleMouseWheel = (e: any) => {
		if (!disabledScrolling && !transitioning) {
			disabledScrolling = true
			setTimeout(() => {
				disabledScrolling = false
			}, 1000)
			if (e.wheelDeltaY > 0) {
				$currentScene--
			} else {
				$currentScene++
			}
			switch ($currentScene) {
				case 0:
					goto('/')
					break
				case 1:
					goto('#about')
					break
				case 2:
					goto('#works')
					break
				case 3:
					goto('#projects')
					break
				case 4:
					goto('#contact')
				default:
					break
			}
		}
	}

	const moveCamera = (pos: number[], page?: string) => {
		transitioning = true
		positionX.set(pos[0] ?? 15)
		positionY.set(pos[1] ?? 15)
		positionZ.set(pos[2] ?? 15)
		cameraX.set(pos[3] ?? 0)
		cameraY.set(pos[4] ?? 0)
		cameraZ.set(pos[5] ?? 0)

		if (page) {
			goto(page.replace('/', '#'))
			setTimeout(() => {
				goto(page)
			}, 3000)
		} else {
			setTimeout(() => {
				transitioning = false
			}, 3000)
		}
	}
</script>

<svelte:window bind:innerWidth bind:innerHeight />
<div
	class="container"
	on:mousemove={handleMousemove}
	on:mousewheel={handleMouseWheel}
	on:dragenter={(e) => console.log(e)}
>
	<!-- <div class="container"> -->
	<Canvas>
		<PerspectiveCamera
			position={{
				x: ($positionX + $mouse.x / innerWidth) * 1.5,
				z: ($positionZ + (1 - $mouse.x / innerWidth)) * 1.5,
				y: ($positionY + (0.5 - $mouse.y / innerHeight)) * 1.5
			}}
			fov={12}
			lookAt={{ y: $cameraY, x: $cameraX, z: $cameraZ }}
		>
			<OrbitControls enableZoom={false} enabled={false} />
		</PerspectiveCamera>

		<T.DirectionalLight
			castShadow
			position={[
				10 * ($mouse.x / innerWidth),
				10 * (1 - $mouse.y / innerHeight),
				10 * (1 - $mouse.x / innerWidth)
			]}
		/>
		<T.AmbientLight intensity={0.2} />

		<Background color="#F5F5F5" />

		<NameScene active={$currentScene === 0} />
		<AboutScene active={$currentScene === 1} />
		<WorksScene active={$currentScene === 2} {moveCamera} {alreadyActive} />
		<ProjectsScene active={$currentScene === 3} {moveCamera} />
		<ContactScene active={$currentScene === 4} />

		<!-- <T.Mesh position.y={4} position.x={5} position.z={6}>
				<T.BoxGeometry args={[1, 1, 1]} />
				<T.MeshStandardMaterial color="green" />
			</T.Mesh> -->
		<!-- <T.Mesh position.y={4} position.x={6} position.z={4}>
				<T.BoxGeometry args={[1, 1, 1]} />
				<T.MeshStandardMaterial color="blue" />
			</T.Mesh> -->
	</Canvas>

	<NameContent active={$currentScene === 0} />
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
