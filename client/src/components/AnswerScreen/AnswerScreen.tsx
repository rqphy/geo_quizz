import { ReactNode } from "react"
import "./answerscreen.scss"

interface IAnswerScreenProps {
	playername?: string
	answer: string
	time: string
	children: ReactNode
}

export default function AnswerScreen({
	playername,
	answer,
	time,
	children,
}: IAnswerScreenProps) {
	return (
		<section className="answerscreen">
			{children}
			<p className="answerscreen__answer">
				La réponse était : <span>{answer}</span>
			</p>
			{playername && (
				<p className="answerscreen__name">
					<span>{playername}</span> l'a trouvé en premier en {time}
					secondes
				</p>
			)}
		</section>
	)
}
