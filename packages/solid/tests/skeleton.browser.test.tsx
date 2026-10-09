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
    />
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