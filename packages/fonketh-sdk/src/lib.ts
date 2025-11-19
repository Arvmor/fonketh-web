import { encodePacked, getContractAddress, keccak256 } from "viem";
import { Address, ChatMessage, HexNumber, MiniedBlock, Players, ResponseAPI } from "./types";

/** Fonketh API Class */
export class FonkethClient {
	/** Fonketh API host */
	private readonly HOST: URL;

	/** Fonketh contract address */
	private readonly CONTRACT_ADDRESS: Address = "0xD61e2af6A7c347713C478C4E9Fef8FE5a22C5459";

	/** Fonketh contract bytecode */
	private readonly CONTRACT_BYTECODE: HexNumber = "0x0000000000000000000000000000000000000000000000000000000000000000";

	/**
	 * Constructor to initialize the Fonketh API
	 * @param host - The host to use
	 */
	constructor(host: URL | string) {
		this.HOST = new URL(host);
	}

	/**
	 * Function to call Fonketh API returns a `ResponseAPI<T>`
	 * @param endpoint - The endpoint to call
	 * @param method - The method to use (GET)
	 * @param data - The data to send
	 * @returns The response from the API
	 */
	private async callFonkethAPI<T>(
		endpoint: string,
		method: "GET",
		data?: unknown,
	): Promise<ResponseAPI<T>> {
		// Build the URL
		const url = new URL(endpoint, this.HOST);

		// Parse data to body
		const body = data ? JSON.stringify(data) : undefined;

		// Parse response to JSON
		const response = await fetch(url, { method, body });
		return response.json();
	}

	/**
	 * Function to get the chat messages
	 * @returns The chat messages `ResponseAPI<ChatMessage[]>`
	 */
	public async getChatMessages(): Promise<ResponseAPI<ChatMessage[]>> {
		return this.callFonkethAPI("/chat", "GET");
	}

	/**
	 * Function to get the players
	 * @returns The players `ResponseAPI<Players[]>`
	 */
	public async getPlayers(): Promise<ResponseAPI<Players[]>> {
		return this.callFonkethAPI("/players", "GET");
	}

	/**
	 * Function to get the mining batch
	 * @returns The mining batch `ResponseAPI<MiniedBlock[]>`
	 */
	public async getMiningBatch(): Promise<ResponseAPI<MiniedBlock[]>> {
		return this.callFonkethAPI("/mine", "GET");
	}

	/**
	 * Function to get the health
	 * @returns The health `ResponseAPI<Health>`
	 */
	public async getHealth(): Promise<ResponseAPI<string>> {
		return this.callFonkethAPI("/health", "GET");
	}

	/**
	 * Function to get the version
	 * @returns The version `ResponseAPI<string>`
	 */
	public async getVersion(): Promise<ResponseAPI<string>> {
		return this.callFonkethAPI("/", "GET");
	}

	/**
	 * Function to verify the mined block hash
	 * @param block - The mined block
	 * @returns The verified block hash
	 */
	public verifyBlocks(block: MiniedBlock): Address {
		// Parse Information
		const packed = encodePacked(["uint256", "address"], [BigInt(block.nonce), block.address]);
		const salt = keccak256(packed);

		// Verify the block
		return getContractAddress({
			salt,
			from: this.CONTRACT_ADDRESS,
			bytecodeHash: this.CONTRACT_BYTECODE,
			opcode: "CREATE2",
		});
	}
}
