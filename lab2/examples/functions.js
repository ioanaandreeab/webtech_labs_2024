function sayHello() {
    console.log("Hello!");
};

sayHello();

const greetPerson = (name) => {
    console.log(`Hello, ${name}!`);
}

greetPerson("John");

const describePerson = (name, age, ...rest) => {
    console.log('This person is called ' + name + ' and is ' + age + ' years old');
    console.log('Other characteristics of this person are ' + rest);
}

describePerson('John', 24, 'green eyes', 'long hair');