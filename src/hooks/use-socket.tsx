"use client";

import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

export interface Message {
  id: number;
  user: string;
  content: string;
  timestamp: string;
}

export function useSocket(username: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io("http://localhost:3030");

    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
      setIsConnected(true);
      socket.emit("join", username);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("users", (users: string[]) => {
      setUsers(users);
    });

    socket.on("message", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    socketRef.current = socket;

    return () => {
      socket.disconnect();
    };
  }, [username]);

  const sendMessage = (content: string) => {
    if (socketRef.current) {
      socketRef.current.emit("message", content);
    }
  };

  return {
    messages,
    users,
    isConnected,
    sendMessage,
  };
}
