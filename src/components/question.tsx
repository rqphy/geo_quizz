import { Gamemode } from "../types/types"
import Questions from "../data/FR/questions.json"
import { useEffect, useState } from "react"

function interpolateQuestion(
	questionLabel: string[],
	roundLabel: string
): string {
	// console.log(questionLabel, roundLabel)
	return [questionLabel[0], roundLabel, ...questionLabel.slice(1)].join(" ")
}

interface IQuestionProps {
	gamemode: Gamemode
	roundLabel: string
}

export default function Question({ gamemode, roundLabel }: IQuestionProps) {
	const [question, setQuestion] = useState("")

	useEffect(() => {
		let questionLabel: string[] = Questions.find(
			(question) => question.gamemode === gamemode
		)?.label ?? [""]
		setQuestion(interpolateQuestion(questionLabel, roundLabel))
	}, [roundLabel])

	return <p>{question}</p>
}
