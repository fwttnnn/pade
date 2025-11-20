import { create } from "zustand"

export type Tooltip = {
  show: boolean
  track?: any
  setTooltip: (show: boolean, track?: any) => void
}

export default create<Tooltip>((set) => ({
  show: false,
  track: undefined,
  setTooltip: (show, track) => set({ show, track }),
}))
