/**
 * 冒泡排序算法实现
 * @param arr - 需要排序的数组
 * @returns 排序后的数组
 */
export function bubbleSort(arr: number[]): number[] {
    const n = arr.length;
    let swapped: boolean;

    // 外层循环控制遍历的轮数
    for (let i = 0; i < n - 1; i++) {
        swapped = false;

        // 内层循环进行相邻元素的比较和交换
        for (let j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                // 交换元素
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                swapped = true;
            }
        }

        // 如果没有发生交换，说明数组已经有序，提前结束
        if (!swapped) {
            break;
        }
    }

    return arr;
}

// 示例用法
// const unsortedArray = [64, 34, 25, 12, 22, 11, 90];
// const sortedArray = bubbleSort(unsortedArray);
// console.log(sortedArray); // 输出: [11, 12, 22, 25, 34, 64, 90]