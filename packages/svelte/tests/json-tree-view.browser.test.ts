import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import AsChildJson from './json-tree-view/AsChildJson.svelte';
import CustomArrowJson from './json-tree-view/CustomArrowJson.svelte';
import GuideJson from './json-tree-view/GuideJson.svelte';
import HookJson from './json-tree-view/HookJson.svelte';
import IndentGuideJson from './json-tree-view/IndentGuideJson.svelte';
import JsonTree from './json-tree-view/JsonTree.svelte';
import ProviderJson from './json-tree-view/ProviderJson.svelte';
import ReplacedJson from './json-tree-view/ReplacedJson.svelte';
import SelectedJson from './json-tree-view/SelectedJson.svelte';

test('renders a styled Ark tree with generated JSON nodes and preserves attrs', async () => {
  render(JsonTree, { props: { defaultExpandedDepth: 1, 'data-probe': 'root' } });

  const rootBranch = screen.getAllByRole('button')[0]!;
  // Ark Svelte's JsonTreeViewRoot does not expose a bindable ref, so the host is read from the DOM.
  const root = screen.getByRole('tree').parentElement!;

  expect(root.getAttribute('data-slot')).toBe('json-tree-view-root');
  expect(root.getAttribute('data-scope')).toBe('json-tree-view');
  expect(root.getAttribute('data-probe')).toBe('root');
  await expect.element(page.getByRole('tree')).toHaveAttribute('data-slot', 'json-tree-view-tree');
  expect(rootBranch.querySelector('svg')).not.toBeNull();

  await page.getByRole('button').nth(0).click();

  await expect.element(page.getByRole('button').nth(0)).toHaveAttribute('data-state', 'closed');
});

test('supports the native Svelte arrow snippet while preserving Ark generated nodes', () => {
  render(CustomArrowJson);

  expect(screen.getAllByTestId('custom-arrow').length).toBeGreaterThan(0);
});

test('preserves semantic hosts with asChild', () => {
  render(AsChildJson);

  const root = screen.getByRole('tree').parentElement;
  expect(root!.getAttribute('data-slot')).toBe('json-tree-view-root');
  expect(root?.tagName).toBe('SECTION');
});

test('connects the provider store, native attrs and listeners', async () => {
  const handleClick = rs.fn();
  render(ProviderJson, { props: { handleClick } });
  const tree = screen.getByRole('tree');
  const root = tree.parentElement!;
  expect(root.getAttribute('data-slot')).toBe('json-tree-view-root-provider');
  expect(root.getAttribute('data-probe')).toBe('provider');

  await page.locator('[data-slot="json-tree-view-root-provider"]').click();
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test('forwards indent guides and value snippets without replacing generated nodes', async () => {
  render(GuideJson);
  expect(screen.getAllByTestId('guide').length).toBeGreaterThan(0);
  expect(screen.getAllByTestId('value').map((node) => node.textContent)).toContain('"ready"');
  await expect.element(page.getByRole('tree')).toHaveAttribute('data-scope', 'json-tree-view');
});

test.each([
  ['Ark', true],
  ['moduix', false],
])('%s renders built-in indentation guides when requested', (_name, ark) => {
  const { container } = render(IndentGuideJson, { props: { ark } });
  expect(container.querySelector('[data-part="branch-indent-guide"]')).not.toBeNull();
});

test('updates rendered nodes when data is replaced', async () => {
  const { rerender } = render(ReplacedJson, { props: { data: { status: 'before' } } });
  await expect.element(page.getByText('"before"', { exact: true })).toBeAttached();
  await rerender({ data: { status: 'after' } });
  await expect.element(page.getByText('"after"', { exact: true })).toBeAttached();
  await expect.element(page.getByText('"before"', { exact: true })).toHaveCount(0);
});

test('hook tracks replaced data and preview options', async () => {
  const { component } = render(HookJson);
  const initialCollection = component.read().collection;
  component.update();
  await expect.poll(() => component.read().collection).not.toBe(initialCollection);
  expect(component.read().options.maxPreviewItems).toBe(2);
});

test('forwards expansion events from the root', async () => {
  const handleExpandedChange = rs.fn();
  render(JsonTree, {
    props: { defaultExpandedDepth: 1, onExpandedChange: handleExpandedChange },
  });

  await page.getByRole('button').nth(0).click();
  await expect.element(page.getByRole('button').nth(0)).toHaveAttribute('data-state', 'closed');
  expect(handleExpandedChange).toHaveBeenCalledTimes(1);
});

test('reflects controlled selection updates in the DOM', async () => {
  const { component } = render(SelectedJson);
  const item = screen.getByRole('treeitem', { name: 'status: "ready"' });

  await page.getByRole('treeitem', { name: 'status: "ready"', exact: true }).click();
  await expect.poll(() => component.read()).toEqual([item.getAttribute('data-value')]);
  await expect
    .element(page.getByRole('treeitem', { name: 'status: "ready"', exact: true }))
    .toHaveAttribute('aria-selected', 'true');
});