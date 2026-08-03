import { expect, rs, test } from '@rstest/core';
import { fireEvent, render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Tag } from '../src';

test('renders the Tag anatomy with stable data hooks and a forwarded ref', () => {
  const ref = createRef<HTMLSpanElement>();

  render(
    <Tag ref={ref} data-testid="tag" size="sm" variant="secondary">
      <Tag.StartElement data-testid="tag-start">+</Tag.StartElement>
      <Tag.Label data-testid="tag-label">TypeScript</Tag.Label>
      <Tag.EndElement data-testid="tag-end">Updated</Tag.EndElement>
    </Tag>,
  );

  const tag = screen.getByTestId('tag');

  expect(ref.current).toBe(tag);
  expect(tag.tagName).toBe('SPAN');
  expect(tag).toHaveAttribute('data-scope', 'tag');
  expect(tag).toHaveAttribute('data-part', 'root');
  expect(tag).toHaveAttribute('data-slot', 'tag-root');
  expect(tag).toHaveAttribute('data-size', 'sm');
  expect(tag).toHaveAttribute('data-variant', 'secondary');
  expect(screen.getByTestId('tag-start')).toHaveAttribute('data-slot', 'tag-start-element');
  expect(screen.getByTestId('tag-label')).toHaveAttribute('data-slot', 'tag-label');
  expect(screen.getByTestId('tag-end')).toHaveAttribute('data-slot', 'tag-end-element');
});

test('uses an accessible close button and prevents disabled activation', () => {
  const handleClick = rs.fn();
  const { rerender } = render(<Tag.CloseTrigger data-testid="close" onClick={handleClick} />);

  const close = screen.getByTestId('close');

  expect(close).toHaveAttribute('type', 'button');
  expect(close).toHaveAccessibleName('Remove tag');
  expect(close.querySelector('svg')).not.toBeNull();
  expect(close).toHaveAttribute('data-scope', 'tag');
  expect(close).toHaveAttribute('data-part', 'close-trigger');
  expect(close).toHaveAttribute('data-slot', 'tag-close-trigger');

  fireEvent.click(close);
  expect(handleClick).toHaveBeenCalledTimes(1);

  rerender(<Tag.CloseTrigger aria-disabled="true" onClick={handleClick} />);

  const disabledClose = screen.getByRole('button', { name: 'Remove tag' });

  expect(disabledClose).toHaveAttribute('data-disabled');
  expect(fireEvent.click(disabledClose)).toBe(false);
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test('preserves semantic custom hosts with asChild', () => {
  const ref = createRef<HTMLAnchorElement>();

  render(
    <Tag ref={ref} asChild variant="outline">
      <a href="#filters">Open filters</a>
    </Tag>,
  );

  const link = screen.getByRole('link', { name: 'Open filters' });

  expect(ref.current).toBe(link);
  expect(link).toHaveAttribute('href', '#filters');
  expect(link).toHaveAttribute('data-slot', 'tag-root');
  expect(link).toHaveAttribute('data-variant', 'outline');
});