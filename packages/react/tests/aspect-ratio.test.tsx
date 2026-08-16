import { expect, test } from '@rstest/core';
import { render } from '@testing-library/react';
import { createRef, type CSSProperties } from 'react';
import { AspectRatio } from '../src';

test('renders a styled root with stable hooks and a forwarded ref', () => {
  const ref = createRef<HTMLDivElement>();
  const { getByTestId } = render(
    <AspectRatio
      ref={ref}
      ratio={2}
      data-testid="frame"
      data-scope="custom"
      data-part="custom"
      data-slot="custom"
    />,
  );
  const frame = getByTestId('frame');

  expect(ref.current).toBe(frame);
  expect(frame).toHaveAttribute('data-scope', 'aspect-ratio');
  expect(frame).toHaveAttribute('data-part', 'root');
  expect(frame).toHaveAttribute('data-slot', 'aspect-ratio-root');
  expect(frame.style.getPropertyValue('--_aspect-ratio-value')).toBe('2');
});

test('preserves semantic children, merged classes, and the ref with asChild', () => {
  const ref = createRef<HTMLDivElement>();
  const { getByRole } = render(
    <AspectRatio ref={ref} ratio={16 / 9} className="frame" asChild>
      <figure aria-label="Mountain landscape" className="figure" />
    </AspectRatio>,
  );

  const frame = getByRole('figure', { name: 'Mountain landscape' });
  expect(ref.current).toBe(frame);
  expect(frame).toHaveAttribute('data-slot', 'aspect-ratio-root');
  expect(frame).toHaveClass('frame', 'figure');
});

test('exposes the same root through the namespace API', () => {
  const { getByTestId } = render(<AspectRatio.Root ratio={1} data-testid="square" />);

  expect(getByTestId('square').style.getPropertyValue('--_aspect-ratio-value')).toBe('1');
});

test('keeps the ratio contract while allowing style.aspectRatio to override the CSS rule', () => {
  const { getByTestId } = render(
    <AspectRatio
      ratio={2}
      data-testid="frame"
      style={{ aspectRatio: '1 / 1', '--_aspect-ratio-value': '99' } as CSSProperties}
    />,
  );
  const frame = getByTestId('frame');

  expect(frame.style.aspectRatio).toBe('1 / 1');
  expect(frame.style.getPropertyValue('--_aspect-ratio-value')).toBe('2');
});

test('rejects invalid ratios', () => {
  for (const ratio of [0, -1, Number.NaN, Number.POSITIVE_INFINITY]) {
    expect(() => render(<AspectRatio ratio={ratio} />)).toThrow(
      'AspectRatio `ratio` must be a finite number greater than zero.',
    );
  }
});