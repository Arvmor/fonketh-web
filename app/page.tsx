import { FonkethClient } from "@fonketh-web/fonketh-sdk";

export default async function Home() {
  // Initialize the Fonketh Client
  const fonkethAPI = new FonkethClient("http://50.17.140.249:8080");

  // Get the version
  const version = await fonkethAPI.getVersion();
  const health = await fonkethAPI.getHealth();

  // API Calls
  const chatMessages = await fonkethAPI.getChatMessages();
  const players = await fonkethAPI.getPlayers();
  const miningBatch = await fonkethAPI.getMiningBatch();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
       {/* Version and Health */}
       <p>Version: {version.data}</p>
       <p>Health: {health.data}</p>

        {/* Chat Messages */}
        {chatMessages.data.map((message, index) => (
          <div key={`chat-${message.identifier}-${index}`}>
            <p>{message.identifier}: {message.message} | {message.timestamp}s ago</p>
          </div>
        ))}

        {/* Players */}
        {players.data.map((player, index) => (
          <div key={`player-${player.name}-${index}`}>
            <p>{player.name}: {player.balance} | {player.position.x}, {player.position.y}</p>
          </div>
        ))}

        {/* Mining Batch */}
        {miningBatch.data.map((tuple, index) => (
          <div key={`mining-${tuple[0]}-${index}`}>
            <p>Address: {tuple[0]} | Salt: {tuple[1]}</p>
          </div>
        ))}
      </main>
    </div>
  );
}
