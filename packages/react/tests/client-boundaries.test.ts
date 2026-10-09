import { expect, test } from '@rstest/core';
import { readFileSync } from 'node:fs';

test.each([
  'button/Button',
  'close-button/CloseButton',
  'pagination/Pagination',
  'tags-input/TagsInput',
])('declares a client boundary for %s', (component) => {
  const source = readFileSync(`src/components/${component}.tsx`, 'utf8');

  expect(source.startsWith("'use client';")).toBe(true);
});