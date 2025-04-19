
import { getRandom, deepFreeze } from './utils/index'
console.log('===', getRandom(1, 10), deepFreeze({ a: 1, b: 2 }))