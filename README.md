# Dewlinq

## What is
If you came from c# you sure know linq. This is a base implementation of my favourites methods of linq.

## Hot to use

The first thing you need to do is to import and initialize linq. A good idea is to do this into the app entry point, for example:

```csharp
import linq from 'dewlinq';
// this is the initialization
linq();

```

After that you can use linq on array or on Dicitonaries (linq type, needs import);

## Default callback

If you need to use a linq function (for example first()) you needs to pass always a callack. 

The linq library export the __no__ callback that return always return true, so you can use like a no-callback

For example

```csharp
import linq, { no } from 'dewlinq';
// this is the initialization
linq();

const a: string[] = ["hello","my","name","is","carriage"];

console.log(a.first(no))
// this will print "hello"

console.log(a.first((x) => true))
// this also will print "hello"

console.log(a.first((x) => x === "my"))
// this will print "my"
```

## The use of SELECT

You can use the select to get an array of new type object, for example

```csharp
import linq, { no } from 'dewlinq';
// this is the initialization
linq();

class UserName{
    public fullName: string = "";
    public constructor(fullName: string)
    {
        this.fullName = fullName;
    }
}

class User{
    public name: string = "";
    public surname: string = "";
    public constructor(name:string, surname:string)
    {
        this.name = name;
        this.surname = name;
    }
}

const a: User[] = [new User("Andrea","Abbondanza"), new User("D","The Carriage")];
const b: UserName[] = a.select<UserName>((x) => new UserName(x.name + " " + x.surname));
// you can also combine them
const c: UserName[] = a.where((x) => /Andrea/.test(x.name)).select<UserName>((x) => new UserName(x.name + " " + x.surname));
b.forEach((element) => {
      console.log(element.fullName +", ");
    });
// will print "Andrea Abbondanza, D The Carriage"
c.forEach((element) => {
      console.log(element.fullName);
    });
// will print "Andrea Abbondanza,"
```

## Know Issues


## Other
[andrewdev.eu](https://www.andrewdev.eu)