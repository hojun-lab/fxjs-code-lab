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

log("take() 실행")
const take = curry((l, iter) => {
    let res = [];
    for (const item of iter) {
        res.push(item);
        if (res.length === l) return res;
    }
    return res;
});

go(
    range(10000),
    take(5),
    reduce(add),
    log
)

take(5, range(100));
take(5, L.range(100));  // 지연성을 가진 함수 => iterable 프로토콜로 추후에 리턴 가능함

// Iterable은 Java에서 Stream같은 역할

// 지연 평가에 대한 자세한 설명
// 1. 지연 평가는 영리한 계산 법 = 가장 필요한 때 까지 평가를 미룸 -> 필요할 때 사용 = 메모리 효율적
// 2. 이터레이터와 제너레이터, 이터러블 프로토콜이 있어서 지연평가가 쉬워짐

log('L.map - 평가를 미뤄서, 평가 순서를 달리 할 수 있는 이터레이터를 반환하는 제너레이터');

L.map = function *(f, iter) {
    for (const iterElement of iter) yield f(iterElement);
};

var item = L.map(a => a + 10, [1, 2, 3]);
item.next();

log('L.filter - 평가를 미뤄서, 평가 순서를 달리 할 수 있는 이터레이터를 반환하는 제너레이터');

L.filter = function *(f, iter) {
    for (const iterElement of iter) if (f(iterElement)) yield iterElement;
}
var filteredItem = L.filter(a => a % 2, [1, 2, 3, 4]);
