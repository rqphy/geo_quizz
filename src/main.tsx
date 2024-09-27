import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./routes/home/Home.tsx"
import Game from "./routes/game/Game.tsx"
import "./index.scss"

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route index element={<Home />} />
				<Route path="game" element={<Game />} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
)
