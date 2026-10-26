import { expect, test } from '@rstest/core';
import { render } from '@testing-library/react';
import { createRef } from 'react';
import { Container } from '../src';

test.each([
  ['xs', '640px'],
  ['sm', '768px'],
  ['md', '1024px'],
  ['lg', '1152px'],
  ['xl', '1440px'],
  ['full', 'none'],
] as const)('applies the %s maximum width', (size, maxWidth) => {
  const { getByTestId } = render(<Container data-testid="container" size={size} gutter="none" />);

  expect(getByTestId('container').getAttribute('data-size')).toBe(size);
  expect(getComputedStyle(getByTestId('container')).maxWidth).toBe(maxWidth);
});

test.each([
  ['none', 0, 0, 0],
  ['sm', 12, 3, 24],
  ['md', 16, 4, 32],
  ['lg', 24, 5, 48],
] as const)('applies the %s gutter and includes it in maximum width', (gutter, min, vw, max) => {
  const { getByTestId } = render(<Container data-testid="container" gutter={gutter} />);

  expect(getByTestId('container').getAttribute('data-gutter')).toBe(gutter);
  const style = getComputedStyle(getByTestId('container'));
  const padding = Math.min(max, Math.max(min, (window.innerWidth * vw) / 100));
  expect(parseFloat(style.paddingInlineStart)).toBeCloseTo(padding);
  expect(parseFloat(style.paddingInlineEnd)).toBeCloseTo(padding);
  expect(parseFloat(style.maxWidth)).toBeCloseTo(1152 + padding * 2);
});

test('preserves default layout, refs, and owned hooks when consumer props conflict', () => {
  const ref = createRef<HTMLDivElement>();
  const { getByTestId } = render(
    <Container
      ref={ref}
      data-testid="container"
      data-scope="custom"
      data-part="custom"
      data-slot="custom"
      data-size="custom"
      data-gutter="custom"
      className="consumer-class"
    />,
  );
  const container = getByTestId('container');

  expect(container.getAttribute('data-scope')).toBe('container');
  expect(container.getAttribute('data-part')).toBe('root');
  expect(container.getAttribute('data-slot')).toBe('container-root');
  expect(container.getAttribute('data-size')).toBe('lg');
  expect(container.getAttribute('data-gutter')).toBe('md');
  expect([...container.classList]).toEqual(expect.arrayContaining(['consumer-class']));
  expect(ref.current).toBe(container);
  expect('Root' in Container).toBe(false);
  const style = getComputedStyle(container);
  expect(style.display).toBe('block');
  expect(style.minWidth).toBe('0px');
  expect(parseFloat(style.maxWidth)).toBeCloseTo(1152 + parseFloat(style.paddingInlineStart) * 2);
});

test('forwards refs and props to an asChild element', () => {
  const ref = createRef<HTMLDivElement>();
  const { getByRole } = render(
    <Container asChild ref={ref} size="md" gutter="lg">
      <main aria-label="Page content" />
    </Container>,
  );
  const main = getByRole('main', { name: 'Page content' });

  expect(ref.current).toBe(main);
  expect(main.getAttribute('data-size')).toBe('md');
  expect(main.getAttribute('data-gutter')).toBe('lg');
});