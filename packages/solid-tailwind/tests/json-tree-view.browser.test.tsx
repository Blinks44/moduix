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

test('lets consumer Tailwind classes override conflicting root defaults', () => {
  render(() => (
    <JsonTreeView data={data} class="w-1/2">
      <JsonTreeViewTree />
    </JsonTreeView>
  ));

  const root = screen.getByRole('tree').parentElement;

  expect([...root!.classList]).toEqual(expect.arrayContaining(['w-1/2']));
  expect(root!.classList.contains('w-full')).toBe(false);
  expect(root!.parentElement!.getBoundingClientRect().width).toBeGreaterThan(0);
  expect(
    root!.getBoundingClientRect().width / root!.parentElement!.getBoundingClientRect().width,
  ).toBeCloseTo(0.5, 2);
});