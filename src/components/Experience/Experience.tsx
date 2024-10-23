import { Canvas } from "@react-three/fiber"
import "./experience.scss"

export default function Experience() {
	return (
		<>
			<Canvas>
				<ambientLight />
				<mesh>
					<sphereGeometry args={[2]} />
					<meshStandardMaterial wireframe color={"blue"} />
				</mesh>
			</Canvas>
		</>
	)
}
