"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Search, Send, Plus, Paperclip, Clock, CheckCircle, User, UserCog, MessageSquare } from "lucide-react"

export function MessagingPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1)
  const [messageText, setMessageText] = useState("")

  // Mock data for conversations
  const conversations = [
    {
      id: 1,
      with: {
        name: "Barangay Secretary",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Official",
        online: true,
      },
      lastMessage: "Good day! How can I help you today?",
      timestamp: "10:30 AM",
      unread: 0,
      messages: [
        {
          id: 1,
          sender: "Barangay Secretary",
          content: "Good day! How can I help you today?",
          timestamp: "10:30 AM",
          status: "read",
        },
      ],
    },
    {
      id: 2,
      with: {
        name: "Health Committee",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Department",
        online: true,
      },
      lastMessage: "The medical mission is scheduled for next week. Please bring your Barangay ID.",
      timestamp: "Yesterday",
      unread: 2,
      messages: [
        {
          id: 1,
          sender: "You",
          content: "Hello, I would like to inquire about the upcoming medical mission.",
          timestamp: "Yesterday, 2:15 PM",
          status: "read",
        },
        {
          id: 2,
          sender: "Health Committee",
          content: "Good day! The medical mission is scheduled for next week, June 20, at the Barangay Plaza.",
          timestamp: "Yesterday, 3:00 PM",
          status: "read",
        },
        {
          id: 3,
          sender: "Health Committee",
          content: "The medical mission is scheduled for next week. Please bring your Barangay ID.",
          timestamp: "Yesterday, 3:01 PM",
          status: "unread",
        },
      ],
    },
    {
      id: 3,
      with: {
        name: "Permits Department",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Department",
        online: false,
      },
      lastMessage: "Your barangay clearance application has been approved. You can pick it up tomorrow.",
      timestamp: "Jun 3",
      unread: 1,
      messages: [
        {
          id: 1,
          sender: "You",
          content:
            "Good day! I would like to follow up on my barangay clearance application with reference number BC-2024-123.",
          timestamp: "Jun 3, 9:00 AM",
          status: "read",
        },
        {
          id: 2,
          sender: "Permits Department",
          content: "Good day! Let me check the status of your application.",
          timestamp: "Jun 3, 9:15 AM",
          status: "read",
        },
        {
          id: 3,
          sender: "Permits Department",
          content: "Your barangay clearance application has been approved. You can pick it up tomorrow.",
          timestamp: "Jun 3, 9:20 AM",
          status: "unread",
        },
      ],
    },
    {
      id: 4,
      with: {
        name: "Barangay Captain",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Official",
        online: false,
      },
      lastMessage: "Thank you for your suggestion. We will discuss it in the next barangay meeting.",
      timestamp: "May 28",
      unread: 0,
      messages: [
        {
          id: 1,
          sender: "You",
          content:
            "Good day, Kap! I would like to suggest installing more street lights along Rizal Avenue for better security at night.",
          timestamp: "May 28, 10:00 AM",
          status: "read",
        },
        {
          id: 2,
          sender: "Barangay Captain",
          content: "Thank you for your suggestion. We will discuss it in the next barangay meeting.",
          timestamp: "May 28, 11:30 AM",
          status: "read",
        },
      ],
    },
  ]

  // Filter conversations based on search term
  const filteredConversations = conversations.filter((conversation) =>
    conversation.with.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Get the selected conversation
  const activeConversation = conversations.find((conversation) => conversation.id === selectedConversation)

  // Handle sending a new message
  const handleSendMessage = () => {
    if (messageText.trim() === "") return

    // In a real app, this would send the message to the server
    console.log("Sending message:", messageText)

    // Clear the input
    setMessageText("")
  }

  return (
    <div className="flex-1 p-0 md:p-0 h-[calc(100vh-4rem)]">
      <div className="grid h-full md:grid-cols-[300px_1fr]">
        {/* Conversations List */}
        <div className="border-r">
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold mb-2">Messages</h2>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="overflow-y-auto h-[calc(100vh-12rem)]">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-3 border-b cursor-pointer hover:bg-accent ${
                  selectedConversation === conversation.id ? "bg-accent" : ""
                }`}
                onClick={() => setSelectedConversation(conversation.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={conversation.with.avatar} alt={conversation.with.name} />
                      <AvatarFallback>{conversation.with.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {conversation.with.online && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium truncate">{conversation.with.name}</h3>
                      <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                      {conversation.unread > 0 && (
                        <Badge
                          variant="default"
                          className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center"
                        >
                          {conversation.unread}
                        </Badge>
                      )}
                    </div>
                    <div className="mt-1">
                      {conversation.with.role === "Official" ? (
                        <Badge variant="outline" className="text-xs px-1 py-0 h-4">
                          <UserCog className="h-2.5 w-2.5 mr-1" />
                          Official
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="text-xs px-1 py-0 h-4">
                          <MessageSquare className="h-2.5 w-2.5 mr-1" />
                          Department
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {filteredConversations.length === 0 && (
              <div className="p-4 text-center text-muted-foreground">No conversations found</div>
            )}
          </div>
          <div className="p-4 border-t">
            <Button className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              New Message
            </Button>
          </div>
        </div>

        {/* Chat Area */}
        {selectedConversation && activeConversation ? (
          <div className="flex flex-col h-full">
            {/* Chat Header */}
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={activeConversation.with.avatar} alt={activeConversation.with.name} />
                  <AvatarFallback>{activeConversation.with.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{activeConversation.with.name}</h3>
                  <div className="flex items-center text-xs text-muted-foreground">
                    {activeConversation.with.online ? (
                      <>
                        <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                        Online
                      </>
                    ) : (
                      <>
                        <Clock className="h-3 w-3 mr-1" />
                        Offline
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {activeConversation.messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "You" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === "You" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <p>{message.content}</p>
                    <div
                      className={`flex items-center mt-1 text-xs ${
                        message.sender === "You" ? "text-primary-foreground/70" : "text-muted-foreground"
                      }`}
                    >
                      {message.timestamp}
                      {message.sender === "You" && <CheckCircle className="h-3 w-3 ml-1" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex items-end gap-2">
                <Textarea
                  placeholder="Type your message..."
                  className="min-h-[80px]"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                />
                <div className="flex flex-col gap-2">
                  <Button variant="outline" size="icon">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button size="icon" onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No conversation selected</h3>
              <p className="text-muted-foreground">Select a conversation from the list or start a new one</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

