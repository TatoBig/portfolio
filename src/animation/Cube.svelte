<script lang="ts">
	import { Canvas, InteractiveObject, OrbitControls, T } from '@threlte/core'
	import { spring } from 'svelte/motion'
  import type { ColorRepresentation } from 'three'
	import { degToRad } from 'three/src/math/MathUtils'

	export let color: ColorRepresentation | [color: ColorRepresentation] | undefined = "red"
	export let animate: number
	export let x: number = 0
	export let y: number = 0
	export let z: number = 0
  export let width: number = 0.75
  export let depth: number = 0.75

</script>

<T.Group>
	<T.Mesh position.y={(animate * 0.5) - y} position.x={x} position.z={z} castShadow let:ref>
		<T.BoxGeometry args={[width, animate, depth]} />
		<T.MeshStandardMaterial color={color} />
	</T.Mesh>
</T.Group>
