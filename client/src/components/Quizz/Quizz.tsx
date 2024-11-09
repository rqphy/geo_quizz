import { ICountry } from "../../types/interfaces"
import { Gamemode } from "../../types/types"
import Question from "../Question/Question"
import GameForm from "../GameForm/GameForm"
import { useEffect, useState } from "react"
import "./quizz.scss"
import socket from "../../socket"

interface IQuizzProps {
	countriesList: ICountry[]
	defaultCountryId: number
}

export default function Quizz({
	countriesList,
	defaultCountryId,
}: IQuizzProps) {
	const [countryId, setCountryId] = useState<number>(defaultCountryId)
	const [gamemode, setGamemode] = useState<Gamemode>("findCountry")
	const [questionLabel, setQuestionLabel] = useState<string>("")
	const [expectedAnswer, setExpectedAnswer] = useState<string>("")
	const [roundCount, setRoundCount] = useState<number>(1)

	useEffect(() => {
		socket.on(
			"startNewRound",
			({ serverRoundCount, countryId, gamemode }) => {
				setRoundCount(serverRoundCount)
				setCountryId(countryId)
				setGamemode(gamemode)
			}
		)
	}, [])

	useEffect(() => {
		if (gamemode === "findCapital") {
			setQuestionLabel(countriesList[countryId].country_name)
			setExpectedAnswer(countriesList[countryId].capital_name)
		} else {
			setQuestionLabel(countriesList[countryId].capital_name)
			setExpectedAnswer(countriesList[countryId].country_name)
		}
	}, [countryId, gamemode])

	return (
		<div className="quizz">
			<p className="quizz__roundCount">Round : {roundCount}</p>
			<Question gamemode={gamemode} roundLabel={questionLabel} />
			<GameForm expectedAnswer={expectedAnswer} />
		</div>
	)
}
