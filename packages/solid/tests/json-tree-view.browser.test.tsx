import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { JsonTreeView, JsonTreeViewRootProvider, JsonTreeViewTree, useJsonTreeView } from '../src';

const data = {
  release: {
    status: 'ready',
    version: '2.3.0',
  },
};

const wrappedData = { checks: ['accessibility', 'visual-regression', 'type-check'] };

test('forwards provider props, refs and reactive classes to the existing root', () => {
  const [className, setClassName] = createSignal('consumer-before');
  let rootRef: HTMLDivElement | undefined;
  render(() => {
    const tree = useJsonTreeView({ data, defaultExpandedDepth: 1 });
    return (
      <JsonTreeViewRootProvider
        value={tree}
        class={className()}
        ref={(element) => (rootRef = element)}
        data-owner="consumer"
      >
        <JsonTreeViewTree />
      </JsonTreeViewRootProvider>
    );
  });

  const root = screen.getByRole('tree').parentElement!;
  expect(rootRef).toBe(root);
  expect(root!.getAttribute('data-owner')).toBe('consumer');
  expect(root!.getAttribute('data-slot')).toBe('json-tree-view-root-provider');
  expect([...root!.classList]).toEqual(expect.arrayContaining(['consumer-before']));
  setClassName('consumer-after');
  expect([...root!.classList]).toEqual(expect.arrayContaining(['consumer-after']));
  expect(root!.classList.contains('consumer-before')).toBe(false);
  expect(screen.getByRole('tree').parentElement).toBe(root);
});

test('renders a styled Ark tree with the generated JSON nodes', async () => {
  render(() => (
    <JsonTreeView data={data} defaultExpandedDepth={1}>
      <JsonTreeViewTree />
    </JsonTreeView>
  ));

  const tree = screen.getByRole('tree');
  const rootBranch = screen.getAllByRole('button')[0];

  await expect.element(page.getByRole('tree')).toHaveAttribute('data-slot', 'json-tree-view-tree');
  expect(tree.parentElement!.getAttribute('data-slot')).toBe('json-tree-view-root');
  expect(rootBranch.querySelector('svg')).not.toBeNull();

  await page.getByRole('button').nth(0).click();

  await expect.element(page.getByRole('button').nth(0)).toHaveAttribute('data-state', 'closed');
});

test('keeps the branch indicator on the first line of a wrapped preview and lets values be copied', async () => {
  render(() => (
    <div style={{ width: '160px' }}>
      <JsonTreeView data={wrappedData}>
        <JsonTreeViewTree />
      </JsonTreeView>
    </div>
  ));

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
  render(() => (
    <JsonTreeView data={data}>
      <JsonTreeViewTree />
    </JsonTreeView>
  ));

  await page.getByRole('button').nth(0).click();

  await expect.element(page.getByRole('button').nth(0)).toHaveAttribute('data-state', 'open');
  const content = document.querySelector<HTMLElement>('[data-part="branch-content"]')!;
  expect(getComputedStyle(content).animationName).toBe('moduix-collapsible-content-open');

  await page.getByRole('button').nth(0).click();

  await expect.element(page.getByRole('button').nth(0)).toHaveAttribute('data-state', 'closed');
  expect(content.getAttribute('data-state')).toBe('closed');
  expect(getComputedStyle(content).animationName).toBe('moduix-collapsible-content-closed');
});