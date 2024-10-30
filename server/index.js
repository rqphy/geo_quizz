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
		lobbies[lobbyId] = { users: [] } // Init lobby with empty user
		socket.join(lobbyId) // Have the user join the lobby
		lobbies[lobbyId].users.push(socket.id) // Add the user to the lobby's users

		// Emit back to the client
		socket.emit("lobbyCreated", lobbyId)
		console.log("Lobby created with ID:", lobbyId)
	})

	// Join Lobby
	socket.on('joinLobby', (lobbyId) => {

		if(lobbies[lobbyId]) {
			socket.join(lobbyId)
			lobbies[lobbyId].users.push(socket.id)

			// Notify the other users in the lobby
			socket.to(lobbyId).emit('userJoined', socket.id)

			// Confirm join
			socket.emit('lobbyJoined', lobbyId)
			console.log(`User ${socket.id} joined lobby ${lobbyId}`)
		} else {
			socket.emit('error', 'Lobby introuvable')
		}


	})

	socket.on("disconnect", () => {
		console.log("user disconnected")

		// Remove user from any lobbies they were in
		for(const lobbyId in lobbies) {
			if(lobbies[lobbyId].users.includes(socket.id)) {
				lobbies[lobbyId].users = lobbies[lobbyId].users.filter(id => id !== socket.id)
				socket.to(lobbyId).emit('userLeft', socket.id)

				// Delete lobby if empty
				if(lobbies[lobbyId].users.length === 0) {
					delete lobbies[lobbyId]
					console.log(`Lobby ${lobbyId} deleted`)
				}
			}
		}
	})
})
