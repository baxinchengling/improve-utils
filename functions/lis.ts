/**
 * 计算数组中的最长递增子序列（Longest Increasing Subsequence, LIS）。
 * @param nums 输入的数组
 * @returns 返回最长递增子序列的长度
 */
export function lengthOfLIS(nums: number[]): number {
    if (nums.length === 0) return 0;

    // dp[i] 表示以 nums[i] 结尾的最长递增子序列的长度
    const dp: number[] = new Array(nums.length).fill(1);

    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }

    // 返回 dp 数组中的最大值，即为最长递增子序列的长度
    return Math.max(...dp);
}

/**
 * 获取数组中的最长递增子序列（Longest Increasing Subsequence, LIS）。
 * @param nums 输入的数组
 * @returns 返回最长递增子序列的数组
 */
export function getLIS(nums: number[]): number[] {
    if (nums.length === 0) return [];

    // dp[i] 表示以 nums[i] 结尾的最长递增子序列的长度
    const dp: number[] = new Array(nums.length).fill(1);
    // prev[i] 表示在最长递增子序列中，nums[i] 的前一个元素的索引
    const prev: number[] = new Array(nums.length).fill(-1);

    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j] && dp[i] < dp[j] + 1) {
                dp[i] = dp[j] + 1;
                prev[i] = j;
            }
        }
    }

    // 找到最长递增子序列的最后一个元素的索引
    let maxLengthIndex = 0;
    for (let i = 1; i < dp.length; i++) {
        if (dp[i] > dp[maxLengthIndex]) {
            maxLengthIndex = i;
        }
    }

    // 通过 prev 数组回溯，构建最长递增子序列
    const lis: number[] = [];
    for (let i = maxLengthIndex; i >= 0; i = prev[i]) {
        lis.unshift(nums[i]);
        if (prev[i] === -1) break;
    }

    return lis;
}