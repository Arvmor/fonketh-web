import { FonkethClient } from "@/packages/fonketh-sdk";
import { getTimeAgo } from "@/lib/utils";
import { ChatDrawer } from "@/components/chat-drawer";

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
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start">
       {/* Version and Health */}
       <p>Version: {version.data}</p>
       <p>Health: {health.data}</p>

        {/* Players */}
        {players.data.map((player) => (
          <div key={player.name}>
            <p>{player.name}: {player.balance} | {player.position.x}, {player.position.y}</p>
          </div>
        ))}

        {/* Mining Batch */}
        {miningBatch.data.map((batch, index) => (
          <div key={index}>
            <p>Block #{index} | Block Hash: {fonkethAPI.verifyBlocks(batch)}</p>
            <p>Miner: {batch.address} | Nonce: {batch.nonce}</p>
            <p>Block Timestamp: {getTimeAgo(batch.timestamp)}</p>
          </div>
        ))}
      </main>

      {/* Chat Drawer */}
      <ChatDrawer messages={chatMessages.data} />
    </div>
  );
}
