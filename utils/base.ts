
/**
 * 深层冻结对象
 * @param {object} obj 需要冻结的对象
 * @returns {object}
 */
export function deepFreeze (obj: any) {
    Object.freeze(obj);
    Object.values(obj).forEach(function (value) {
        if (value && typeof value === 'object') {
            deepFreeze(value);
        }
    });
    return obj;
}