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
	console.log("user connected", socket.rooms)

	// Create Lobby
	socket.on("createLobby", () => {
		console.log("create lobby asked")
		const lobbyId = uuidv4() // Generate unique lobby ID
		lobbies[lobbyId] = { users: [], creator: socket.id } // Init lobby with empty user
		// socket.join(lobbyId) // Have the user join the lobby
		// lobbies[lobbyId].users.push(socket.id) // Add the user to the lobby's users

		// Emit back to the client
		socket.emit("lobbyCreated", { lobbyId, creator: socket.id })
		console.log("Lobby created with ID:", lobbyId)
	})

	// Request join lobby
	socket.on("requestLobbyAccess", (lobbyId) => {
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
			console.log(socket.rooms, lobbyId)
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

	// leave lobby
	socket.on("leaveLobby", (lobbyId, playerId) => {
		console.log(lobbyId, playerId)
		// lobbies[lobbyId].users = lobbies[lobbyId].users.filter(user => user.uuid !== userId)
	})

	socket.on("setupGame", (lobbyId, countriesList, lastCountryId) => {
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
		io.to(lobbyId).emit("updateUserList", lobbies[lobbyId].users)

		// Start new Round
		io.to(lobbyId).emit("startNewRound", {
			serverRoundCount: roundCount,
			countryId,
			gamemode,
		})
	})

	socket.on("badAnswer", (lobbyId, answer) => {
		io.to(lobbyId).emit("wrongAnswer", answer)
	})

	socket.on("disconnect", () => {
		console.log("user disconnected", socket.rooms, socket.id)

		// Remove user from any lobbies they were in
		for (const lobbyId in lobbies) {
			if (
				lobbies[lobbyId].users.filter((user) => user.uuid == socket.id)
					.length > 0
			) {
				lobbies[lobbyId].users = lobbies[lobbyId].users.filter(
					(user) => user.uuid !== socket.id
				)

				// Update users list
				io.to(lobbyId).emit("updateUserList", lobbies[lobbyId].users)

				// Delete lobby if empty
				if (lobbies[lobbyId].users.length === 0) {
					delete lobbies[lobbyId]
				}
			}
		}
	})
})
