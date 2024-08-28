// interface
// 객체의 구조를 정의하는 것.
// 클래스와 다르게 상속을 구현하기 보다는 간단한 객체 구조를 정의할 때 주로 쓰는 것 같다.

interface Person {
  name: string;
  age: number;
  sayHello(message: string): void;
}

let user1: Person;

// interface는 객체를 정의하는데에 쓰이지만, 이걸 토대로 클래스를 확장할 수 있음.
// 또한 꼭 하나의 interface를 가져올 필요는 없음. 둘 이상의 interface를 가져와서 사용할 수 있음.
class Someone implements Person {
  name: string;
  age = 30;

  constructor(n: string) {
    this.name = n;
  }

  sayHello(message: string): void {
    console.log(message);
  }
}

// 그럼 이 기능이 어떨때 필요한가?
// 특정 class들에 동일한 프로퍼티 혹은 메서드가 존재하도록 강요할 수 있다.

// 2. read only
// interface에는 class와는 다르게 private, protected 등을 사용할 수 없다.
// 대신 readonly가 있어서 해당 프로퍼티의 값 수정을 금지시킬 수 있다.

interface Person {
  // 이렇게!
  readonly name: string;
  age: number;
  sayHello(message: string): void;
}

// 3. interface와 상속(확장)
// 상속을 구현하려면 class를 주로 사용하는 것은 맞지만, interface도 상속, 즉 확장을 할 수 있다.

interface Name {
  readonly name: string;
}

// 이렇게!
interface Person extends Name {
  age: number;
  sayHello(message: string): void;
}

// 또한 여러개의 interface를 병합해서 확장시킬 수 있다.
interface Person extends Name, OtherInterface {
  age: number;
  sayHello(message: string): void;
}

// 4. interface와 함수
// 우선 함수는 주로 type으로 정의함. 그러나 어쨌든 함수도 객체니까 interface로 정의할 수 있고, 정의하는 경우도 있어서 예시로 알아두면 좋을 것 같다.

// 이렇게 정의할 수 있음. ts가 자동적으로 익명함수로 인식함.
interface func {
  (n: number, message: string): void;
}

// 5.선택적 매개변수와 프로퍼티
// ts는 매개변수나 프로퍼티를 옵셔널하게 설정할 수 있다.
// 반드시 특정 매개변수나 프로퍼티의 값이 존재해야 하는 것이 아니라 있어도 괜찮고 없어도 괜찮은, 옵션으로 지정하는 것이다.

interface Named {
  readonly name?: string;
}

interface Person extends Named {
  age: number;
  sayHello(message: string): void;
}

class Someone implements Person {
  name?: string;
  age = 30;

  // 여기서 조건처리를 해줘야 한다.
  // 값이 없어도 괜찮다는 의미.
  constructor(n: string) {
    if (n) {
      this.name = n;
    }
  }

  sayHello(message: string): void {
    console.log(message);
  }
}
