import "./button.scss"

interface IButtonProps {
	label: string
}

export default function Button({ label }: IButtonProps) {
	return <button className="button">{label}</button>
}
