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