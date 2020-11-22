import { Message, Fill, Schema } from "./types";

export * from "./utils";
export * from "./types";

export type Log = (message: Message) => string;

export type Test1<T> = <R = {}>(
    data: Fill<T>
) => Partial<Schema<T>> & Partial<R>;
export type Test2<T> = <R = {}>(
    data: Fill<T>,
    trycatch: false
) => (Partial<Schema<T>> & Partial<R>)[];

export function schema<T>(data: T, log?: Log): Test1<T> & Test2<T>;
