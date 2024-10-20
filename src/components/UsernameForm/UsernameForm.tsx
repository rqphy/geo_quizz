import "./usernameform.scss"
import Button from "../Button/Button"
import { FormEvent, ChangeEvent, useState } from "react"

interface IUsernameForm {
	onSubmit: (_event: FormEvent<HTMLFormElement>) => void
}

export default function UsernameForm({ onSubmit }: IUsernameForm) {
	const [usernameValue, setUsernameValue] = useState<string>("")
	const [error, setError] = useState<string | null>(null)

	function handleUsernameChange(_event: ChangeEvent<HTMLInputElement>) {
		const value = _event.target.value
		// only allow letters
		const usernameRegex = /^[a-zA-Z]*$/

		if (!usernameRegex.test(value)) {
			setError("Le nom doit contenir uniquement des lettres (a-z, A-Z).")
		} else if (value.length < 3 || value.length > 10) {
			setError("Le nom doit être comprise entre 3 et 10 caractères.")
		} else {
			setError(null)
		}
		setUsernameValue(value)
		console.log(error)
	}

	return (
		<form className={`username ${error && "error"}`} onSubmit={onSubmit}>
			<input
				type="text"
				name="username"
				className="username__text"
				placeholder="Entrez votre nom ici"
				autoFocus
				// maxLength={10}
				// minLength={3}
				onChange={handleUsernameChange}
				value={usernameValue}
				required
			/>
			<Button label="Valider" className="username__button" />
			{error && <p className="username__error">{error}</p>}
		</form>
	)
}
