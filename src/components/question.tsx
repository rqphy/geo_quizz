import { Gamemode } from "../types/types"
import Questions from "../data/FR/questions.json"
import { useEffect, useState } from "react"

interface IQuestionProps {
	gamemode: Gamemode
	label: string
}

export default function Question({ gamemode, label }: IQuestionProps) {
	const [question, setQuestion] = useState("")

	useEffect(() => {
		let questionLabel: string[] = Questions.find(
			(question) => question.gamemode === gamemode
		)?.label ?? [""]
		questionLabel = [questionLabel[0], label, ...questionLabel.slice(1)]
		setQuestion(questionLabel.join(" "))
	}, [])

	return <p>{question}</p>
}
