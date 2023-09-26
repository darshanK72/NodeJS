const event = require('events');

module.exports = class extends event.EventEmmiter {
    constructor(){
        super();
    }
}