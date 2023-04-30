<script lang="ts">
	import { goto } from '$app/navigation'
	import AnimatedText from '@animation/AnimatedText.svelte'
	import TopCube from '@animation/TopCube.svelte'
	import TopCubeLink from '@animation/TopCubeLink.svelte'
	import Background from '@assets/Background.svelte'
	import Menu from '@components/Menu.svelte'
	import { isMenuOpen } from '@components/tools/Stores'
	import { Canvas, OrbitControls, PerspectiveCamera, T } from '@threlte/core'
	import { onMount } from 'svelte'
	import { cubicOut } from 'svelte/easing'
	import { tweened, type Tweened } from 'svelte/motion'
	import { render as DatoRender } from 'datocms-structured-text-to-html-string'
	import axios from 'axios'
  import type { Post } from 'src/types/Post'

	let cameraX: Tweened<number>
	let cameraY: Tweened<number>
	let cameraZ: Tweened<number>
	let positionX: Tweened<number>
	let positionY: Tweened<number>
	let positionZ: Tweened<number>

	let renderBlog = false
	let animateBlog = false

	let transitioning = false
	let posts: Post[] = []

	onMount(async () => {
		initCamera()
		try {
			const endpoint = 'https://graphql.datocms.com/'
			const headers = {
				'content-type': 'application/json',
				Authorization: '0f753130956484da284b721b04182f'
			}
			const graphqlQuery = {
				operationName: 'MyQuery',
				query: `query MyQuery {
					allPosts {
						id
						tag
					}
				}`,
				variables: {}
			}

			const response = await axios({
				url: endpoint,
				method: 'post',
				headers: headers,
				data: graphqlQuery
			})
			posts = response.data.data.allPosts
			console.log(posts)
		} catch (e) {
			console.log(e)
			console.error('Error fetching data')
		}
	})

	const initCamera = (pos: number[] = [0, 0, 0, 0, 0, 30]) => {
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
			duration: 2000,
			easing: cubicOut
		})
	}

	const moveCamera = (pos: number[], id?: string) => {
		transitioning = true
		positionX.set(pos[0] ?? 0)
		positionY.set(pos[1] ?? 30)
		positionZ.set(pos[2] ?? 0)
		cameraX.set(pos[3] ?? 0)
		cameraY.set(pos[4] ?? 0)
		cameraZ.set(pos[5] ?? 0)
		animateBlog = true
		renderBlog = true

		setTimeout(() => {
			goto(`/blog/${id}`)
		}, 2000)

		// if (id) {
		// 	goto(page.replace('/', '#'))
		// 	setTimeout(() => {
		// 		goto(page)
		// 	}, 3000)
		// } else {
		// 	setTimeout(() => {
		// 		transitioning = false
		// 	}, 3000)
		// }
	}
</script>

<Canvas>
	<PerspectiveCamera
		position={{
			x: $positionX,
			z: $positionZ,
			y: $positionY
		}}
		fov={12}
		lookAt={{ y: $cameraY, x: $cameraX, z: $cameraZ }}
	>
		<OrbitControls enableZoom={false} enabled={false} />
	</PerspectiveCamera>

	<TopCube animate={1} x={0} z={-2} width={2} color="gray">
		<AnimatedText hide={$isMenuOpen || renderBlog} controlled delay={0}
			><span class="cube-text">BLOG</span></AnimatedText
		>
	</TopCube>

	{#each posts as post, i}
		<TopCubeLink
			animate={2}
			x={-2}
			z={0 + i}
			width={4}
			color="red"
			trigger={() => moveCamera([1, 80, 2, 0, 0, 0], post.id)}
		>
			<AnimatedText hide={$isMenuOpen || renderBlog} controlled delay={0}
				><span class="cube-text">{post.tag.toUpperCase()}</span></AnimatedText
			>
		</TopCubeLink>
	{/each}

	<T.DirectionalLight castShadow position={[10, 10, 10]} />
	<T.AmbientLight intensity={0.2} />
	<Background color="#F5F5F5" />
</Canvas>
<div class={`menu-screen ${animateBlog ? 'open' : 'closed'}`} />

<style>
	.cube-text {
		font-size: 20px;
		font-family: Urbanist, sans-serif;
		color: white;
		font-weight: bolder;
		text-shadow: 1px 1px 1px gray;
	}

	.closed {
		animation-name: hideAnimation;
		animation-duration: 0.5s;
		animation-timing-function: ease-in-out;
		opacity: 0;
	}

	.open {
		animation-name: blur;
		animation-duration: 8s;
		animation-timing-function: ease-in-out;
		opacity: 1;
	}

	.menu-screen {
		position: absolute;
		z-index: 1;
		background-color: #f5f5f5;
		width: 100vw;
		height: 100vh;
		top: 0;
		left: 0;
		pointer-events: none;
	}

	@keyframes blur {
		0% {
			filter: blur(20px);
			opacity: 0;
		}
		10% {
			opacity: 0.2;
		}
		25%,
		100% {
			filter: blur(0px);
			opacity: 1;
		}
	}

	@keyframes hideAnimation {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
			filter: blur(20px);
			display: none;
		}
	}
</style>
