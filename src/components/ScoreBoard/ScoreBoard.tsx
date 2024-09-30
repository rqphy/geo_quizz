import { IPlayer } from "../../types/interfaces"

interface IScoreBoardProps {
	playerList: IPlayer[]
}

export default function ScoreBoard({ playerList }: IScoreBoardProps) {
    // sort playerlist by player score from high to low
	playerList.sort((a, b) => b.score - a.score)

	return (
		<ul className="scoreboard">
			{playerList.map((player: IPlayer) => (
				<li>
					{player.name} : {player.score}
				</li>
			))}
		</ul>
	)
}
