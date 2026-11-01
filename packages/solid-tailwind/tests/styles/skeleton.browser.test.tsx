import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { Skeleton } from '@/index';

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
  expect(getComputedStyle(skeleton, '::before').visibility).toBe('hidden');
  expect(getComputedStyle(skeleton, '::after').visibility).toBe('hidden');
  await expect.element(page.getByText('Loading profile')).toHaveCSS('visibility', 'hidden');
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
  await expect.element(page.getByTestId('skeleton')).toHaveCSS('height', '32px');
  await expect.element(page.getByTestId('skeleton')).toHaveCSS('animation-name', 'none');
});