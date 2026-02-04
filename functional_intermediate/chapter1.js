const log = console.log
/*# 평가
- 코드가 계산(Evaluation) 되어 값을 만드는 것

# 일급
- 값으로 다룰 수 있다.
- 변수에 담을 수
있다.
- 함수의
인자로
사용할
수
있다.
- 함수의
결과로
사용할
수
있다.*/

const a = 10;
const add10 = a => a_ + 10;
const r = add10(a);

/*#
일급
함수
- 함수를
값으로
다룰
수
있다.
- 조합성과
추상화의
도구*/
const add5 = a => a + 5;
log(add5);
log(add5(5));

const f1 = () => () => 1;
log(f1());

const f2 = f1();
log(f2());
log(f2);
/*
# 고차 함수
 - 함수를 값으로 다루는 함수

## 함수를 인자로 받아서 실행하는 함수
 - apply1
 - times*/
const apply1 = f => f(1);
const add2 = a => a + 2;
log(apply1(add2));

const times = (f, n) => {
    let i = -1;
    while (++i < n) f(i);
}

times(log, 3);
times(a => log(a + 10), 3)

const addMaker = a => a => b => a + b;
const add10 = addMaker(add10);
log(add10);