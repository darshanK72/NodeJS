const events = require('events')

const emmiter = new events.EventEmitter();

emmiter.addListener('called',() => {
    console.log("Called Event");
});

emmiter.on('clicked',() => {
    console.log("Clicked Event")
});

emmiter.on('userAdded',(firstName,lastName,userId) =>{
    console.log(`User added with Id : ${userId}`);
});

emmiter.emit('called');

emmiter.removeAllListeners('clicked');

emmiter.emit('clicked');

emmiter.emit('userAdded','Darshan','Khairnar',101);