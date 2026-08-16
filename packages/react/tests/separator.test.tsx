import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Separator } from '../src';

test('keeps ARIA metadata and stable data hooks aligned with public props', () => {
  render(
    <Separator
      aria-orientation="vertical"
      data-testid="separator"
      data-orientation="vertical"
      data-part="custom"
      data-scope="custom"
      data-size="xs"
      data-slot="custom"
      data-variant="solid"
      orientation="horizontal"
      size="lg"
      variant="dotted"
    />,
  );

  const separator = screen.getByTestId('separator');

  expect(separator).toHaveAttribute('role', 'separator');
  expect(separator).toHaveAttribute('aria-orientation', 'horizontal');
  expect(separator).toHaveAttribute('data-scope', 'separator');
  expect(separator).toHaveAttribute('data-part', 'root');
  expect(separator).toHaveAttribute('data-slot', 'separator-root');
  expect(separator).toHaveAttribute('data-orientation', 'horizontal');
  expect(separator).toHaveAttribute('data-size', 'lg');
  expect(separator).toHaveAttribute('data-variant', 'dotted');
});

test('applies the public defaults and direct styling props', () => {
  render(
    <Separator.Root
      data-testid="separator"
      className="custom-separator"
      style={{ color: 'red' }}
    />,
  );

  const separator = screen.getByTestId('separator');

  expect(separator).toHaveAttribute('role', 'separator');
  expect(separator).toHaveAttribute('aria-orientation', 'horizontal');
  expect(separator).toHaveAttribute('data-orientation', 'horizontal');
  expect(separator).toHaveAttribute('data-size', 'sm');
  expect(separator).toHaveAttribute('data-variant', 'solid');
  expect(separator).toHaveClass('custom-separator');
  expect(separator).toHaveStyle({ color: 'red' });
});

test('supports decorative separators and semantic asChild hosts', () => {
  const ref = createRef<HTMLSpanElement>();

  render(
    <>
      <Separator data-testid="decorative" role="presentation" aria-orientation="vertical" />
      <Separator ref={ref} asChild>
        <hr data-testid="native-rule" />
      </Separator>
    </>,
  );

  const decorative = screen.getByTestId('decorative');
  const nativeRule = screen.getByTestId('native-rule');

  expect(decorative).toHaveAttribute('role', 'presentation');
  expect(decorative).not.toHaveAttribute('aria-orientation');
  expect(ref.current).toBe(nativeRule);
  expect(nativeRule).toHaveAttribute('data-slot', 'separator-root');
});