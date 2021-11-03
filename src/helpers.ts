const _toString = Object.prototype.toString;

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
export function isPlainObject(obj: unknown): boolean {
    return _toString.call(obj) === '[object Object]';
}
