"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Mail, MailOpen, Reply, Trash2, Search, Filter, 
  RefreshCw, Calendar, Building, Phone, User, MessageSquare
} from "lucide-react";
import { toast } from "sonner";

// import { 
//   getContactMessages, 
//   deleteContactMessage, 
//   updateMessageStatus,
//   getContactStats,
//   ContactMessage 
// } from "@/lib/api/contacts/contacts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ContactMessageModal } from "./message-modal";

export interface IContactMessage {
  id: string;
  name: string;
  telephone: string;
  address?: string;
  createdAt: string;
  message: string;
  status: "unread" | "read" | "replied";

}

export function ContactMessagesManager() {

  const message: IContactMessage[] = [
    {
      id: "msg-001",
      name: "Alex Morgan",
      telephone: "+1-555-0198",
      address: "123 Maple Street, Austin, TX",
      message: "Hi, I am interested in your premium plan. Could you please send over the pricing details and a feature breakdown?",
      status: "unread",
      createdAt: "2026-08-26T10:30:00"
    },
    {
      id: "msg-002",
      name: "Samira Hadid",
      telephone: "+44-20-7946-0958",
      address: "74 Appold St, London, UK",
      message: "Thank you for the quick onboarding call yesterday! The platform is working perfectly for our team so far.",
      status: "read",
      createdAt: "2026-08-24T10:30:00"
    },
    {
      id: "msg-003",
      name: "Kenji Sato",
      telephone: "+81-3-5555-0143",
      message: "Regarding our support ticket yesterday, I wanted to confirm if the system maintenance tonight will affect our API access.",
      status: "replied",
      createdAt: "2026-08-20T10:30:00"
    }
  ];

  const statsData =
    {
      total: 0,
    unread: 0,
    read: 0,
    replied: 0,
    today: 0,
    }
  

  const [messages, setMessages] = useState<IContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [stats, setStats] = useState({
    total: 0,
    unread: 0,
    read: 0,
    replied: 0,
    today: 0,
  });
  const [selectedMessage, setSelectedMessage] = useState<IContactMessage | null>(null);
  const [statusFilter, setStatusFilter] = useState<"all" | "unread" | "read" | "replied">("all");

   
  const loadData = async () => {
    try {
      setLoading(true);
      // const [messagesData, statsData] = await Promise.all([
      //   getContactMessages(),
      //   getContactStats(),
      // ]);
      
      setMessages(message);
      setStats(statsData);
    } catch (error) {
      console.error("Error loading data:", error);
      toast.error("Failed to load contact messages");
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    loadData();
  }, []);

  // const handleDeleteMessage = async (id: string) => {
  //   if (window.confirm("Are you sure you want to delete this message?")) {
  //     try {
  //       await deleteContactMessage(id);
  //       toast.success("Message deleted successfully");
  //       loadData();
  //     } catch (error: any) {
  //       toast.error(error.message || "Failed to delete message");
  //     }
  //   }
  // };

  // const handleUpdateStatus = async (id: string, status: "read" | "replied") => {
  //   try {
  //     await updateMessageStatus(id, status);
  //     toast.success(`Message marked as ${status}`);
  //     loadData();
  //   } catch (error: any) {
  //     toast.error(error.message || "Failed to update status");
  //   }
  // };

  const filteredMessages = messages.filter(message => {
    // Status filter
    if (statusFilter !== "all" && message.status !== statusFilter) {
      return false;
    }
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        message.name.toLowerCase().includes(query) ||
     
        message.telephone.includes(query) ||
     
        message.message.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "unread": return "bg-blue-100 text-blue-700 border-blue-200";
      case "read": return "bg-gray-100 text-gray-700 border-gray-200";
      case "replied": return "bg-green-100 text-green-700 border-green-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "unread": return <Mail className="h-4 w-4" />;
      case "read": return <MailOpen className="h-4 w-4" />;
      case "replied": return <Reply className="h-4 w-4" />;
      default: return <Mail className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Loading messages...</span>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Mail className="h-5 w-5 text-blue-600" />
            Contact Messages
          </h2>
          <p className="text-gray-600 text-sm">
            Manage and respond to customer inquiries and messages
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>

          {/* Refresh */}
          {/* <Button variant="outline" onClick={loadData}>
            <RefreshCw className="h-4 w-4" />
          </Button> */}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-orange-50 border-2 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <Mail className="h-8 w-8 text-orange-600" />
            <span className="text-2xl font-bold text-orange-700">{stats.total}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-900">Total Messages</h3>
          <p className="text-xs text-gray-600">All customer inquiries</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-orange-50 border-2 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <Mail className="h-8 w-8 text-orange-600" />
            <span className="text-2xl font-bold text-orange-700">{stats.unread}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-900">Unread</h3>
          <p className="text-xs text-gray-600">Require attention</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-linear-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <MailOpen className="h-8 w-8 text-gray-600" />
            <span className="text-2xl font-bold text-gray-700">{stats.read}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-900">Read</h3>
          <p className="text-xs text-gray-600">Viewed messages</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-linear-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <Reply className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-green-700">{stats.replied}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-900">Replied</h3>
          <p className="text-xs text-gray-600">Responded to</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-linear-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <Calendar className="h-8 w-8 text-purple-600" />
            <span className="text-2xl font-bold text-purple-700">{stats.today}</span>
          </div>
          <h3 className="text-sm font-medium text-gray-900">Today</h3>
          <p className="text-xs text-gray-600">New messages</p>
        </motion.div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <Button
          variant={statusFilter === "all" ? "default" : "outline"}
          className="bg-orange-50 text-orange-700 hover:bg-lime/50 border-lime/30"
          size="sm"
          onClick={() => setStatusFilter("all")}
        >
          All Messages
        </Button>
        <Button
          variant={statusFilter === "unread" ? "default" : "outline"}
          size="sm"
          className="bg-orange-50 text-orange-700 hover:bg-lime/50 border-lime/30"
          onClick={() => setStatusFilter("unread")}
        >
          <Mail className="h-4 w-4 mr-2" />
          Unread ({stats.unread})
        </Button>
        <Button
          variant={statusFilter === "read" ? "default" : "outline"}
          size="sm"
          className="bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-200"
          onClick={() => setStatusFilter("read")}
        >
          <MailOpen className="h-4 w-4 mr-2" />
          Read ({stats.read})
        </Button>
        <Button
          variant={statusFilter === "replied" ? "default" : "outline"}
          size="sm"
          className="bg-green-50 text-green-700 hover:bg-green-100 border-green-200"
          onClick={() => setStatusFilter("replied")}
        >
          <Reply className="h-4 w-4 mr-2" />
          Replied ({stats.replied})
        </Button>
      </div>

      {/* Messages List */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {filteredMessages.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {filteredMessages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`p-6 hover:bg-gray-50 transition-colors cursor-pointer ${
                  message.status === "unread" ? "bg-blue-50 hover:bg-blue-100" : ""
                }`}
                onClick={() => setSelectedMessage(message)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${getStatusColor(message.status)}`}>
                        {getStatusIcon(message.status)}
                        <span className="text-xs font-medium capitalize">{message.status}</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(message.createdAt).toLocaleString()}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                     
                      
                        <div>
                          <div className="text-xs text-gray-900">Name: {message.name} </div>
                        
                        </div>
                  
                   
                  
                    
                        <div>
                          <div className="text-xs text-gray-900">Phone: {message.telephone} </div>
                       
                        </div>
                    
                      
                   
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="h-4 w-4 text-gray-400" />
                      <div className="text-xs text-gray-500">Message</div>
                    </div>
                    <p className="text-sm text-gray-700 line-clamp-2">
                      {message.message}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    {message.status === "unread" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        // onClick={(e) => {
                        //   e.stopPropagation();
                        //   handleUpdateStatus(message.id, "read");
                        // }}
                        onClick={() => {}} 
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      >
                        <MailOpen className="h-4 w-4" />
                      </Button>
                    )}
                    {message.status !== "replied" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        // onClick={(e) => {
                        //   e.stopPropagation();
                        //   handleUpdateStatus(message.id, "replied");
                        // }}
                        onClick={() => {}} 
                        className="text-green-600 hover:text-green-700 hover:bg-green-50"
                      >
                        <Reply className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      // onClick={(e) => {
                      //   e.stopPropagation();
                      //   handleDeleteMessage(message.id);
                      // }}
                      onClick={() => {}} 
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Messages Found</h3>
            <p className="text-gray-600">
              {searchQuery || statusFilter !== "all" 
                ? "No messages match your search criteria" 
                : "No contact messages yet"}
            </p>
          </div>
        )}
      </div>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <ContactMessageModal
          message={selectedMessage}
          onUpdate={loadData}
          onClose={() => setSelectedMessage(null)}
        />
      )}
    </div>
  );
}