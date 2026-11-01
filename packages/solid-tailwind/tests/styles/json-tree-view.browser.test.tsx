import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { JsonTreeView, JsonTreeViewTree } from '@/index';

const data = {
  release: {
    status: 'ready',
    version: '2.3.0',
  },
};

test('lets consumer Tailwind classes override conflicting root defaults', () => {
  render(() => (
    <JsonTreeView data={data} class="w-1/2">
      <JsonTreeViewTree />
    </JsonTreeView>
  ));

  const root = screen.getByRole('tree').parentElement;

  expect([...root!.classList]).toEqual(expect.arrayContaining(['w-1/2']));
  expect(root!.parentElement!.getBoundingClientRect().width).toBeGreaterThan(0);
  expect(
    root!.getBoundingClientRect().width / root!.parentElement!.getBoundingClientRect().width,
  ).toBeCloseTo(0.5, 2);
});