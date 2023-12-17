const events = require('events');

module.exports = class CustomEventEmmiter extends events.EventEmitter{
    constructor(value){
        super();
        this._value  = value;
    }

    set value(value){
        this.emit('update',{
            oldValue: this._value,
            newValue: value
        })
        this._value = value;
    }

    increment(n){
        this.emit('increment',{    
            oldValue : this._value,
            newValue : this._value + n 
        });
        this._value += n;
    }

    decrement(n){
        this.emit('decrement',{    
            oldValue : this._value,
            newValue : this._value - n 
        });
        this._value -= n;
    }
}