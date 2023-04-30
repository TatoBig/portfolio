<script>
	import { spring } from 'svelte/motion'
	import { cursorColor, cursorSize, cursorText } from './tools/Stores'

	let coords1 = spring(
		{ x: 0, y: 0 },
		{
			stiffness: 0.05,
			damping: 0.25
		}
	)

	let coords2 = spring(
		{ x: 0, y: 0 },
		{
			stiffness: 0.1,
			damping: 0.35
		}
	)
</script>

<svelte:window
	on:mousemove={(e) => {
		coords1.set({ x: e.clientX, y: e.clientY })
		coords2.set({ x: e.clientX, y: e.clientY })
	}}
	on:mousedown={(e) => {
		cursorSize.set(30)
	}}
	on:mouseup={(e) => {
		cursorSize.set(10)
	}}
/>

<svg class="w-full h-full">
	<circle
		cx={$coords1.x}
		cy={$coords1.y}
		r={$cursorSize}
		stroke={$cursorColor}
		stroke-width="1"
		fill-opacity="1"
		fill={$cursorColor}
	/>
	<text
		x={$coords1.x}
		text-anchor="middle"
		alignment-baseline="central"
		y={$coords1.y}
		fill="white"
		class="text">{$cursorText}</text
	>
	<!-- <circle cx={$coords2.x} cy={$coords2.y} r={$cursorSize / 4} fill="white" /> -->
</svg>

<style>
	:global(body) {
		cursor: none;
	}

	.w-full {
		width: 100vw;
	}

	.h-full {
		height: 100vw;
	}

	.text {
		font-size: 2rem;
		background: black;
		text-align: center;
	}

	svg {
		position: absolute;
		z-index: 100;
		top: 0;
		left: 0;
		pointer-events: none;
	}
</style>
