const log = console.log;

const products = [
    { name: '반팔티', price: 15000 },
    { name: '긴팔티', price: 20000 },
    { name: '핸드폰케이스', price: 15000 },
    { name: '후드티', price: 30000 },
    { name: '바지', price: 25000 },
]

let names = [];
for (const product of products) {
    names.push(product.name);
}
log(names)

// functional = 인자와 return 값으로 소통, (인자) => return값

const map = (f, iter) => {
    let res = [];
    for (const item of iter) {
        res.push(f(item));
    }
    return res;
}

log("=====================================");
log(map(p => p.name, products));
log("=====================================");

log("다형성=================================");
// Iterable 프로토콜을 따르는 객체들도 map을 할 수 있음 = 대부분의 자료구조에서 표현가능
function *get() {
    yield 2;
    if (false) yield 3;
    yield 4;
}
log(map(a => a * a, get()));


let m = new Map();
m.set('a', 10);
m.set('b', 20);
map(([k, a]) => [k, a * 2], m);

// m과 map(([k, a]) => [k, a * 2], m); 는 별개의 값?

log("filter=================================");
let under_20000 = [];
for (const item of products) {
    if (item.price < 20000) under_20000.push(item);
}
log(...under_20000);

const filter = (f, iter) => {
    let res = [];
    for (const item of iter) {
        if (f(item)) res.push(item);
    }
    return res;
}

const filtered = filter(p => p.price >= 20000, products);
log(...filtered);
// 내부의 다형성은 보조함수를 통해서 진행
// 제너레이터 함수를 즉시실행하는것도 가능
const genFilter = filter(p => p % 2, (function *gen() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
    yield 6;
    yield 7;
})());

log("genFilter")
log(...genFilter)


log("REDUCE ==================")
const nums = [1, 2, 3, 4, 5];

let total = 0;
for (const num of nums) {
    total += num;
}
log(total);

const reduce = (f, acc, iter) => {
    if (!iter) {
        iter = acc[Symbol.iterator]();
        acc = iter.next().value;
    }
    for (const item of iter) {
        acc = f(acc, item);
    }
    return acc;
}

const add = (a, b) => a + b;
log(reduce(add, 0, [1, 2, 3, 4, 5]));