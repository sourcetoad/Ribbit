const _hasOwnProperty = Object.prototype.hasOwnProperty;
const _toString = Object.prototype.toString;

export function hasOwnProperty(obj: unknown, key: string): boolean {
    return _hasOwnProperty.call(obj, key);
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
export function isPlainObject(obj: unknown): boolean {
    return _toString.call(obj) === '[object Object]';
}
