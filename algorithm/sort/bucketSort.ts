
/**
 * 桶排序
 * @param {number[]} arr 待排序数组
 * @param {number} bucketSize 桶的大小
 * @returns {number[]} 排序后的数组
 */
export function bucketSort(arr: number[], bucketSize: number): number[] {
    if (arr.length === 0) return arr

    // 创建桶
    const min = Math.min(...arr)
    const max = Math.max(...arr)
    // bucketSize 是每个桶的大小，根据题目要求，每个桶的大小为5。
    // +1 是为了确保所有数据都能被分配到桶中。
    const bucketCount = Math.floor((max - min) / bucketSize) + 1
    // 创建一个长度为 bucketCount 的数组，每个元素是一个空数组，表示一个桶。
    // 每个桶用来存储属于该范围的数字
    const buckets: number[][] = new Array(bucketCount).fill(0).map(() => [])
    
    // 数据进入桶
    // 遍历输入数组 arr 中的每个数字 num。
    // 计算该数字应该放入哪个桶中：bucketIndex = Math.floor((num - min) / bucketSize)。
    // (num - min) 表示当前数字距离最小值的距离。
    // 再除以 bucketSize 并向下取整，得到对应的桶索引。
    // 将数字 num 放入对应的桶中
    arr.forEach(num => {
        const bucketIndex = Math.floor((num - min) / bucketSize)
        buckets[bucketIndex].push(num)
    })

    // 每个桶排序后合并
    return buckets.reduce((result, bucket) => [...result, ...bucket.sort((a, b) => a - b)], [])
}

// 测试代码
// console.log(bucketSort([78, 92, 85, 61, 72, 95], 5)) // [ 61, 72, 78, 85, 92, 95 ]
