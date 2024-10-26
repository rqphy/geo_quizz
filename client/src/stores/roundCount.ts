import { create } from "zustand"

interface IRoundCount {
	roundCount: number
	increase: () => void
}

export default create<IRoundCount>()((set) => ({
	roundCount: 1,
	increase: () => set((state) => ({ roundCount: state.roundCount + 1 })),
}))
