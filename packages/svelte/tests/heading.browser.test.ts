import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import TestHeading from './heading/TestHeading.svelte';

test.each([false, true])(
  'keeps the host and ref stable between semantic changes, asChild=%s',
  async (asChild) => {
    const { component, rerender } = render(TestHeading, {
      props: { asChild, title: 'Initial', 'data-testid': 'root' },
    });
    for (const as of ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const) {
      await rerender({ as });
      const host = screen.getByTestId('root');
      expect(host.tagName).toBe(asChild ? 'H2' : as.toUpperCase());
      expect(component.getRef()).toBe(host);
      await rerender({ title: as });
      expect(screen.getByTestId('root')).toBe(host);
      expect(component.getRef()).toBe(host);
      expect(host.getAttribute('title')).toBe(as);
      expect(host.textContent).toContain('Content');
    }
    await rerender({ as: undefined });
    expect(screen.getByTestId('root').tagName).toBe(asChild ? 'H2' : 'H1');
  },
);

test('keeps explicit visual props separate from heading semantics', () => {
  render(TestHeading, {
    props: { as: 'h3', size: '2xl', weight: 'bold', label: 'Section title' },
  });

  const heading = screen.getByRole('heading', { name: 'Section title', level: 3 });

  expect(heading.getAttribute('data-size')).toBe('2xl');
  expect(heading.getAttribute('data-weight')).toBe('bold');
});

test('derives the default size from as, also through asChild', () => {
  render(TestHeading, {
    props: { as: 'h3', asChild: true, hostTag: 'h3', label: 'Composed section title' },
  });

  const heading = screen.getByRole('heading', { name: 'Composed section title', level: 3 });

  expect(heading.getAttribute('data-size')).toBe('lg');
});