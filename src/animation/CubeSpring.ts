import { spring } from 'svelte/motion'

type CubeSpringArgs = {
	damping?: number
	stiffness?: number
	precision?: number
}

export const CubeSpring = ({ damping = 0.6, stiffness = 0.015, precision = 0 }: CubeSpringArgs = {}) => {
	return spring(0, {
		damping,
		stiffness,
		precision
	})
}
