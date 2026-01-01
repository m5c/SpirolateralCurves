# Typescript

## Class definition

Pretty similar to java syntax, but types are provided using the "`:`" notation.

```typescript
class Turtle {
  heading: number;
  x: number;
  y: number;
}
```

## Constructors

Constructors are always called `constructor`, and access to class level fields, likewise uses the `this.` syntax:

```typescript
constructor(heading: number, x: number, y: number) {
    this.heading = heading;
    this.x = x;
    this.y = y;
}
```

## Secrecy

`private`, `protected`, and `#` (enforcing private at runtime, not just compile time) *are* supported. :)

## Launchers

 * Any typescript file can be a launcher.
 * No launcher function is needed, in principle you can just write a `console.log()` statement, done.

 ## Using another class

### Referencing classes

By default, nothing is referenced - not even files in the same folder.
To access other classes, an import and and export are needed.

 * Export sample, after class end:
  ```typescript
  export { Turtle };
  ```

 * Import sample, at class start:
 ```typescript
 import { Turtle } from 'Turtle'
 ``` 

  > Must be "`'`" characters, must not include `.ts` file extension.

### Object creation

Using `object` as type is not a good idea, we have no actual type safety, and we cannot access any fields bound to the specific class.

 ```typescript
let turtle: object = new Turtle(0, 0, 0);
console.log(turtle.heading);
 ```

 > `heading` cannot be accessed, because `object` does not bind to such a field.

 Better: use correct type. Everything in same folder is automatically accessible:

 ```typescript
 let turtle: Turtle = new Turtle(0, 0, 0);
console.log(turtle.heading);
 ```