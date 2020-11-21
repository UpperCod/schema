import { Filter } from "./types";

export function filter<T>(filter: Filter<boolean>): Filter<T>;

export function options<T>(...args: T[]): Filter<T>;

export function date(option?: { min?: Date; max?: Date }): Filter<string>;

export function min<T = any>(length: number): Filter<T>;

export function max<T = any>(length: number): Filter<T>;

export function type<T extends (...args: any[]) => any>(
    value: T
): Filter<ReturnType<T>>;
