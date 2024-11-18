import './finalscore.scss'
import { IPlayer } from "../../types/interfaces"

interface IFinalScoreProps {
	playerList: IPlayer[]
}

export default function FinalScore({ playerList }: IFinalScoreProps) {
	return (
		<section className="finalscore">
			{playerList.map((player) => (
				<div className="finalscore__player" key={player.uuid}>
					<p className="finalscore__name">{player.name}</p>
					<p className="finalscore__score">{player.score}</p>
				</div>
			))}
            <div className="finalscore__player" key={123}>
					<p className="finalscore__name">Toto</p>
					<p className="finalscore__score">12</p>
				</div>
            <div className="finalscore__player" key={123}>
					<p className="finalscore__name">wwwwwwwwwwww</p>
					<p className="finalscore__score">12</p>
				</div>
            <div className="finalscore__player" key={123}>
					<p className="finalscore__name">Toto</p>
					<p className="finalscore__score">12</p>
				</div>
            <div className="finalscore__player" key={123}>
					<p className="finalscore__name">Toto</p>
					<p className="finalscore__score">12</p>
				</div>
            <div className="finalscore__player" key={123}>
					<p className="finalscore__name">Toto</p>
					<p className="finalscore__score">12</p>
				</div>
            <div className="finalscore__player" key={123}>
					<p className="finalscore__name">Toto</p>
					<p className="finalscore__score">12</p>
				</div>
		</section>
	)
}
