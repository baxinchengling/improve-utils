/**
 * 队列 FIFO
 */
export class Queue<T> {
    items: T[];
    constructor() {
        this.items = [];
    }
    enqueue(item: T): void {
        this.items.push(item);
    }
    dequeue(): T | null | undefined {
        if (this.isEmpty()) return null
        return this.items.shift();
    }
    front(): T | null | undefined {
        if (this.isEmpty()) return null;
        return this.items[0];
    }
    isEmpty(): boolean {
        return this.items.length === 0;
    }
    size(): number {
        return this.items.length;
    }
}