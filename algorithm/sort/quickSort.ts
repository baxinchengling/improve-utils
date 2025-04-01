
/**
 * 快速排序算法实现
 * 通过递归的方式，将数组分为左右两部分，分别进行排序，然后合并
 * @param arr 待排序的数组
 * @returns 排序后的数组
 */
export function quickSort(arr: number[]): number[] {
    // 当数组长度小于等于1时，说明已经完成排序，直接返回数组
    if (arr.length <= 1) {
        return arr;
    }

    // 选择数组中间的元素作为基准点
    const pivotIndex = Math.floor(arr.length / 2);
    const pivot = arr[pivotIndex];
    // 初始化两个数组，分别用于存放比基准点小和大的元素
    const left: number[] = [];
    const right: number[] = [];

    // 遍历数组，根据元素与基准点的大小关系，将元素分配到左右数组
    for (let i = 0; i < arr.length; i++) {
        // 跳过基准点元素
        if (i === pivotIndex) continue;
        // 将小于基准点的元素放入左数组
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            // 将大于等于基准点的元素放入右数组
            right.push(arr[i]);
        }
    }

    // 递归地对左右数组进行快速排序，然后合并排序后的左右数组和基准点
    // 使用扩展运算符将数组连接起来
    return [...quickSort(left), pivot, ...quickSort(right)];
}

// 示例用法
// const unsortedArray = [64, 34, 25, 12, 22, 11, 90];
// const sortedArray = quickSort(unsortedArray);
// console.log(sortedArray); // 输出: [11, 12, 22, 25, 34, 64, 90]

/**
 * 快速排序算法实现
 * @param arr - 需要排序的数组
 * @returns 排序后的数组
 */
export function quickSortFilter(arr: number[]): number[] {
    if (arr.length <= 1) {
        return arr;
    }

    const pivot = arr[Math.floor(arr.length / 2)];
    const left = arr.filter(x => x < pivot);
    const middle = arr.filter(x => x === pivot);
    const right = arr.filter(x => x > pivot);

    return [...quickSortFilter(left), ...middle, ...quickSortFilter(right)];
}

// 示例用法
// const unsortedArray = [64, 34, 25, 12, 22, 11, 90];
// const sortedArray = quickSort(unsortedArray);
// console.log(sortedArray); // 输出: [11, 12, 22, 25, 34, 64, 90]