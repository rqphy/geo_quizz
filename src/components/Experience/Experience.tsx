import { useFrame } from "@react-three/fiber"
import "./experience.scss"
import { useRef } from "react"
import * as THREE from "three"

export default function Experience() {
	const planetRef = useRef<THREE.Mesh | null>(null)

	useFrame(() => {
		if (planetRef.current) {
			planetRef.current.rotation.y += 0.001
			planetRef.current.rotation.x += 0.0005
		}
	})

	return (
		<>
			<ambientLight />
			<mesh ref={planetRef}>
				<sphereGeometry args={[2]} />
				<meshStandardMaterial wireframe color={"blue"} />
			</mesh>
		</>
	)
}
