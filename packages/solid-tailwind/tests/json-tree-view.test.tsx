import { expect, test } from '@rstest/core';
import { fireEvent, render, screen, waitFor } from '@solidjs/testing-library';
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
  expect(root).toHaveAttribute('data-owner', 'consumer');
  expect(root).toHaveAttribute('data-slot', 'json-tree-view-root-provider');
  expect(root).toHaveClass('consumer-before');
  setClassName('consumer-after');
  expect(root).toHaveClass('consumer-after');
  expect(root).not.toHaveClass('consumer-before');
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

  expect(tree).toHaveAttribute('data-slot', 'json-tree-view-tree');
  expect(tree.parentElement).toHaveAttribute('data-slot', 'json-tree-view-root');
  expect(rootBranch.querySelector('svg')).not.toBeNull();

  fireEvent.click(rootBranch);

  await waitFor(() => expect(rootBranch).toHaveAttribute('data-state', 'closed'));
});

test('lets consumer Tailwind classes override conflicting root defaults', () => {
  render(() => (
    <JsonTreeView data={data} class="w-1/2">
      <JsonTreeViewTree />
    </JsonTreeView>
  ));

  const root = screen.getByRole('tree').parentElement;

  expect(root).toHaveClass('w-1/2');
  expect(root).not.toHaveClass('w-full');
});