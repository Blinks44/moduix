import { page } from '@rstest/browser';
import { expect, rs, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Tag, TagCloseTrigger, TagEndElement, TagLabel, TagStartElement } from '../src';

test('renders the Tag anatomy with stable data hooks and a forwarded ref', () => {
  const ref = createRef<HTMLSpanElement>();

  render(
    <Tag ref={ref} data-testid="tag" size="sm" variant="secondary">
      <TagStartElement data-testid="tag-start">+</TagStartElement>
      <TagLabel data-testid="tag-label">TypeScript</TagLabel>
      <TagEndElement data-testid="tag-end">Updated</TagEndElement>
    </Tag>,
  );

  const tag = screen.getByTestId('tag');

  expect(ref.current).toBe(tag);
  expect(tag.tagName).toBe('SPAN');
  expect(tag.dataset).toMatchObject({
    scope: 'tag',
    part: 'root',
    slot: 'tag-root',
    size: 'sm',
    variant: 'secondary',
  });
  expect(screen.getByTestId('tag-start').getAttribute('data-slot')).toBe('tag-start-element');
  expect(screen.getByTestId('tag-label').getAttribute('data-slot')).toBe('tag-label');
  expect(screen.getByTestId('tag-end').getAttribute('data-slot')).toBe('tag-end-element');
});

test('applies the documented root defaults', () => {
  render(
    <Tag data-testid="tag">
      <TagLabel>TypeScript</TagLabel>
    </Tag>,
  );

  const tag = screen.getByTestId('tag');

  expect(tag.dataset).toMatchObject({ size: 'md', variant: 'default' });
});

test('uses an accessible close button and prevents disabled activation', async () => {
  const handleClick = rs.fn();
  const { rerender } = render(<TagCloseTrigger data-testid="close" onClick={handleClick} />);

  const close = screen.getByTestId('close');

  await expect.element(page.getByTestId('close')).toHaveAttribute('type', 'button');
  expect(screen.getByRole('button', { name: 'Remove tag' })).toBe(close);
  expect(close.querySelector('svg')).not.toBeNull();
  expect(close.dataset).toMatchObject({
    scope: 'tag',
    part: 'close-trigger',
    slot: 'tag-close-trigger',
  });

  await page.getByTestId('close').click();
  expect(handleClick).toHaveBeenCalledTimes(1);

  rerender(<TagCloseTrigger aria-disabled="true" onClick={handleClick} />);

  const disabledClose = screen.getByRole('button', { name: 'Remove tag' });

  await expect
    .element(page.getByRole('button', { name: 'Remove tag' }))
    .toHaveAttribute('data-disabled');
  expect(
    disabledClose.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true })),
  ).toBe(false);
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test('preserves a semantic close trigger host with asChild', async () => {
  const ref = createRef<HTMLButtonElement>();

  render(
    <TagCloseTrigger ref={ref} asChild aria-label="Remove TypeScript tag">
      <button type="button" data-owner="consumer">
        <svg aria-hidden="true" />
      </button>
    </TagCloseTrigger>,
  );

  const close = screen.getByRole('button', { name: 'Remove TypeScript tag' });

  expect(ref.current).toBe(close);
  await expect
    .element(page.getByRole('button', { name: 'Remove TypeScript tag' }))
    .toHaveAttribute('type', 'button');
  expect(close.dataset).toMatchObject({ owner: 'consumer', slot: 'tag-close-trigger' });
});

test('preserves semantic custom hosts with asChild', async () => {
  const ref = createRef<HTMLAnchorElement>();

  render(
    <Tag ref={ref} asChild variant="outline">
      <a href="#filters">Open filters</a>
    </Tag>,
  );

  const link = screen.getByRole('link', { name: 'Open filters' });

  expect(ref.current).toBe(link);
  await expect
    .element(page.getByRole('link', { name: 'Open filters' }))
    .toHaveAttribute('href', '#filters');
  expect(link.dataset).toMatchObject({ slot: 'tag-root', variant: 'outline' });
});

test('lets consumer Tailwind classes override conflicting defaults', () => {
  render(
    <Tag className="gap-3 bg-card px-4 text-card-foreground" data-testid="tag">
      <TagLabel>TypeScript</TagLabel>
    </Tag>,
  );

  const tag = screen.getByTestId('tag');

  expect([...tag!.classList]).toEqual(
    expect.arrayContaining(['gap-3', 'px-4', 'bg-card', 'text-card-foreground']),
  );
  for (const utility of ['gap-1.5', 'px-2', 'bg-primary', 'text-primary-foreground']) {
    expect(tag!.classList.contains(utility)).toBe(false);
  }
});