import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import AsChildList from './list/AsChildList.svelte';
import DynamicList from './list/DynamicList.svelte';
import ItemsList from './list/ItemsList.svelte';

test.each([false, true])(
  'keeps the host and ref stable between semantic changes, asChild=%s',
  async (asChild) => {
    const { component, rerender } = render(DynamicList, {
      props: { asChild, title: 'Initial', 'data-testid': 'root' },
    });
    for (const as of ['ul', 'ol'] as const) {
      await rerender({ as });
      const host = screen.getByTestId('root');
      expect(host.tagName).toBe(asChild ? 'UL' : as.toUpperCase());
      expect(component.getRef()).toBe(host);
      await rerender({ title: as });
      expect(screen.getByTestId('root')).toBe(host);
      expect(component.getRef()).toBe(host);
      await expect.element(page.getByTestId('root')).toHaveAttribute('title', as);
      await expect.element(page.getByTestId('root')).toContainText('Content');
    }
    await rerender({ as: undefined });
    expect(screen.getByTestId('root').tagName).toBe('UL');
  },
);

test('updates the semantic host when as changes', async () => {
  const { rerender } = render(DynamicList, { props: { as: 'ul', label: 'Tasks' } });

  expect(screen.getByRole('list').tagName).toBe('UL');
  await rerender({ as: 'ol', start: 3 });

  await expect.poll(() => screen.getByRole('list').tagName).toBe('OL');
  await expect.element(page.getByRole('list')).toHaveAttribute('start', '3');
  await expect.element(page.getByRole('list')).toContainText('Tasks');
});

test('renders semantic roots with stable hooks and native ordered-list props', async () => {
  const { component } = render(ItemsList, {
    props: { as: 'ol', start: 3, reversed: true, 'data-testid': 'list' },
  });

  const list = screen.getByTestId('list');

  expect(component.getRef()).toBe(list);
  expect(list.tagName).toBe('OL');
  const listLocator = page.getByTestId('list');
  await expect.element(listLocator).toHaveAttribute('start', '3');
  await expect.element(listLocator).toHaveAttribute('reversed');
  expect(list.dataset).toMatchObject({ scope: 'list', part: 'root', slot: 'list-root' });
});

test('keeps markerless list semantics and supports custom semantic roots', async () => {
  const { component } = render(AsChildList);

  const list = screen.getByRole('list', { name: 'Release tasks' });

  expect(component.getRef()).toBe(list);

  await expect
    .element(page.getByRole('list', { name: 'Release tasks' }))
    .toHaveAttribute('role', 'list');
  expect(list.dataset).toMatchObject({ marker: 'none', slot: 'list-root' });
  expect(screen.getByText('Publish the package.').getAttribute('data-slot')).toBe('list-item');
});

test('forwards native item listeners through the Ark factory', async () => {
  let clicks = 0;

  render(ItemsList, { props: { onItemClick: () => clicks++ } });
  await page.getByText('Prepare the release notes.').click();

  expect(clicks).toBe(1);
});