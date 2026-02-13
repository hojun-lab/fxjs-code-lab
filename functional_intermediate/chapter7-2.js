// range, map, filter, reduce 중첩 사용

const log = console.log;

const curry = f =>
    (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._);

const map = curry((f, iter) => {
    let res = [];

    iter = iter[Symbol.iterator]();
    let cur;
    while (!(cur = iter.next()).done) {
        const a = cur.value;
        res.push(a);
    }

    // for (const item of iter) {
    //     res.push(f(item));
    // }
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

const range = l => {
    let i = -1;
    let res = [];
    while (++i < l) {
        res.push(i);
    }
    return res;
}

const take = curry((l, iter) => {
    let res = [];
    for (const item of iter) {
        res.push(item);
        if (res.length === l) return res;
    }
    return res;
});

const go = (...args) => reduce((a, f) => f(a), args);

const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);


go(range(10),
    map(n => n + 10),
    filter(n => n % 2),
    take(2),
    log);

// L.range, L.map, L.filter, reduce 중첩 사용

const L = {};
L.range = function *(l) {
    let i = -1;
    while (++i < l) {
        yield l;
    }
};

L.map = function *(f, iter) {
    for (const iterElement of iter) yield f(iterElement);
};

L.filter = function *(f, iter) {
    for (const iterElement of iter) if (f(iterElement)) yield iterElement;
}

go(L.range(10),
   L.map(n => n + 10),
   L.filter(n => n % 2),
   take(2),
   log);

/*즉시평가 코드*/

/*지연평가 코드*/