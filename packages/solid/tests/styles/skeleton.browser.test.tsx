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