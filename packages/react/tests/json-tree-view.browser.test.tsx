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

test('animates branch content with the shared collapsible keyframes', async () => {
  render(
    <JsonTreeView data={data}>
      <JsonTreeViewTree />
    </JsonTreeView>,
  );

  await page.getByRole('button').nth(0).click();

  await expect.element(page.getByRole('button').nth(0)).toHaveAttribute('data-state', 'open');
  const content = document.querySelector<HTMLElement>('[data-part="branch-content"]')!;
  expect(getComputedStyle(content).animationName).toBe('moduix-collapsible-content-open');

  await page.getByRole('button').nth(0).click();

  await expect.element(page.getByRole('button').nth(0)).toHaveAttribute('data-state', 'closed');
  expect(content.getAttribute('data-state')).toBe('closed');
  expect(getComputedStyle(content).animationName).toBe('moduix-collapsible-content-closed');
});