"use client"

<<<<<<< HEAD
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Search, Send, PaperclipIcon, Smile, User, Users, MessageSquare } from "lucide-react"

// Mock data for demonstration
const contacts = [
  {
    id: 1,
    name: "Barangay Captain",
    role: "Official",
    avatar: "/placeholder.svg?height=40&width=40",
    unread: 2,
    online: true,
    lastMessage: "Good day! How can I help you today?",
  },
  {
    id: 2,
    name: "Secretary",
    role: "Official",
    avatar: "/placeholder.svg?height=40&width=40",
    unread: 0,
    online: true,
    lastMessage: "Your request has been processed.",
  },
  {
    id: 3,
    name: "Treasurer",
    role: "Official",
    avatar: "/placeholder.svg?height=40&width=40",
    unread: 0,
    online: false,
    lastMessage: "Please submit the required documents.",
  },
  {
    id: 4,
    name: "Health Committee",
    role: "Department",
    avatar: "/placeholder.svg?height=40&width=40",
    unread: 1,
    online: true,
    lastMessage: "The vaccination schedule has been updated.",
  },
  {
    id: 5,
    name: "Peace and Order",
    role: "Department",
    avatar: "/placeholder.svg?height=40&width=40",
    unread: 0,
    online: false,
    lastMessage: "We've received your incident report.",
  },
]

const mockMessages = [
  {
    id: 1,
    sender: "You",
    content: "Good morning! I would like to inquire about the requirements for a barangay clearance.",
    timestamp: "9:30 AM",
    isUser: true,
  },
  {
    id: 2,
    sender: "Barangay Captain",
    content:
      "Good morning! For a barangay clearance, you'll need a valid ID, proof of residency, and to fill out our application form. When do you plan to visit our office?",
    timestamp: "9:35 AM",
    isUser: false,
  },
  {
    id: 3,
    sender: "You",
    content:
      "Thank you for the information. I'm planning to visit tomorrow morning. Is there an online form I can fill out in advance?",
    timestamp: "9:40 AM",
    isUser: true,
  },
  {
    id: 4,
    sender: "Barangay Captain",
    content:
      "Yes, you can download the form from our website or I can send it to you here. Would you like me to send it now?",
    timestamp: "9:45 AM",
    isUser: false,
  },
  { id: 5, sender: "You", content: "Yes, please. That would be very helpful.", timestamp: "9:50 AM", isUser: true },
  {
    id: 6,
    sender: "Barangay Captain",
    content:
      "I've attached the form. Please fill it out and bring it with you tomorrow along with your ID and proof of residency. Our office is open from 8 AM to 5 PM.",
    timestamp: "9:55 AM",
    isUser: false,
  },
  {
    id: 7,
    sender: "You",
    content: "Got it. Thank you very much for your assistance!",
    timestamp: "10:00 AM",
    isUser: true,
  },
  {
    id: 8,
    sender: "Barangay Captain",
    content: "You're welcome! If you have any other questions, feel free to ask. Have a great day!",
    timestamp: "10:05 AM",
    isUser: false,
  },
]

