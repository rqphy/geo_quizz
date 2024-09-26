import { Gamemode } from "../../types/types"
import Questions from "../../data/FR/questions.json"
import "./question.scss"

interface IQuestionProps {
	gamemode: Gamemode
	roundLabel: string
}

export default function Question({ gamemode, roundLabel }: IQuestionProps) {
	let questionLabel: string =
		Questions.find((question) => question.gamemode === gamemode)?.label ??
		""

	return (
		<section className="question">
			<p className="question__label">{questionLabel}</p>
			<p className="question__round">{roundLabel}</p>
		</section>
	)
}
