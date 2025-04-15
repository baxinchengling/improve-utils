

/**
 * 单例模式
 */
export class Singleton {
  private static instance: Singleton;

  constructor() {
    if (!Singleton.instance) {
        Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }
}


// const config1 = new Singleton();
// const config2 = new Singleton();
// console.log(config1 === config2); // true

// 应用场景：
// 需要全局唯一实例时（如配置管理、日志记录、数据库连接池）。
// 避免重复创建资源消耗大的对象（如缓存、全局状态管理）。

// 例子：
// Redux/Vuex 中的 Store 是典型的单例，确保全局唯一状态源。
// 浏览器中的 window 对象或浏览器 API（如 localStorage）本质上是单例。
