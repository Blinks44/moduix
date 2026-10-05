import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render } from '@testing-library/react';
import { createRef } from 'react';
import { Skeleton } from '../src';

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

test('preserves an explicit accessibility override and the static variant', () => {
  const { getByTestId } = render(
    <Skeleton aria-hidden={false} data-testid="skeleton" variant="none" />,
  );
  const skeleton = getByTestId('skeleton');

  expect(skeleton.getAttribute('aria-hidden')).toBe('false');
  expect(skeleton.getAttribute('data-state')).toBe('loading');
  expect(skeleton.hasAttribute('data-loading')).toBe(true);
  expect(skeleton.getAttribute('data-variant')).toBe('none');
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
  expect(skeleton.hasAttribute('aria-hidden')).toBe(false);
  expect(skeleton.getAttribute('data-state')).toBe('loaded');
  expect(skeleton.hasAttribute('data-loading')).toBe(false);
  expect(skeleton.getAttribute('data-slot')).toBe('skeleton-root');
});

test('converts numeric dimensions to CSS pixels', async () => {
  const { getByTestId } = render(<Skeleton data-testid="skeleton" boxSize={48} borderRadius={8} />);
  const skeleton = getByTestId('skeleton');

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
  const { getByTestId } = render(
    <Skeleton
      data-testid="skeleton"
      boxSize={48}
      borderRadius={8}
      style={{ width: '20px', height: '30px', borderRadius: '12px' }}
    />,
  );
  const skeleton = getByTestId('skeleton');

  expect(skeleton.style).toMatchObject({
    borderRadius: '12px',
    height: '30px',
    width: '20px',
  });
  await expect.element(page.getByTestId('skeleton')).toHaveCSS('width', '20px');
  await expect.element(page.getByTestId('skeleton')).toHaveCSS('height', '30px');
  await expect.element(page.getByTestId('skeleton')).toHaveCSS('border-radius', '12px');
});