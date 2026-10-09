import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { Bleed } from '../src';

test('renders the default full-bleed root with stable hooks', () => {
  let ref!: HTMLDivElement;
  render(() => <Bleed ref={(element) => (ref = element)} data-testid="bleed" />);
  const bleed = screen.getByTestId('bleed');

  expect(bleed.getAttribute('data-scope')).toBe('bleed');
  expect(bleed.getAttribute('data-part')).toBe('root');
  expect(bleed.getAttribute('data-slot')).toBe('bleed-root');
  expect(bleed.getAttribute('data-inline')).toBe('full');
  expect(bleed.getAttribute('data-block')).toBe('none');
  expect(ref).toBe(bleed);
  expect(bleed.getBoundingClientRect().width).toBeCloseTo(window.innerWidth);
  expect(getComputedStyle(bleed).marginBlockStart).toBe('0px');
});

test('composes an asChild element and forwards its props to the child', () => {
  let rootRef: HTMLElement | undefined;
  let childRef!: HTMLElement;

  render(() => (
    <Bleed
      asChild={(props) => (
        <figure
          {...props({
            class: 'figure',
            'aria-label': 'Full-width map',
          })}
          ref={(element) => (childRef = element)}
        />
      )}
      ref={(element) => (rootRef = element)}
      inline="md"
      block="sm"
    />
  ));
  const figure = screen.getByRole('figure', { name: 'Full-width map' });

  expect(rootRef).toBeUndefined();
  expect(childRef).toBe(figure);
  expect(figure.getAttribute('data-inline')).toBe('md');
  expect(figure.getAttribute('data-block')).toBe('sm');
  expect([...figure.classList]).toEqual(expect.arrayContaining(['figure']));
  const style = getComputedStyle(figure);
  expect(style.marginInlineStart).toBe('-12px');
  expect(style.marginInlineEnd).toBe('-12px');
  expect(style.marginBlockStart).toBe('-8px');
  expect(style.marginBlockEnd).toBe('-8px');
});

test('keeps wrapper-owned hooks and merges class through consumer props', () => {
  render(() => (
    <Bleed
      data-testid="bleed"
      data-scope="custom"
      data-part="custom"
      data-slot="custom"
      inline="xs"
      block="lg"
      class="consumer-class"
    />
  ));
  const bleed = screen.getByTestId('bleed');

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
  render(() => <Bleed data-testid="bleed" inline="md" block="lg" class="mx-8 my-10" />);
  const bleed = screen.getByTestId('bleed');

  expect([...bleed.classList]).toEqual(expect.arrayContaining(['mx-8', 'my-10']));
  expect([...bleed.classList]).not.toContain('-mx-3');
  expect([...bleed.classList]).not.toContain('-my-4');
  const style = getComputedStyle(bleed);
  expect(style.marginInlineStart).toBe('32px');
  expect(style.marginInlineEnd).toBe('32px');
  expect(style.marginBlockStart).toBe('40px');
  expect(style.marginBlockEnd).toBe('40px');
});