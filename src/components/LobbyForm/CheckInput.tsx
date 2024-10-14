interface ICheckInput {
	label: string
	slug: string
	checked: boolean
	onChange: any
}

export default function CheckInput({
	label,
	slug,
	checked,
	onChange,
}: ICheckInput) {
	return (
		<label className="lobbyform__option">
			<input
				type="checkbox"
				id={slug}
				checked={checked}
				onChange={onChange}
			/>
			<div className="option__background"></div>
			<span>{label}</span>
		</label>
	)
}
