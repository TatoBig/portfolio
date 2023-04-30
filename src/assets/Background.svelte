<script lang="ts">
	import * as Three from 'three'
	import * as Threlte from '@threlte/core'

	export let color: Three.ColorRepresentation

	const { scene } = Threlte.useThrelte()
	scene.background = new Three.Color(color)

	function addStar() {
		const geometry = new Three.BoxGeometry(0.2, 0.2, 0.2)
		const material = new Three.MeshStandardMaterial({ color: Three.MathUtils.randInt(0, 0xffffff) })
		const star = new Three.Mesh(geometry, material)

		const [x, y, z] = Array(3)
			.fill()
			.map(() => Three.MathUtils.randFloatSpread(30))

		star.position.set(x, y, z)
		scene.add(star)
	}

	Array(150).fill().forEach(addStar)
</script>
