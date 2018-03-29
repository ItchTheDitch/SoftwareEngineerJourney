.padStart();
.padEnd();
'Turtle'.padStart();
'Turtle'.padEnd();

Object.values
Object.entries
Object.keys

let obj = {
    username0: 'santa',
    username1: 'Rudolf',
    username2: 'MrGrinch'
}

Object.keys(obj).forEach((key, index => {
    console.log(key, obj[key]); // username 0 Santa username1 Rudolf username2 Mr.Grinch
}))

Object.values(obj).forEach(value => {
    console.log(value);// Santa Rudolf MrGrinch
})

Object.entries(obj).forEach(value => {
    console.log(value);// ["username0", "santa"] ["username1", "Rudlof"], ["username2", "MrGrinch"];
})

// real life scenario

Object.entries(obj).map(value => {
    return value[1] + value[0].replace('username', '');
})