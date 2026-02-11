const log = console.log;

const curry = f =>
    (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._);

const map = curry((f, iter) => {
    let res = [];
    for (const item of iter) {
        res.push(f(item));
    }
    return res;
});

const filter = curry((f, iter) => {
    let res = [];
    for (const item of iter) {
        if (f(item)) res.push(item);
    }
    return res;
});

const reduce = curry((f, acc, iter) => {
    if (!iter) {
        iter = acc[Symbol.iterator]();
        acc = iter.next().value;
    }
    for (const item of iter) {
        acc = f(acc, item);
    }
    return acc;
});

const add = (a, b) => a + b;

const range = l => {
    let i = -i;
    let res = [];
    while (++i < l) {
        res.push(i);
    }
    return res;
}

log(range(5));

var list = range(4);
log(reduce(add, list))

const L = {};
L.range = function *(l) {
    let i = -1;
    while (++i < l) {
        yield l;
    }
};

log(range(5));

var list = range(4);
log(reduce(add, list))

// range와 L.range의 차이점
// range 함수는 함수내부의 값을 바로 실행함 -> Array = Array -> 이터레이터 -> 순회해서 반환하기에 Array임
// L.range는 Iterable하기 때문에 next()를 하기전까지는 값을 꺼내오지 않음 -> Iterable = Array -> 이터레이터
// 즉, 최종 연산과정이 없는 L.range가 효율적

log("재미삼아 테스트 ==============================")
function test(name, time, f) {
    console.time(name);
    while (time--) f();
    console.timeEnd(name);
}

test('range', 10, () => reduce(add, range(10000000)));
// 489.10ms
test('range', 10, () => reduce(add, L.range(10000000)));
// 295.78ms