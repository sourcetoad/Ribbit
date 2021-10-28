const _toString = Object.prototype.toString;

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 *
 * @param {*} obj
 * @return {boolean}
 */
export function isPlainObject(obj) {
    return _toString.call(obj) === '[object Object]'
}
