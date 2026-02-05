const log = console.log;
/*
* 기존과 달라진 ES6에서의 리스트 순회
* - for i++
* - for of
* */

const list = [1, 2, 3];
for (var i = 0; i < list.length; i++) {
    log(list[i]);
}
const str = 'abc';
for (var i = 0; i < str.length; i++) {
    log(str[i]);
}

for (const a of list) {
    log(a);
}

for (const a of str) {
    log(a);
}

// Array
log('Arr --------------');
const arr = [1, 2, 3];
for (const a of arr) log(a);
// Set
log('Set --------------');
const set = new Set([1, 2, 3]);
for (const a of set) log(a);

// Map
log('Map --------------');
const map = new Map(['a', 1], ['b', 2], ['c', 3]);
for (const a of map) log(a);

/*
* 이터러블/이터레이터 프로토콜
*  - 이터러블 : 이터레이터를 리턴하는 [Symbol.iterator]() 를 가진 값
*  - 이너레이터: { value, done } 객체를 리턴하는 next() 를 가진 값
*  - 이터러블/이터레이터 프로토콜: 이터러블을 for...of, 전개 연산자 등과 함께 동작하도록한 규약
*  결론 for...of로 나오는 결과 값은 arr, set, map이 아니라 이터러블 객체임
*  */

/*
* Well-formed iterator
* 자기자신의 iterator를 반환함
* 이전까지 진행된 상태에서 계속해서 Next를 할 수 있음
* */

const iterable = {
    [Symbol.iterator]() {
        let i = 3;
        return{
            next() {
                return i == 0 ? { done: true } : { value: i--, done: false };
            },
            [Symbol.iterator]() { return this; }
        }
    }
}