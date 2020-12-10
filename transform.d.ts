import { Filter } from "./types";

export function date(): (value: any) => Date;

export function bool(): () => boolean;

export function trim(): () => string;

export function fill<T>(optional: T): T;

export function timestamp(): () => number;

export function stripTags(): () => string;
