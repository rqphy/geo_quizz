import Quizz from "./components/Quizz"
import EuropeFR from "./data/FR/europe.json"


function App() {
	return (
		<>
			<Quizz countriesList={EuropeFR} />
		</>
	)
}

export default App
