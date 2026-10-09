import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import type { JSX } from 'solid-js';
import { AspectRatio } from '../src';

test('renders a styled root with stable hooks and a forwarded ref', () => {
  let ref!: HTMLDivElement;

  render(() => (
    <AspectRatio
      ref={(element) => (ref = element)}
      ratio={2}
      data-testid="frame"
      style={{ width: '320px' }}
      data-scope="custom"
      data-part="custom"
      data-slot="custom"
    />
  ));
  const frame = screen.getByTestId('frame');

  expect(ref).toBe(frame);
  expect(frame.getAttribute('data-scope')).toBe('aspect-ratio');
  expect(frame.getAttribute('data-part')).toBe('root');
  expect(frame.getAttribute('data-slot')).toBe('aspect-ratio-root');
  expect(frame.style.getPropertyValue('--_aspect-ratio-value')).toBe('2');
  expect(frame.getBoundingClientRect().width).toBe(320);
  expect(frame.getBoundingClientRect().height).toBe(160);
});

test('preserves semantic children and merged classes with asChild', () => {
  let rootRef!: HTMLDivElement;
  let childRef!: HTMLElement;

  render(() => (
    <AspectRatio
      ref={(element) => (rootRef = element)}
      ratio={16 / 9}
      class="frame"
      asChild={(props) => (
        <figure
          {...props({
            class: 'figure',
            'aria-label': 'Mountain landscape',
          })}
          ref={(element) => (childRef = element)}
        />
      )}
    />
  ));

  const frame = screen.getByRole('figure', { name: 'Mountain landscape' });

  expect(rootRef).toBeUndefined();
  expect(childRef).toBe(frame);
  expect(frame.getAttribute('data-slot')).toBe('aspect-ratio-root');
  expect([...frame.classList]).toEqual(expect.arrayContaining(['frame', 'figure']));
});

test('keeps the ratio contract while allowing style.aspectRatio to override the CSS rule', () => {
  render(() => (
    <AspectRatio
      ratio={2}
      data-testid="frame"
      style={
        {
          width: '320px',
          'aspect-ratio': '1 / 1',
          '--_aspect-ratio-value': '99',
        } as JSX.CSSProperties
      }
    />
  ));
  const frame = screen.getByTestId('frame');

  expect(frame.style.aspectRatio).toBe('1 / 1');
  expect(frame.style.getPropertyValue('--_aspect-ratio-value')).toBe('2');
  expect(frame.getBoundingClientRect().width).toBe(320);
  expect(frame.getBoundingClientRect().height).toBe(320);
});

test('rejects invalid ratios', () => {
  for (const ratio of [0, -1, Number.NaN, Number.POSITIVE_INFINITY]) {
    expect(() => render(() => <AspectRatio ratio={ratio} />)).toThrow(
      'AspectRatio `ratio` must be a finite number greater than zero.',
    );
  }
});