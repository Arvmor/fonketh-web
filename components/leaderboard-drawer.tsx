"use client";

import { useState } from "react";
import { Crown, X } from "lucide-react";
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

interface Player {
  name: string;
  balance: number;
  position: {
    x: number;
    y: number;
  };
}

interface LeaderboardDrawerProps {
  players: Player[];
}

function shortenAddress(address: string): string {
  if (address.length <= 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function LeaderboardDrawer({ players }: LeaderboardDrawerProps) {
  const [open, setOpen] = useState(false);

  // Sort players by balance in descending order
  const sortedPlayers = [...players].sort((a, b) => b.balance - a.balance);

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="right">
      <DrawerTrigger asChild>
        <Button
          size="lg"
          className="fixed right-6 bottom-6 rounded-full w-16 h-16 shadow-2xl bg-gradient-to-br from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white transition-all duration-200 hover:scale-105"
          aria-label="Open leaderboard"
        >
          <Crown className="h-7 w-7" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-full w-96 bg-zinc-900 border-l border-zinc-800 right-0 top-0">
        <DrawerHeader className="border-b border-zinc-800 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <DrawerTitle className="text-xl font-bold text-white flex items-center gap-2">
                <Crown className="h-5 w-5 text-yellow-500" />
                Leaderboard
              </DrawerTitle>
              <DrawerDescription className="text-zinc-400 mt-1">
                {sortedPlayers.length} {sortedPlayers.length === 1 ? "player" : "players"}
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
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
          {sortedPlayers.length === 0 ? (
            <div className="flex items-center justify-center h-full text-zinc-500">
              <p>No players yet</p>
            </div>
          ) : (
            sortedPlayers.map((player, index) => (
              <div
                key={`${player.name}-${index}`}
                className={`p-4 rounded-lg border transition-colors ${
                  index === 0
                    ? "bg-yellow-900/20 border-yellow-700/50 hover:bg-yellow-900/30"
                    : index === 1
                    ? "bg-zinc-800/30 border-zinc-700/50 hover:bg-zinc-800/50"
                    : index === 2
                    ? "bg-orange-900/20 border-orange-700/50 hover:bg-orange-900/30"
                    : "bg-zinc-800/50 border-zinc-700/50 hover:bg-zinc-800"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      index === 0
                        ? "bg-yellow-600 text-white"
                        : index === 1
                        ? "bg-zinc-400 text-white"
                        : index === 2
                        ? "bg-orange-600 text-white"
                        : "bg-zinc-700 text-zinc-300"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-sm text-zinc-200 font-semibold truncate">
                      {shortenAddress(player.name)}
                    </p>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      Position: ({player.position.x}, {player.position.y})
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <p className="text-lg font-bold text-white">
                      {player.balance.toLocaleString()}
                    </p>
                    <p className="text-xs text-zinc-500">balance</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
