"use client";

import { 
  X, 
  MessageSquare, Calendar, MailOpen, Reply, Trash2
} from "lucide-react";
import { toast } from "sonner";

// import { 
//   ContactMessage,
//   updateMessageStatus,
//   deleteContactMessage 
// } from "@/lib/api/contacts/contacts";
import { Button } from "@/components/ui/button";



export interface IContactMessage {
  id: string;
  name: string;
  telephone: string;
  address?: string;
  createdAt: string;
  message: string;
  status: "unread" | "read" | "replied";

}  //will be taken from API later
  

interface ContactMessageModalProps {
  message: IContactMessage;
  onUpdate: () => void;
  onClose: () => void;
}


export function ContactMessageModal({ message, onUpdate, onClose }: ContactMessageModalProps) {



  const getStatusColor = (status: string) => {
    switch (status) {
      case "unread": return "bg-lime-200 text-black";
      case "read": return "bg-gray-100 text-gray-700";
      case "replied": return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
   <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-6 pb-4 flex items-start justify-between border-b border-gray-50">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide uppercase ${getStatusColor(message.status)}`}>
                {message.status}
              </span>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(message.createdAt).toLocaleDateString()}
              </span>
            </div>
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">{message.name}</h2>
            <p className="text-sm text-gray-500 font-medium mt-0.5">{message.telephone}</p>
          </div>
          <Button  size="icon" onClick={onClose} className="rounded-full h-8 w-8 text-white bg-orange-300 hover:text-gray-600 hover:bg-orange-300">
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Message Body */}
        <div className="p-6 py-5">
          <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line bg-gray-50/60 rounded-lg p-4 border border-gray-100">
            {message.message}
          </p>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between gap-2">
          <Button
            variant="ghost"
            onClick={() => {}} 
            className="text-red-600 hover:text-red-700 hover:bg-red-50 text-sm h-9 px-3"
          >
            <Trash2 className="h-4 w-4 mr-1.5" />
            Delete
          </Button>
          
          <div className="flex items-center gap-2">
            {message.status === "unread" && (
              <Button
                variant="outline"
                onClick={() => {}} 
                className="bg-orange-50 text-orange-700 hover:bg-lime/50 border-lime text-sm h-9 px-3"
              >
                <MailOpen className="h-4 w-4 mr-1.5" />
                Read
              </Button>
            )}
            {message.status !== "replied" && (
              <Button
                variant="default"
                onClick={() => {}} 
                className="bg-orange-50 text-orange-700 hover:bg-lime/50 border-lime text-sm h-9 px-3"
              >
                <Reply className="h-4 w-4 mr-1.5" />
                Reply
              </Button>
            )}
            <Button variant="outline" onClick={onClose} className="text-sm h-9 px-3 text-gray-600">
              Close
            </Button>
          </div>
        </div>

      </div>
    </div>
    
  );
}