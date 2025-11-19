"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface ChatMessage {
  identifier: string;
  message: string;
  timestamp: number;
}

interface ChatDrawerProps {
  messages: ChatMessage[];
}

function shortenAddress(address: string): string {
  if (address.length <= 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function formatTimeAgo(seconds: number): string {
  if (seconds < 60) {
    return `${seconds}s ago`;
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m ago`;
  } else if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    return `${hours}h ago`;
  } else {
    const days = Math.floor(seconds / 86400);
    return `${days}d ago`;
  }
}

export function ChatDrawer({ messages }: ChatDrawerProps) {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="left">
      <DrawerTrigger asChild>
        <Button
          size="lg"
          className="fixed left-6 bottom-6 rounded-full w-16 h-16 shadow-2xl bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white transition-all duration-200 hover:scale-105"
          aria-label="Open chat"
        >
          <MessageCircle className="h-7 w-7" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-full w-96 bg-zinc-900 border-r border-zinc-800">
        <DrawerHeader className="border-b border-zinc-800 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <DrawerTitle className="text-xl font-bold text-white">
                Chat
              </DrawerTitle>
              <DrawerDescription className="text-zinc-400 mt-1">
                {messages.length} {messages.length === 1 ? "message" : "messages"}
              </DrawerDescription>
            </div>
            <DrawerClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800"
              >
                <X className="h-5 w-5" />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-zinc-500">
              <p>No messages yet</p>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={`${message.identifier}-${index}`}
                className="p-4 rounded-lg bg-zinc-800/50 border border-zinc-700/50 hover:bg-zinc-800 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="font-mono text-xs text-blue-400 font-semibold">
                    {shortenAddress(message.identifier)}
                  </p>
                  <p className="text-xs text-zinc-500">
                    {formatTimeAgo(message.timestamp)}
                  </p>
                </div>
                <p className="text-sm text-zinc-200 leading-relaxed break-words">
                  {message.message}
                </p>
              </div>
            ))
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
