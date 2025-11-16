# @fonketh-web/fonketh-sdk

TypeScript SDK for interacting with the Fonketh API.

## Usage

### Basic Setup

```typescript
import { FonkethClient } from "@fonketh-web/fonketh-sdk";

// Initialize the client with your Fonketh API host
const client = new FonkethClient("http://localhost:8080");

// Call API Methods
const chats = await client.getChatMessages();
```

### Response Structure

All API methods return a `ResponseAPI<T>` object:

```typescript
/** Response status */
type ResponseStatus = "Success" | "Error";

/** Responses Schema */
interface ResponseAPI<T> = {
	/** Response status */
	status: ResponseStatus;
	/** Response data */
	data: T;
};
```

## Available Methods

```typescript
// Chat History
const chats = await client.getChatMessages();
// Online Players
const players = await client.getPlayers();
// Mined Blocks
const miningBatch = await client.getMiningBatch();

/// Health Check
const health = await client.getHealth();
// Version
const version = await client.getVersion();
```
