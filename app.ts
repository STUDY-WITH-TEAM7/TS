function add(x: number, y: number) {
  return x - y;
}

const x = 5;

// ts는 컴파일까지 막진 않음. 그니까 런타임중에 작동하는게 아님.

// 자바스크립트는 동적타이핑
// 타입스크립트는 정적타이핑

// 타입스크립트가 타입을 자동으로 추론하게 두는 것이 좋음.
const person: { name: string; age: number } = {
  name: "someone",
  age: 15,
};
// 이것보다
const person = {
  name: "someone",
  age: 15,
};
// 이게 나음

// 명시적 타입선언은 초기 값 없이 변수를 선언하거나, 나중에 값을 할당할 때
// 함수의 매개변수나 반환값에 타입을 명시할 때
// 매우 복잡한 타입 구조를 다루거나, 타입 추론이 모호해질 수 있을 때
// 이럴때 하는 것이 좋음

// 배열 타입으로 정할 때는 자동적 타입추론을 할 수 있음.

// tuple 타입. 타입과 길이가 고정.
// 왜필요한가? => 생긴건 배열처럼 생겼는데 내부에 들어올 값을 고정시킬 수 있음.
// [string, number] 이렇게 튜플을 만들었다면, 해당 인덱스에는 해당하는 값만 들어와야 함.
// 그럼 배열보다 튜플을 사용하는 것이 더 좋은가?

// enum
// 역할을 정할 때는 string으로 정하는게 좋음. 숫자보다 ...
// 근데 이럴 경우 입력한 string이 정확하지 않을 수 있음. (언더바인지 하이픈인지 헷갈릴수도..)
// 그래서 이런 경우 보통 상수를 사용한다.
const ADMIN = 0;
const READ_ONLY = 1;
const AUTHOR = 2;
// 그런데 이런 상황에선 enum이 유용함.
enum Role {
  ADMIN = 5,
  READ_ONLY = "READ_ONLY",
  AUTHOR = 1,
}
// 이렇게. 다른 숫자로 시작하고 싶은 경우에는 기본값을 지정하는 것처럼 지정해 줄 수 있음.

// any
// 가능하다면 사용하지 말자.. ts의 장점이 사라짐.
// 정말 무슨 값이 들어올지 모르는 경우에 사용하는 것이 좋음.

// union
// 변수에 한가지 타입만 입력받지 않아도 됨. 원한다면 숫자값과 문자값을 모두 받아서 유연한 작업을 할 수 있음.
// number | string 이렇게 하면 되는데 이걸 union 타입이라고 함.

// 리터럴 타입
// 어떤 타입이어야 하는지를 정하는게 아니라 어떤 값이 와야 하는지를 명시함.

// 알리어스 타입
// 타입에 이름을 붙이는 것.
type Status = "loading" | "success" | "error";
// 이건 알리어스 타입임과 동시에 유니언 타입.
// 그래서 알리어스 타입을 사용해서 객체타입을 미리 지정한 후, 객체명으로 타입을 지정해서 사용할 수 있음.

// 타입스크립트는 함수의 반환값도 타입을 가짐.
// 리턴값의 타입을
function add(n1: number, n2: number): number {
  return n1 + n2;
}
// 이런식으로 함수의 인자 다음에 :type명 으로 서술해서 명시할 수는 있는데, ts가 추론하게 놔두는 것이 좋음.
// 또한 아무것도 반환하지 않을 때 void를 명시할 수 있음.
// js로 컴파일할 때, 이 void는 undefined가 됨. 그치만 ts에서 리턴값을 void대신 undefined로 하는 것은 엄연히 다르고 그렇게 설정할 수 없음.
// 그러니까 void로 타입을 설정한 함수는 undefined를 반환하는 함수라는 것임.

// 함수의 타입을 명시할 수 있음. 왜냐면 만약에
let func;
func = add;
func = 5;

// 이런 일이 일어나면 안되니까 func라는 함수는 명확하게 함수 타입임을 지정해 주는 것.
let func: Function; // 이렇게
// 그런데 이런 경우가 생길수 있음. 특정 타입의 인수만 받고 싶고, 받는 인수의 개수도 지정하고 싶음.
// 그럴 때는
let func: (n1: number, n2: number) => number; // 이렇게. 반환값의 타입도 지정할 수 있음.

// 콜백함수를 받는 함수를 만들고 타입을 명시하고 싶을 수 있다.
const addNum = (n1: number, n2: number, cb: (num: number) => void) => {
  const result = n1 + n2;
  cb(result);
};

//unknown 타입
// any 타입이랑 비슷한데 any 보단 엄격함.
// any는 타입 검사를 전혀 안하지만 unknown 타입은 할당된 값에 따라 타입 검사를 함.

let userInput: unknown;
let userName: string;
userInput = 5;
userInput = "Joe";

// 위와 같은 예시가 있다고 할 때, userInput은 할당된 값에 따라 타입체크를 한다.
// 그렇지만 만약 userName에 userInput을 할당하면 오류가 뜬다.
// 그래서 반드시 타입을 체크하는 구문을 작성해줘야 한다.
if (typeof userInput === "string") {
  userName = userInput;
}

// never 타입
// 함수가 undefined를 반환하면 void 타입으로 지정하는 것과 다름. never는 정말 아무것도, undefined 조차도 반환하지 않는 함수타입을 never라고 함.
