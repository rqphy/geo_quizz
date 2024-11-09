import { useState } from "react"
import "./wronganswerdisplay.scss"

interface IAnswer {
	id: number
	text: string
}

export default function WrongAnswerDisplay() {
	const [answers, setAnswers] = useState<IAnswer[]>([])

	function handleClick() {
		// Create a unique ID for each answer
		const id = Date.now()
		setAnswers((prevAnswers) => [...prevAnswers, { id: id, text: "Hello" }])

		// Remove the answer after 5s
		setTimeout(() => {
			setAnswers((prevAnswers) =>
				prevAnswers.filter((answer) => answer.id !== id)
			)
		}, 5000)
	}

	return (
		<div className="answerdisplay">
			<p className="answerdisplay__answer">test</p>
			<div onClick={handleClick}>Click here</div>

			<div>
				{answers.map((answer) => (
					<p className="answerdisplay__answer" key={answer.id}>
						{answer.text + answer.id}
					</p>
				))}
			</div>
		</div>
	)
}
