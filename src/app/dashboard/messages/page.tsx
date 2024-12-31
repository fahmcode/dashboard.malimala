"use client";

import { useState } from "react";
import { Send, ArrowLeft } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useSocket } from "@/hooks/use-socket";
import { Badge } from "@/components/ui/badge";

export default function MessagesPage() {
  const [newMessage, setNewMessage] = useState("");
  const [username] = useState(() => `User${Math.floor(Math.random() * 1000)}`);
  const { messages, users, isConnected, sendMessage } = useSocket(username);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      sendMessage(newMessage);
      setNewMessage("");
    }
  };

  const filteredMessages = selectedUser
    ? messages.filter((m) => m.user === selectedUser || m.user === username)
    : messages;

  return (
    <div className="h-full flex flex-col md:flex-row">
      {/* Users List */}
      <div
        className={`md:w-64 flex-shrink-0 border-r ${
          selectedUser ? "hidden md:block" : "block"
        }`}
      >
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold mb-2">Online Users</h2>
          <Badge variant={isConnected ? "default" : "destructive"}>
            {isConnected ? "Connected" : "Disconnected"}
          </Badge>
        </div>
        <ScrollArea className="h-[calc(100vh-10rem)]">
          <div className="p-4 space-y-2">
            {users.map((user) => (
              <Button
                key={user}
                variant="ghost"
                className="w-full justify-start"
                onClick={() => setSelectedUser(user)}
              >
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span>{user}</span>
                </div>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Messages Area */}
      <div
        className={`flex-grow flex flex-col ${
          selectedUser ? "block" : "hidden md:block"
        }`}
      >
        <div className="p-4 border-b flex items-center gap-2">
          {selectedUser && (
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setSelectedUser(null)}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <h2 className="text-lg font-semibold">
            {selectedUser || "All Messages"}
          </h2>
        </div>
        <ScrollArea className="flex-grow">
          <div className="p-4 space-y-4">
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                className={`flex flex-col ${
                  message.user === username ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg px-4 py-2 ${
                    message.user === username
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <div className="mb-1 text-sm font-semibold">
                    {message.user}
                  </div>
                  <div>{message.content}</div>
                </div>
                <span className="mt-1 text-xs text-muted-foreground">
                  {format(new Date(message.timestamp), "HH:mm")}
                </span>
              </div>
            ))}
          </div>
        </ScrollArea>
        <Separator />
        <form onSubmit={handleSubmit} className="p-4 flex gap-2">
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            disabled={!isConnected}
          />
          <Button type="submit" size="icon" disabled={!isConnected}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
