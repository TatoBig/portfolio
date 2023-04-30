import { spring } from 'svelte/motion'
import { writable } from 'svelte/store'

export const currentScene = writable<number>(0)
export const cursorText = writable('')
export const cursorSize = spring(10)
export const cursorColor = writable('black')
