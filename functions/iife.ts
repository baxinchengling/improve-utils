(function() {
    // 这是一个立即执行函数表达式（IIFE）
    const message = "Hello, this is an IIFE!";
    console.log(message);
})();

// 使用箭头函数的 IIFE
(() => {
    const message = "Hello, this is an arrow function IIFE!";
    console.log(message);
})();
const result = (function(a, b) {
    return a + b;
})(5, 3);
// console.log(result); // 8

// 实现数据私有化（封装）
const counter = (function() {
let count = 0; // 私有变量

return {
    increment: () => count++,
    get: () => count
};
})();

// counter.increment();
// console.log(counter.get()); // 1
// console.log(count); // Error: count未定义

// 开始执行就确定函数, 后面不会再执行判断
var addEvent = (function() {
    if (typeof document.addEventListener === 'function') {
        return function(element, type, handler) {
            element.addEventListener(type, handler, false);
        };
    } else if (typeof document['attachEvent'] === 'function') {
        return function(element, type, handler) {
            element.attachEvent('on' + type, handler);
        };
    } else {
        return function(element, type, handler) {
            element['on' + type]= handler;
        }
    }
})()

const request = (function() {
    if (typeof window !== 'undefined') {
        // 在浏览器环境 
        return function(url, options) {
            // 发送请求
        };
    } else {
        // node 环境
        return function(url, options) {
            // 发送请求
        };
    }
})()

