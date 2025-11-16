/** Address type */
export type Address = `0x${string}`;

/** Hex Number type */
export type HexNumber = `0x${string}`;

/** Response status */
export type ResponseStatus = "success" | "error";

/** Schema for API Responses */
export interface ResponseAPI<T> {
	/** Response status */
	status: ResponseStatus;
	/** Response data */
	data: T;
}

/** Mining Batch Schema */
export type MiningBatch = [Address, HexNumber][];

/** Position Schema */
export interface Position {
	/** X position */
	x: number;
	/** Y position */
	y: number;
}

/** Players Schema */
export interface Players {
	/** Player name */
	name: Address;
	/** Player balance */
	balance: number;
	/** Player position */
	position: Position;
}

/** Chat Message Schema */
export interface ChatMessage {
	/** Chat message identifier */
	identifier: Address;
	/** Chat message */
	message: string;
	/** Chat message timestamp */
	timestamp: number;
}
