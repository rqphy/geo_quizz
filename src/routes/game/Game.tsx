import Quizz from "../../components/Quizz/Quizz"
import ScoreBoard from "../../components/ScoreBoard/ScoreBoard"
import EuropeFR from "../../data/FR/europe.json"
import "./game.scss"

const fakePlayerList = [
	{ name: "toto", score: 12 },
	{ name: "Bibi", score: 9 },
	{ name: "Jilo", score: 15 },
	{ name: "Riri", score: 2 },
	{ name: "Bolto", score: 8 },
	{ name: "SavteSavteSavte", score: 8 },
]

export default function Game() {
	return (
		<section className="game">
			<Quizz countriesList={EuropeFR} />
			<ScoreBoard playerList={fakePlayerList} />
		</section>
	)
}
