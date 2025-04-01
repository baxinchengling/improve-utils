/**
 * 选择排序算法实现
 * 通过不断选择剩余元素中的最小值，并将其放到已排序部分的末尾
 * @param arr 待排序的数组
 * @returns 排序后的数组
 */
export function selectionSort(arr: number[]): number[] {
    const n = arr.length;

    // 遍历数组，每次选择最小的元素放到已排序部分的末尾
    for (let i = 0; i < n - 1; i++) {
        // 假设当前索引 i 的元素是最小的
        let minIndex = i;

        // 在剩余未排序部分中寻找最小元素的索引
        for (let j = i + 1; j < n; j++) {
            // 如果找到更小的元素，则更新最小元素的索引
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        // 如果找到的最小元素不是当前元素，则交换它们的位置
        // 否则，无需交换，因为当前元素已经是最小的
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }

    return arr;
}

// 示例用法
// const unsortedArray = [64, 34, 25, 12, 22, 11, 90];
// const sortedArray = selectionSort(unsortedArray);
// console.log(sortedArray); // 输出: [11, 12, 22, 25, 34, 64, 90]