import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { Skeleton } from '../src';

test('owns stable loading hooks even when passthrough props provide conflicting values', async () => {
  expect(Skeleton).not.toHaveProperty('Root');
  let rootRef!: HTMLDivElement;
  render(() => (
    <Skeleton
      ref={(element) => (rootRef = element)}
      data-testid="skeleton"
      data-part="custom"
      data-slot="custom"
      data-state="loaded"
      data-variant="none"
    >
      <span>Loading profile</span>
    </Skeleton>
  ));
  await expect.element(page.getByTestId('skeleton')).toHaveCount(1);
  const skeleton = screen.getByTestId('skeleton');

  expect(skeleton.getAttribute('aria-hidden')).toBe('true');
  expect(skeleton.dataset).toMatchObject({
    scope: 'skeleton',
    part: 'root',
    slot: 'skeleton-root',
    state: 'loading',
  });
  expect(skeleton.hasAttribute('data-loading')).toBe(true);
  expect(skeleton.getAttribute('data-variant')).toBe('pulse');
  expect(rootRef).toBe(skeleton);
  await expect.element(page.getByTestId('skeleton')).toHaveCSS('display', 'block');
  await expect.element(page.getByTestId('skeleton')).toHaveCSS('height', '16px');
  await expect.element(page.getByTestId('skeleton')).toHaveCSS('overflow', 'hidden');
  await expect.element(page.getByTestId('skeleton')).toHaveCSS('animation-name', 'moduix-pulse');
  await expect.element(page.getByTestId('skeleton')).toHaveCSS('border-radius', '8px');
  await expect.element(page.getByTestId('skeleton')).toHaveCSS('pointer-events', 'none');
  await expect.element(page.getByTestId('skeleton')).toHaveCSS('user-select', 'none');
  await expect.element(page.getByTestId('skeleton')).toHaveCSS('color', 'rgba(0, 0, 0, 0)');
  expect(skeleton.getBoundingClientRect().width).toBe(skeleton.parentElement!.clientWidth);
  expect(
    skeleton.classList.contains(
      'bg-[color-mix(in_oklab,var(--color-muted-foreground)_18%,var(--color-background))]',
    ),
  ).toBe(true);
  expect(skeleton.classList.contains('motion-reduce:animate-none')).toBe(true);
  expect(getComputedStyle(skeleton, '::before').visibility).toBe('hidden');
  expect(getComputedStyle(skeleton, '::after').visibility).toBe('hidden');
  await expect.element(page.getByText('Loading profile')).toHaveCSS('visibility', 'hidden');
});

test('preserves an explicit accessibility override and the static variant', async () => {
  render(() => <Skeleton aria-hidden={false} data-testid="skeleton" variant="none" />);
  await expect.element(page.getByTestId('skeleton')).toHaveCount(1);
  const skeleton = screen.getByTestId('skeleton');

  expect(skeleton.getAttribute('aria-hidden')).toBe('false');
  expect(skeleton.getAttribute('data-state')).toBe('loading');
  expect(skeleton.hasAttribute('data-loading')).toBe(true);
  expect(skeleton.getAttribute('data-variant')).toBe('none');
});

test('reveals content and preserves the custom host and Ark Solid ref limitation', async () => {
  let customRef: HTMLDivElement | undefined;
  render(() => (
    <Skeleton
      ref={(element) => (customRef = element)}
      asChild={(props) => <section {...props()} aria-label="Profile" />}
      loading={false}
    />
  ));
  await expect.element(page.getByRole('region', { name: 'Profile' })).toHaveCount(1);
  const skeleton = screen.getByRole('region', { name: 'Profile' });

  expect(customRef).toBeUndefined();
  expect(skeleton.hasAttribute('aria-hidden')).toBe(false);
  expect(skeleton.getAttribute('data-state')).toBe('loaded');
  expect(skeleton.hasAttribute('data-loading')).toBe(false);
  expect(skeleton.getAttribute('data-slot')).toBe('skeleton-root');
});

test('converts numeric dimensions to CSS pixels', async () => {
  render(() => <Skeleton data-testid="skeleton" boxSize={48} borderRadius={8} />);
  await expect.element(page.getByTestId('skeleton')).toHaveCount(1);
  const skeleton = screen.getByTestId('skeleton');

  expect(skeleton.style).toMatchObject({
    borderRadius: '8px',
    height: '48px',
    width: '48px',
  });
  await expect.element(page.getByTestId('skeleton')).toHaveCSS('width', '48px');
  await expect.element(page.getByTestId('skeleton')).toHaveCSS('height', '48px');
  await expect.element(page.getByTestId('skeleton')).toHaveCSS('border-radius', '8px');
});

test('lets style override generated dimensions', async () => {
  render(() => (
    <Skeleton
      data-testid="skeleton"
      boxSize={48}
      borderRadius={8}
      style={{ width: '20px', height: '30px', 'border-radius': '12px' }}
    />
  ));
  await expect.element(page.getByTestId('skeleton')).toHaveCount(1);
  const skeleton = screen.getByTestId('skeleton');

  expect(skeleton.style).toMatchObject({
    borderRadius: '12px',
    height: '30px',
    width: '20px',
  });
  await expect.element(page.getByTestId('skeleton')).toHaveCSS('width', '20px');
  await expect.element(page.getByTestId('skeleton')).toHaveCSS('height', '30px');
  await expect.element(page.getByTestId('skeleton')).toHaveCSS('border-radius', '12px');
});

test('lets consumer utilities override loading defaults', async () => {
  render(() => (
    <Skeleton data-testid="skeleton" class="h-8 w-1/2 animate-none rounded-lg bg-primary" />
  ));
  await expect.element(page.getByTestId('skeleton')).toHaveCount(1);
  const skeleton = screen.getByTestId('skeleton');

  expect([...skeleton.classList]).toEqual(
    expect.arrayContaining(['h-8', 'w-1/2', 'rounded-lg', 'bg-primary', 'animate-none']),
  );
  for (const className of [
    'h-4',
    'w-full',
    'rounded-md',
    'bg-[color-mix(in_oklab,var(--color-muted-foreground)_18%,var(--color-background))]',
  ]) {
    expect(skeleton.classList.contains(className)).toBe(false);
  }
  await expect.element(page.getByTestId('skeleton')).toHaveCSS('height', '32px');
  await expect.element(page.getByTestId('skeleton')).toHaveCSS('animation-name', 'none');
});