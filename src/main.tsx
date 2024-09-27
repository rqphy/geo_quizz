import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./routes/home/Home.tsx"
import Game from "./routes/game/Game.tsx"
import "./index.scss"
import Header from "./components/Header/Header.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<BrowserRouter>
			<Header />
			<Routes>
				<Route index element={<Home />} />
				<Route path="game" element={<Game />} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
)
