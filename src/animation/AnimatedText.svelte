<script lang="ts">
</script>

<div class="animation-container">
	<div class="animation-content">
		<slot />
	</div>
</div>

<style>
	.animation-container {
        overflow: hidden;
	}
	.animation-content {
        transition-duration: 1s;
        transition-property: all;
        transition-delay: 1s;
    }
</style>
