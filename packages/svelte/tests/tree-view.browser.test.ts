import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import type {
  TreeViewRenameCompleteDetails,
  TreeViewRenameStartDetails,
} from '@/components/tree-view';
import CheckedTree from './tree-view/CheckedTree.svelte';
import DisabledTree from './tree-view/DisabledTree.svelte';
import ExpandedTree from './tree-view/ExpandedTree.svelte';
import { collection, type FileNode } from './tree-view/files';
import IndicatorTree from './tree-view/IndicatorTree.svelte';
import LazyErrorTree from './tree-view/LazyErrorTree.svelte';
import LazyTree from './tree-view/LazyTree.svelte';
import MixedTree from './tree-view/MixedTree.svelte';
import ModelTree from './tree-view/ModelTree.svelte';
import ProviderTree from './tree-view/ProviderTree.svelte';
import RenameTree from './tree-view/RenameTree.svelte';
import TestTree from './tree-view/TestTree.svelte';

test('preserves TreeView anatomy, labels, refs, attrs, and the Node convenience helper', async () => {
  const { component } = render(TestTree, {
    props: { defaultExpandedValue: ['src'], 'data-probe': 'root' },
  });

  const root = component.getRoot() as HTMLElement;

  expect(root.getAttribute('data-slot')).toBe('tree-view-root');
  expect(root.getAttribute('data-scope')).toBe('tree-view');
  expect(root.getAttribute('data-probe')).toBe('root');
  await expect
    .element(page.getByRole('tree', { name: 'Project files', exact: true }))
    .toHaveAttribute('data-slot', 'tree-view-tree');
  await expect
    .element(page.getByRole('button', { name: 'src', exact: true }))
    .toHaveAttribute('data-slot', 'tree-view-branch-control');
  await expect
    .element(page.getByRole('treeitem', { name: 'App.tsx', exact: true }))
    .toHaveAttribute('data-slot', 'tree-view-item');
});

test('wraps the checkbox indicator with its data-slot and consumer class', () => {
  render(IndicatorTree);

  const indicator = document.querySelector('[data-slot="tree-view-node-checkbox-indicator"]');

  expect(indicator?.tagName).toBe('SPAN');
  expect([...indicator!.classList]).toEqual(expect.arrayContaining(['indicator-class']));
});

test('keeps controlled expansion and Ark callback details available through callbacks', async () => {
  const events: string[][] = [];
  render(ExpandedTree, { props: { events } });

  await page.getByRole('button', { name: 'src', exact: true }).click();
  await expect.element(page.getByRole('treeitem', { name: 'App.tsx', exact: true })).toBeVisible();
  await expect.element(page.getByText('Expanded: src')).toBeAttached();
  expect(events).toEqual([['src']]);
});

test('preserves Ark keyboard expansion and roving focus', async () => {
  render(TestTree);

  const button = page.getByRole('button', { name: 'src', exact: true });
  await button.press('ArrowRight');

  await expect.element(button).toHaveAttribute('data-state', 'open');

  await button.press('ArrowDown');
  await expect.element(page.getByRole('treeitem', { name: 'App.tsx', exact: true })).toBeFocused();
});

test('preserves disabled node semantics', async () => {
  render(DisabledTree);

  await expect
    .element(page.getByRole('treeitem', { name: 'Archived files', exact: true }))
    .toHaveAttribute('data-disabled');
  // Dispatch checks the event guard; native clicks reject aria-disabled nodes.
  screen
    .getByRole('treeitem', { name: 'Archived files' })
    .dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
  await expect
    .element(page.getByRole('treeitem', { name: 'Archived files', exact: true }))
    .not.toHaveAttribute('data-selected');
});

test('keeps RootProvider, context boundaries, and semantic item composition available', async () => {
  const { component } = render(ProviderTree);
  const refs = component.getRefs();

  await expect
    .element(page.getByRole('tree', { name: 'Documentation', exact: true }))
    .toHaveAttribute('data-slot', 'tree-view-tree');
  const linkItem = screen.getByRole('treeitem', { name: 'README.md' });
  expect(linkItem.tagName).toBe('A');
  await expect
    .element(page.getByRole('treeitem', { name: 'README.md', exact: true }))
    .toHaveAttribute('href', '/docs');
  await expect
    .element(page.getByRole('treeitem', { name: 'README.md', exact: true }))
    .toHaveAttribute('data-slot', 'tree-view-item');
  expect(refs.item).toBe(linkItem);
  expect(refs.provider!.tagName).toBe('SECTION');
  expect(refs.provider!.getAttribute('data-probe')).toBe('provider-host');
  expect(refs.provider!.getAttribute('data-slot')).toBe('tree-view-root-provider');
});

test('keeps selection and focus models controlled with single native event delivery', async () => {
  const selectionChange = rs.fn();
  const focusChange = rs.fn();
  const { component } = render(ModelTree, { props: { selectionChange, focusChange } });

  await page.getByRole('treeitem', { name: 'README.md', exact: true }).click();
  await expect.poll(() => component.read().selectedValue).toEqual(['README.md']);
  await expect
    .element(page.getByRole('treeitem', { name: 'README.md', exact: true }))
    .toHaveAttribute('aria-selected', 'true');
  expect(selectionChange).toHaveBeenCalledTimes(1);
  expect(selectionChange.mock.calls[0]![0]).toMatchObject({
    selectedValue: ['README.md'],
    selectedNodes: [collection.rootNode.children![1]],
  });

  await expect.poll(() => component.read().focusedValue).toBe('README.md');
  expect(focusChange).toHaveBeenCalledTimes(1);
});

