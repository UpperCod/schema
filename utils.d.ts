import { Message, Filter } from "./types";

export function compose<T extends Filter<any>>(...args: T[]): T;

export function error(
    filter: Filter<any>
): (template: TemplateStringsArray, ...args: any[]) => Message;

export function list<T extends Filter<any>>(
    filter: T
): T extends (...args: any[]) => infer U ? U[] : T;
