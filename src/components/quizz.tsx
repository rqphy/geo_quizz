import { ICountry } from "../types/interfaces"

interface IQuizzProps {
	countriesList: ICountry[]
}

export default function Quizz({ countriesList }: IQuizzProps) {
	return (
		<div>
			{countriesList.map((country) => (
				<div>{country.country_name}</div>
			))}
		</div>
	)
}
