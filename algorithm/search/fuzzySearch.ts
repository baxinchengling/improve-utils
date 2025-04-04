/**
 * 模糊搜索函数
 * 该函数用于在数组中查找与目标字符串相似的元素，支持部分匹配和忽略大小写
 * @param arr 待搜索的字符串数组
 * @param target 目标字符串
 * @returns 返回与目标字符串相似的元素数组
 */
function fuzzySearch(arr: string[], target: string): string[] {
    // 将目标字符串转换为小写，以便进行不区分大小写的匹配
    const lowerCaseTarget = target.toLowerCase();

    // 使用 filter 方法筛选出与目标字符串相似的元素
    const result = arr.filter(item => {
        // 将当前元素转换为小写，以便进行不区分大小写的匹配
        const lowerCaseItem = item.toLowerCase();

        // 检查当前元素是否包含目标字符串
        return lowerCaseItem.includes(lowerCaseTarget);
    });

    // 返回匹配的结果数组
    return result;
}

// 测试代码
// const arr = ["apple", "banana", "cherry", "date", "elderberry"];
// console.log(fuzzySearch(arr, "an")); // ["banana", "cherry"]
