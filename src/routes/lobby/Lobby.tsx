import EuropeFR from "../../data/FR/europe.json"
import AfricaFR from "../../data/FR/africa.json"
import AsiaFR from "../../data/FR/asia.json"
import NorthAmericaFR from "../../data/FR/north_america.json"
import SouthAmericaFR from "../../data/FR/south_america.json"
import OceaniaFR from "../../data/FR/oceania.json"
import "./lobby.scss"
import { FormEvent, useState } from "react"
import Lobbyform from "../../components/LobbyForm/LobbyForm"
import ScoreBoard from "../../components/ScoreBoard/ScoreBoard"
import Quizz from "../../components/Quizz/Quizz"
import UsernameForm from "../../components/UsernameForm/UsernameForm"
import { ICountry } from "../../types/interfaces"
import { Region } from "../../types/types"

const continentsData: Record<Region, ICountry[]> = {
	EU: EuropeFR,
	AS: AsiaFR,
	NA: NorthAmericaFR,
	SA: SouthAmericaFR,
	OC: OceaniaFR,
	AF: AfricaFR,
}

const fakePlayerList = [
	{ name: "toto", score: 12 },
	{ name: "Bibi", score: 9 },
	{ name: "Jilo", score: 15 },
	{ name: "Riri", score: 2 },
	{ name: "Bolto", score: 8 },
	{ name: "SavteSavteSavte", score: 8 },
]

export default function Lobby() {
	const [playerUsername, setPlayerUsername] = useState<string | null>()
	const [coutriesList, setCountriesList] = useState<ICountry[]>([])

	function handleUsernameSubmit(_event: FormEvent<HTMLFormElement>): void {
		_event.preventDefault()
		const submittedName = new FormData(_event.currentTarget).get("username")
		// TODO : CHECK USERNAME
		let username: string = submittedName?.toString() ?? "Toto"
		setPlayerUsername(username)
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
						<ScoreBoard playerList={fakePlayerList} />
					</>
				)
			} else {
				return (
					<>
						<section className="lobby__creation">
							<h2>Créez votre quizz:</h2>
							<Lobbyform onSubmit={handlePartySubmit} />
						</section>
						<ScoreBoard playerList={fakePlayerList} />
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
