import "./playerlist.scss"
import { IPlayer } from "../../types/interfaces"

interface IPlayerList {
	list: IPlayer[]
	creatorId: string
	currentId: string
}

export default function PlayerList({
	list,
	creatorId,
	currentId,
}: IPlayerList) {
	return (
		<ul className="playerlist">
			{list.map((player) => (
				<li
					className={`playerlist__player ${
						player.uuid === currentId &&
						"playerlist__player--current"
					}`}
				>
					{player.name} {player.uuid === creatorId && "⭐"}
				</li>
			))}
		</ul>
	)
}
