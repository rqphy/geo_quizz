import { v4 as uuidv4 } from "uuid"
import { useNavigate } from "react-router-dom"
import { Canvas } from "@react-three/fiber"
import "./home.scss"
import Button from "../../components/Button/Button"
import Experience from "../../components/Experience/Experience"
import { useState } from "react"
import socket from "../../socket"
import Modal from "../../components/Modal/Modal"

export default function Home() {
	const navigate = useNavigate()
	const [lobbyId, setLobbyId] = useState<string>("")
	const [joinModalVisible, setJoinModalVisible] = useState<boolean>(false)

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
					<Button
						label="Rejoindre"
						className="hero__play"
						onClick={() => setJoinModalVisible(!joinModalVisible)}
					/>
					{joinModalVisible && (
						<Modal
							label="Go"
							handleAction={handleJoinLobby}
							value={lobbyId}
							onChange={(_event: any) =>
								setLobbyId(_event.target.value)
							}
						/>
					)}
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
