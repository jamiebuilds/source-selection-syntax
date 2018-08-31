# Source Selection Syntax

> Short simple syntax for selecting source code

```
10:3-10:14
/path/to/file.txt:12
/path/to/file.txt:15:4-15:12,18:6-18:13
/path/to/file.txt:56:8;/path/to/other/file.txt:93:12
```

## Syntax

You can make several `selection`'s at once by separating them with
semi-colons `;`.

```
selection
selection;selection
selection;selection;selection;...
```

### `selection`

Each `selection` can either be:

- A [`filepath`](#filepath)
- A [`filepath`](#filepath) and some [`positions`](#positions)
- Some [`positions`](#positions)

```
filepath
filepath:positions
positions
```

### `filepath`

A `filepath` must either be:

- Relative: Starting with a `./`
- Absolute: Starting with a `/`

```
./relative/path/to/file.txt
/absolute/path/to/file.txt
```

### `positions`

```
position
position,position
position,position,position,...
```

### `position`

```
location
location-location
```

### `location`

```
line
line:column
```

## Library

### Install

```sh
yarn add source-selection-syntax
```

### Usage

```js
const {
  parseSelections,
  printSelections,
  parseSelection,
  printSelection,
  parsePositions,
  printPositions,
  parsePosition,
  printPosition,
  parseLocation,
  printLocation,
} = require('source-selection-syntax');

let parsed = parseSelections("./file.txt:1:1-2:2,3:3-4:4;./file.txt:5:5-6:6");
// [{
//   "filepath": "./file.txt",
//   "positions": [
//     { "start": { "row": 1, "column": 1 }, "end": { "row": 2, "column": 2 } },
//     { "start": { "row": 3, "column": 3 }, "end": { "row": 4, "column": 4 } }
//   ]
// }, {
//   "filepath": "./file.txt",
//   "positions": [
//     { "start": { "row": 5, "column": 5 }, "end": { "row": 6, "column": 6 } }
//   ]
// }]

printSelections(parsed); // => "./file.txt:1:1-2:2,3:3-4:4;./file.txt:5:5-6:6"
```
