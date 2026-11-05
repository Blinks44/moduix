import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import AsChildStack from './stack/AsChildStack.svelte';
import DefaultsStack from './stack/DefaultsStack.svelte';
import NestedStack from './stack/NestedStack.svelte';
import TestStack from './stack/TestStack.svelte';

test('does not pass direction or fill to nested roots', () => {
  render(NestedStack);

  const inner = screen.getByTestId('inner');

  expect(getComputedStyle(inner).flexDirection).toBe('column');
  expect(getComputedStyle(inner).flexGrow).toBe('0');
});

test('preserves semantic hosts and refs with asChild', () => {
  const { component } = render(AsChildStack);

  const section = screen.getByRole('region', { name: 'Project updates' });

  expect(component.getRef()).toBe(section);
  expect(section.style.gap).toBe('12px');
  expect([...section.classList]).toEqual(expect.arrayContaining(['section-class', 'stack-class']));
  expect(section.style).toMatchObject({ color: 'red' });
  expect(section.getAttribute('data-slot')).toBe('stack-root');
});

const isDesktop = () => window.matchMedia('(min-width: 640px)').matches;

test.each([false, true])(
  'updates responsive layout and removes stale styles, asChild=%s',
  async (asChild) => {
    const { component, rerender } = render(TestStack, {
      props: { asChild, 'data-testid': 'stack' },
    });
    const stack = screen.getByTestId('stack');
    for (const [value, mobile, desktop] of [
      ['row', 'row', undefined],
      [{ desktop: 'row-reverse' }, 'column', 'row-reverse'],
      [{ mobile: 'column-reverse' }, 'column-reverse', undefined],
      [{ mobile: 'column', desktop: 'row' }, 'column', 'row'],
      [undefined, 'column', undefined],
    ] as const) {
      await rerender({ direction: value });
      expect(getComputedStyle(stack).flexDirection).toBe(
        isDesktop() ? (desktop ?? mobile) : mobile,
      );
      expect(screen.getByTestId('stack')).toBe(stack);
      expect(component.getRef()).toBe(stack);
    }
    await rerender({ gap: 0, fill: true });
    expect(stack.style.gap).toBe('0px');
    expect(getComputedStyle(stack).flexGrow).toBe('1');
    await rerender({ gap: '1.5' });
    expect(stack.style.gap).toBe('var(--moduix-spacing-1-5)');
    await rerender({ gap: '1rem', fill: false, style: 'color:red; gap: 2rem' });
    expect(stack.style).toMatchObject({ color: 'red', gap: '2rem' });
    expect(getComputedStyle(stack).flexGrow).toBe('0');
    await rerender({ style: undefined });
    expect(stack.style.gap).toBe('1rem');
    expect(stack.style.color).toBe('');
    await rerender({ gap: undefined, fill: undefined });
    expect(stack.style.gap).toBe('');
  },
);

test('leaves optional layout styles unset and lets style override layout props', () => {
  render(DefaultsStack);

  const defaults = screen.getByTestId('defaults');
  const overridden = screen.getByTestId('overridden');

  expect(defaults.style.gap).toBe('');
  expect(overridden.style).toMatchObject({ flexWrap: 'nowrap', gap: '2rem' });
});

test('renders a flex root with stable styling hooks and default utilities', () => {
  render(TestStack, {
    props: {
      'data-part': 'custom',
      'data-scope': 'custom',
      'data-slot': 'custom',
      'data-testid': 'stack',
    },
  });

  const stack = screen.getByTestId('stack');

  expect(stack.getAttribute('data-scope')).toBe('stack');
  expect(stack.getAttribute('data-part')).toBe('root');
  expect(stack.getAttribute('data-slot')).toBe('stack-root');
  expect(getComputedStyle(stack).display).toBe('flex');
  expect(getComputedStyle(stack).flexDirection).toBe('column');
});

test('writes flex props and reverse directions as native utilities and root styles', () => {
  render(TestStack, {
    props: {
      align: 'center',
      direction: { mobile: 'column-reverse', desktop: 'row-reverse' },
      fill: true,
      gap: 12,
      justify: 'space-between',
      wrap: 'wrap',
      'data-testid': 'stack',
    },
  });

  const stack = screen.getByTestId('stack');

  expect(stack.style).toMatchObject({
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '12px',
    justifyContent: 'space-between',
  });
  expect(getComputedStyle(stack)).toMatchObject({
    display: 'flex',
    flexDirection: isDesktop() ? 'row-reverse' : 'column-reverse',
    flexGrow: '1',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '12px',
  });
});