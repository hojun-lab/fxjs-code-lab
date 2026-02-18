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
