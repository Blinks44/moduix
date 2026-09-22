import { expect, test } from '@rstest/core';
import { render } from '@testing-library/react';
import { createRef } from 'react';
import { Skeleton } from '../src';

test('exports a flat root without compound aliases', () => {
  expect(Skeleton).not.toHaveProperty('Root');
});

test('owns stable loading hooks even when passthrough props provide conflicting values', () => {
  const { getByTestId } = render(
    <Skeleton
      data-testid="skeleton"
      data-part="custom"
      data-slot="custom"
      data-state="loaded"
      data-variant="none"
    />,
  );
  const skeleton = getByTestId('skeleton');

  expect(skeleton).toHaveAttribute('aria-hidden', 'true');
  expect(skeleton).toHaveAttribute('data-scope', 'skeleton');
  expect(skeleton).toHaveAttribute('data-part', 'root');
  expect(skeleton).toHaveAttribute('data-slot', 'skeleton-root');
  expect(skeleton).toHaveAttribute('data-state', 'loading');
  expect(skeleton).toHaveAttribute('data-loading');
  expect(skeleton).toHaveAttribute('data-variant', 'pulse');
});

test('preserves an explicit accessibility override and the static variant', () => {
  const { getByTestId } = render(
    <Skeleton aria-hidden={false} data-testid="skeleton" variant="none" />,
  );
  const skeleton = getByTestId('skeleton');

  expect(skeleton).toHaveAttribute('aria-hidden', 'false');
  expect(skeleton).toHaveAttribute('data-state', 'loading');
  expect(skeleton).toHaveAttribute('data-loading');
  expect(skeleton).toHaveAttribute('data-variant', 'none');
});

test('reveals content and preserves the custom host when loading finishes', () => {
  const ref = createRef<HTMLDivElement>();
  const { getByRole } = render(
    <Skeleton asChild loading={false} ref={ref}>
      <section aria-label="Profile" />
    </Skeleton>,
  );
  const skeleton = getByRole('region', { name: 'Profile' });

  expect(ref.current).toBe(skeleton);
  expect(skeleton).not.toHaveAttribute('aria-hidden');
  expect(skeleton).toHaveAttribute('data-state', 'loaded');
  expect(skeleton).not.toHaveAttribute('data-loading');
  expect(skeleton).toHaveAttribute('data-slot', 'skeleton-root');
});

test('converts numeric dimensions to CSS pixels', () => {
  const { getByTestId } = render(<Skeleton data-testid="skeleton" boxSize={48} borderRadius={8} />);
  const skeleton = getByTestId('skeleton');

  expect(skeleton).toHaveStyle({
    borderRadius: '8px',
    height: '48px',
    width: '48px',
  });
});

test('lets style override generated dimensions', () => {
  const { getByTestId } = render(
    <Skeleton
      data-testid="skeleton"
      boxSize={48}
      borderRadius={8}
      style={{ width: '20px', height: '30px', borderRadius: '12px' }}
    />,
  );
  const skeleton = getByTestId('skeleton');

  expect(skeleton).toHaveStyle({
    borderRadius: '12px',
    height: '30px',
    width: '20px',
  });
});

test('applies the empty visual root utilities', () => {
  const { getByTestId } = render(<Skeleton data-testid="skeleton" />);
  const skeleton = getByTestId('skeleton');

  expect(skeleton).toHaveClass(
    'block',
    'w-full',
    'overflow-hidden',
    'rounded-md',
    'h-4',
    'bg-muted-foreground/18',
    'animate-[moduix-pulse_2.5s_ease-in-out_infinite]',
  );
});

test('lets consumer utilities override loading defaults', () => {
  const { getByTestId } = render(
    <Skeleton data-testid="skeleton" className="h-8 w-1/2 animate-none rounded-lg bg-primary" />,
  );
  const skeleton = getByTestId('skeleton');

  expect(skeleton).toHaveClass('h-8', 'w-1/2', 'rounded-lg', 'bg-primary', 'animate-none');
  expect(skeleton).not.toHaveClass('h-4', 'w-full', 'rounded-md', 'bg-muted-foreground/18');
});
