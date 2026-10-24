import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { JsonTreeView, JsonTreeViewTree } from '../src';

const data = {
  release: {
    status: 'ready',
    version: '2.3.0',
  },
};

const wrappedData = { checks: ['accessibility', 'visual-regression', 'type-check'] };

test('renders a styled Ark tree with the generated JSON nodes', async () => {
  render(
    <JsonTreeView data={data} defaultExpandedDepth={1}>
      <JsonTreeViewTree />
    </JsonTreeView>,
  );

  const tree = screen.getByRole('tree');
  const rootBranch = screen.getAllByRole('button')[0];

  await expect.element(page.getByRole('tree')).toHaveAttribute('data-slot', 'json-tree-view-tree');
  expect(tree.parentElement!.getAttribute('data-slot')).toBe('json-tree-view-root');
  expect(rootBranch.querySelector('svg')).not.toBeNull();

  await page.getByRole('button').nth(0).click();

  await expect.element(page.getByRole('button').nth(0)).toHaveAttribute('data-state', 'closed');
});

test('lets consumer Tailwind classes override conflicting root defaults', () => {
  render(
    <JsonTreeView data={data} className="w-1/2">
      <JsonTreeViewTree />
    </JsonTreeView>,
  );

  const root = screen.getByRole('tree').parentElement;

  expect([...root!.classList]).toEqual(expect.arrayContaining(['w-1/2']));
  expect(root!.classList.contains('w-full')).toBe(false);
  expect(root!.parentElement!.getBoundingClientRect().width).toBeGreaterThan(0);
  expect(
    root!.getBoundingClientRect().width / root!.parentElement!.getBoundingClientRect().width,
  ).toBeCloseTo(0.5, 2);
});

test('keeps the branch indicator on the first line of a wrapped preview and lets values be copied', async () => {
  render(
    <div style={{ width: '160px' }}>
      <JsonTreeView data={wrappedData}>
        <JsonTreeViewTree />
      </JsonTreeView>
    </div>,
  );

  await expect.element(page.getByRole('tree')).toBeVisible();

  const control = document.querySelector<HTMLElement>('[data-part="branch-control"]')!;
  const text = document.querySelector<HTMLElement>('[data-part="branch-text"]')!;
  const indicator = document
    .querySelector('[data-part="branch-indicator"]')!
    .getBoundingClientRect();
  const lineHeight = parseFloat(getComputedStyle(text).lineHeight);
  const textTop = text.getBoundingClientRect().top;

  expect(text.getBoundingClientRect().height).toBeGreaterThan(lineHeight * 1.5);
  expect(
    Math.abs(indicator.top + indicator.height / 2 - (textTop + lineHeight / 2)),
  ).toBeLessThanOrEqual(1);
  expect(getComputedStyle(control).userSelect).not.toBe('none');
});