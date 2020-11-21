import { Message, Fill, Schema } from "./types";

export * from "./utils";

export type Log = (message: Message) => string;

export function schema<T>(data: T, log?: Log): (data: Fill<T>) => Schema<T>;
