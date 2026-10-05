import { expect, test } from '@rstest/core';
import { render } from '@testing-library/react';
import { createRef } from 'react';
import { Bleed } from '../src';

test('renders the default full-bleed root with stable hooks', () => {
  const ref = createRef<HTMLElement>();
  const { getByTestId } = render(<Bleed ref={ref} data-testid="bleed" />);
  const bleed = getByTestId('bleed');

  expect(bleed.getAttribute('data-scope')).toBe('bleed');
  expect(bleed.getAttribute('data-part')).toBe('root');
  expect(bleed.getAttribute('data-slot')).toBe('bleed-root');
  expect(bleed.getAttribute('data-inline')).toBe('full');
  expect(bleed.getAttribute('data-block')).toBe('none');
  expect(ref.current).toBe(bleed);
  expect(bleed.getBoundingClientRect().width).toBeCloseTo(window.innerWidth);
  expect(getComputedStyle(bleed).marginBlockStart).toBe('0px');
});

test('composes an asChild element and forwards its props to the child', () => {
  const ref = createRef<HTMLElement>();
  const { getByRole } = render(
    <Bleed asChild ref={ref} inline="md" block="sm" className="figure">
      <figure aria-label="Full-width map" />
    </Bleed>,
  );
  const figure = getByRole('figure', { name: 'Full-width map' });

  expect(ref.current).toBe(figure);
  expect(figure.getAttribute('data-inline')).toBe('md');
  expect(figure.getAttribute('data-block')).toBe('sm');
  expect([...figure.classList]).toEqual(expect.arrayContaining(['figure']));
  const style = getComputedStyle(figure);
  expect(style.marginInlineStart).toBe('-12px');
  expect(style.marginInlineEnd).toBe('-12px');
  expect(style.marginBlockStart).toBe('-8px');
  expect(style.marginBlockEnd).toBe('-8px');
});

test('keeps wrapper-owned hooks and merges className through consumer props', () => {
  const { getByTestId } = render(
    <Bleed
      data-testid="bleed"
      data-scope="custom"
      data-part="custom"
      data-slot="custom"
      inline="xs"
      block="lg"
      className="consumer-class"
    />,
  );
  const bleed = getByTestId('bleed');

  expect(bleed.getAttribute('data-scope')).toBe('bleed');
  expect(bleed.getAttribute('data-part')).toBe('root');
  expect(bleed.getAttribute('data-slot')).toBe('bleed-root');
  expect(bleed.getAttribute('data-inline')).toBe('xs');
  expect(bleed.getAttribute('data-block')).toBe('lg');
  expect([...bleed.classList]).toEqual(expect.arrayContaining(['consumer-class']));
  expect(bleed.className).not.toBe('consumer-class');
  const style = getComputedStyle(bleed);
  expect(style.marginInlineStart).toBe('-4px');
  expect(style.marginBlockStart).toBe('-16px');
});

test('lets consumer Tailwind classes override conflicting defaults', () => {
  const { getByTestId } = render(
    <Bleed data-testid="bleed" inline="md" block="lg" className="mx-8 my-10" />,
  );
  const bleed = getByTestId('bleed');

  expect([...bleed.classList]).toEqual(expect.arrayContaining(['mx-8', 'my-10']));
  expect([...bleed.classList]).not.toContain('-mx-3');
  expect([...bleed.classList]).not.toContain('-my-4');
  const style = getComputedStyle(bleed);
  expect(style.marginInlineStart).toBe('32px');
  expect(style.marginInlineEnd).toBe('32px');
  expect(style.marginBlockStart).toBe('40px');
  expect(style.marginBlockEnd).toBe('40px');
});