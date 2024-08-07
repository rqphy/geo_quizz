import { Country } from "../interfaces"

interface QuizzProps {
	countriesList: Country[]
}

export default function Quizz({ countriesList }: QuizzProps) {
	return (
		<div>
			{countriesList.map((country) => (
				<div>{country.country_name}</div>
			))}
		</div>
	)
}
