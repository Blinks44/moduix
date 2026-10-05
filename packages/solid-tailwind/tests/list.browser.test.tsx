import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { List, ListItem } from '../src';

test.each(['ul', 'ol'] as const)('updates %s markers without replacing the host', async (as) => {
  const [marker, setMarker] = createSignal<'none' | 'disc'>('none');
  render(() => (
    <List as={as} marker={marker()} data-testid="list">
      Tasks
    </List>
  ));

  const list = screen.getByTestId('list');
  await expect.element(page.getByTestId('list')).toHaveAttribute('role', 'list');
  expect(list.getAttribute('data-marker')).toBe('none');
  setMarker('disc');
  expect(screen.getByTestId('list')).toBe(list);
  expect(list.getAttribute('data-marker')).toBe('disc');
  await expect.element(page.getByTestId('list')).not.toHaveAttribute('role');
  setMarker('none');
  await expect.element(page.getByTestId('list')).toHaveAttribute('role', 'list');
  expect(list.getAttribute('data-marker')).toBe('none');
});

test('preserves an explicit role when the marker changes', async () => {
  const [marker, setMarker] = createSignal<'none' | 'disc'>('none');
  render(() => (
    <List marker={marker()} role="group" data-testid="list">
      Tasks
    </List>
  ));
  setMarker('disc');
  await expect.element(page.getByTestId('list')).toHaveAttribute('role', 'group');
});

test('updates the semantic host when as changes', async () => {
  const [ordered, setOrdered] = createSignal(false);
  render(() => (
    <List {...(ordered() ? { as: 'ol' as const, start: 3 } : { as: 'ul' as const })}>Tasks</List>
  ));

  expect(screen.getByRole('list').tagName).toBe('UL');
  setOrdered(true);
  expect(screen.getByRole('list').tagName).toBe('OL');
  await expect.element(page.getByRole('list')).toHaveAttribute('start', '3');
  await expect.element(page.getByRole('list')).toContainText('Tasks');
  setOrdered(false);
  expect(screen.getByRole('list').tagName).toBe('UL');
});

test('renders semantic unordered-list defaults and forwards the item ref', () => {
  let ref!: HTMLLIElement;

  render(() => (
    <List data-testid="list">
      <ListItem ref={(element) => (ref = element)}>
        Keep the item ref on its semantic host.
      </ListItem>
    </List>
  ));

  const list = screen.getByTestId('list');
  const item = screen.getByText('Keep the item ref on its semantic host.');

  expect(list.tagName).toBe('UL');

  expect(list.dataset).toMatchObject({ gap: 'sm', marker: 'auto', size: 'md', tone: 'default' });
  expect([...list.classList]).toEqual(
    expect.arrayContaining([
      'flex',
      'flex-col',
      'gap-space-sm',
      'list-disc',
      'list-outside',
      'ps-5',
      'text-md',
      'text-foreground',
    ]),
  );
  expect(ref).toBe(item);

  expect(item.dataset).toMatchObject({ scope: 'list', part: 'item', slot: 'list-item' });
});

test('renders semantic roots with stable hooks and native ordered-list props', async () => {
  let ref!: HTMLOListElement;

  render(() => (
    <List ref={(element) => (ref = element)} as="ol" start={3} type="A" data-testid="list">
      <ListItem>Prepare the release notes.</ListItem>
    </List>
  ));

  const list = screen.getByTestId('list');

  expect(ref).toBe(list);
  expect(list.tagName).toBe('OL');
  const listLocator = page.getByTestId('list');
  await expect.element(listLocator).toHaveAttribute('start', '3');
  await expect.element(listLocator).toHaveAttribute('type', 'A');
  expect(list.dataset).toMatchObject({ scope: 'list', part: 'root', slot: 'list-root' });
  expect([...list!.classList]).toEqual(expect.arrayContaining(['list-[revert]', 'ps-5']));
});

test('keeps markerless list semantics and supports custom semantic roots', async () => {
  let ref!: HTMLUListElement;

  render(() => (
    <List
      asChild={(props) => (
        <ul {...props()} aria-label="Release tasks">
          <ListItem>Publish the package.</ListItem>
        </ul>
      )}
      marker="none"
      ref={(element) => (ref = element)}
    />
  ));

  const list = screen.getByRole('list', { name: 'Release tasks' });

  expect(ref).toBeUndefined();

  await expect
    .element(page.getByRole('list', { name: 'Release tasks' }))
    .toHaveAttribute('role', 'list');
  expect(list.dataset).toMatchObject({ marker: 'none', slot: 'list-root' });
  expect(list?.classList.contains('list-none')).toBe(true);
  expect(screen.getByText('Publish the package.').getAttribute('data-slot')).toBe('list-item');
});

test('lets consumer utilities override conflicting defaults', () => {
  render(() => (
    <List class="gap-6 ps-0 text-lg text-primary" data-testid="list">
      <ListItem>Ready</ListItem>
    </List>
  ));

  const list = screen.getByTestId('list');
  expect([...list.classList]).toEqual(
    expect.arrayContaining(['gap-6', 'ps-0', 'text-lg', 'text-primary']),
  );
  for (const utility of ['gap-space-sm', 'ps-5', 'text-md', 'text-foreground']) {
    expect(list.classList.contains(utility)).toBe(false);
  }
  expect(getComputedStyle(list)).toMatchObject({
    rowGap: '24px',
    paddingInlineStart: '0px',
    fontSize: '18px',
  });
});