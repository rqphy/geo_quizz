import { create } from "zustand"

interface IUseGameStore {
	isCreator: boolean
	wrongAnswersCount: number
	setWrongAnswersCount: (count: number) => void
	setIsCreator: (value: boolean) => void
}

export default create<IUseGameStore>()((set) => ({
	isCreator: false,
	wrongAnswersCount: 0,
	setWrongAnswersCount: (count) => set(() => ({ wrongAnswersCount: count })),
	setIsCreator: (value) => set(() => ({ isCreator: value })),
}))
