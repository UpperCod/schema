type Filter = (value: any) => boolean;
type Result<T> = (value: T) => T;

export function filter<T>(filter: Filter): Result<T>;

export function options<T>(...args: T[]): Result<T>;

export function date(option?: { min?: Date; max?: Date }): Result<string>;
