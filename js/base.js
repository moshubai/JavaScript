// 学习闭包，手写闭包
console.log('%c闭包', 'color: #43bb88;font-size: 24px;font-weight: bold;text-decoration: none;');
var fn = function () {
    var count = 1
    console.log('1', count); //log
    return (
        function () {
            console.log('count', count); //log
        }
    )()
}
fn()

// 闭包的运用
var shop = (function Shop() {
    var totlePrice = 1000

    var price = 0

    return {
        pay: function (val) {

            price = price + val
            console.log('price', price); //log
        },
        buy: function () {
            if (price > totlePrice) {
                console.log('恭喜你，忠实的'); //log
            } else {
                console.log('还没有你的事'); //log
            }
        },

    }
}
)();
shop.pay(10)



// 构造函数
console.log('%c构造函数', 'color: #43bb88;font-size: 24px;font-weight: bold;text-decoration: none;');
function Preson() {
    this.name = '墨书白'
    console.log('this', this); //log
    this.say = function () {
        console.log('name', this.name); //log
    }

}
Preson.prototype.talk = function () {
    console.log('prototype:this', this); //log
}

var np = new Preson()
console.log('np', np); //log
np.say()
np.talk()

// 类 class
console.log('%cclass', 'color: #43bb88;font-size: 24px;font-weight: bold;text-decoration: none;');
class Npreson {
    constructor() {
        this.max = 10
        this.name = '墨书白'
    }
    say() {
        console.log('构造函数：this.name', this.name); //log
    }
}
var cla = new Npreson()
console.log('cla', cla); //log
cla.say()

class ChildPreson extends Npreson {

}
var childp = new ChildPreson()
console.log('childp=====', childp); //log
childp.say()
// 
console.log('%capply', 'color: #43bb88;font-size: 24px;font-weight: bold;text-decoration: none;');
function Animal(name, age, gender) {
    console.log('Animal的this', this); //log
    this.name = name;
    this.age = age;
    this.gender = gender;
}

var nAimal = new Animal()
console.log('Animal', nAimal, 96); //log
function Person(name, age, gender, say) {
    console.log('Person的this', this); //log
    //Animal(name,age,gender);
    //目的：将Person函数内部的this指向的Animal实例
    // Animal.call(this,name,age,gender)
    //-->等价于：

    Animal.apply(this, [name, age, gender])
    console.log('Person的this', this); //log
    this.say = say;
}


var p1 = new Person("墨书白", 27, "男",
    function () {

    });
console.log('p1', p1); //log
console.log('p1.name', p1.name); //log



// ==================
console.log('%c继承关系', 'color: #43bb88;font-size: 24px;font-weight: bold;text-decoration: none;');
function A(a) {
    this.varA = a;
}

// 以上函数 A 的定义中，既然 A.prototype.varA 总是会被 this.varA 遮蔽，
// 那么将 varA 加入到原型（prototype）中的目的是什么？
A.prototype = {
    varA: null,
    doSomething: function () {
        console.log('1]'); //log
        // ...
    }
}

function B(a, b) {
    A.call(this, a);
    this.varB = b;
}
console.log('AAAAAAA', A.prototype); //log
B.prototype = Object.create(A.prototype, {
    varB: {
        value: null,
        enumerable: true,
        configurable: true,
        writable: true
    },
    doSomething: {
        value: function () { // override
            A.prototype.doSomething.apply(this, arguments);
            // call super
            // ...
            console.log(']'); //log
        },
        enumerable: true,
        configurable: true,
        writable: true
    }
});
console.log('BBBBBB.prototype', B.prototype); //log
B.prototype.constructor = B;

var b = new B();
console.log('BBBBBB2', b); //log
console.log('BBBBBB.prototype\\\222', B.prototype); //log
b.doSomething();

// ==============
console.log('%cObject.create', 'color: #43bb88;font-size: 24px;font-weight: bold;text-decoration: none;');
var arr = {
    name: '墨书白',
    age: "27",
    say: function () {
        console.log('检查this的指向', this, this.name); //log
    }
}
var bNarr = Object.create(arr, {
    name: {
        value: '墨书白2'
    },
})
console.log('bNarr', bNarr); //log
console.log('bNarr.name', bNarr.name); //log
bNarr.say()

//  柯里化(闭包实现)
console.log('%c柯里化', 'color: #43bb88;font-size: 24px;font-weight: bold;text-decoration: none;');

add = (x) => (y) => x + y
console.log('add(1)(2)', add(1)(2)); //log


var addFn = function (x) {
    return function (y) {
        return x + y
    }
}

var increment = addFn(1);
var addTen = addFn(10)
// increment(2)
// addTen(10)
console.log('increment(2)', increment(2)); //log
console.log('addTen(10)', addTen(2)); //log
