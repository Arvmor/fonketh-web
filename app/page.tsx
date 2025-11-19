import { FonkethClient } from "@/packages/fonketh-sdk";
import { getTimeAgo } from "@/lib/utils";
import { ChatDrawer } from "@/components/chat-drawer";
import { LeaderboardDrawer } from "@/components/leaderboard-drawer";

export default async function Home() {
  // Initialize the Fonketh Client
  const fonkethAPI = new FonkethClient("http://107.22.27.104:8080");

  // Get the version
  const version = await fonkethAPI.getVersion();
  const health = await fonkethAPI.getHealth();

  // API Calls
  const chatMessages = await fonkethAPI.getChatMessages();
  const players = await fonkethAPI.getPlayers();
  const miningBatch = await fonkethAPI.getMiningBatch();

  return (
    <div className="flex min-h-screen items-center justify-center font-sans bg-black text-white">
      {/* Version and Health - Top Right */}
      <div className="fixed top-6 right-6 flex gap-4 text-sm">
        <div className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800">
          <span className="text-zinc-400">Version:</span>{" "}
          <span className="text-white font-semibold">{version.data}</span>
        </div>
        <div className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800">
          <span className="text-zinc-400">Health:</span>{" "}
          <span className="text-white font-semibold">{health.data}</span>
        </div>
      </div>

      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start">
        {/* Players */}
        {players.data.map((player) => (
          <div key={player.name}>
            <p>{player.name}: {player.balance} | {player.position.x}, {player.position.y}</p>
          </div>
        ))}

        {/* Mining Batch */}
        <div className="w-full space-y-4">
          {miningBatch.data.map((batch, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">Block #{index}</h3>
                <span className="text-xs text-zinc-500">{getTimeAgo(batch.timestamp)}</span>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-xs text-zinc-500 mb-1">Block Hash</p>
                  <p className="font-mono text-sm text-blue-400 break-all">
                    {fonkethAPI.verifyBlocks(batch)}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-zinc-500 mb-1">Miner</p>
                    <p className="font-mono text-sm text-zinc-200 break-all">
                      {batch.address}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500 mb-1">Nonce</p>
                    <p className="font-mono text-sm text-zinc-200">
                      {batch.nonce}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Chat Drawer */}
      <ChatDrawer messages={chatMessages.data} />

      {/* Leaderboard Drawer */}
      <LeaderboardDrawer players={players.data} />
    </div>
  );
}
