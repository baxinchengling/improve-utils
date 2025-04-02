/**
 * 二分查找算法
 * @param arr 已排序的数组
 * @param target 目标值
 * @returns 目标值在数组中的索引，如果未找到则返回 -1
 */
function binarySearch(arr: number[], target: number): number {
    // 初始化左指针和右指针，分别指向数组的开始和结束位置
    let left = 0;
    let right = arr.length - 1;

    // 当左指针小于等于右指针时，说明数组中还有元素可以查找
    while (left <= right) {
        // 计算中间位置的索引
        const mid = Math.floor((left + right) / 2);
        // 如果中间元素等于目标值，返回中间元素的索引
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            // 如果中间元素小于目标值，调整左指针，继续在右半部分查找
            left = mid + 1;
        } else {
            // 如果中间元素大于目标值，调整右指针，继续在左半部分查找
            right = mid - 1;
        }
    }

    // 如果未找到目标值，返回 -1
    return -1;
}

// 测试代码
// console.log(binarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9], 5)); // 4


// 查找时间范围内的事件（events已按时间戳排序）
/**
 * 处理后端返回的有序数据时（如时间戳排序的日志），前端可本地使用二分查找快速筛选特定范围的数据
 * @param events 事件数组
 * @param startTime 开始时间
 * @param endTime 结束时间
 * @returns 
 */
function findEventsInRange(events, startTime, endTime): any[] {
    const timestamps = events.map(e => e.timestamp);
    // 找第一个>=startTime的索引
    let left = 0, right = timestamps.length - 1;
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (timestamps[mid] < startTime) left = mid + 1;
        else right = mid;
    }
    const startIndex = left;
  
    // 找最后一个<=endTime的索引
    right = timestamps.length - 1;
    while (left < right) {
        const mid = Math.ceil((left + right) / 2);
        if (timestamps[mid] > endTime) right = mid - 1;
        else left = mid;
    }
  
    return events.slice(startIndex, right + 1);
}
  

