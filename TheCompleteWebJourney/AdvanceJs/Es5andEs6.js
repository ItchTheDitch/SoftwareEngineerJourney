// Destructuring

const name = 'john snow';

const obj = {
    player: 'booby',
    experiance: 100,
    wizardLevel: false
}

const player = obj.player;
const experiance = obj.experiance;
let wizardLevel = obj.wizardLevel;

const { player, experiance} = obj;
let {wizardLevel} = obj 

// Object properties

const a = 'lexi';
const b = 'ruby';
const c = 'thor';

const obj = {
    a, // a:a
    b, // b:b
    c  // c:c
}

// Template Strings

const name = 'Sally';
const age = 34;
const pet = "horse";

const greetingBest = `Hello ${name} you eem to be ${age-10}. What a lovely ${pet} you have`

//default arguments

function greet (name ='', age = 30, pet ='cat') {
    return `Hello ${name} you eem to be ${age-10}. What a lovely ${pet} you have;`
}

//Symbol
let sym1 = Symbol();
let sym2 = Symbol('foo');
let sym3 = Symbol('foo'); 

//arrow function 

function add(a,b) {
    return a + b;
}

const add2 = (a,b) => a + b;