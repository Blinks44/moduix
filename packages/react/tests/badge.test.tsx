import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Badge } from '../src';

test('applies variants and stable data hooks', () => {
  render(
    <Badge variant="secondary" data-testid="badge">
      <Badge.Dot data-testid="dot" />
      Draft
    </Badge>,
  );

  const badge = screen.getByTestId('badge');
  const dot = screen.getByTestId('dot');

  expect(badge.tagName).toBe('SPAN');
  expect(badge).toHaveAttribute('data-scope', 'badge');
  expect(badge).toHaveAttribute('data-part', 'root');
  expect(badge).toHaveAttribute('data-slot', 'badge-root');
  expect(badge).toHaveAttribute('data-variant', 'secondary');
  expect(dot).toHaveAttribute('data-part', 'dot');
  expect(dot).toHaveAttribute('data-slot', 'badge-dot');
  expect(dot).toHaveAttribute('aria-hidden', 'true');
});

test('preserves semantic children and refs with asChild', () => {
  const ref = createRef<HTMLAnchorElement>();

  render(
    <Badge ref={ref} asChild variant="link">
      <a href="#styling">Badge styling guidance</a>
    </Badge>,
  );

  const link = screen.getByRole('link', { name: 'Badge styling guidance' });

  expect(ref.current).toBe(link);
  expect(link).toHaveAttribute('href', '#styling');
  expect(link).toHaveAttribute('data-slot', 'badge-root');
  expect(link).toHaveAttribute('data-variant', 'link');
});

test('wraps direct text so long labels can truncate', () => {
  const { getByTestId } = render(
    <Badge className="constrained" data-testid="badge">
      Ready for stakeholder review after legal approval
    </Badge>,
  );
  const badge = getByTestId('badge');

  expect(badge.firstElementChild?.tagName).toBe('SPAN');
  expect(badge.firstElementChild).toHaveTextContent(
    'Ready for stakeholder review after legal approval',
  );
});