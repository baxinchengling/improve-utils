/**
 * 归并排序算法实现
 * 通过递归地将数组分成两半，分别排序后再合并
 * @param arr 待排序的数组
 * @returns 排序后的数组
 */
export function mergeSort(arr: number[]): number[] {
    if (arr.length <= 1) {
        return arr;
    }

    // 找到数组的中间点
    const mid = Math.floor(arr.length / 2);
    // 递归地对左半部分进行排序
    const left = mergeSort(arr.slice(0, mid));
    // 递归地对右半部分进行排序
    const right = mergeSort(arr.slice(mid));

    // 合并两个已排序的数组
    return merge(left, right);
}

/**
 * 合并两个已排序的数组
 * @param left 左半部分已排序的数组
 * @param right 右半部分已排序的数组
 * @returns 合并后的已排序数组
 */
function merge(left: number[], right: number[]): number[] {
    const result: number[] = [];
    let i = 0, j = 0;

    // 比较两个数组的元素，将较小的元素放入结果数组
    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }

    // 将剩余的元素放入结果数组
    return result.concat(left.slice(i)).concat(right.slice(j));
}

// 示例用法
// const unsortedArray = [64, 34, 25, 12, 22, 11, 90];
// const sortedArray = mergeSort(unsortedArray);
// console.log(sortedArray); // 输出: [11, 12, 22, 25, 34, 64, 90]