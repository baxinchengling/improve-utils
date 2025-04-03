class MultiFLIP2 {
    elements: Element[];
    options: {
        duration: number;
        easing: string;
        stagger: number;
    }
    firstStates: { el: Element, first?: DOMRect }[];
    constructor(elements, options = {}) {
        this.elements = Array.from(elements);
        this.options = {
            duration: 300,
            easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
            stagger: 0, // 元素间动画延迟时间
            ...options
        }
        this.firstStates = this.recordFirst()
    }
    // 记录元素的初始状态
    recordFirst() {
        return this.recordFn('first')
    }
    // 记录元素的最终状态
    recordLast() {
        return this.recordFn('last')
    }
    recordFn(key: string) {
        return this.elements.map((el: Element) => ({
            el,
            [key]: el.getBoundingClientRect()
        }))
    }
    // 计算变换矩阵
    calculateInvert(first: DOMRect, last: DOMRect) {
        const dx = first.left - last.left;
        const dy = first.top - last.top;
        const scaleX = last.width / first.width;
        const scaleY = last.height / first.height;
        return `translate(${dx}px, ${dy}px) scale(${scaleX}, ${scaleY})`;
    }
    // 应用动画
    play() {
        // 触发重排
        this.elements.forEach(el => el.classList.add('flipping'));
        const lastStates = this.recordLast();

        this.firstStates.forEach(({el, first}, index) => {
            const last = lastStates[index].last;
            const invert = this.calculateInvert(first as DOMRect, last as DOMRect);

            el.style.transition = `transform ${this.options.duration}ms ${this.options.easing}`;
            el.style.transform = invert;
        })
    }

}

class MultiFLIP {
    elements: Element[];
    options: {
        duration: number;
        easing: string;
        stagger: number;
        fade?: boolean;
    }
    firstRects: Map<Element, DOMRect>;
    constructor(elements, options = {}) {
        this.elements = Array.from(elements);
        this.options = {
            duration: 300,
            easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
            stagger: 0, // 元素间动画延迟时间
            ...options
        };
        this.firstRects = new Map();
        this.first();
    }
  
    // 记录所有元素的初始状态
    first() {
        this.firstRects.clear();
        this.elements.forEach(el => {
            this.firstRects.set(el, el.getBoundingClientRect());
        });
        return this;
    }
  
    // 执行动画
    play(changeCallback?: () => void): Promise<Animation[]> {
        // 如果没有记录初始状态，自动记录
        // if (this.firstRects.size === 0) this.first();
        
        // 执行改变DOM的操作
        if (changeCallback) changeCallback();
        
        // 获取所有元素的最终状态并创建动画
        const animations: Animation[] = [];
        
        this.elements.forEach((el, index) => {
                const firstRect = this.firstRects.get(el);
                const lastRect = el.getBoundingClientRect();
                if (firstRect && lastRect) {

                    // 计算差异
                    const deltaX = firstRect.left - lastRect.left;
                    const deltaY = firstRect.top - lastRect.top;
                    const deltaWidth = firstRect.width / lastRect.width;
                    const deltaHeight = firstRect.height / lastRect.height;
                    
                    // 创建动画
                    const animation = el.animate([
                        { 
                            transformOrigin: 'top left',
                            transform: `translate(${deltaX}px, ${deltaY}px) scale(${deltaWidth}, ${deltaHeight})`,
                            opacity: this.options.fade ? 0 : 1
                        },
                        { 
                            transform: 'none',
                            opacity: 1
                        }
                    ], {
                        duration: this.options.duration,
                        easing: this.options.easing,
                        delay: index * this.options.stagger,
                        fill: 'both'
                    });
                    
                    animations.push(animation);
                }
        });
        
        // 重置记录
        this.firstRects.clear();
        
        return Promise.all(animations.map(a => a.finished));
    }
}

interface FLIPOptions {
    duration?: number;
    easing?: string;
    stagger?: number;
    fade?: boolean;
}
/**
 * 使用 FLIP 动画进行元素位置和尺寸的平滑过渡。
 * @param elements 需要进行动画的元素。
 * @param options 可选的动画选项，包括持续时间、缓动函数和元素间动画的延迟时间。
 * @returns 包含 play 方法的对象，用于启动动画。
 */
export function useMultiFLIP(): (elements: Element[], options?: FLIPOptions) => { play: (changeCallback?: () => void) => Promise<Animation[]> }  {
    let _elements: Element[] = [];
    let options: FLIPOptions = {
        duration: 300,
        easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        stagger: 0, // 元素间动画延迟时间
        fade: false
    }
    let firstRects = new Map<Element, DOMRect>();

    return function (elements, ...args) {
        _elements = Array.from(elements);
        options = {...options, ...args}
        // 记录所有元素的初始状态
        function first() {
            firstRects.clear();
            _elements.forEach(el => {
               firstRects.set(el, el.getBoundingClientRect());
            });
        }
        // 执行动画
        function play(changeCallback?: () => void): Promise<Animation[]> {
            // 执行改变DOM的操作
            if (changeCallback) changeCallback();
            
            // 获取所有元素的最终状态并创建动画
            const animations: Animation[] = [];
            
            _elements.forEach((el, index) => {
                    const firstRect = firstRects.get(el);
                    const lastRect = el.getBoundingClientRect();
                    if (firstRect && lastRect) {

                        // 计算差异
                        const deltaX = firstRect.left - lastRect.left;
                        const deltaY = firstRect.top - lastRect.top;
                        const deltaWidth = firstRect.width / lastRect.width;
                        const deltaHeight = firstRect.height / lastRect.height;
                        
                        // 创建动画
                        const animation = el.animate([
                            { 
                                transformOrigin: 'top left',
                                transform: `translate(${deltaX}px, ${deltaY}px) scale(${deltaWidth}, ${deltaHeight})`,
                                opacity: this.options.fade ? 0 : 1
                            },
                            { 
                                transform: 'none',
                                opacity: 1
                            }
                        ], {
                            duration: this.options.duration,
                            easing: this.options.easing,
                            delay: index * this.options.stagger,
                            fill: 'both'
                        });
                        
                        animations.push(animation);
                    }
            });
            
            // 重置记录
            firstRects.clear();
            
            return Promise.all(animations.map(a => a.finished));
        }
        first()
        return { play }
    }
}
