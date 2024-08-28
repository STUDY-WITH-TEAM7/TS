// TS와 클래스

class Department {
  name: string;
  constructor(n: string) {
    this.name = n;
  }
  printName() {
    console.log(this.name);
  }
}

const userName = new Department("jubi");

userName.printName();
// 여기까진 이렇게 작성해도 큰 문제가 안될 수 있음.
// 그러나 만약 userName의 printName을 호출하는 또 다른 객체가 있다면, 그 객체는 this가 userName 객체가 아니기 때문에 this 값을 찾지 못함.
// 그래서
class Department {
  name: string;
  constructor(n: string) {
    this.name = n;
  }
  // 이렇게 this 값의 타입을 지정하여 해결함.
  printName(this: Department) {
    console.log(this.name);
  }
}

// 만약 Department내부에 단순히 문자열 값 뿐아니라 배열도 존재한다고 해보자.

class Department {
  private name: string;
  private lists: string[] = [];
  constructor(n: string) {
    this.name = n;
  }
  printName(this: Department) {
    console.log(this.name);
  }
}

const userName = new Department("jubi");

// 근데 나는 lists에 특정 항목을 추가하고 제거하는 메서드를 class 내부에 정의하고 싶다.
// 그렇지만 userName.lists[1] = "something" 으로도 항목을 추가할 수 있는 상황이 발생한다.
// 이런 경우 lists에 private를 붙이면 된다.
// 외부에서 접근할 수 있는 값은 public을 붙이는데, 이게 기본값이어서 굳이 안붙여도 된다.

// 그런데 또 이렇게 하면 클래스 필드와 constructor에서 초기화가 각각 일어남(총 두 번).
// 이를 해결하기 위해
class Department {
  private name: string;
  private lists: string[] = [];
  constructor(n: string) {
    this.name = n;
  }
  printName(this: Department) {
    console.log(this.name);
  }
}

const userName = new Department("jubi");

// 이렇게 고칠 수 있음.
class Department {
  constructor(private pwd: string, private email: string) {}
  printName(this: Department) {
    console.log(this.name);
  }
}

const userName = new Department("jubi");

// private 프로퍼티는 정의되어 있는 클래스에서만 사용할 수 있고, 상속 클래스에서는 사용불가.
// 그래서 만약 프로퍼티의 변경을 막으면서 외부에서도 접근할 수 있게 하고 싶으면 protected 프로퍼티로 변경해서 사용하면 됨.

// 클래스의 정적 메서드와 정적 프로퍼티는 인스턴스에 속하지 않고 오로지 클래스에서만 속하는 메서드와 프로퍼티이다.
// 따라서 정적으로 생성한 메서드나 프로퍼티를 인스턴스 메서드 내부에서 참조하려고 하면 에러가 난다.

// 2. 추상 클래스
// 클래스는 상속하는 클래스에서 정의된 메서드를 상속받는 클래스에서 오버라이드 할 수 있다.
// 그런데 "할 수 있다"가 아니라 "해야 한다"로 강제하고 싶다면?
// 그럴 때 추상 클래스를 사용할 수 있다.

// 추상 클래스로 만들 클래스에 abstract 키워드를 붙인다.
abstract class Department {
  constructor(private pwd: string, private email: string) {}
  // 그래서 추상 메서드로 구현하려는 메서드는 마찬가지로 abstract 키워드를 붙이고 함수 몸체를 정의하지 않고 함수 반환값만 정의한다.
  abstract printName(this: Department): void;
}

// 추상 클래스를 호출할 수 없다 !
const userName = new Department("jubi"); // x

// 이렇게 하면 Department를 상속받는 모든 class는 printName를 반드시 구현해야 한다.

// 3. 싱글톤
// 싱글톤은 한 클래스당 인스턴스를 하나만 생성하는 개념이다.
// 클래스 내의 constructor 앞에 private 키워드를 붙이면 된다.
// 그러면 new 키워드를 사용한 인스턴스 생성이 불가한데, 인스턴스를 생성하려면 우선 인스턴스가 될 객체를 먼저 선언해주고 (static, private) 인스턴스를 생성할 메서드를 정의한다.
// private 여도 같은 클래스 내부에선 접근할 수 있으니까 사용가능하며, 이미 인스턴스가 만들어진 경우에는 기존의 인스턴스를 return 하게 조건 처리를 해준다.
// 없는 경우에는 new 키워드를 붙여서 내부에서 클래스를 호출한다. 내부에서는 사용가능하다.
