// reduce, join

L.entries = function *(obj) {
    for (const k in obj) yield [k, obj[k]];
}

const join = curry((sep, iter) =>
    reduce((a, b) => `${a}${sep}${b}`, iter));

const queryStr = obj => pipe(
    L.entries,
    L.map(([k, v]) => `${k}=${v}`),
    join('&')
);
log(queryStr({ limit: 10, offset: 10, type: 'notice' }));

// take, find
const users = [
    { age: 32 },
    { age: 31 },
    { age: 37 },
    { age: 28 },
    { age: 25 },
    { age: 32 },
    { age: 31 },
    { age: 37 },
];

const find = curry((f, iter) => go(
    iter,
    L.filter(f),
    take(1),
    ([a]) => a
));

go(
    users,
    L.map(u => u.age),
    find(n => n < 30),
    log
)

log(find(u => u.age < 30)(users));

// const map = curry((f, iter) => go(
//     iter,
//     L.map(f),
//     take(Infinity),
// ))

const takeAll = take(Infinity);

L.filter = curry(function *(f, iter) {
    for (const i of iter) {
        if (f(i)) yield f(i);
    }
})

const map = curry(pipe(L.map, takeAll));

const filter = curry((pipe(L.filter, takeAll)));

// L.flatten
// log([1,2], 3,4, [5,6], [7,8]) => 다 펼쳐서 하나의 배열로 변경, 동작은 지연적으로
const isIterable = a => a && a[Symbol.iterator];

L.flatten = function *(iter, ) {
    for (const iterElement of iter) {
       // if (isIterable(iterElement)) for (const inner of iterElement) yield inner;
       if (isIterable(iterElement)) yield *iterElement;
       else yield iterElement;
    }
};

var it = L.flatten([1,2], 3,4, [5,6], [7,8]);

const flatten = pipe(L.flatten, takeAll);

// L.flatMap
// flatmap = map + flatten
// flatten = 여러개를 하나의 리스트로 묶음 / flatmap 안의 함수를 바탕으로 안쪽에 있는 값을 제어함
log([[1, 2], [3, 4], [5, 6, 7]].flatten(a => a));

L.flatMap = curry(pipe(L.map, L.flatten));
const flatMap = curry(pipe(L.map, flatten));

var it = L.flatMap(map(a => a * a), [[1, 2], [3, 4], [5, 6, 7]]);
log([...it])

// 2 Dimension array
const arr = [
    [1, 2],
    [3, 4, 5],
    [6, 7 ,8],
    [9, 10]
];

go(arr,
    L.flatten,
    L.filter(a => a % 2),
    take(3),
    log);