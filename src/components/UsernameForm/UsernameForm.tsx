import "./usernameform.scss"
import Button from "../Button/Button"
import { FormEvent } from "react"

interface IUsernameForm {
	onSubmit: (_event: FormEvent<HTMLFormElement>) => void
}

export default function UsernameForm({ onSubmit }: IUsernameForm) {
	return (
		<form className="username" onSubmit={onSubmit}>
			<input
				type="text"
				name="username"
				className="username__text"
				placeholder="Entrez votre nom ici"
				autoFocus
				maxLength={10}
				minLength={3}
				required
			/>
			<Button label="Valider" className="username__button" />
		</form>
	)
}
