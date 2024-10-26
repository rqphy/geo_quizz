import { MouseEventHandler } from "react"
import "./button.scss"

interface IButtonProps {
	label: string
	className?: string | null
	onClick?: MouseEventHandler<HTMLButtonElement>
}

export default function Button({ label, className, onClick }: IButtonProps) {
	return (
		<button className={`button ${className}`} onClick={onClick}>
			{label}
		</button>
	)
}
