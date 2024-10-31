import "./modal.scss"
import { MouseEventHandler, useState } from "react"

interface IModalProps {
	value?: string
	label?: string
	onClick?: any
}

export default function Modal({ value, label, onClick }: IModalProps) {
	const [hasClicked, setHasClicked] = useState<boolean>(false)

	function handleButtonClick(_event: any) {
		onClick(_event)
		setHasClicked(true)

		setTimeout(() => {
			setHasClicked(false)
		}, 2000)
	}

	return (
		<div className={`modal ${hasClicked && "modal--clicked"}`}>
			<input type="text" value={value} className="modal__input" />
			{label && (
				<button className="modal__button" onClick={handleButtonClick}>
					{label}
				</button>
			)}
		</div>
	)
}
