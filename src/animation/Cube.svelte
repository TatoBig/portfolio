<script lang="ts">
	import { HTML } from '@threlte/extras'
	import { T } from '@threlte/core'
	import type { ColorRepresentation, EulerOrder } from 'three'

	export let color: ColorRepresentation | [color: ColorRepresentation] | undefined = 'red'
	export let animate: number
	export let x: number = 0
	let y: number = 8
	export let z: number = 0
	export let width: number = 1
	export let depth: number = 1
	export let face: 'left' | 'right' | 'top' = 'right'
	export let rotation:
		| number
		| [x: number, y: number, z: number, order?: EulerOrder | undefined]
		| undefined = [0, 0, 0]
</script>

<T.Group visible={animate === 0 ? false : true}>
	<T.Mesh
		position.y={animate * 0.5 - y}
		position.x={x}
		position.z={z}
		castShadow
		let:ref
		{rotation}
	>
		<T.BoxGeometry args={[width * 0.75, animate, depth * 0.75]} />
		<T.MeshStandardMaterial {color} />
		<HTML transform position={{ z: 0.75 / 2 }}>
			<div class="face" style={`width: ${30 * width}px; height: ${40 * animate}px`}>
				<slot />
			</div>
		</HTML>
	</T.Mesh>
</T.Group>

<style>
	.face {
		overflow: hidden;
		display: flex;
		flex-wrap: wrap;
		flex-direction: column;
		align-items: center;
	}
</style>
