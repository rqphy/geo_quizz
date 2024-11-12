import React, { createContext, ReactNode, useContext, useEffect } from "react"
import { io, Socket } from "socket.io-client"
import { ICountry } from "../types/interfaces"

const socket = io("http://localhost:3000")

// Socket Context
interface ISocketProviderMethods {
	createLobby: () => void,
	requestLobbyAccess: (lobbyId: string) => void,
	joinLobby: (lobbyId: string, username: string) => void,
	leaveLobby: (lobbyId: string, userId: string) => void,
	setupGame: (lobbyId: string, countriesList: ICountry[]) => void,
	goodAnswer: (lobbyId: string, userId: string) => void,
	badAnswer: (lobbyId: string, answer: string) => void
}

interface ISocketContextProps {
	socket: Socket
	methods: ISocketProviderMethods
}
const SocketContext = createContext<ISocketContextProps | undefined>(undefined)

interface ISocketProviderProps {
	children: ReactNode
}

export function SocketProvider({ children }: ISocketProviderProps) {
	const methods = {
		createLobby(): void {
			socket.emit("createLobby")
		},
		requestLobbyAccess(lobbyId: string): void {
			socket.emit("requestLobbyAccess", lobbyId)
		},
		joinLobby(lobbyId: string, username: string): void {
			socket.emit("joinLobby", lobbyId, username)
		},
		leaveLobby(lobbyId: string, userId: string): void {
			socket.emit("leaveLobby", lobbyId, userId)
		},
		setupGame(lobbyId: string, countriesList: ICountry[]): void {
			socket.emit("setupGame", lobbyId, countriesList)
		},
		goodAnswer(lobbyId: string, userId: string): void {
			socket.emit("goodAnswer", lobbyId, userId)
		},
		badAnswer(lobbyId: string, answer: string) {
			socket.emit("badAnswer", lobbyId, answer)
		}
	}

	return (
		<SocketContext.Provider value={{ socket, methods}}>
			{children}
		</SocketContext.Provider>
	)
}
