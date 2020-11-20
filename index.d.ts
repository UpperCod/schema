export type Filter<T> = T extends (...args: any) => any
    ? ReturnType<T> extends Promise<infer U>
        ? U
        : ReturnType<T>
    : any;

export type Schema<T> = {
    [I in keyof T]: Filter<T[I]>;
};

export type Fill<T> = {
    [i in keyof T]?: any;
};

export function schema<T>(data: T): (data: Fill<T>) => Promise<Schema<T>>;

export function pipe<T extends Filter<any>>(...args: T[]): T;
