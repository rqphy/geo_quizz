import "./finalscore.scss"
import { IPlayer } from "../../types/interfaces"

interface IFinalScoreProps {
	playerList: IPlayer[]
}

let players = [
	{ name: "Alice", score: 42, uuid: "23423423324" },
	{ name: "Bob", score: 75, uuid: "23423423232" },
	{ name: "Charlie", score: 52, uuid: "234231113324" },
	{ name: "Totol", score: 52, uuid: "234231112324" },
	{ name: "Tata", score: 12, uuid: "226631113324" },
	{ name: "Key", score: 32, uuid: "234239913324" },
	{ name: "Cal", score: 25, uuid: "234238813324" },
	{ name: "Jerem", score: 14, uuid: "234231167324" },
]

export default function FinalScore({ playerList }: IFinalScoreProps) {
	const orderedList = players.sort((a, b) => b.score - a.score)

	return (
		<section className="finalscore">
			{orderedList.map((player) => (
				<div className="finalscore__player" key={player.uuid}>
					<p className="finalscore__name">{player.name}</p>
					<p className="finalscore__score">{player.score}</p>
				</div>
			))}
		</section>
	)
}
