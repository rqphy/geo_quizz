import Quizz from "../../components/Quizz/Quizz"
import EuropeFR from "../../data/FR/europe.json"

export default function Game() {
	return (
		<>
			<Quizz countriesList={EuropeFR} />
		</>
	)
}
