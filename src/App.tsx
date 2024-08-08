import Quizz from "./components/quizz"
import EuropeFR from "./data/FR/europe.json"
import Question from "./components/question"

function App() {
	return (
		<>
			<Question gamemode="findCountry" label="Tokyo" />
			{/* <Quizz countriesList={EuropeFR} /> */}
		</>
	)
}

export default App
