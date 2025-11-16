import { ChatMessage, MiningBatch, Players, ResponseAPI } from "./types";

/** Fonketh API Class */
export class FonkethClient {
	/** Fonketh API host */
	private readonly HOST: URL;

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
	 * @returns The mining batch `ResponseAPI<MiningBatch[]>`
	 */
	public async getMiningBatch(): Promise<ResponseAPI<MiningBatch[]>> {
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
}
