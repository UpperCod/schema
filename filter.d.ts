import { Filter } from "./types";

export function filter<T>(filter: Filter<boolean>): Filter<T>;

export function options<T>(...args: T[]): Filter<T>;

export function date(option?: { min?: Date; max?: Date }): Filter<string>;

export function min(length: number): Filter<any>;

export function max(length: number): Filter<any>;

export function type(value: { name: string }): Filter<any>;
