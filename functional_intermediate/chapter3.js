/*
* 제너레이터/이터레이터
*  - 제너레이터: 이터레이터이자 이터러블을 생성하는 함수
* */

const log = console.log;

function *gen() {
    yield 1;
    yield 2;
    yield 3;
    return 100;
}
function *gen2() {
    yield 1;
    if (false) yield 2;
    yield 3;
}

let iter = gen();

log(iter[Symbol.iterator]() == iter);

log(iter.next());
log(iter.next());
log(iter.next());
log(iter.next());

for (const number of gen()) log(number);

log("---------------------------")

function *infinity(i = 0) {
    while (true) yield i++;
}

function *limit(l, iter) {
    for (const lElement of iter) {
        yield lElement;
        if (lElement == l) return;
    }
}

function *odds(l) {
    for (const a of limit(l, infinity(1))) {
        if (a % 2) yield a;
    }
}

let iter2 = odds(10);

for (const number of iter2) {
    log(number);
}
