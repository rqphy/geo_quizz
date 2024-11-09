import { useState } from "react"
import "./wronganswerdisplay.scss"

interface IAnswer {
	id: number
	text: string
	coords: { left: number; top: number }
}

function generateRandomCoords() {
	let sideMargins = 10 // in percentage
	let topMargins = 10 // in percentage

	let leftCoord =
		Math.round(Math.random() * (100 - 2 * sideMargins)) + sideMargins
	let topCoord =
		Math.round(Math.random() * (100 - 2 * topMargins)) + topMargins

	return { left: leftCoord, top: topCoord }
}

export default function WrongAnswerDisplay() {
	const [answers, setAnswers] = useState<IAnswer[]>([])

	function handleClick() {
		// Create a unique ID for each answer
		const id = Date.now()
		setAnswers((prevAnswers) => [
			...prevAnswers,
			{ id: id, text: "Hello", coords: generateRandomCoords() },
		])

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
			<div onClick={handleClick} className="answerdisplay__test">
				Click here
			</div>

			<div>
				{answers.map((answer) => (
					<p
						className="answerdisplay__answer"
						style={{
							top: `${answer.coords.top}%`,
							left: `${answer.coords.left}%`,
						}}
						key={answer.id}
					>
						{answer.text + answer.id}
					</p>
				))}
			</div>
		</div>
	)
}
