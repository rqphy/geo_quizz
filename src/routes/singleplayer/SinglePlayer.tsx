import Quizz from "../../components/Quizz/Quizz"
import EuropeFR from "../../data/FR/europe.json"
import AfricaFR from '../../data/FR/africa.json'
import AsiaFR from '../../data/FR/asia.json'
import NorthAmericaFR from '../../data/FR/north_america.json'
import SouthAmericaFR from '../../data/FR/south_america.json'
import OceaniaFR from '../../data/FR/oceania.json'

export default function SinglePlayer() {
	return (
		<section className="game">
			<Quizz countriesList={EuropeFR} />
		</section>
	)
}
