<script lang="ts">
	import { HTML, useCursor } from '@threlte/extras'
	import { InteractiveObject, T } from '@threlte/core'
	import type { ColorRepresentation } from 'three'
	import Arrow from '@components/assets/Arrow.svelte'
	import { spring } from 'svelte/motion'
	import { writable } from 'svelte/store'

	export let color: ColorRepresentation | [color: ColorRepresentation] | undefined = 'red'
	export let animate: number = 1
	export let x: number = 0
	let y: number = 8
	export let z: number = 0
	export let width: number = 1
	export let depth: number = 1
	export let rotate: boolean = false

	const onPointerOverCursor = writable('grab')
	onPointerOverCursor.set('grabbing')

	const upside = spring(0)
	let activeMain = false
	let activeArrow = false

	const upriseMain = () => {
		$upside = 1
		activeMain = true
	}

	const upriseArrow = () => {
		$upside = 1
		activeArrow = true
	}
</script>

<T.Group>
	<T.Mesh
		position.y={(animate + $upside) * 0.5 - y}
		position.x={x}
		position.z={z}
		castShadow
		rotation={[-1.585, 0, rotate ? 1.5 : 0]}
		let:ref
	>
		<InteractiveObject
			object={ref}
			interactive
			on:pointerenter={() => ($upside = 1)}
			on:pointerleave={() => ($upside = 0)}
		/>
		<T.BoxGeometry args={[width * 0.75, depth * 0.75, animate + $upside]} />
		<T.MeshStandardMaterial {color} />
		<HTML transform position={{ z: (animate + $upside) / 2 }}>
			<div class="face">
				<slot />
			</div>
		</HTML>
    <HTML transform position={{ z: (animate + $upside) / 1.8 - 1.3, x: width / 2.65 }} rotation={{ y: 1.5, x: 1.585, z: 0}}>
			<div class="face">
        <div class="arrow-container">
          <Arrow />
        </div>
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
    pointer-events: none;
	}

	.arrow-container {
    pointer-events: none;
		margin-top: 8px;
		width: 20px;
		height: 40px;
	}
</style>
