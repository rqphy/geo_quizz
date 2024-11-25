import { Server } from "socket.io"
import { v4 as uuidv4 } from "uuid"

const io = new Server({
	cors: {
		origin: process.env.BASE_FRONT_URL,
		methods: ["GET", "POST"],
	},
})

const lobbies = {}
const defaultRoundLimit = 5 // gotta update client side too
const minRoundLimit = 5
const maxRoundLimit = 40

function generateRandomCountryId(listLength, lastCountriesId) {
	let newCountryId

	do {
		newCountryId = Math.round(Math.random() * (listLength - 1))
	} while (lastCountriesId.includes(newCountryId))

	return newCountryId
}

function handlePlayerLeavingLobby(lobbyId, playerId) {
	// Check if lobby exist
	if (lobbies[lobbyId]) {
		// Check if user is in it
		if (
			lobbies[lobbyId].users.filter((user) => user.uuid === playerId)
				.length > 0
		) {
			// Remove user
			lobbies[lobbyId].users = lobbies[lobbyId].users.filter(
				(user) => user.uuid !== playerId
			)
			console.log(`User ${playerId} has left the lobby: ${lobbyId}`)

			// Delete lobby if empty
			if (lobbies[lobbyId].users.length === 0) {
				console.log(`Lobby: ${lobbyId} was empty and got deleted`)
				delete lobbies[lobbyId]
				return
			}

			// Define new creator
			if (playerId === lobbies[lobbyId].creator) {
				// Get another user id
				const newCreator = lobbies[lobbyId].users[0].uuid
				console.log(
					`Lobby: ${lobbyId} has a new creator: ${newCreator}`
				)

				// Update room creator
				lobbies[lobbyId].creator = newCreator
				io.to(lobbyId).emit("updateCreator", newCreator)
			}

			// Update users list
			io.to(lobbyId).emit("updateUserList", lobbies[lobbyId].users)
		}
	}
}

io.listen(3000)

io.on("connection", (socket) => {
	console.log(`=====================`)
	console.log(`User ${socket.id} connected`)

	// Create Lobby
	socket.on("createLobby", () => {
		const lobbyId = uuidv4() // Generate unique lobby ID
		lobbies[lobbyId] = {
			users: [],
			creator: socket.id,
			roundLimit: defaultRoundLimit,
		} // Init lobby with empty user

		// Emit back to the client
		socket.emit("lobbyCreated", { lobbyId, creator: socket.id })
		console.log(`User ${socket.id} created a new lobby: ${lobbyId}`)
	})

	// Request join lobby
	socket.on("requestLobbyAccess", (lobbyId) => {
		console.log(`User ${socket.id} requested to join lobby: ${lobbyId}`)
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

	// Start game with prefered settings
	socket.on("setupGame", (lobbyId, countriesList, roundLimit) => {
		// Init round
		lobbies[lobbyId].round = 1
		lobbies[lobbyId].roundLimit = Math.min(
			Math.max(Number(roundLimit), minRoundLimit),
			maxRoundLimit
		)
		lobbies[lobbyId].countriesList = countriesList
		lobbies[lobbyId].lastCountriesId = []
		const countryId = generateRandomCountryId(
			countriesList.length,
			lobbies[lobbyId].lastCountriesId
		)

		// Start game
		io.to(lobbyId).emit("startGame", { countriesList, countryId })
		console.log(`Lobby ${lobbyId} started the game`)
	})

	socket.on("goodAnswer", (lobbyId, playerId) => {
		// Update values
		lobbies[lobbyId].round += 1
		const roundCount = lobbies[lobbyId].round

		// Update score
		lobbies[lobbyId].users.find((user) => user.uuid === playerId).score += 1
		io.to(lobbyId).emit("updateUserList", lobbies[lobbyId].users)

		if (roundCount <= lobbies[lobbyId].roundLimit) {
			// Start new Round
			const gamemode = Math.random() > 0.5 ? "findCountry" : "findCapital"
			const countryId = generateRandomCountryId(
				lobbies[lobbyId].countriesList.length,
				lobbies[lobbyId].lastCountriesId
			)

			lobbies[lobbyId].lastCountriesId.push(countryId)

			io.to(lobbyId).emit("startNewRound", {
				serverRoundCount: roundCount,
				countryId,
				gamemode,
			})
		} else {
			// Game end
			io.to(lobbyId).emit("endGame")
		}
	})

	socket.on("badAnswer", (lobbyId, answer) => {
		io.to(lobbyId).emit("wrongAnswer", answer)
	})

	// leave lobby
	socket.on("leaveLobby", (lobbyId, playerId) => {
		handlePlayerLeavingLobby(lobbyId, playerId)
	})

	socket.on("disconnect", () => {
		console.log(`User ${socket.id} disconnected`)
		console.log(`=====================`)

		// Remove user from any lobbies they were in
		for (const lobbyId in lobbies) {
			handlePlayerLeavingLobby(lobbyId, socket.id)
		}
	})
})
