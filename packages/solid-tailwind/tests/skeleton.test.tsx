import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { Skeleton } from '../src';

test('exports a flat root without compound aliases', () => {
  expect(Skeleton).not.toHaveProperty('Root');
});

test('owns stable loading hooks even when passthrough props provide conflicting values', () => {
  render(() => (
    <Skeleton
      data-testid="skeleton"
      data-part="custom"
      data-slot="custom"
      data-state="loaded"
      data-variant="none"
    />
  ));
  const skeleton = screen.getByTestId('skeleton');

  expect(skeleton).toHaveAttribute('aria-hidden', 'true');
  expect(skeleton).toHaveAttribute('data-scope', 'skeleton');
  expect(skeleton).toHaveAttribute('data-part', 'root');
  expect(skeleton).toHaveAttribute('data-slot', 'skeleton-root');
  expect(skeleton).toHaveAttribute('data-state', 'loading');
  expect(skeleton).toHaveAttribute('data-loading');
  expect(skeleton).toHaveAttribute('data-variant', 'pulse');
});

test('preserves an explicit accessibility override and the static variant', () => {
  render(() => <Skeleton aria-hidden={false} data-testid="skeleton" variant="none" />);
  const skeleton = screen.getByTestId('skeleton');

  expect(skeleton).toHaveAttribute('aria-hidden', 'false');
  expect(skeleton).toHaveAttribute('data-state', 'loading');
  expect(skeleton).toHaveAttribute('data-loading');
  expect(skeleton).toHaveAttribute('data-variant', 'none');
});

test('reveals content and preserves the custom host when loading finishes', () => {
  render(() => (
    <Skeleton asChild={(props) => <section {...props()} aria-label="Profile" />} loading={false} />
  ));
  const skeleton = screen.getByRole('region', { name: 'Profile' });

  expect(skeleton).not.toHaveAttribute('aria-hidden');
  expect(skeleton).toHaveAttribute('data-state', 'loaded');
  expect(skeleton).not.toHaveAttribute('data-loading');
  expect(skeleton).toHaveAttribute('data-slot', 'skeleton-root');
});

test('forwards refs through the ordinary Ark Solid root path', () => {
  let ref!: HTMLDivElement;

  render(() => <Skeleton ref={(element) => (ref = element)} data-testid="skeleton" />);

  expect(ref).toBe(screen.getByTestId('skeleton'));
});

test('does not forward refs through native Ark Solid asChild composition', () => {
  let ref: HTMLDivElement | undefined;

  render(() => (
    <Skeleton
      ref={(element) => (ref = element)}
      asChild={(props) => <section {...props()} aria-label="Profile" />}
    />
  ));

  expect(ref).toBeUndefined();
});

test('converts numeric dimensions to CSS pixels', () => {
  render(() => <Skeleton data-testid="skeleton" boxSize={48} borderRadius={8} />);
  const skeleton = screen.getByTestId('skeleton');

  expect(skeleton).toHaveStyle({
    borderRadius: '8px',
    height: '48px',
    width: '48px',
  });
});

test('lets style override generated dimensions', () => {
  render(() => (
    <Skeleton
      data-testid="skeleton"
      boxSize={48}
      borderRadius={8}
      style={{ width: '20px', height: '30px', 'border-radius': '12px' }}
    />
  ));
  const skeleton = screen.getByTestId('skeleton');

  expect(skeleton).toHaveStyle({
    borderRadius: '12px',
    height: '30px',
    width: '20px',
  });
});

test('applies the empty visual root utilities', () => {
  render(() => <Skeleton data-testid="skeleton" />);
  const skeleton = screen.getByTestId('skeleton');

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
  render(() => (
    <Skeleton data-testid="skeleton" class="h-8 w-1/2 animate-none rounded-lg bg-primary" />
  ));
  const skeleton = screen.getByTestId('skeleton');

  expect(skeleton).toHaveClass('h-8', 'w-1/2', 'rounded-lg', 'bg-primary', 'animate-none');
  expect(skeleton).not.toHaveClass('h-4', 'w-full', 'rounded-md', 'bg-muted-foreground/18');
});
