import { useEffect, useState } from "react"

interface ITimerProps {
	targetDate: Date
}

export default function Timer({ targetDate }: ITimerProps) {
	const [secondsLeft, setSecondsLeft] = useState<number>(19)

	useEffect(() => {
		console.log(targetDate)
		function calculateSecondsLeft() {
			const now: Date = new Date()
			const difference = Math.floor(
				(new Date(targetDate).getTime() - now.getTime()) / 1000
			)
			return difference > 0 ? difference : 0 // ensure it's doesn't go negative
		}

		const interval = setInterval(() => {
			setSecondsLeft(calculateSecondsLeft())
		}, 1000)

		return () => clearInterval(interval)
	})

	return <div>{secondsLeft}s</div>
}
