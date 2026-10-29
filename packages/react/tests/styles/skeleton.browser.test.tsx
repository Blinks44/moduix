import { expect, test } from '@rstest/core';
import { render } from '@testing-library/react';
import { Skeleton } from '@/index';

test('owns stable loading hooks even when passthrough props provide conflicting values', () => {
  expect(Skeleton).not.toHaveProperty('Root');
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

  expect(skeleton.getAttribute('aria-hidden')).toBe('true');
  expect(skeleton.dataset).toMatchObject({
    scope: 'skeleton',
    part: 'root',
    slot: 'skeleton-root',
    state: 'loading',
  });
  expect(skeleton.hasAttribute('data-loading')).toBe(true);
  expect(skeleton.getAttribute('data-variant')).toBe('pulse');
});