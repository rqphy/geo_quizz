import { ICountry } from "../../types/interfaces"
import { Gamemode } from "../../types/types"
import Question from "../Question/Question"
import GameForm from "../GameForm/GameForm"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "./quiz.scss"
import { useSocket } from "../../contexts/SocketManager"
import Button from "../Button/Button"
import useGameStore from "../../stores/useGameStore"

interface IQuizzProps {
	countriesList: ICountry[]
	defaultCountryId: number
}

export default function Quiz({ countriesList, defaultCountryId }: IQuizzProps) {
	const [countryId, setCountryId] = useState<number>(defaultCountryId)
	const [gamemode, setGamemode] = useState<Gamemode>("findCountry")
	const [questionLabel, setQuestionLabel] = useState<string>("")
	const [expectedAnswer, setExpectedAnswer] = useState<string>("")
	const [roundCount, setRoundCount] = useState<number>(1)
	const { lobbyId } = useParams()
	const { socket, players, methods } = useSocket()
	const { isCreator, wrongAnswersCount, resetWrongAnswersCount } =
		useGameStore()

	useEffect(() => {
		socket.on(
			"startNewRound",
			({ serverRoundCount, countryId, gamemode }) => {
				setRoundCount(serverRoundCount)
				setCountryId(countryId)
				setGamemode(gamemode)
				resetWrongAnswersCount()
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

	function handleSkipClick(_event: any) {
		_event.preventDefault()
		methods.newRound(lobbyId as string)
	}

	return (
		<div className="quiz">
			<p className="quiz__roundCount">Round : {roundCount}</p>
			<Question gamemode={gamemode} roundLabel={questionLabel} />
			<div className="quiz__container">
				<GameForm expectedAnswer={expectedAnswer} />
				{wrongAnswersCount >= players.length * 4 && isCreator && (
					<Button
						label="Nouvelle question"
						className={`quiz__skip`}
						onClick={handleSkipClick}
					/>
				)}
			</div>
		</div>
	)
}
