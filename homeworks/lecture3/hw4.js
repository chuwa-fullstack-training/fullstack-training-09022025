function Shape() {
    this.type = 'shape';
}

Shape.prototype.getType = function() {
    return this.type;
}

function Triangle(a, b, c) {
    this.type = 'triangle';
    this.a = a;
    this.b = b;
    this.c = c;
}

Triangle.prototype = Object.create(Shape.prototype);
Triangle.prototype.constructor = Triangle;

// your code goes here
// 1. implement a method getPerimeter for Triangle class
// 2. implement a method getArea for Triangle class

Object.assign(Triangle.prototype, {
    getPerimeter: function() {
        return this.a + this.b + this.c
    },
    getArea: function() {
        let s = (this.a + this.b + this.c) / 2
        return Math.sqrt(s * (s - this.a) * (s - this.b) * (s - this.c))
    }
})

// 3. implement a new class Circle. this class should inherit from Shape class, and have a radius property.
// 4. implement a method area for Circle class
// 5. implement a method circumference for Circle class
function Circle(radius) {
    this.type = 'circle'
    this.radius = radius
}
Circle.prototype = Object.create(Shape.prototype)
Circle.prototype.constructor = Circle

Object.assign(Circle.prototype, {
    getArea: function() {
        return Math.PI * this.radius ** 2
    },
    getCircumference: function() {
        return 2 * Math.PI * this.radius
    }
})

// 6. change all code above to use ES6 class syntax
class ShapeES6 {
    constructor(type) {
        this.type = type
    }
    
    getType () {
        return this.type
    }
}

class TriangleES6 extends ShapeES6 {
    constructor(a, b, c) {
        super('triangle')
        this.a = a
        this.b = b
        this.c = c
    }

    getArea() {
        let s = (this.a + this.b + this.c) / 2
        return Math.sqrt(s * (s - this.a) * (s - this.b) * (s - this.c)) 
    }

    getPerimeter() {
        return this.a + this.b + this.c
    }
}

class CircleES6 extends ShapeES6 {
    constructor(radius) {
        super('circle')
        this.radius = radius
    }

    getArea() {
        return Math.PI * this.radius ** 2
    }

    getCircumference() {
        return 2 * Math.PI * this.radius
    }
}

// Test
let t5 = new Triangle(3, 4, 5)
let c5 = new Circle(5)
let t6 = new TriangleES6(3, 4, 5)
let c6 = new CircleES6(5)
console.log(`[ES5] triangle: ${t5.getType()} P=${t5.getPerimeter()} A=${t5.getArea()}`);
console.log(`[ES5] circle:   ${c5.getType()} A=${c5.getArea()} C=${c5.getCircumference()}`);
console.log(`[ES6] triangle: ${t6.getType()} P=${t6.getPerimeter()} A=${t6.getArea()}`);
console.log(`[ES6] circle:   ${c6.getType()} A=${c6.getArea()} C=${c6.getCircumference()}`);