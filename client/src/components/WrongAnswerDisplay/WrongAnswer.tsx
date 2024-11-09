interface IWrongAnswerProps {
	answer: string
}

export default function WrongAnswer({ answer }: IWrongAnswerProps) {
	return <p className="wronganswer__answer">{answer}</p>
}
