import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
// The shared harness resolves `@/` to this package's source.
import ItemsList from '../../../svelte/tests/list/ItemsList.svelte';
import ListRefs from './ListRefs.svelte';

test('renders semantic unordered-list defaults and forwards Svelte refs and attrs', () => {
  const { component } = render(ListRefs);

  const list = screen.getByTestId('list');
  const item = screen.getByText('Keep the item ref on its semantic host.');
  const refs = component.getRefs();

  expect(list.tagName).toBe('UL');

  expect(list.dataset).toMatchObject({ gap: 'sm', marker: 'disc', size: 'md', tone: 'default' });
  expect(refs.rootRef).toBe(list);
  expect(refs.itemRef).toBe(item);

  expect(item.dataset).toMatchObject({ scope: 'list', part: 'item', slot: 'list-item' });
});

test('lets consumer utilities override conflicting defaults', () => {
  render(ItemsList, { props: { class: 'gap-6 ps-0 text-lg text-primary', 'data-testid': 'list' } });

  const list = screen.getByTestId('list');
  expect([...list.classList]).toEqual(
    expect.arrayContaining(['gap-6', 'ps-0', 'text-lg', 'text-primary']),
  );
  expect(getComputedStyle(list)).toMatchObject({
    rowGap: '24px',
    paddingInlineStart: '0px',
    fontSize: '18px',
  });
});