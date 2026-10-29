import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { List, ListItem } from '@/index';

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
  expect(getComputedStyle(list)).toMatchObject({
    rowGap: '24px',
    paddingInlineStart: '0px',
    fontSize: '18px',
  });
});