import type { IncomingMessage, ServerResponse } from "node:http";
export function createContactHandler(options?: {
  env?: Record<string, string | undefined>;
}): (req: IncomingMessage, res: ServerResponse) => Promise<void>;
