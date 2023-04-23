import type { Spring } from "svelte/motion"

type CubeProperties = {
  height: number
  timing: number
  spring: Spring<number>
}

export default CubeProperties