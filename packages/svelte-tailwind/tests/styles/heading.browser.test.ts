import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import * as headingExports from '@/components/heading';
// The shared harness resolves `@/` to this package's source.
import TestHeading from '../../../svelte/tests/heading/TestHeading.svelte';

test('preserves h1 defaults, refs, and owned hooks when consumer props conflict', () => {
  const { component } = render(TestHeading, {
    props: {
      'data-testid': 'heading',
      'data-scope': 'custom-scope',
      'data-part': 'custom-part',
      'data-slot': 'custom-slot',
      'data-size': 'xs',
      'data-weight': 'bold',
      label: 'Build reliable interfaces',
    },
  });

  const heading = screen.getByRole('heading', { name: 'Build reliable interfaces', level: 1 });

  expect(component.getRef()).toBe(heading);
  expect(heading.getAttribute('data-scope')).toBe('heading');
  expect(heading.getAttribute('data-part')).toBe('root');
  expect(heading.getAttribute('data-slot')).toBe('heading-root');
  expect(heading.getAttribute('data-weight')).toBe('semibold');
  expect(heading.getAttribute('data-size')).toBe('2xl');

  expect(headingExports).not.toHaveProperty('HeadingRoot');
});

test('forwards props and refs through a semantic asChild host', () => {
  const { component } = render(TestHeading, {
    props: {
      asChild: true,
      size: 'xl',
      weight: 'medium',
      class: 'custom-heading',
      label: 'Factory-composed heading',
    },
  });

  const heading = screen.getByRole('heading', { name: 'Factory-composed heading', level: 2 });

  expect(component.getRef()).toBe(heading);
  expect(heading.getAttribute('data-size')).toBe('xl');
  expect(heading.getAttribute('data-weight')).toBe('medium');
  expect(heading.getAttribute('data-part')).toBe('root');
});

test('renders every supported semantic level with its default visual size', () => {
  const levels = [
    ['h1', 1, '30px'],
    ['h2', 2, '24px'],
    ['h3', 3, '20px'],
    ['h4', 4, '18px'],
    ['h5', 5, '16px'],
    ['h6', 6, '14px'],
  ] as const;

  for (const [as, level, fontSize] of levels) {
    const { unmount } = render(TestHeading, { props: { as, label: as } });

    expect(screen.getByRole('heading', { name: as, level }).getAttribute('data-weight')).toBe(
      'semibold',
    );
    expect(getComputedStyle(screen.getByRole('heading', { name: as, level })).fontSize).toBe(
      fontSize,
    );
    unmount();
  }
});

test('lets consumer utilities override the native defaults', () => {
  render(TestHeading, {
    props: {
      class: 'text-lg font-normal text-primary',
      'data-testid': 'heading',
      label: 'Page title',
    },
  });

  const heading = screen.getByTestId('heading');

  expect([...heading.classList]).toEqual(
    expect.arrayContaining(['text-lg', 'font-normal', 'text-primary']),
  );
  expect(getComputedStyle(heading)).toMatchObject({ fontSize: '18px', fontWeight: '400' });
});