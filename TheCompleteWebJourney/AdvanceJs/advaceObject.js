// referece type 

let object1 = { values : 10};
let object2 = object1;
let object3 = { value : 10};

object1 === object2; // true

object1 === object3; // false

// context vs scope
function b () {
    let a = 4;
}

const object4 = {
    a: function() {
        console.log(this);
    }
}
object4.a() // {a: f}


//instantiation

class Player {
    constructor(name, type) {
        console.log(this);
        this.name = name;
        this.type = type;
    }

    introduce() {
        console.log(`Hi I am ${this.name}, I am ${this.type}`);
    }
}

class Wizard extends Player {
    constructor(name, type) {
        super(name, type) 
    }
    play() {
        console.log (`WEEEE I'm a ${this.type}`);
    }
}

const wizard1 = new Wizard('Shelly', 'Healer');
const wizard2 = new Wizard('Shawn', 'Dark Magic');