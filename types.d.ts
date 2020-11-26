export type Filter<T> = T extends (...args: any[]) => infer U
    ? U
    : T extends any[]
    ? T
    : (value: any) => T;

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
