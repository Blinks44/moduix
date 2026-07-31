import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Text } from '../src';

test('renders semantic defaults and stable data hooks', () => {
  render(
    <>
      <Text data-testid="default">Body copy</Text>
      <Text as="small" data-testid="small">
        Supporting copy
      </Text>
      <Text as="strong" data-testid="strong">
        Important copy
      </Text>
    </>,
  );

  const defaultText = screen.getByTestId('default');
  const small = screen.getByTestId('small');
  const strong = screen.getByTestId('strong');

  expect(defaultText.tagName).toBe('P');
  expect(defaultText).toHaveAttribute('data-scope', 'text');
  expect(defaultText).toHaveAttribute('data-part', 'root');
  expect(defaultText).toHaveAttribute('data-slot', 'text-root');
  expect(defaultText).toHaveAttribute('data-size', 'md');
  expect(defaultText).toHaveAttribute('data-weight', 'regular');
  expect(small).toHaveAttribute('data-size', 'sm');
  expect(strong).toHaveAttribute('data-weight', 'semibold');
});

test('preserves semantic children and refs with asChild', () => {
  const ref = createRef<HTMLAnchorElement>();

  render(
    <Text ref={ref} asChild tone="primary" weight="medium">
      <a href="#text">Read Text guidance</a>
    </Text>,
  );

  const link = screen.getByRole('link', { name: 'Read Text guidance' });

  expect(ref.current).toBe(link);
  expect(link).toHaveAttribute('href', '#text');
  expect(link).toHaveAttribute('data-slot', 'text-root');
  expect(link).toHaveAttribute('data-tone', 'primary');
  expect(link).toHaveAttribute('data-weight', 'medium');
});

test('uses only positive integer line-clamp values', () => {
  const { rerender } = render(<Text lineClamp={2}>Clamped copy</Text>);
  const text = screen.getByText('Clamped copy');

  expect(text).toHaveAttribute('data-line-clamp');
  expect(text).toHaveStyle({ '--moduix-text-line-clamp': '2' });

  rerender(<Text lineClamp={0}>Clamped copy</Text>);
  expect(text).not.toHaveAttribute('data-line-clamp');

  rerender(<Text lineClamp={1.5}>Clamped copy</Text>);
  expect(text).not.toHaveAttribute('data-line-clamp');
});