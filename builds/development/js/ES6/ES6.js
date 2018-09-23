class User {
    constructor (name, isAdmin) {
        this.name = name;
        this.isAdmin = isAdmin;
    }
}

let users = [
    new User ('Kia', true),
    new User ('sepideh', false),
    new User ('Mehdi', false)
];

console.log(users.find((user) => user.isAdmin));

// // includes
// let title = 'Iran is great!';

// if (title.includes('I')) {
//     console.log('Yes');
// } else {
//     console.log('No');
// }

// // startWith
// let title = 'Here you go';
// if (title.startsWith('H')) {
//     console.log('Yes');
// }
// // startsWith - چندمین حرف
// let title = 'Here you go';
// if (title.startsWith('y', 5)) {
//     console.log('Yes');
// }

// // endsWith 

// let title = 'Im gonna give it a go';
// if (title.endsWith('o')) {
//     console.log('Yes');
// }

// // repeat
// let str = 'lol';
// console.log(str.repeat(10));

// // Array includes
// console.log(
//     [2, 4, 6, 8, 10].includes(5)
// );

// //find 
// console.log(
//     [2, 4, 6, 8, 10].find((item) =>  item === 8)
// );

// // findIndex
// console.log(
//     [2, 4, 6, 8, 10].findIndex((item) => item === 8)
// );

// // Array - find
// class User {
//     constructor (name, isAdmin) {
//         this.name = name;
//         this.isAdmin = isAdmin;
//     }
// }

// let users = [
//     new User ('Kia', true),
//     new User ('sepideh', false),
//     new User ('Mehdi', false)
// ];

// console.log(users.find((user) => user.isAdmin));

// // entries()
// let items = [
//     'Elham',
//     'Kia',
//     'Mehdi',
//     'mansour'
// ].entries();

// for (let name of items){
//     console.log(name); // output = keys and values
// }


// // Generators
// function* numbers () {
//     console.log('BEGIN');
//     yield 1;
//     yield 2;
//     yield 3;
// } // dont work in bable
// let iterator = numbers();
// console.log(iterator.next().value);

// //................
// function* range(start, end) {
//     while(start <= end) {
//         yield start;
//         start++;
//     }
// }
// console.log([...range(1, 8)]);