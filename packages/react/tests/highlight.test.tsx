import { expect, test } from '@rstest/core';
import { renderToString } from 'react-dom/server';
import { Highlight } from '../src';

// Runs in Node: React 18 in a development browser re-dispatches render errors as uncaught.
test('rejects string-array queries when matchAll is false', () => {
  expect(() =>
    renderToString(<Highlight matchAll={false} query={['React', 'Vue']} text="React Vue" />),
  ).toThrow('matchAll must be true when using multiple queries');
});