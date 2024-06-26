class Key {
    private key: string;
    constructor() {
        this.key = Math.random().toString(36);
    }

    getSignature(): string {
        return this.key;
    }
};

class Person {
    constructor(private key: Key) { }
    
    getKey(): Key {
        return this.key;
    }
};

abstract class House{
    protected door: boolean;
    protected key: Key;
    protected tenants: Person[];

    abstract comeIn(person: Person): void;
    abstract openDoor(key: Key): void;
}

class MyHouse extends House {
    constructor(key: Key) {
        super();
        this.key = key;
        this.tenants = [];
    }

    openDoor(key: Key): void {
        if(key.getSignature() === this.key.getSignature()) {
            this.door = true;
            console.log("Door is open. Welcome in!");
        } else {
            this.door = false;
            console.log("Wrong key. Door is still closed");
        }
    }

    comeIn(person: Person): void {
        if (this.door) {
            this.tenants.push(person);
        }
    }

    getTenants(): Person[] {
        return this.tenants;
    }
}


const key_h1 = new Key();
const house1 = new MyHouse(key_h1);
const person1_h1 = new Person(key_h1);
const person2_h1 = new Person(key_h1);

const key_h2 = new Key();
const person1_h2 = new Person(key_h2);
const house2 = new MyHouse(key_h2);

// Wrong key. Door is still closed
house1.openDoor(person1_h2.getKey());
house1.comeIn(person1_h2);

// Door is open. Welcome in!
house1.openDoor(person1_h1.getKey());
house1.comeIn(person1_h1);

// Wrong key. Door is still closed
house2.openDoor(person1_h1.getKey());
house2.comeIn(person1_h1);

// Door is open. Welcome in!
house2.openDoor(person1_h2.getKey());
house2.comeIn(person1_h2);

// Door is open. Welcome in!
house1.openDoor(person2_h1.getKey());
house1.comeIn(person2_h1);

console.log('Tenants in first home:', house1.getTenants().length);
console.log('Tenants in second home:', house2.getTenants().length);

export {};