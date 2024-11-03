import { Server } from "socket.io"
import { v4 as uuidv4 } from "uuid"

const io = new Server({
	cors: {
		origin: "http://localhost:5173",
		methods: ["GET", "POST"],
	},
})

const lobbies = {}

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
		if (lobbies[lobbyId]) {
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
		if (lobbies[lobbyId]) {
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
			socket.emit("updateUserList", lobbies[lobbyId].users)
		} else {
			socket.emit("error", "Lobby introuvable")
		}
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
