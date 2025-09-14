/*a constructor Shape to create new object using class Shape
配合 new Shape() 使用时，JS 会先创建一个新对象，然后把这个新对象绑定为函数里的 this。
this.type = 'shape' 就是在给“新造出来的对象”加一个属性 type，值是 'shape'
*/
function Shape() {
    this.type = 'shape';
}

/* every constructor has a prototype object
把仿佛getType放在Shape.prototype上， 所有Shape的子类或者用new Shape()的对象都可以用getType这个方法，更省内存
getType 方法里 return this.type; 的 this，指的是调用这个方法的那个对象。
*/

Shape.prototype.getType = function() {
    return this.type;
}
/* a constructor Triangle
造一个三角形对象，记住它三条边的长度
*/
function Triangle(a, b, c) {
    this.type = 'triangle';
    this.a = a;
    this.b = b;
    this.c = c;
}
/*它把 Triangle 的原型，设置成“一个以 Shape.prototype 为原型的新对象”
三角形实例 → Triangle.prototype → Shape.prototype → Object.prototype
*/
Triangle.prototype = Object.create(Shape.prototype);
/* 上一行我们把 Triangle.prototype 整个换成了一个新对象（Object.create(...) 的返回值）。
这样会导致 Triangle.prototype.constructor 不再指向 Triangle 本身（会变成从 Shape.prototype 那边继承来的 constructor）。
所以这里手动把 constructor 指回 Triangle，方便以后判断“这个原型/实例是由哪个构造函数创造的”
*/
Triangle.prototype.constructor = Triangle;


//Object.create()里面可以放任何东西，包括变量，null，某种原型





// your code goes here
// 1. implement a method getPerimeter for Triangle class
Triangle.prototype.getPerimeter = function() {
  return this.a + this.b + this.c;
}
// 2. implement a method getArea for Triangle class
Triangle.prototype.getArea = function() {
  let s = (this.a + this.b + this.c) / 2;
  return Math.sqrt(s * (s - this.a) * (s - this.b) * (s - this.c));
}
// 3. implement a new class Circle. this class should inherit from Shape class, and have a radius property.
function Circle(radius) {
  this.type = 'circle';
  this.radius = radius;
}
Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

// 4. implement a method area for Circle class
Circle.prototype.area = function() {
  return Math.PI * this.radius * this.radius;
}
// 5. implement a method circumference for Circle class
Circle.prototype.circumference = function() {
  return 2 * Math.PI * this.radius;
}
// 6. change all code above to use ES6 class syntax