import { expect, test } from '@rstest/core';
import { render } from '@testing-library/react';
import { createRef } from 'react';
import { Skeleton } from '../src';

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