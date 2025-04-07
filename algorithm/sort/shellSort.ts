/**
 * 希尔排序（Shell Sort）是插入排序的一种更高效的改进版本。
 * 它通过将原始数组分割成若干子序列来进行排序，最后再对整个数组进行一次插入排序。
 * 
 * @param arr 待排序的数组
 * @returns 排序后的数组
 */
export function shellSort(arr: number[]): number[] {
    const n = arr.length;
    // 初始步长，通常为数组长度的一半，逐步缩小步长
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        // 从第gap个元素开始，逐个对其所在组进行直接插入排序
        for (let i = gap; i < n; i++) {
            const temp = arr[i];
            let j;
            // 对组内元素进行插入排序
            for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
                arr[j] = arr[j - gap];
            }
            arr[j] = temp;
        }
    }
    return arr;
}
// 使用示例
// const array = [9, 8, 3, 7, 5, 6, 4, 1];
// console.log('排序前:', array);
// console.log('排序后:', shellSort(array));
