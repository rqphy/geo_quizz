import "./finalscore.scss"
import { IPlayer } from "../../types/interfaces"

interface IFinalScoreProps {
	playerList: IPlayer[]
}

export default function FinalScore({ playerList }: IFinalScoreProps) {
	const orderedList = playerList.sort((a, b) => b.score - a.score)

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
