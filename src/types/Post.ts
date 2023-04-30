import type { StructuredTextDocument } from 'datocms-structured-text-to-html-string'

export type Post = {
	id: string
	tag: string
	title: string
	content: {
		value: StructuredTextDocument
	}
}
