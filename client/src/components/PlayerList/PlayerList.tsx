import "./playerlist.scss"
import { IPlayer } from "../../types/interfaces"

interface IPlayerList {
	list: IPlayer[]
	creatorId: string
}

export default function PlayerList({ list, creatorId }: IPlayerList) {
	return (
		<ul className="playerlist">
			{list.map((player) => (
				<li className="playerlist__player">
					{player.name} {player.uuid === creatorId && "⭐"}
				</li>
			))}
			<li className="playerlist__player">Lartiste</li>
			<li className="playerlist__player">Lartiste</li>
			<li className="playerlist__player">Lartiste</li>
			<li className="playerlist__player">Lartiste</li>
			<li className="playerlist__player">Lartiste</li>
			<li className="playerlist__player">Lartiste</li>
			<li className="playerlist__player">Lartiste</li>
			<li className="playerlist__player">Lartiste</li>
			<li className="playerlist__player">Lartiste</li>
			<li className="playerlist__player">Lartiste</li>
			<li className="playerlist__player">Lartiste</li>
			<li className="playerlist__player">Lartiste</li>
			<li className="playerlist__player">Lartiste</li>
			<li className="playerlist__player">Lartiste</li>
		</ul>
	)
}
