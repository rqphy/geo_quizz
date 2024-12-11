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
				{isOpened ? ">" : "<"}
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
