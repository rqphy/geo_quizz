import "./lobbyform.scss"
import CheckInput from "./CheckInput"
import continentsList from "../../data/FR/continents.json"
import { useState } from "react"

export default function LobbyForm() {
	const [checkAll, setCheckAll] = useState<boolean>(false)
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
	}

	return (
		<form>
			<div className="checkall">
				<input
					type="checkbox"
					id="checkall"
					checked={checkAll}
					onChange={handleCheckAll}
				/>
				<label htmlFor="checkall">Monde</label>
			</div>
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
		</form>
	)
}
