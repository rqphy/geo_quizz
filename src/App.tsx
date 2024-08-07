import Quizz from "./components/quizz"
import EuropeFR from "./data/FR/europe.json"

function App() {
	return (
		<>
			<Quizz countriesList={EuropeFR} />
		</>
	)
}

export default App
