import Button from "../Button/Button"
import useRoundCountStore from "../../stores/roundCount"
import "./gameform.scss"

function removeAccents(str: string): string {
	return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

function checkAnswer(expectedAnswer: string, answer: string): boolean {
	if (!answer) return false
	expectedAnswer = removeAccents(expectedAnswer).toLowerCase()
	answer = removeAccents(answer).toLowerCase()
	if (expectedAnswer !== answer) return false
	return true
}

interface IGameFormProps {
	expectedAnswer: string
}

export default function GameForm({ expectedAnswer }: IGameFormProps) {
	const increaseRoundCount = useRoundCountStore((state) => state.increase)

	function handleSubmit(_event: React.FormEvent<HTMLFormElement>) {
		_event.preventDefault()

		const inputValue: string = (
			(_event.target as HTMLFormElement)[0] as HTMLInputElement
		).value

		if (checkAnswer(expectedAnswer, inputValue)) {
			// tada + next round + player point
			increaseRoundCount()
			console.log("YEAH")
		} else {
			// emit answer
			console.log("NOPE")
		}

		// Clear input
		;((_event.target as HTMLFormElement)[0] as HTMLInputElement).value = ""
	}

	return (
		<form onSubmit={handleSubmit} className="gameform">
			<input
				type="text"
				placeholder="Répondre ici..."
				className="gameform__answer"
				autoFocus
			/>
			<Button label="Valider" />
		</form>
	)
}
