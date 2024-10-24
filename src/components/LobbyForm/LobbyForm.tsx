import "./lobbyform.scss"
import CheckInput from "./CheckInput"
import continentsList from "../../data/FR/continents.json"
import { FormEvent, useState } from "react"
import Button from "../Button/Button"

interface ILobbyForm {
	onSubmit: (_event: FormEvent<HTMLFormElement>) => void
}

export default function LobbyForm({ onSubmit }: ILobbyForm) {
	const [checkAll, setCheckAll] = useState<boolean>(false)
	const [noneChecked, setNoneChecked] = useState<boolean>(true)
	const [items, setItems] = useState(
		continentsList.map((continent) => ({
			...continent,
			checked: false,
		}))
	)

	const handleCheckAll = (_event: any) => {
		const { checked } = _event.target
		setCheckAll(checked)

		const updatedItems = items.map((item) => ({
			...item,
			checked: checked,
		}))
		setItems(updatedItems)
	}

	const handleItemChange = (_event: any, slug: string) => {
		const { checked } = _event.target
		const updatedItems = items.map((item) =>
			item.slug === slug ? { ...item, checked: checked } : item
		)
		setItems(updatedItems)

		const allChecked = updatedItems.every((item) => item.checked)
		setCheckAll(allChecked)

		const someChecked = updatedItems.some((item) => item.checked)
		setNoneChecked(!someChecked)
	}

	const handleInvite = (_event: any) => {
		_event.preventDefault()
		console.log("invite")
	}

	return (
		<form className="lobbyform" onSubmit={onSubmit}>
			<label className="lobbyform__option lobbyform--checkall">
				<input
					type="checkbox"
					id="checkall"
					checked={checkAll}
					onChange={handleCheckAll}
				/>
				<div className="option__background"></div>

				<span>Monde</span>
			</label>
			{items.map((item) => (
				<CheckInput
					key={item.slug}
					label={item.label}
					slug={item.slug}
					checked={item.checked}
					onChange={(_event: any) =>
						handleItemChange(_event, item.slug)
					}
				/>
			))}
			<Button label="Jouer" className={`${noneChecked && "disabled"}`} />
			<Button label="Inviter" className="invite" onClick={handleInvite} />
		</form>
	)
}
