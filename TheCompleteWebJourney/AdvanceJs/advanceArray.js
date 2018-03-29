let array = [1, 2, 10, 16];
const double = [];

const newArray = array.forEach( (num) => {
    double.push (num * 2);
} )

console.log (newArray);// [1, 2, 10, 16];

console.log(double);// [2, 4, 20 ,32]

// map , filter, reduce 

const mapArray = array.map(num => num * 2)

console.log(mapArray); // [2, 4, 20, 32]

//filter

const filterArray = array.filter( num => {
    return num > 5;
})

console.log(filterArray) // [10, 16] ;

// reduce

const reduceArray = array.reduce((accumulator, num)=> {
    return accumulator + num;
},5);

console.log(reduceArray); //34