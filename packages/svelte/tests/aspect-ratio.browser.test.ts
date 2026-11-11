import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import AsChildAspectRatio from './aspect-ratio/AsChildAspectRatio.svelte';
import TestAspectRatio from './aspect-ratio/TestAspectRatio.svelte';

test('renders a styled root with stable hooks and a forwarded ref', () => {
  const { component } = render(TestAspectRatio, {
    props: {
      ratio: 2,
      'data-testid': 'frame',
      style: 'width: 320px',
      'data-scope': 'custom',
      'data-part': 'custom',
      'data-slot': 'custom',
    },
  });
  const frame = screen.getByTestId('frame');

  expect(component.getRef()).toBe(frame);
  expect(frame.getAttribute('data-scope')).toBe('aspect-ratio');
  expect(frame.getAttribute('data-part')).toBe('root');
  expect(frame.getAttribute('data-slot')).toBe('aspect-ratio-root');
  expect(frame.style.getPropertyValue('--_aspect-ratio-value')).toBe('2');
  expect(frame.getBoundingClientRect().width).toBe(320);
  expect(frame.getBoundingClientRect().height).toBe(160);
});

test('preserves semantic children, merged classes, and the ref with asChild', () => {
  const { component } = render(AsChildAspectRatio);

  const frame = screen.getByRole('figure', { name: 'Mountain landscape' });
  expect(component.getRef()).toBe(frame);
  expect(frame.getAttribute('data-slot')).toBe('aspect-ratio-root');
  expect([...frame.classList]).toEqual(expect.arrayContaining(['frame', 'figure']));
});

test('keeps the ratio contract while allowing style.aspectRatio to override the CSS rule', () => {
  render(TestAspectRatio, {
    props: {
      ratio: 2,
      'data-testid': 'frame',
      style: 'width: 320px; aspect-ratio: 1 / 1; --_aspect-ratio-value: 99',
    },
  });
  const frame = screen.getByTestId('frame');

  expect(frame.style.aspectRatio).toBe('1 / 1');
  expect(frame.style.getPropertyValue('--_aspect-ratio-value')).toBe('2');
  expect(frame.getBoundingClientRect().width).toBe(320);
  expect(frame.getBoundingClientRect().height).toBe(320);
});

test('preserves consumer style declarations', () => {
  render(TestAspectRatio, {
    props: { ratio: 2, 'data-testid': 'frame', style: 'color: red; background-color: blue' },
  });
  const frame = screen.getByTestId('frame');

  expect(frame.style.color).toBe('red');
  expect(frame.style.backgroundColor).toBe('blue');
  expect(frame.style.getPropertyValue('--_aspect-ratio-value')).toBe('2');
});

test('keeps the ratio when content is taller than the frame', () => {
  render(TestAspectRatio, {
    props: { ratio: 2, 'data-testid': 'frame', style: 'width: 320px', tall: true },
  });

  expect(screen.getByTestId('frame').offsetHeight).toBe(160);
});

test('falls back to a square frame when the ratio is missing or invalid', () => {
  for (const ratio of [undefined, 0, -1, Number.NaN, Number.POSITIVE_INFINITY]) {
    const { unmount } = render(TestAspectRatio, {
      props: { ratio, 'data-testid': 'frame', style: 'width: 320px' },
    });
    const frame = screen.getByTestId('frame');

    expect(frame.style.getPropertyValue('--_aspect-ratio-value')).toBe('1');
    expect(frame.offsetHeight).toBe(320);
    unmount();
  }
});