export default function MessagingPage() {
  const [activeContact, setActiveContact] = useState(contacts[0])
  const [message, setMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredContacts, setFilteredContacts] = useState(contacts)

  useEffect(() => {
    setFilteredContacts(
      contacts.filter(
        (contact) =>
          contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.role.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    )
  }, [searchQuery])

  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, this would send the message to the backend
      console.log(`Sending message to ${activeContact.name}: ${message}`)
      setMessage("")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="mb-2 text-3xl font-bold">Messages</h1>
        <p className="mb-8 text-muted-foreground">Communicate with barangay officials and departments</p>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <Card className="lg:col-span-1">
          <CardHeader className="px-4 py-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Contacts</CardTitle>
              <Button variant="ghost" size="icon">
                <Users className="h-5 w-5" />
              </Button>
            </div>
            <div className="relative mt-2">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search contacts..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="all">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="officials">Officials</TabsTrigger>
                <TabsTrigger value="departments">Departments</TabsTrigger>
              </TabsList>
              <ScrollArea className="h-[calc(100vh-350px)]">
                <TabsContent value="all" className="m-0 p-0">
                  {filteredContacts.map((contact) => (
                    <div key={contact.id}>
                      <button
                        className={`flex w-full items-center gap-3 p-3 hover:bg-accent ${
                          activeContact.id === contact.id ? "bg-accent" : ""
                        }`}
                        onClick={() => setActiveContact(contact)}
                      >
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src={contact.avatar} alt={contact.name} />
                            <AvatarFallback>
                              <User className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                          {contact.online && (
                            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-background"></span>
                          )}
                        </div>
                        <div className="flex-1 text-left">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{contact.name}</span>
                            <span className="text-xs text-muted-foreground">10:30 AM</span>
                          </div>
                          <p className="truncate text-sm text-muted-foreground">{contact.lastMessage}</p>
                        </div>
                        {contact.unread > 0 && (
                          <Badge variant="destructive" className="ml-auto">
                            {contact.unread}
                          </Badge>
                        )}
                      </button>
                      <Separator />
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="officials" className="m-0 p-0">
                  {filteredContacts
                    .filter((contact) => contact.role === "Official")
                    .map((contact) => (
                      <div key={contact.id}>
                        <button
                          className={`flex w-full items-center gap-3 p-3 hover:bg-accent ${
                            activeContact.id === contact.id ? "bg-accent" : ""
                          }`}
                          onClick={() => setActiveContact(contact)}
                        >
                          <div className="relative">
                            <Avatar>
                              <AvatarImage src={contact.avatar} alt={contact.name} />
                              <AvatarFallback>
                                <User className="h-4 w-4" />
                              </AvatarFallback>
                            </Avatar>
                            {contact.online && (
                              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-background"></span>
                            )}
                          </div>
                          <div className="flex-1 text-left">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{contact.name}</span>
                              <span className="text-xs text-muted-foreground">10:30 AM</span>
                            </div>
                            <p className="truncate text-sm text-muted-foreground">{contact.lastMessage}</p>
                          </div>
                          {contact.unread > 0 && (
                            <Badge variant="destructive" className="ml-auto">
                              {contact.unread}
                            </Badge>
                          )}
                        </button>
                        <Separator />
                      </div>
                    ))}
                </TabsContent>
                <TabsContent value="departments" className="m-0 p-0">
                  {filteredContacts
                    .filter((contact) => contact.role === "Department")
                    .map((contact) => (
                      <div key={contact.id}>
                        <button
                          className={`flex w-full items-center gap-3 p-3 hover:bg-accent ${
                            activeContact.id === contact.id ? "bg-accent" : ""
                          }`}
                          onClick={() => setActiveContact(contact)}
                        >
                          <div className="relative">
                            <Avatar>
                              <AvatarImage src={contact.avatar} alt={contact.name} />
                              <AvatarFallback>
                                <User className="h-4 w-4" />
                              </AvatarFallback>
                            </Avatar>
                            {contact.online && (
                              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-background"></span>
                            )}
                          </div>
                          <div className="flex-1 text-left">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{contact.name}</span>
                              <span className="text-xs text-muted-foreground">10:30 AM</span>
                            </div>
                            <p className="truncate text-sm text-muted-foreground">{contact.lastMessage}</p>
                          </div>
                          {contact.unread > 0 && (
                            <Badge variant="destructive" className="ml-auto">
                              {contact.unread}
                            </Badge>
                          )}
                        </button>
                        <Separator />
                      </div>
                    ))}
                </TabsContent>
              </ScrollArea>
            </Tabs>
          </CardContent>
          <CardFooter className="p-3">
            <Button className="w-full">
              <User className="mr-2 h-4 w-4" />
              New Message
            </Button>
          </CardFooter>
        </Card>

        <Card className="lg:col-span-3">
          {activeContact ? (
            <>
              <CardHeader className="flex flex-row items-center gap-3 px-4 py-3">
                <Avatar>
                  <AvatarImage src={activeContact.avatar} alt={activeContact.name} />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{activeContact.name}</CardTitle>
                  <CardDescription>
                    {activeContact.online ? (
                      <span className="flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-green-500"></span> Online
                      </span>
                    ) : (
                      "Offline"
                    )}
                  </CardDescription>
                </div>
              </CardHeader>
              <Separator />
              <CardContent className="p-0">
                <ScrollArea className="h-[calc(100vh-350px)] p-4">
                  <div className="space-y-4">
                    {mockMessages.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            msg.isUser ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <div className="mb-1 flex items-center justify-between gap-4">
                            <span className="text-xs font-medium">{msg.sender}</span>
                            <span className="text-xs opacity-70">{msg.timestamp}</span>
                          </div>
                          <p>{msg.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
              <Separator />
              <CardFooter className="p-3">
                <div className="flex w-full items-center gap-2">
                  <Button variant="outline" size="icon">
                    <PaperclipIcon className="h-4 w-4" />
                  </Button>
                  <Input
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSendMessage()
                      }
                    }}
                    className="flex-1"
                  />
                  <Button variant="outline" size="icon">
                    <Smile className="h-4 w-4" />
                  </Button>
                  <Button onClick={handleSendMessage}>
                    <Send className="mr-2 h-4 w-4" />
                    Send
                  </Button>
                </div>
              </CardFooter>
            </>
          ) : (
            <div className="flex h-[calc(100vh-250px)] flex-col items-center justify-center p-4">
              <div className="mb-4 rounded-full bg-muted p-6">
                <MessageSquare className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">No conversation selected</h3>
              <p className="text-center text-muted-foreground">Choose a contact from the list to start messaging</p>
            </div>
          )}
        </Card>
=======
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
>>>>>>> d654815b261a7f3a423f12d0044308792fa218a5
      </div>
    </div>
  )
}

