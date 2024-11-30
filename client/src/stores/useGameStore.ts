import { create } from "zustand"

interface IUseGameStore {
	isCreator: boolean
	wrongAnswersCount: number
	incrementWrongAnswersCount: () => void
	resetWrongAnswersCount: () => void
	setIsCreator: (value: boolean) => void
}

export default create<IUseGameStore>()((set) => ({
	isCreator: false,
	wrongAnswersCount: 0,
	incrementWrongAnswersCount: () => set((state) => ({ wrongAnswersCount: state.wrongAnswersCount + 1 })),
	resetWrongAnswersCount: () => set(() => ({ wrongAnswersCount: 0 })),
	setIsCreator: (value) => set(() => ({ isCreator: value })),
}))
