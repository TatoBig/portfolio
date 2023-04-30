<script lang="ts">
	import { HTML, useCursor } from '@threlte/extras'
	import { InteractiveObject, T } from '@threlte/core'
	import type { ColorRepresentation } from 'three'
	import Arrow from '@components/assets/Arrow.svelte'
	import { spring } from 'svelte/motion'
	import { writable } from 'svelte/store'
	import { Editable } from '@threlte/theatre'

	export let trigger: () => void
	export let color: ColorRepresentation | [color: ColorRepresentation] | undefined = 'red'
	export let animate: number = 1
	export let x: number = 0
	let y: number = 8
	export let z: number = 0
	export let width: number = 1
	export let depth: number = 1
	export let rotate: boolean = false
	export let alreadyActive: boolean = false

	$: deactive(alreadyActive)

	const deactive = (alreadyActive: boolean) => {
		if (alreadyActive) {
			setTimeout(() => {
				$upside = 0
			}, 2000)
		}
	}

	const upside = spring(alreadyActive ? 2 : 0)
	let active = false
</script>

<T.Group visible={animate === 0 ? false : true}>
	<T.Mesh
		position.y={(animate + $upside) * 0.5 - y}
		position.x={x}
		position.z={z}
		castShadow
		rotation={[-1.585, 0, rotate ? 1.5 : 0]}
		let:ref
	>
		<InteractiveObject
			interactive
			object={ref}
			on:pointerenter={() => ($upside = 2)}
			on:pointerleave={() => (!active && !alreadyActive ? ($upside = 0) : undefined)}
			on:pointerdown={() => {
				active = true
				$upside = 2
				trigger()
			}}
		/>
		<T.BoxGeometry args={[width * 0.75, depth * 0.75, animate + $upside]} />
		<T.MeshStandardMaterial {color} />
		<HTML transform position={{ z: (animate + $upside + 0.01) / 2 }} pointerEvents="none">
			<div class="face">
				<slot />
			</div>
		</HTML>
		<HTML
			transform
			pointerEvents="none"
			position={{ z: (animate + $upside) / 1.8 - 1.3, x: (width / 2.65) * (rotate ? -1 : 1) }}
			rotation={{ y: 1.5, x: 1.585, z: 0 }}
		>
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
