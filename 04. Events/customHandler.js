const CustomEventEmmiter = require('./customEvent');

const myEventEmmiter = new CustomEventEmmiter(20);

myEventEmmiter.on('update',(data) => {
    console.log(data);
});

myEventEmmiter.on('increment',(data) => {
    console.log(data);
});

myEventEmmiter.on('decrement',(data) => {
    console.log(data);
});

myEventEmmiter.value = 55;
myEventEmmiter.increment(5);
myEventEmmiter.decrement(20);