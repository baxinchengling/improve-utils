/**
 * 堆排序算法实现
 * 通过构建最大堆，然后逐步将最大元素放到数组末尾
 * @param arr 待排序的数组
 * @returns 排序后的数组
 */
export function heapSort(arr: number[]): number[] {
    const n = arr.length;

    // 构建最大堆
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }

    // 逐步将最大元素放到数组末尾
    for (let i = n - 1; i > 0; i--) {
        // 将当前最大元素（堆顶）与数组末尾元素交换
        [arr[0], arr[i]] = [arr[i], arr[0]];
        // 重新调整堆，确保剩余部分仍然是最大堆
        heapify(arr, i, 0);
    }

    return arr;
}

/**
 * 调整堆，确保以 i 为根的子树是最大堆
 * @param arr 待调整的数组
 * @param n 堆的大小
 * @param i 当前子树的根节点索引
 */
function heapify(arr: number[], n: number, i: number): void {
    let largest = i; // 假设当前节点是最大的
    const left = 2 * i + 1; // 左子节点
    const right = 2 * i + 2; // 右子节点

    // 如果左子节点比当前节点大，则更新最大节点
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }

    // 如果右子节点比当前节点大，则更新最大节点
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }

    // 如果最大节点不是当前节点，则交换它们的位置，并递归调整堆
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, n, largest);
    }
}

// 示例用法
// const unsortedArray = [64, 34, 25, 12, 22, 11, 90];
// const sortedArray = heapSort(unsortedArray);
// console.log(sortedArray); // 输出: [11, 12, 22, 25, 34, 64, 90]