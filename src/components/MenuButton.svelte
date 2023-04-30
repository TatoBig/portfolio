<script lang="ts">
	import { Canvas, T, PerspectiveCamera, OrbitControls, InteractiveObject } from '@threlte/core'
	import { spring } from 'svelte/motion'
  import { hover, hoverExit } from './tools/Hover'

	export let openMenu: () => void

	const scale = spring(1)
</script>

<Canvas>
	<T.DirectionalLight castShadow position={[3, 10, 8]} />
	<T.DirectionalLight castShadow position={[-3, 10, -8]} />

	<PerspectiveCamera
		position={{
			x: 10,
			z: 10,
			y: 12
		}}
		fov={12}
		lookAt={{}}
	>
		<OrbitControls enableZoom={false} enabled={false} autoRotate />
	</PerspectiveCamera>
	<T.Group scale={$scale}>
		<T.Mesh let:ref>
			<T.BoxGeometry />
			<T.MeshStandardMaterial color="black" />
			<InteractiveObject
				object={ref}
				interactive
				on:pointerenter={() => {
					hover({ text: 'Menu'})
					$scale = 1.4
				}}
				on:pointerleave={() => {
					hoverExit()
					$scale = 1
				}}
				on:click={() => openMenu()}
			/>
		</T.Mesh>
	</T.Group>
</Canvas>
