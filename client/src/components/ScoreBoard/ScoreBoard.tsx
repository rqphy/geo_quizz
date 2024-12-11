import { useState } from "react"
import { IPlayer } from "../../types/interfaces"
import { useSocket } from "../../contexts/SocketManager"
import "./scoreboard.scss"

interface IScoreBoardProps {
	playerList: IPlayer[]
}

export default function ScoreBoard({ playerList }: IScoreBoardProps) {
	const [isOpened, setIsOpen] = useState<boolean>(false)
	const { socket } = useSocket()
	// sort playerlist by player score from high to low
	playerList.sort((a, b) => b.score - a.score)

	function handleOpenClick() {
		setIsOpen(!isOpened)
	}

	return (
		<div className="scoreboard">
			<button className="scoreboard__open" onClick={handleOpenClick}>
				{isOpened ? (
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<path d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z"></path>
					</svg>
				) : (
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
						<path d="M20 22H4C3.44772 22 3 21.5523 3 21V3C3 2.44772 3.44772 2 4 2H20C20.5523 2 21 2.44772 21 3V21C21 21.5523 20.5523 22 20 22ZM8 7V9H16V7H8ZM8 11V13H16V11H8ZM8 15V17H16V15H8Z"></path>
					</svg>
				)}
			</button>
			<ul
				className={`scoreboard__list ${
					isOpened && "scoreboard__list--opened"
				}`}
			>
				<h2>Scores</h2>
				{playerList.map((player: IPlayer) => (
					<li
						key={player.uuid}
						className={`scoreboard__player ${
							player.hasGuessed && "scoreboard__player--guessed"
						}
					${player.uuid === socket.id && "scoreboard__player--me"}	
					`}
					>
						<p>{player.name}</p> <p>{player.score}</p>
					</li>
				))}
			</ul>
		</div>
	)
}
