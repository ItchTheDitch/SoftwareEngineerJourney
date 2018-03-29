const first = () => {
    const greet = 'Hi';
    const second = () => {
        alert(greet);
    }
    return second;
}

const newFunc = first(); 
    newFunc();


//Closures - a function ran, the function executed. It's never going to execute again. 
// BUT it's going to rember that there are references to those variable
//so the child scope always has acces to the parent scope


//Currying

const multiply = (a,b) => a * b;
const curriedMultiplay = (a) => (b) => a * b;
curriedMultiplay(3)(4) // 12
const multiplyBy5 = curriedMultiplay(5);

multiplyBy5(10); // curriedMultiplay(5)(10);

//Compose

const compose = (f, g) = a => f(g(a));

const sum = (num) => num + 1;

compose(sum, sum)(5); // 7

// Avoiding Side Effects, functional purity.
