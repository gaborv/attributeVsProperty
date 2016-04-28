# Purpose
It has been discovered that the virtual DOM implementation in Elm 0.16 (which is based on [virtual-dom](https://github.com/Matt-Esch/virtual-dom)) 
[can misbehave in a couple of edge cases](https://groups.google.com/forum/#!topic/elm-discuss/pIuIhGvrc-M).

The root cause behind this the ambiguity around what JS property (aka. IDL attributes) values map to the removal of the actual DOM attributes.

These tests have been created to shed some light on the performance implications of choosing the DOM attributes interface (which always works predictably) 
over JavaScript properties (which can cause undesired behavior).


## Usage
Open `index.html` in the browser of your choice. Click the button and wait for the result.
The tests use [benchmark.js](https://benchmarkjs.com/) under the hood.


## Reading the results
A DOM attribute API operation looks like this:
```
var hiddenRow = document.getElementById('hiddenRow');
hiddenRow.removeAttribute("hidden");
hiddenRow.setAttribute("hidden", "hidden");
```

A JS property operation looks like this:
```
var hiddenRow = document.getElementById('hiddenRow');
hiddenRow.hidden = "";
hiddenRow.hidden = "true";
```

A "mixed" operation looks like this:
```
var hiddenRow = document.getElementById('hiddenRow');
hiddenRow.removeAttribute("hidden");
hiddenRow.hidden = "true";
```

  