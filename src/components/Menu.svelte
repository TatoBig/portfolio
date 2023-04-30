<script lang="ts">
	import { Canvas, T, PerspectiveCamera, OrbitControls, InteractiveObject } from '@threlte/core'
	import { hover, hoverExit } from './tools/Hover'
  import Background from '@assets/Background.svelte'
  import { goto } from '$app/navigation'

  export let closeMenu: () => void

	const handleClick = (page: string) => {
		goto(page)
		closeMenu()
	}
</script>

<Canvas>
	<T.DirectionalLight castShadow position={[3, 10, 8]} />
	<T.DirectionalLight castShadow position={[-3, 10, -8]} />
	<T.AmbientLight intensity={0.3} />

	<PerspectiveCamera
		position={{
			x: 15,
			z: 15,
			y: 15
		}}
		fov={20}
		lookAt={{}}
	>
		<OrbitControls enableZoom={false} enabled={false} autoRotate />
	</PerspectiveCamera>
	<T.Mesh position={[0, 0, 0]} let:ref>
		<T.IcosahedronGeometry />
		<T.MeshStandardMaterial color="green" />
		<InteractiveObject
			object={ref}
			interactive
			on:pointerenter={() => hover({ text: 'Home' })}
			on:pointerleave={() => hoverExit()}
			on:click={() => handleClick('/')}
		/>
	</T.Mesh>
	<T.Mesh position={[3, 0, 0]} let:ref>
		<T.TetrahedronGeometry />
		<T.MeshStandardMaterial color="yellow" />
		<InteractiveObject
			object={ref}
			interactive
			on:pointerenter={() => hover({ text: 'About' })}
			on:pointerleave={() => hoverExit()}
			on:click={() => handleClick('/#about')}
		/>
	</T.Mesh>
	<T.Mesh position={[-3, 0, 0]} let:ref>
		<T.DodecahedronGeometry />
		<T.MeshStandardMaterial color="red" />
		<InteractiveObject
			object={ref}
			interactive
			on:pointerenter={() => hover({ text: 'Works' })}
			on:pointerleave={() => hoverExit()}
			on:click={() => handleClick('/#works')}
		/>
	</T.Mesh>
	<T.Mesh position={[0, 0, 3]} let:ref>
		<T.OctahedronGeometry />
		<T.MeshStandardMaterial color="gray" />
		<InteractiveObject
			object={ref}
			interactive
			on:pointerenter={() => hover({ text: 'Projects', size: 60 })}
			on:pointerleave={() => hoverExit()}
			on:click={() => handleClick('/#projects')}
		/>
	</T.Mesh>
	<T.Mesh position={[0, 0, -3]} let:ref>
		<T.BoxGeometry />
		<T.MeshStandardMaterial color="blue" />
		<InteractiveObject
			object={ref}
			interactive
			on:pointerenter={() => hover({ text: 'Contact', size: 60 })}
			on:pointerleave={() => hoverExit()}
			on:click={() => handleClick('/#contact')}
		/>
	</T.Mesh>
	<T.Mesh position={[0, -4, 0]} let:ref>
		<T.SphereGeometry />
		<T.MeshStandardMaterial color="cyan" />
		<InteractiveObject
			object={ref}
			interactive
			on:pointerenter={() => hover({ text: 'Blog' })}
			on:pointerleave={() => hoverExit()}
			on:click={() => handleClick('/blog')}
		/>
	</T.Mesh>

	<Background color="#F5F5F5" />
</Canvas>