import { describe, it, expect } from 'vitest';
import { quickSort } from '../../algorithm/quickSort';

describe('quickSort', () => {
    it('should sort an array of numbers in ascending order', () => {
        const unsortedArray = [64, 34, 25, 12, 22, 11, 90];
        const sortedArray = quickSort(unsortedArray);
        expect(sortedArray).toEqual([11, 12, 22, 25, 34, 64, 90]);
    });

    it('should return an empty array if the input is empty', () => {
        const unsortedArray: number[] = [];
        const sortedArray = quickSort(unsortedArray);
        expect(sortedArray).toEqual([]);
    });

    it('should return the same array if it is already sorted', () => {
        const unsortedArray = [1, 2, 3, 4, 5];
        const sortedArray = quickSort(unsortedArray);
        expect(sortedArray).toEqual([1, 2, 3, 4, 5]);
    });

    it('should handle an array with a single element', () => {
        const unsortedArray = [42];
        const sortedArray = quickSort(unsortedArray);
        expect(sortedArray).toEqual([42]);
    });
});