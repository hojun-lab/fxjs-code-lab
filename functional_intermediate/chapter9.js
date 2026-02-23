// 콜백 패턴
function add10(a, callback) {
    setTimeout(() => callback(a + 10), 100);
}

add10(5, res => {
    log(res);
});

// Promise
function add20(a) {
    return new Promise((resolve) => setTimeout(() => resolve(a + 20), 100));
}

add20(5)
    .then(add20)
    .then(add20)
    .then(log);
// 비동기 상황을 1급 값으로 다룸

var a = add10(5, res => {
    add10(res, res => {
        log(res);
    })
})

var b = add20(5)
    .then(add20)
    .then(add20)
    .then(log);

log(a)
log(b)

// a는 실횅 후 더 이상 할 수 있는 작업이 없음
// b는 실행 후 다른 작업을 then 을 통해서 가능

