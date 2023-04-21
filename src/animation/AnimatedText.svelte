<script lang="ts">
	import { onMount } from 'svelte'

	export let delay: number = 1
	export let hide: boolean = false
	export let controlled: boolean | undefined = false
	$: hideAnimation(hide)

	let animate = false
	let animationTimeout: NodeJS.Timeout

	const hideAnimation = (hide: boolean) => {
		console.log(hide)
		if (hide) {
			animate = false
			if (animationTimeout) clearTimeout(animationTimeout)
		} else {
			animationTimeout = setTimeout(() => {
				animate = true
			}, delay * 1000)
		}
	}

	onMount(() => {
		if (!controlled) {
			setTimeout(() => {
				animate = true
			}, delay * 1000)
		}
	})
</script>

<div class="container">
	<div class={animate ? 'hide' : 'show'}>
		<slot />
	</div>
</div>

<style>
	.container {
		overflow: hidden;
		white-space: nowrap;
		max-width: max-content;
		margin-top: 2px;
	}

	.hide {
		transform: translateY(0%);
		transition: transform 0.6s cubic-bezier(0.645, 0.045, 0.355, 1);
	}

	.show {
		transition: transform 0.6s cubic-bezier(0.645, 0.045, 0.355, 1);
		transform: translateY(-100%);
	}
</style>
