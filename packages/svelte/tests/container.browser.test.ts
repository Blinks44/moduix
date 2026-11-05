import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import * as containerExports from '@/components/container';
import AsChildContainer from './container/AsChildContainer.svelte';
import TestContainer from './container/TestContainer.svelte';

test.each([
  ['xs', '640px'],
  ['sm', '768px'],
  ['md', '1024px'],
  ['lg', '1152px'],
  ['xl', '1440px'],
  ['full', 'none'],
] as const)('applies the %s maximum width', (size, maxWidth) => {
  render(TestContainer, { props: { 'data-testid': 'container', size, gutter: 'none' } });

  expect(screen.getByTestId('container').getAttribute('data-size')).toBe(size);
  expect(getComputedStyle(screen.getByTestId('container')).maxWidth).toBe(maxWidth);
});

test.each([
  ['none', 0, 0, 0],
  ['sm', 12, 3, 24],
  ['md', 16, 4, 32],
  ['lg', 24, 5, 48],
] as const)('applies the %s gutter and includes it in maximum width', (gutter, min, vw, max) => {
  render(TestContainer, { props: { 'data-testid': 'container', gutter } });

  expect(screen.getByTestId('container').getAttribute('data-gutter')).toBe(gutter);
  const style = getComputedStyle(screen.getByTestId('container'));
  const padding = Math.min(max, Math.max(min, (window.innerWidth * vw) / 100));
  expect(parseFloat(style.paddingInlineStart)).toBeCloseTo(padding);
  expect(parseFloat(style.paddingInlineEnd)).toBeCloseTo(padding);
  expect(parseFloat(style.maxWidth)).toBeCloseTo(1152 + padding * 2);
});

test('preserves default layout, refs, and owned hooks when consumer props conflict', () => {
  const { component } = render(TestContainer, {
    props: {
      'data-testid': 'container',
      'data-scope': 'custom',
      'data-part': 'custom',
      'data-slot': 'custom',
      'data-size': 'custom',
      'data-gutter': 'custom',
      class: 'consumer-class',
    },
  });
  const container = screen.getByTestId('container');

  expect(container.getAttribute('data-scope')).toBe('container');
  expect(container.getAttribute('data-part')).toBe('root');
  expect(container.getAttribute('data-slot')).toBe('container-root');
  expect(container.getAttribute('data-size')).toBe('lg');
  expect(container.getAttribute('data-gutter')).toBe('md');
  expect([...container.classList]).toEqual(expect.arrayContaining(['consumer-class']));
  expect(component.getRef()).toBe(container);
  expect(containerExports).not.toHaveProperty('ContainerRoot');
  const style = getComputedStyle(container);
  expect(style.display).toBe('block');
  expect(style.minWidth).toBe('0px');
  expect(parseFloat(style.maxWidth)).toBeCloseTo(1152 + parseFloat(style.paddingInlineStart) * 2);
});

test('composes a semantic asChild element and exposes its DOM root through a Svelte ref', () => {
  const { component } = render(AsChildContainer);
  const main = screen.getByRole('main', { name: 'Page content' });

  expect(component.getRef()).toBe(main);
  expect(main.getAttribute('data-scope')).toBe('container');
  expect(main.getAttribute('data-part')).toBe('root');
  expect(main.getAttribute('data-slot')).toBe('container-root');
  expect(main.getAttribute('data-size')).toBe('md');
  expect(main.getAttribute('data-gutter')).toBe('lg');
  expect([...main.classList]).toEqual(expect.arrayContaining(['semantic-root']));
});