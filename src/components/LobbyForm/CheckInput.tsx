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
		<div>
			<input
				type="checkbox"
				id={slug}
				checked={checked}
				onChange={onChange}
			/>
			<label htmlFor={slug}>{label}</label>
		</div>
	)
}
