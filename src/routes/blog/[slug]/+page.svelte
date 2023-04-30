<script lang="ts">
	import axios from 'axios'
	import { render as renderText } from 'datocms-structured-text-to-html-string'
  import type { Post } from 'src/types/Post.js'
	import { onMount } from 'svelte'

	let post: Post

	onMount(async () => {
		try {
			const endpoint = 'https://graphql.datocms.com/'
			const headers = {
				'content-type': 'application/json',
				Authorization: '0f753130956484da284b721b04182f'
			}
			const graphqlQuery = {
				operationName: 'getPost',
				query: `query getPost {
					post(filter: {id: {eq: "${data.slug}"}}) {
						id
						title
						content {
							value
						}
					}
				}`,
				variables: {}
			}

			const response = await axios({
				url: endpoint,
				method: 'post',
				headers: headers,
				data: graphqlQuery
			})
			post = response.data.data.post
		} catch (e) {
			console.error('Error fetching data')
		}
	})

	export let data
</script>

<div>
	<div class="blog-content">
		<h5 class="blog-title">
			{post?.title ?? ''}
		</h5>
		<div class="blog-text">
			{@html renderText(post?.content.value ?? '')}
		</div>
	</div>
</div>

<style>
	.blog-title {
		padding: 10vh 20vw;
	}
	.blog-text {
		padding: 10vh 20vw;
	}
	.blog-content {
		position: absolute;
		top: 0;
		left: 0;
		overflow-y: scroll;
		height: 100%;
	}
</style>
