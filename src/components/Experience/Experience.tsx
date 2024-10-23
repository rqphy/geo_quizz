import { useFrame } from "@react-three/fiber"
import { useGLTF } from "@react-three/drei"
import "./experience.scss"
import { useRef } from "react"
import * as THREE from "three"

export default function Experience() {
	const planetRef = useRef<THREE.Mesh | null>(null)
	const planet = useGLTF("./earth/scene.gltf")

	useFrame(() => {
		if (planetRef.current) {
			planetRef.current.rotation.y -= 0.0015
		}
	})

	return (
		<>
			<directionalLight
				position={[3, 2, 4]}
				intensity={1}
				color={"#ffffff"}
			/>
			<ambientLight intensity={0.3} />
			<primitive
				ref={planetRef}
				object={planet.scene}
				scale={0.02}
				rotation={[0.2 * Math.PI, 0, 0]}
			/>
		</>
	)
}
