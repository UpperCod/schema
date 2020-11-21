export interface Message extends String {
    prop: string;
    value: any;
    message: string;
    from: Filter<any>;
}

export function pipe<T extends Filter<any>>(...args: T[]): T;

export function error(
    filter: Filter<any>
): (template: TemplateStringsArray, ...args: any[]) => Message;
