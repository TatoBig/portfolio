<script lang="ts">
	import { onMount } from 'svelte'

	export let delay: number = 1

	let animate = false
	
	onMount(() => {
		setTimeout(() => {
			animate = true
		}, delay * 1000)
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
