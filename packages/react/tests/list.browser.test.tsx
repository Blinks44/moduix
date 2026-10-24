import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { List, ListIndicator, ListItem } from '../src';

test('updates the semantic host when as changes', async () => {
  const { rerender } = render(<List as="ul">Tasks</List>);

  expect(screen.getByRole('list').tagName).toBe('UL');
  rerender(
    <List as="ol" start={3}>
      Tasks
    </List>,
  );
  expect(screen.getByRole('list').tagName).toBe('OL');
  await expect.element(page.getByRole('list')).toHaveAttribute('start', '3');
  await expect.element(page.getByRole('list')).toContainText('Tasks');
  rerender(<List as="ul">Tasks</List>);
  expect(screen.getByRole('list').tagName).toBe('UL');
});

test('renders semantic unordered-list defaults and forwards the item ref', () => {
  const ref = createRef<HTMLLIElement>();

  render(
    <List data-testid="list">
      <ListItem ref={ref}>Keep the item ref on its semantic host.</ListItem>
    </List>,
  );

  const list = screen.getByTestId('list');
  const item = screen.getByText('Keep the item ref on its semantic host.');

  expect(list.tagName).toBe('UL');

  expect(list.dataset).toMatchObject({ gap: 'sm', marker: 'disc', size: 'md', tone: 'default' });
  expect(ref.current).toBe(item);

  expect(item.dataset).toMatchObject({ scope: 'list', part: 'item', slot: 'list-item' });
});

test('renders semantic roots with stable hooks and native ordered-list props', async () => {
  const ref = createRef<HTMLOListElement>();

  render(
    <List ref={ref} as="ol" start={3} reversed data-testid="list">
      <ListItem>Prepare the release notes.</ListItem>
    </List>,
  );

  const list = screen.getByTestId('list');

  expect(ref.current).toBe(list);
  expect(list.tagName).toBe('OL');
  const listLocator = page.getByTestId('list');
  await expect.element(listLocator).toHaveAttribute('start', '3');
  await expect.element(listLocator).toHaveAttribute('reversed');
  expect(list.dataset).toMatchObject({ scope: 'list', part: 'root', slot: 'list-root' });
});

test('keeps markerless list semantics and supports custom semantic roots', async () => {
  const ref = createRef<HTMLUListElement>();

  render(
    <List asChild marker="none" ref={ref}>
      <ul aria-label="Release tasks">
        <ListItem>Publish the package.</ListItem>
      </ul>
    </List>,
  );

  const list = screen.getByRole('list', { name: 'Release tasks' });

  expect(ref.current).toBe(list);

  await expect
    .element(page.getByRole('list', { name: 'Release tasks' }))
    .toHaveAttribute('role', 'list');
  expect(list.dataset).toMatchObject({ marker: 'none', slot: 'list-root' });
  expect(screen.getByText('Publish the package.').getAttribute('data-slot')).toBe('list-item');
});
test('derives the default marker from the host and maps size, gap, and tone', () => {
  render(
    <>
      <List data-testid="ul">
        <ListItem>Disc</ListItem>
      </List>
      <List as="ol" data-testid="ol">
        <ListItem>Decimal</ListItem>
      </List>
      <List asChild marker="decimal" data-testid="child">
        <ol>
          <ListItem>Decimal</ListItem>
        </ol>
      </List>
      <List gap="lg" size="sm" tone="muted" marker="none" data-testid="custom">
        <ListItem>Muted</ListItem>
      </List>
    </>,
  );

  const ul = screen.getByTestId('ul');
  const ol = screen.getByTestId('ol');
  const child = screen.getByTestId('child');
  const custom = screen.getByTestId('custom');

  expect(ul.dataset.marker).toBe('disc');
  expect(getComputedStyle(ul)).toMatchObject({
    listStyleType: 'disc',
    paddingInlineStart: '20px',
    rowGap: '8px',
    fontSize: '16px',
  });
  expect(ol.dataset.marker).toBe('decimal');
  expect(getComputedStyle(ol).listStyleType).toBe('decimal');
  expect(child.tagName).toBe('OL');
  expect(getComputedStyle(child).listStyleType).toBe('decimal');
  expect(getComputedStyle(custom)).toMatchObject({
    listStyleType: 'none',
    paddingInlineStart: '0px',
    rowGap: '16px',
    fontSize: '14px',
  });
  expect(getComputedStyle(custom).color).not.toBe(getComputedStyle(ul).color);
});
test('spaces nested lists and lays out indicators', () => {
  render(
    <>
      <List gap="lg">
        <ListItem>
          Parent
          <List gap="lg" data-testid="nested">
            <ListItem>Child</ListItem>
          </List>
        </ListItem>
      </List>
      <List marker="none">
        <ListItem data-testid="indicator-item">
          <ListIndicator data-testid="indicator">
            <svg viewBox="0 0 16 16" aria-hidden="true" />
          </ListIndicator>
          Done
        </ListItem>
      </List>
    </>,
  );
  const nested = screen.getByTestId('nested');
  const indicatorItem = screen.getByTestId('indicator-item');
  const indicator = screen.getByTestId('indicator');
  const icon = indicator.querySelector('svg')!;
  expect(getComputedStyle(nested).marginBlockStart).toBe('16px');
  expect(getComputedStyle(indicatorItem)).toMatchObject({
    display: 'flex',
    alignItems: 'flex-start',
  });
  expect(indicator.dataset).toMatchObject({
    scope: 'list',
    part: 'indicator',
    slot: 'list-indicator',
  });
  expect(getComputedStyle(indicator)).toMatchObject({ marginInlineEnd: '8px', minHeight: '24px' });
  expect(icon.getBoundingClientRect().width).toBe(16);
});