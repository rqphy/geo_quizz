import React, { createContext, ReactNode, useContext, useEffect } from "react"
import { io, Socket } from "socket.io-client"
import { ICountry } from "../types/interfaces"

const socket = io("http://localhost:3000")

// Socket Context
interface ISocketContextProps {
	socket: Socket
}
const SocketContext = createContext<ISocketContextProps | undefined>(undefined)

interface ISocketProviderProps {
	children: ReactNode
}

export function SocketProvider({ children }: ISocketProviderProps) {
	function createLobby(): void {
		socket.emit("createLobby")
	}

	function requestLobbyAccess(lobbyId: string): void {
		socket.emit("requestLobbyAccess", lobbyId)
	}

	function joinLobby(lobbyId: string, username: string): void {
		socket.emit("joinLobby", lobbyId, username)
	}

	function leaveLobby(lobbyId: string, userId: string): void {
		socket.emit("leaveLobby", lobbyId, userId)
	}

	function setupGame(lobbyId: string, countriesList: ICountry[]): void {
		socket.emit("setupGame", lobbyId, countriesList)
	}

	function goodAnswer(lobbyId: string, userId: string): void {
		socket.emit("goodAnswer", lobbyId, userId)
	}

	function badAnswer(lobbyId: string, answer: string) {
		socket.emit("badAnswer", lobbyId, answer)
	}

	return (
		<SocketContext.Provider value={{ socket }}>
			{children}
		</SocketContext.Provider>
	)
}
