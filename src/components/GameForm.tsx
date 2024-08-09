import Button from "./Button"

function removeAccents(str: string): string {
	return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

function checkAnswer(expectedAnswer: string, answer: string): boolean {
	console.log(answer)
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
	function handleSubmit(_event: React.FormEvent<HTMLFormElement>) {
		_event.preventDefault()

		const inputValue: string = (
			(_event.target as HTMLFormElement)[0] as HTMLInputElement
		).value

		if (checkAnswer(expectedAnswer, inputValue)) {
			// tada + next round + player point
		} else {
			// emit answer
		}

		// Clear input
		;((_event.target as HTMLFormElement)[0] as HTMLInputElement).value = ""
	}

	return (
		<form onSubmit={handleSubmit}>
			<input type="text" placeholder="Répondez ici..." />
			<Button label="Valider" />
		</form>
	)
}
