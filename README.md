# Randomizer
Simple NodeJS Randomizer which behave like .NET System.Random

# How To Use
The usage is pretty much same like .NET System.Random  
Randomizer will also generate same value as .NET System.Random (as long provided with equal seed value).

```
// Include it first  
var Randomizer = require('Randomizer');  
  
// Create new instance of Randomizer
// 1st parameter is Seed (not required, will use new Date().getTime() as seed if not provided)
var random = new Randomizer(10);  
  
// Generate Random Integer  
var value1 = random.Next();  
  
// Generate Random Integer with Maximum Value  
var value2 = random.Next(10);  

// Generate Random Integer between Minimum and Maximum Value  
var value3 = random.Next(5, 20);  

// Generate Random Array of Byte (each value contain maximum 255 (equal to 0xff))  
var arr = new Array(10);  
arr = random.NextBytes(arr);  
  
// Generate Random Double  
var doubleValue = random.NextDouble();  
```

# The Quality of Generated Value
Basically, the randomizer will generate *SAME* value as long randomizer is provided by the same `seed` value.
In .NET, System.Random by default is supplied with `Environment.TickCount` as the `seed` to ensure randomizer to generate different / unique value.

By default, this randomizer is seeded by `new Date().getTime()` value (which assumed equal with of `Environment.TickCount` in C#).
