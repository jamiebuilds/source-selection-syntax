// @flow
'use strict';
const test = require('ava');
const { parseSelections, printSelections } = require('./');
const examples = require('./examples.json');

function macro(t, input, result) {
  let parsed = parseSelections(input);
  let printed = printSelections(parsed);
  t.deepEqual(parsed, result);
  t.is(printed, input);
}

for (let input of Object.keys(examples)) {
  test(input, macro, input, examples[input]);
}
