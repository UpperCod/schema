export type Filter<T> = T extends (...args: any[]) => any ? ReturnType<T> : any;

export type Schema<T> = {
    [I in keyof T]: Filter<T[I]>;
};

export type Fill<T> = {
    [i in keyof T]?: any;
};

export interface Message extends String {
    prop: string;
    value: any;
    message: string;
    from: Filter<any>;
}

export type Log = (message: Message) => string;

export function schema<T>(data: T, log: ?Log): (data: Fill<T>) => Schema<T>;

export function pipe<T extends Filter<any>>(...args: T[]): T;

export function error(
    filter: Filter<any>
): (template: TemplateStringsArray, ...args: any[]) => Message;
