import { IPlayer } from "../../types/interfaces"
import "./scoreboard.scss"

interface IScoreBoardProps {
	playerList: IPlayer[]
}

export default function ScoreBoard({ playerList }: IScoreBoardProps) {
	// sort playerlist by player score from high to low
	playerList.sort((a, b) => b.score - a.score)

	return (
		<ul className="scoreboard">
			<h2>Scores</h2>
			{playerList.map((player: IPlayer) => (
				<li>
					<p>{player.name}</p> <p>{player.score}</p>
				</li>
			))}
		</ul>
	)
}