test('renders checked, mixed, and unchecked indicator slots as the controlled model changes', async () => {
  const checkedChange = rs.fn();
  const { component } = render(CheckedTree, { props: { checkedChange } });

  const rootLocator = page.getByRole('checkbox', { name: 'Check README', exact: true });
  await expect.element(rootLocator).toHaveAttribute('aria-checked', 'false');
  const textLocator = page.getByText('Unchecked icon');
  await expect.element(textLocator).toBeAttached();
  await rootLocator.click();
  await expect.poll(() => component.read()).toEqual(['README.md']);
  await expect.element(rootLocator).toHaveAttribute('aria-checked', 'true');
  await expect.element(page.getByText('Checked icon')).toBeAttached();
  await expect.element(textLocator).toHaveCount(0);
  expect(checkedChange).toHaveBeenCalledTimes(1);

  component.write([]);
  await expect.element(rootLocator).toHaveAttribute('aria-checked', 'false');
  await expect.element(textLocator).toBeAttached();
});

test('preserves the mixed-state slot and default mixed/check icons', async () => {
  const { rerender } = render(MixedTree, { props: { checkedValue: ['src/App.tsx'] } });

  await expect
    .element(page.getByRole('checkbox', { name: 'Check source', exact: true }))
    .toHaveAttribute('aria-checked', 'mixed');
  await expect.element(page.getByText('Mixed icon')).toBeAttached();
  expect(Boolean(screen.getByTestId('default-indicator').querySelector('svg')?.isConnected)).toBe(
    true,
  );
  await rerender({ checkedValue: ['src/App.tsx', 'src/main.tsx'] });
  await expect
    .element(page.getByRole('checkbox', { name: 'Check source', exact: true }))
    .toHaveAttribute('aria-checked', 'true');
  await expect.element(page.getByText('Mixed icon')).toHaveCount(0);
  expect(Boolean(screen.getByTestId('default-indicator').querySelector('svg')?.isConnected)).toBe(
    true,
  );
});

test('preserves rename input asChild refs, attrs, and native rename completion', async () => {
  const order: string[] = [];
  const renameStart = rs.fn((_details: TreeViewRenameStartDetails<FileNode>) =>
    order.push('start'),
  );
  const beforeRename = rs.fn((_details: TreeViewRenameCompleteDetails) => {
    order.push('before');
    return true;
  });
  const renameComplete = rs.fn((_details: TreeViewRenameCompleteDetails) => order.push('complete'));
  const { component } = render(RenameTree, {
    props: { renameStart, beforeRename, renameComplete },
  });

  await page.getByRole('treeitem', { name: 'README.md', exact: true }).press('F2');
  const input = screen.getByRole('textbox', { name: 'File name' });
  expect(component.getInput()).toBe(input);
  const inputLocator = page.getByRole('textbox', { name: 'File name', exact: true });
  await expect.element(inputLocator).toHaveAttribute('data-probe', 'rename');
  await expect.element(inputLocator).toHaveAttribute('data-slot', 'tree-view-node-rename-input');
  await expect.element(inputLocator).toBeFocused();
  await inputLocator.fill('GUIDE.md');
  await inputLocator.press('Enter');
  expect(renameComplete).toHaveBeenCalledTimes(1);
  expect(renameComplete.mock.calls[0]![0]).toMatchObject({ value: 'README.md', label: 'GUIDE.md' });
  expect(renameStart).toHaveBeenCalledTimes(1);
  expect(renameStart.mock.calls[0]![0]).toMatchObject({
    value: 'README.md',
    node: collection.rootNode.children![1],
    indexPath: [1],
  });
  expect(beforeRename).toHaveBeenCalledTimes(1);
  expect(beforeRename.mock.calls[0]![0]).toEqual(renameComplete.mock.calls[0]![0]);
  expect(order).toEqual(['start', 'before', 'complete']);
});

test('loads children through native events and a replaced shallow collection', async () => {
  const loadChildren = rs.fn(async (): Promise<FileNode[]> => [
    { id: 'src/App.tsx', name: 'App.tsx' },
  ]);
  const complete = rs.fn();
  const { component } = render(LazyTree, { props: { loadChildren, complete } });
  await page.getByRole('button', { name: 'src', exact: true }).click();
  await expect.element(page.getByRole('treeitem', { name: 'App.tsx', exact: true })).toBeVisible();
  expect(loadChildren).toHaveBeenCalledTimes(1);
  expect(complete).toHaveBeenCalledTimes(1);
  expect(component.getCollection().rootNode.children![0]!.children).toEqual([
    { id: 'src/App.tsx', name: 'App.tsx' },
  ]);
});

test('delivers native lazy-loading errors once without replacing the collection', async () => {
  const error = new Error('Cannot load files');
  const loadChildren = rs.fn().mockRejectedValue(error);
  const failed = rs.fn();
  const complete = rs.fn();
  const { component } = render(LazyErrorTree, { props: { loadChildren, failed, complete } });
  const lazyCollection = component.getCollection();

  await page.getByRole('button', { name: 'src', exact: true }).click();
  await expect.poll(() => failed).toHaveBeenCalledTimes(1);
  expect(failed.mock.calls[0]![0]).toMatchObject({
    nodes: [{ node: lazyCollection.rootNode.children![0], error, indexPath: [0] }],
  });
  expect(loadChildren).toHaveBeenCalledTimes(1);
  expect(complete).not.toHaveBeenCalled();
  expect(lazyCollection.rootNode.children![0]!.children).toBeUndefined();
});