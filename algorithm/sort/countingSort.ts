/**
 * 计数排序函数
 * @param arr 待排序的数组
 * @returns 排序后的数组
 */
export function countingSort(arr: number[]): number[] {
    if (arr.length <= 1) return arr;

    // 找到数组中的最大值
    const max = Math.max(...arr);
    
    // 初始化计数数组
    const countArray = new Array(max + 1).fill(0);

    // 统计每个元素的出现次数
    for (const num of arr) {
        countArray[num]++;
    }

    // 计算每个元素的最终位置
    for (let i = 1; i < countArray.length; i++) {
        countArray[i] += countArray[i - 1];
    }

    // 创建结果数组
    const result = new Array(arr.length);

    // 从后向前遍历原数组，将元素放入结果数组的正确位置
    for (let i = arr.length - 1; i >= 0; i--) {
        const num = arr[i];
        result[countArray[num] - 1] = num;
        countArray[num]--;
    }

    return result;
}

// 测试代码
console.log(countingSort([4, 2, 8, 3, 1, 5, 7, 6])); // [1, 2, 3, 4, 5, 6, 7, 8]
