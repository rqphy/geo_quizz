import { v4 as uuidv4 } from "uuid"
import { useNavigate } from "react-router-dom"
import { Canvas } from "@react-three/fiber"
import "./home.scss"
import Button from "../../components/Button/Button"
import Experience from "../../components/Experience/Experience"
import { useState } from "react"
import socket from "../../socket"

export default function Home() {
	const navigate = useNavigate()
	const [lobbyId, setLobbyId] = useState<string>("")

	function handleCreateLobby() {
		socket.emit("createLobby")
		socket.on("lobbyCreated", (newLobbyId) => {
			navigate(`/lobby/${newLobbyId}`)
		})
	}

	function handleJoinLobby() {
		if (lobbyId.trim()) {
			socket.emit("requestJoinLobby", lobbyId)
			socket.on("requestAccepted", () => {
				navigate(`/lobby/${lobbyId}`)
			})
			socket.on("error", (message) => {
				alert(message)
			})
		}
	}

	return (
		<>
			<section className="hero">
				<div className="hero__content">
					<h1 className="hero__title">Bienvenue sur GeoQuizz!</h1>
					<p className="hero__description">
						Customisez votre quizz et jouez seul ou à plusieurs.
					</p>
					<Button
						label="Jouer"
						className="hero__play"
						onClick={handleCreateLobby}
					/>
					<input
						type="text"
						placeholder="Entrez le code du lobby"
						value={lobbyId}
						onChange={(_event) => setLobbyId(_event.target.value)}
					/>
					<Button
						label="Rejoindre"
						className="hero__play"
						onClick={handleJoinLobby}
					/>
				</div>
				<div className="hero__planet">
					<Canvas>
						<Experience />
					</Canvas>
				</div>
			</section>
		</>
	)
}
