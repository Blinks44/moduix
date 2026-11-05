import { expect, test } from '@rstest/core';
import type { Component } from 'svelte';
import { render } from 'svelte/server';

const fixtures = import.meta.webpackContext('./fixtures', { regExp: /\.svelte$/ });
const keys = fixtures.keys();

test('runs without browser globals', () => {
  expect(typeof window).toBe('undefined');
  expect(typeof document).toBe('undefined');
});

// Every hydration fixture also renders on the server, so each component keeps a Node SSR check.
test.each(keys)('renders %s on the server', (key) => {
  const fixture = (fixtures(key) as { default: Component }).default;
  const { body } = render(fixture);

  expect(body).toContain('data-slot="');
});