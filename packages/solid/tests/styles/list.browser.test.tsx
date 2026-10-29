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

  expect(ref).toBeUndefined();

  await expect
    .element(page.getByRole('list', { name: 'Release tasks' }))
    .toHaveAttribute('role', 'list');
  expect(screen.getByRole('list', { name: 'Release tasks' }).dataset).toMatchObject({
    marker: 'none',
    slot: 'list-root',
  });
  expect(screen.getByText('Publish the package.').getAttribute('data-slot')).toBe('list-item');
});