import { expect, test } from '@rstest/core';
import { render } from '@testing-library/react';
import { createRef, type CSSProperties } from 'react';
import { AspectRatio } from '../src';

test('renders a styled root with stable hooks and a forwarded ref', () => {
  const ref = createRef<HTMLDivElement>();
  const { getByTestId } = render(<AspectRatio ref={ref} ratio={2} data-testid="frame" />);
  const frame = getByTestId('frame');

  expect(ref.current).toBe(frame);
  expect(frame).toHaveAttribute('data-scope', 'aspect-ratio');
  expect(frame).toHaveAttribute('data-part', 'root');
  expect(frame).toHaveAttribute('data-slot', 'aspect-ratio-root');
  expect(frame.style.getPropertyValue('--aspect-ratio-value')).toBe('2');
});

test('preserves semantic children with asChild', () => {
  const { getByRole } = render(
    <AspectRatio ratio={16 / 9} asChild>
      <figure aria-label="Mountain landscape" />
    </AspectRatio>,
  );

  const frame = getByRole('figure', { name: 'Mountain landscape' });
  expect(frame).toHaveAttribute('data-slot', 'aspect-ratio-root');
});

test('keeps the ratio contract while allowing style.aspectRatio to override the CSS rule', () => {
  const { getByTestId } = render(
    <AspectRatio
      ratio={2}
      data-testid="frame"
      style={{ aspectRatio: '1 / 1', '--aspect-ratio-value': '99' } as CSSProperties}
    />,
  );
  const frame = getByTestId('frame');

  expect(frame.style.aspectRatio).toBe('1 / 1');
  expect(frame.style.getPropertyValue('--aspect-ratio-value')).toBe('2');
});

test('rejects invalid ratios', () => {
  for (const ratio of [0, -1, Number.NaN, Number.POSITIVE_INFINITY]) {
    expect(() => render(<AspectRatio ratio={ratio} />)).toThrow(
      'AspectRatio `ratio` must be a finite number greater than zero.',
    );
  }
});