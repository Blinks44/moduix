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
      style={{ width: '320px' }}
      data-scope="custom"
      data-part="custom"
      data-slot="custom"
    />,
  );
  const frame = getByTestId('frame');

  expect(ref.current).toBe(frame);
  expect(frame.getAttribute('data-scope')).toBe('aspect-ratio');
  expect(frame.getAttribute('data-part')).toBe('root');
  expect(frame.getAttribute('data-slot')).toBe('aspect-ratio-root');
  expect(frame.style.getPropertyValue('--_aspect-ratio-value')).toBe('2');
  expect(frame.getBoundingClientRect().width).toBe(320);
  expect(frame.getBoundingClientRect().height).toBe(160);
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
  expect(frame.getAttribute('data-slot')).toBe('aspect-ratio-root');
  expect([...frame.classList]).toEqual(expect.arrayContaining(['frame', 'figure']));
});

test('keeps the ratio contract while allowing style.aspectRatio to override the CSS rule', () => {
  const { getByTestId } = render(
    <AspectRatio
      ratio={2}
      data-testid="frame"
      style={
        { width: '320px', aspectRatio: '1 / 1', '--_aspect-ratio-value': '99' } as CSSProperties
      }
    />,
  );
  const frame = getByTestId('frame');

  expect(frame.style.aspectRatio).toBe('1 / 1');
  expect(frame.style.getPropertyValue('--_aspect-ratio-value')).toBe('2');
  expect(frame.getBoundingClientRect().width).toBe(320);
  expect(frame.getBoundingClientRect().height).toBe(320);
});

test('lets consumer Tailwind classes override conflicting defaults', () => {
  const { getByTestId } = render(
    <AspectRatio ratio={16 / 9} data-testid="frame" className="static w-1/2" />,
  );
  const frame = getByTestId('frame');

  expect([...frame.classList]).toEqual(expect.arrayContaining(['static', 'w-1/2']));
  expect([...frame.classList]).not.toContain('relative');
  expect([...frame.classList]).not.toContain('w-full');
  expect(getComputedStyle(frame).position).toBe('static');
  expect(frame.getBoundingClientRect().width).toBeCloseTo(frame.parentElement!.clientWidth / 2);
  expect(frame.getBoundingClientRect().height).toBeCloseTo(
    (frame.getBoundingClientRect().width * 9) / 16,
    1,
  );
});

test('rejects invalid ratios', () => {
  for (const ratio of [0, -1, Number.NaN, Number.POSITIVE_INFINITY]) {
    expect(() => render(<AspectRatio ratio={ratio} />)).toThrow(
      'AspectRatio `ratio` must be a finite number greater than zero.',
    );
  }
});