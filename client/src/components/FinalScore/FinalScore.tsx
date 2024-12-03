import "./finalscore.scss"
import { IPlayer } from "../../types/interfaces"
import { useSocket } from "../../contexts/SocketManager"

interface IFinalScoreProps {
	playerList: IPlayer[]
}

export default function FinalScore({ playerList }: IFinalScoreProps) {
	const { socket } = useSocket()
	const orderedList = playerList.sort((a, b) => b.score - a.score)

	return (
		<section className="finalscore">
			{orderedList.map((player) => (
				<div
					className={`finalscore__player ${
						player.uuid === socket.id && "finalscore__player--me"
					}`}
					key={player.uuid}
				>
					<p className="finalscore__name">{player.name}</p>
					<p className="finalscore__score">{player.score}</p>
				</div>
			))}
		</section>
	)
}
