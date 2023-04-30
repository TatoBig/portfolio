<script lang="ts">
	import { HTML } from '@threlte/extras'
	import { T } from '@threlte/core'
	import type { ColorRepresentation } from 'three'
	import { Editable } from '@threlte/theatre'

	export let color: ColorRepresentation | [color: ColorRepresentation] | undefined = 'red'
	export let animate: number = 1
	export let x: number = 0
	let y: number = 8
	export let z: number = 0
	export let width: number = 1
	export let depth: number = 1
	export let rotate: boolean = false
</script>

<T.Group visible={animate === 0 ? false : true}>
	<T.Mesh
		position.y={animate * 0.5 - y}
		position.x={x}
		position.z={z}
		castShadow
		let:ref
		rotation={[-1.58, 0, rotate ? 1.5 : 0]}
	>
		<T.BoxGeometry args={[width * 0.75, depth * 0.75, animate]} />
		<T.MeshStandardMaterial {color} />
		<HTML transform position={{ z: animate / 2 }}>
			<div class="face">
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
