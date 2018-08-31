// @flow
'use strict';

/*::
export type Location = {
  row?: number,
  column?: number,
};

export type Position = {
  start?: Location,
  end?: Location,
};

export type Positions = Array<Position>;

export type Selection = {
  filepath?: string,
  positions?: Positions,
};

export type Selections = Array<Selection>;
*/

function parseLocation(location /*: string */) /*: Location */ {
  let res = {};
  let [row, column] = location.split(':');
  if (row) res.row = parseInt(row);
  if (column) res.column = parseInt(column);
  return res;
}

function printLocation(location /*: Location */) /*: string */ {
  let str = '';
  if (location.row) str += location.row;
  if (location.column) str += ':' + location.column;
  return str;
}

function parsePosition(position /*: string */) /*: Position */ {
  let res = {};
  let [start, end] = position.split('-');
  if (start) res.start = parseLocation(start);
  if (end) res.end = parseLocation(end);
  return res;
}

function printPosition(position /*: Position */) /*: string */ {
  let str = '';
  if (position.start) str += printLocation(position.start);
  if (position.end) str += '-' + printLocation(position.end);
  return str;
}

function parsePositions(positions /*: string */) /*: Positions */ {
  return positions.split(',').map(parsePosition);
}

function printPositions(positions /*: Positions */) /*: string */ {
  return positions.map(printPosition).join(',');
}

function parseSelection(selection /*: string */) /*: Selection */ {
  let res = {};
  let filepath, positions;

  if (selection.startsWith('./') || selection.startsWith('/')) {
    [filepath, positions] = selection.split(/:(.*)/);
  } else {
    positions = selection;
  }

  if (filepath) res.filepath = filepath;
  if (positions) res.positions = parsePositions(positions);

  return res;
}

function printSelection(selection /*: Selection */) /*: string */ {
  let str = '';
  if (selection.filepath) str += selection.filepath;
  if (selection.filepath && selection.positions) str += ':';
  if (selection.positions) str += printPositions(selection.positions);
  return str;
}

function parseSelections(selections /*: string */) /*: Selections */ {
  return selections.split(';').map(parseSelection);
}

function printSelections(selections /*: Selections */) /*: string */ {
  return selections.map(printSelection).join(';');
}

module.exports = {
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
};
