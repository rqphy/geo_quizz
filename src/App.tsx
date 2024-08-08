import Quizz from "./components/quizz"
import EuropeFR from "./data/FR/europe.json"
import Question from "./components/question"

function App() {
	return (
		<>
			<Question gamemode="findCapital" roundLabel="Japon" />
			{/* <Quizz countriesList={EuropeFR} /> */}
		</>
	)
}

export default App
