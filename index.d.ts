export type Filter<T> = T extends (...args: any[]) => any ? ReturnType<T> : any;

export type Schema<T> = {
    [I in keyof T]: Filter<T[I]>;
};

import { Message } from "./utils";

export * from "./utils";

export type Fill<T> = {
    [i in keyof T]?: any;
};

export type Log = (message: Message) => string;

export function schema<T>(data: T, log?: Log): (data: Fill<T>) => Schema<T>;
