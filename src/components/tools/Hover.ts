import { cursorColor, cursorSize, cursorText } from './Stores'

type Hover = {
	text?: string
	size?: number
	color?: string
}

export const hover = ({ text, color, size = 50 }: Hover) => {
	cursorText.set(text || '')
	cursorSize.set(size)
	cursorColor.set(color || 'black')
}

export const hoverExit = () => {
	cursorText.set('')
	cursorSize.set(10)
	cursorColor.set('black')
}
