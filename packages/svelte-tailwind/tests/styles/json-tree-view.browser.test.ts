import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import JsonTree from '../../../svelte/tests/json-tree-view/JsonTree.svelte';

test('lets consumer Tailwind classes override conflicting root defaults', () => {
  render(JsonTree, { props: { class: 'w-1/2' } });

  const root = screen.getByRole('tree').parentElement;
  expect(root!.parentElement!.getBoundingClientRect().width).toBeGreaterThan(0);
  expect(
    root!.getBoundingClientRect().width / root!.parentElement!.getBoundingClientRect().width,
  ).toBeCloseTo(0.5, 2);
});