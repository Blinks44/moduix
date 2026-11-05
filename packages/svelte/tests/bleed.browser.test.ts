import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import AsChildBleed from './bleed/AsChildBleed.svelte';
import TestBleed from './bleed/TestBleed.svelte';

test('renders the default full-bleed root with stable hooks', () => {
  const { component } = render(TestBleed, { props: { 'data-testid': 'bleed' } });
  const bleed = screen.getByTestId('bleed');

  expect(bleed.getAttribute('data-scope')).toBe('bleed');
  expect(bleed.getAttribute('data-part')).toBe('root');
  expect(bleed.getAttribute('data-slot')).toBe('bleed-root');
  expect(bleed.getAttribute('data-inline')).toBe('full');
  expect(bleed.getAttribute('data-block')).toBe('none');
  expect(component.getRef()).toBe(bleed);
  expect(bleed.getBoundingClientRect().width).toBeCloseTo(window.innerWidth);
  expect(getComputedStyle(bleed).marginBlockStart).toBe('0px');
});

test('composes a semantic asChild element and exposes its DOM root through a Svelte ref', () => {
  const { component } = render(AsChildBleed);
  const figure = screen.getByRole('figure', { name: 'Full-width map' });

  expect(component.getRef()).toBe(figure);
  expect(figure.getAttribute('data-inline')).toBe('md');
  expect(figure.getAttribute('data-block')).toBe('sm');
  expect([...figure.classList]).toEqual(expect.arrayContaining(['figure']));
  const style = getComputedStyle(figure);
  expect(style.marginInlineStart).toBe('-12px');
  expect(style.marginInlineEnd).toBe('-12px');
  expect(style.marginBlockStart).toBe('-8px');
  expect(style.marginBlockEnd).toBe('-8px');
});