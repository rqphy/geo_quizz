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
import { useParams } from "react-router-dom"
import socket from "../../socket"

const continentsData: Record<Region, ICountry[]> = {
	EU: EuropeFR,
	AS: AsiaFR,
	NA: NorthAmericaFR,
	SA: SouthAmericaFR,
	OC: OceaniaFR,
	AF: AfricaFR,
}

export default function Lobby() {
	const { lobbyId } = useParams()
	const [playerUsername, setPlayerUsername] = useState<string | null>()
	const [coutriesList, setCountriesList] = useState<ICountry[]>([])
	const [userList, setUserList] = useState<IPlayer[]>([])

	useEffect(() => {
		// Listen for updates to the user list
		socket.on("updateUserList", (userList) => {
			setUserList(userList)
			console.log(userList)
		})
		return () => {
			socket.emit("leaveLobby", lobbyId)
			socket.off("updateUserList")
		}
	}, [lobbyId])

	function handleUsernameSubmit(_event: FormEvent<HTMLFormElement>): void {
		_event.preventDefault()
		const submittedName = new FormData(_event.currentTarget).get("username")
		let username: string = submittedName?.toString() ?? "Toto"
		setPlayerUsername(username)

		// Join the lobby
		socket.emit("joinLobby", lobbyId, username)
	}

	function handlePartySubmit(_event: FormEvent<HTMLFormElement>): void {
		_event.preventDefault()
		const submittedContinentList = new FormData(_event.currentTarget)
		const tempCountriesList: ICountry[] = []
		for (const key of [...submittedContinentList.keys()]) {
			tempCountriesList.push(...continentsData[key as Region])
		}
		setCountriesList(tempCountriesList)
	}

	function renderContent() {
		if (playerUsername) {
			if (coutriesList.length > 1) {
				return (
					<>
						<Quizz countriesList={coutriesList} />
						<ScoreBoard playerList={userList} />
					</>
				)
			} else {
				return (
					<>
						<section className="lobby__creation">
							<h2>Créez votre quizz:</h2>
							<Lobbyform onSubmit={handlePartySubmit} />
						</section>
						<ScoreBoard playerList={userList} />
					</>
				)
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
