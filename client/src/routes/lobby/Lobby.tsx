import EuropeFR from "../../data/FR/europe.json"
import AfricaFR from "../../data/FR/africa.json"
import AsiaFR from "../../data/FR/asia.json"
import NorthAmericaFR from "../../data/FR/north_america.json"
import SouthAmericaFR from "../../data/FR/south_america.json"
import OceaniaFR from "../../data/FR/oceania.json"
import "./lobby.scss"
import { FormEvent, useEffect, useState } from "react"
import Lobbyform from "../../components/LobbyForm/LobbyForm"
import ScoreBoard from "../../components/ScoreBoard/ScoreBoard"
import Quizz from "../../components/Quizz/Quizz"
import UsernameForm from "../../components/UsernameForm/UsernameForm"
import { ICountry, IPlayer } from "../../types/interfaces"
import { Region } from "../../types/types"
import { useLocation, useParams } from "react-router-dom"
import PlayerList from "../../components/PlayerList/PlayerList"
import Button from "../../components/Button/Button"
import WrongAnswerDisplay from "../../components/WrongAnswerDisplay/WrongAnswerDisplay"
import { useSocket } from "../../contexts/SocketManager"

const continentsData: Record<Region, ICountry[]> = {
	EU: EuropeFR,
	AS: AsiaFR,
	NA: NorthAmericaFR,
	SA: SouthAmericaFR,
	OC: OceaniaFR,
	AF: AfricaFR,
}

export default function Lobby() {
	const location = useLocation()
	const { socket, methods, players } = useSocket()
	const { lobbyId } = useParams()
	const [playerUsername, setPlayerUsername] = useState<string | null>()
	const [coutriesList, setCountriesList] = useState<ICountry[]>([])
	const [isCreator, setIsCreator] = useState<boolean>(false)
	const [creatorId, setCreatorId] = useState<string>("")
	const [defaultCountryId, setDefaultCountryId] = useState<number>(0)

	useEffect(() => {
		// Check if creator
		const creator = location.state?.creator
		if (creator) {
			setCreatorId(creator)
		}
		// Check if the current user is the creator
		setIsCreator(socket.id === creator)

		socket.on("startGame", ({ countriesList, countryId }) => {
			console.log("start game", countriesList)
			setCountriesList(countriesList)
			setDefaultCountryId(countryId)
		})

		return () => {
			if(!lobbyId || !socket.id) return
			methods.leaveLobby(lobbyId, socket.id)
			socket.off("startGame")
		}
	}, [lobbyId])

	function handleUsernameSubmit(_event: FormEvent<HTMLFormElement>): void {
		_event.preventDefault()
		const submittedName = new FormData(_event.currentTarget).get("username")
		let username: string = submittedName?.toString() ?? "Toto"
		setPlayerUsername(username)

		// Join the lobby
		if(!lobbyId) return
		methods.joinLobby(lobbyId, username)
	}

	function handlePartySubmit(_event: FormEvent<HTMLFormElement>): void {
		_event.preventDefault()
		const submittedContinentList = new FormData(_event.currentTarget)
		const tempCountriesList: ICountry[] = []
		for (const key of [...submittedContinentList.keys()]) {
			tempCountriesList.push(...continentsData[key as Region])
		}

		if(!lobbyId) return
		methods.setupGame(lobbyId, tempCountriesList)
	}

	function renderContent() {
		if (playerUsername) {
			if (coutriesList.length > 1) {
				return (
					<>
						<WrongAnswerDisplay />
						<Quizz
							countriesList={coutriesList}
							defaultCountryId={defaultCountryId}
						/>
						<ScoreBoard playerList={players} />
					</>
				)
			} else {
				if (isCreator) {
					return (
						<>
							<section className="lobby__creation">
								<h2>Créez votre quizz:</h2>
								<Lobbyform onSubmit={handlePartySubmit} />
							</section>
							<ScoreBoard playerList={players} />
						</>
					)
				} else {
					return (
						<>
							<section className="lobby__list">
								<h2>Lobby</h2>
								<PlayerList
									list={players}
									creatorId={creatorId}
									currentId={socket.id ?? ""}
								/>
								<Button
									label="En attente du créateur"
									className="disabled lobby__list--button"
								/>
							</section>
						</>
					)
				}
			}
		} else {
			return (
				<section className="lobby__name">
					<h2>Choisissez un nom:</h2>
					<UsernameForm onSubmit={handleUsernameSubmit} />
				</section>
			)
		}
	}

	return <section className="lobby">{renderContent()}</section>
}
