import "./modal.scss"
import { MouseEventHandler, useState } from "react"

interface IModalProps {
	value?: string
	label?: string
	handleAction?: any
	onChange?: any
}

export default function Modal({
	value,
	label,
	handleAction,
	onChange,
}: IModalProps) {
	const [hasClicked, setHasClicked] = useState<boolean>(false)

	function handleButtonClick(_event: any) {
		_event.preventDefault()

		handleAction(_event)
		setHasClicked(true)

		setTimeout(() => {
			setHasClicked(false)
		}, 2000)
	}

	function onKeyDown(_event: any) {
		if (_event.key === "Enter") {
			handleButtonClick(_event)
		}
	}

	return (
		<div className={`modal ${hasClicked && "modal--clicked"}`}>
			<input
				type="text"
				value={value}
				className="modal__input"
				onChange={onChange}
				onKeyDown={onKeyDown}
				autoFocus
				readOnly={!!value}
			/>
			{label && (
				<button className="modal__button" onClick={handleButtonClick}>
					{label}
				</button>
			)}
		</div>
	)
}
