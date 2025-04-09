/**
 * 获取[min, max] 之间的随机数
 * @param {number} min 最小值
 * @param max 最大值
 * @returns {number} 随机数
 */
export function getRandom(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}