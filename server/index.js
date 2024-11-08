import { Server } from "socket.io"
import { v4 as uuidv4 } from "uuid"

const io = new Server({
	cors: {
		origin: "http://localhost:5173",
		methods: ["GET", "POST"],
	},
})

const lobbies = {}

function generateRandomCountryId(listLength, lastCountryId) {
	let newCountryId = Math.round(Math.random() * (listLength - 1))

	if (newCountryId === lastCountryId) {
		newCountryId++
	}

	return newCountryId
}

io.listen(3000)

io.on("connection", (socket) => {
	console.log("user connected")

	// Create Lobby
	socket.on("createLobby", () => {
		const lobbyId = uuidv4() // Generate unique lobby ID
		lobbies[lobbyId] = { users: [], creator: socket.id } // Init lobby with empty user
		// socket.join(lobbyId) // Have the user join the lobby
		// lobbies[lobbyId].users.push(socket.id) // Add the user to the lobby's users

		// Emit back to the client
		socket.emit("lobbyCreated", { lobbyId, creator: socket.id })
		console.log("Lobby created with ID:", lobbyId)
	})

	// Request join lobby
	socket.on("requestJoinLobby", (lobbyId) => {
		if (
			lobbies[lobbyId] &&
			!lobbies[lobbyId].users.some((user) => user.uuid === socket.id)
		) {
			socket.emit("requestAccepted", {
				lobbyId,
				creator: lobbies[lobbyId].creator,
			})
		} else {
			socket.emit("error", "Lobby introuvable")
		}
	})

	// Join Lobby
	socket.on("joinLobby", (lobbyId, username) => {
		if (
			lobbies[lobbyId] &&
			!lobbies[lobbyId].users.some((user) => user.uuid === socket.id)
		) {
			socket.join(lobbyId)
			lobbies[lobbyId].users.push({
				uuid: socket.id,
				name: username,
				score: 0,
			})

			// Notify the other users in the lobby
			socket.to(lobbyId).emit("userJoined", socket.id)

			// Confirm join
			socket.emit("lobbyJoined", { lobbyId, creator: socket.id })
			console.log(`User ${socket.id} joined lobby ${lobbyId}`)

			// Update users list
			io.to(lobbyId).emit("updateUserList", lobbies[lobbyId].users)
		} else {
			socket.emit("error", "Lobby introuvable")
		}
	})

	socket.on("submitLobby", (lobbyId, countriesList, lastCountryId) => {
		// Init round
		lobbies[lobbyId].round = 1
		lobbies[lobbyId].countriesList = countriesList
		const countryId = generateRandomCountryId(
			countriesList.length,
			lastCountryId
		)

		// Start game
		io.to(lobbyId).emit("startGame", { countriesList, countryId })
		console.log(`Lobby ${lobbyId} started the game`)
	})

	socket.on("goodAnswer", (lobbyId, playerId) => {
		// Update values
		lobbies[lobbyId].round += 1
		const roundCount = lobbies[lobbyId].round
		const countryId = generateRandomCountryId(
			lobbies[lobbyId].countriesList.length,
			0 // Random countryId
		)
		const gamemode = Math.random() > 0.5 ? "findCountry" : "findCapital"

		// Update score
		lobbies[lobbyId].users.find((user) => user.uuid === playerId).score += 1
		// io.to(lobbyId).emit("updateScores", lobbies[lobbyId])
		io.to(lobbyId).emit("updateUserList", lobbies[lobbyId].users)

		// Start new Round
		io.to(lobbyId).emit("startNewRound", {
			serverRoundCount: roundCount,
			countryId,
			gamemode,
		})
	})

	socket.on("badAnswer", (lobbyId, answer) => {
		io.to(lobbyId).to(lobbyId).emit("wrongAnswer", { answer })
	})

	socket.on("disconnect", () => {
		console.log("user disconnected")

		// Remove user from any lobbies they were in
		for (const lobbyId in lobbies) {
			if (lobbies[lobbyId].users.includes(socket.id)) {
				lobbies[lobbyId].users = lobbies[lobbyId].users.filter(
					(id) => id !== socket.id
				)
				socket.to(lobbyId).emit("userLeft", socket.id)

				// Delete lobby if empty
				if (lobbies[lobbyId].users.length === 0) {
					delete lobbies[lobbyId]
					console.log(`Lobby ${lobbyId} deleted`)
				}

				// Update users list
				socket.emit("updateUserList", lobbies[lobbyId].users)
			}
		}
	})
})
