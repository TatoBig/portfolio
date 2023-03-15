import adapter from '@sveltejs/adapter-auto'
import preprocess from 'svelte-preprocess'
import seqPreprocessor from 'svelte-sequential-preprocessor'
import { preprocessThrelte } from '@threlte/preprocess'
import { resolve } from 'path'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: seqPreprocessor([preprocess(), preprocessThrelte()]),

	kit: {
		adapter: adapter()
	}
}

export default config
