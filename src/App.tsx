import Quizz from "./components/Quizz"
import EuropeFR from "./data/FR/europe.json"
import Question from "./components/Question"
import GameForm from "./components/GameForm"

function App() {
	return (
		<>
			<Question gamemode="findCapital" roundLabel="Japon" />
			<GameForm expectedAnswer="lol" />
			{/* <Quizz countriesList={EuropeFR} /> */}
		</>
	)
}

export default App
