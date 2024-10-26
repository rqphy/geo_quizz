import { ICountry } from "../../types/interfaces"
import { Gamemode } from "../../types/types"
import Question from "../Question/Question"
import GameForm from "../GameForm/GameForm"
import { useEffect, useState } from "react"
import useRoundCountStore from "../../stores/roundCount"
import "./quizz.scss"

interface IQuizzProps {
	countriesList: ICountry[]
}

export default function Quizz({ countriesList }: IQuizzProps) {
	const [countryId, setCountryId] = useState<number>(0)
	const [gamemode, setGamemode] = useState<Gamemode>("findCountry")
	const [questionLabel, setQuestionLabel] = useState<string>("")
	const [expectedAnswer, setExpectedAnswer] = useState<string>("")
	const roundCount = useRoundCountStore((state) => state.roundCount)

	useEffect(() => {
		if (gamemode === "findCapital") {
			setQuestionLabel(countriesList[countryId].country_name)
			setExpectedAnswer(countriesList[countryId].capital_name)
		} else {
			setQuestionLabel(countriesList[countryId].capital_name)
			setExpectedAnswer(countriesList[countryId].country_name)
		}
	}, [countryId, gamemode])

	useEffect(() => {
		let newCountryId = Math.round(
			Math.random() * (countriesList.length - 1)
		)

		if (newCountryId === countryId) {
			newCountryId++
		}

		setCountryId(newCountryId)
		setGamemode(Math.random() > 0.5 ? "findCapital" : "findCountry")
	}, [roundCount])

	return (
		<div className="quizz">
			<p className="quizz__roundCount">Round : {roundCount}</p>
			<Question gamemode={gamemode} roundLabel={questionLabel} />
			<GameForm expectedAnswer={expectedAnswer} />
		</div>
	)
}
