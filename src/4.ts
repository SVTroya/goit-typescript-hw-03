class Key {
  private readonly signature: string

  constructor() {
    this.signature = crypto.randomUUID()
  }

  getSignature(): string {
    return this.signature
  }
}

class Person {
  constructor(private key: Key) {
  }

  getKey(): Key {
    return this.key
  }
}

abstract class House {
  protected door: boolean
  protected key: Key
  protected tenants: Person[]

  comeIn(person: Person) {
    if (this.door) {
      this.tenants.push(person)
    }
    else{
      console.log("Door is closed!!!")
    }
  }

  abstract openDoor(key: Key): void
}

class MyHouse extends House {
  constructor(key: Key) {
    super()
    this.key = key
  }

  openDoor(key: Key): void {
    if(key.getSignature() === this.key.getSignature()){
      this.door = true
      console.log("Door is open. Please come in!")
    }
    else{
      console.log("You have wrong key. Please leave or we will call police!!!")
    }
  }
}


const key = new Key();

const house = new MyHouse(key);
const person = new Person(key);

house.openDoor(person.getKey());

house.comeIn(person);


export {};