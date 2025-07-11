import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Send, Search, MoreVertical } from "lucide-react";

interface Contact {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
}

interface Message {
  id: number;
  senderId: number;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

const Messages = () => {
  const [selectedContactId, setSelectedContactId] = useState<number | null>(1);
  const [isMobileMessageView, setIsMobileMessageView] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock contacts data
  const contacts: Contact[] = [
    {
      id: 1,
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face",
      lastMessage: "Thanks for the study group session today!",
      lastMessageTime: "2 min ago",
      unreadCount: 2,
      isOnline: true
    },
    {
      id: 2,
      name: "Marcus Johnson",
      avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop&crop=face",
      lastMessage: "Are you free for the project meeting tomorrow?",
      lastMessageTime: "1 hour ago",
      unreadCount: 0,
      isOnline: true
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      avatar: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=150&h=150&fit=crop&crop=face",
      lastMessage: "Great presentation in class today!",
      lastMessageTime: "3 hours ago",
      unreadCount: 1,
      isOnline: false
    },
    {
      id: 4,
      name: "Alex Kim",
      avatar: "",
      lastMessage: "Let me know if you need help with the assignment",
      lastMessageTime: "Yesterday",
      unreadCount: 0,
      isOnline: false
    },
    {
      id: 5,
      name: "Jordan Smith",
      avatar: "",
      lastMessage: "Coffee after the lecture?",
      lastMessageTime: "Yesterday",
      unreadCount: 0,
      isOnline: true
    }
  ];

  // Mock messages data
  const messages: Message[] = [
    {
      id: 1,
      senderId: 1,
      content: "Hey! How was your algorithms exam?",
      timestamp: "10:30 AM",
      isOwn: false
    },
    {
      id: 2,
      senderId: 0, // Current user
      content: "It went really well! Thanks for all the study sessions",
      timestamp: "10:32 AM",
      isOwn: true
    },
    {
      id: 3,
      senderId: 1,
      content: "That's awesome! I'm so glad our group study sessions helped",
      timestamp: "10:33 AM",
      isOwn: false
    },
    {
      id: 4,
      senderId: 0,
      content: "Definitely! Want to grab lunch later to celebrate?",
      timestamp: "10:35 AM",
      isOwn: true
    },
    {
      id: 5,
      senderId: 1,
      content: "Thanks for the study group session today!",
      timestamp: "2:15 PM",
      isOwn: false
    }
  ];

  const selectedContact = contacts.find(c => c.id === selectedContactId);
  
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      console.log("Sending message:", messageInput);
      setMessageInput("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleContactSelect = (contactId: number) => {
    setSelectedContactId(contactId);
    setIsMobileMessageView(true);
  };

  const handleBackToContacts = () => {
    setIsMobileMessageView(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header - Hidden on mobile when in message view */}
      <div className={`${isMobileMessageView ? 'hidden md:block' : ''}`}>
        <h1 className="text-3xl font-bold text-foreground mb-2">Messages</h1>
        <p className="text-muted-foreground">Connect and chat with your campus community</p>
      </div>

      {/* Main Chat Layout */}
      <div className="h-[calc(100vh-200px)] flex bg-card rounded-lg border border-border overflow-hidden">
        {/* Left Pane - Conversations List */}
        <div className={`w-full md:w-80 lg:w-96 border-r border-border flex flex-col ${isMobileMessageView ? 'hidden md:flex' : 'flex'}`}>
          {/* Search Header */}
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 auth-input"
              />
            </div>
          </div>

          {/* Contacts List */}
          <ScrollArea className="flex-1">
            <div className="p-2">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => handleContactSelect(contact.id)}
                  className={`p-3 rounded-lg cursor-pointer transition-[var(--transition-fast)] mb-1 hover:bg-muted/50 ${
                    selectedContactId === contact.id ? 'bg-primary/10 border border-primary/20' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={contact.avatar} alt={contact.name} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {getInitials(contact.name)}
                        </AvatarFallback>
                      </Avatar>
                      {contact.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-card"></div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className={`font-medium text-sm truncate ${selectedContactId === contact.id ? 'text-primary' : 'text-foreground'}`}>
                          {contact.name}
                        </h3>
                        <span className="text-xs text-muted-foreground">{contact.lastMessageTime}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground truncate">{contact.lastMessage}</p>
                        {contact.unreadCount > 0 && (
                          <div className="bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center ml-2">
                            {contact.unreadCount}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Right Pane - Chat Window */}
        <div className={`flex-1 flex flex-col ${!isMobileMessageView ? 'hidden md:flex' : 'flex'}`}>
          {selectedContact ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleBackToContacts}
                    className="md:hidden"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getInitials(selectedContact.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-foreground">{selectedContact.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {selectedContact.isOnline ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>

              {/* Messages Area */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[70%] ${message.isOwn ? 'order-2' : 'order-1'}`}>
                        <div
                          className={`p-3 rounded-lg ${
                            message.isOwn
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-foreground'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 px-1">
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="p-4 border-t border-border">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Type your message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 auth-input"
                  />
                  <Button 
                    onClick={handleSendMessage}
                    className="btn-primary btn-smooth"
                    disabled={!messageInput.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-center">
              <div className="text-muted-foreground">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="h-8 w-8" />
                </div>
                <p className="font-medium">Select a conversation</p>
                <p className="text-sm">Choose a contact to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;