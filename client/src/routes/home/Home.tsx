import { useNavigate } from "react-router-dom"
import { Canvas } from "@react-three/fiber"
import "./home.scss"
import Button from "../../components/Button/Button"
import Experience from "../../components/Experience/Experience"
import { useState } from "react"
import Modal from "../../components/Modal/Modal"
import { useSocket } from "../../contexts/SocketManager"

export default function Home() {
	const navigate = useNavigate()
	const { socket, methods } = useSocket()
	const [joinLobbyId, setJoinLobbyId] = useState<string>("")
	const [joinModalVisible, setJoinModalVisible] = useState<boolean>(false)

	function handleCreateLobby() {
		methods.createLobby()
		socket.on("lobbyCreated", ({ lobbyId, creator }) => {
			navigate(`/lobby/${lobbyId}`, { state: { creator: creator } })
		})
	}

	function handleJoinLobby() {
		if (joinLobbyId.trim()) {
			methods.requestLobbyAccess(joinLobbyId)

			socket.on("requestAccepted", ({ creator }) => {
				navigate(`/lobby/${joinLobbyId}`, {
					state: { creator: creator },
				})
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
					<div className="hero__buttons">
						<Button
							label="Jouer"
							className="hero__play"
							onClick={handleCreateLobby}
						/>
						<Button
							label="Rejoindre"
							className="hero__play"
							onClick={() =>
								setJoinModalVisible(!joinModalVisible)
							}
						/>
						{joinModalVisible && (
							<Modal
								label="Go"
								handleAction={handleJoinLobby}
								value={joinLobbyId}
								onChange={(_event: any) =>
									setJoinLobbyId(_event.target.value)
								}
							/>
						)}
					</div>
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
