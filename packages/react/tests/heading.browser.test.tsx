import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Heading } from '@/index';

test('preserves h1 defaults, refs, and owned hooks when consumer props conflict', () => {
  const ref = createRef<HTMLHeadingElement>();

  render(
    <Heading
      ref={ref}
      data-testid="heading"
      data-scope="custom-scope"
      data-part="custom-part"
      data-slot="custom-slot"
      data-size="xs"
      data-weight="bold"
    >
      Build reliable interfaces
    </Heading>,
  );

  const heading = screen.getByRole('heading', { name: 'Build reliable interfaces', level: 1 });

  expect(ref.current).toBe(heading);
  expect(heading.getAttribute('data-scope')).toBe('heading');
  expect(heading.getAttribute('data-part')).toBe('root');
  expect(heading.getAttribute('data-slot')).toBe('heading-root');
  expect(heading.getAttribute('data-weight')).toBe('semibold');
  expect(heading.getAttribute('data-size')).toBe('2xl');
});

test('keeps explicit visual props separate from heading semantics', () => {
  render(
    <Heading as="h3" size="2xl" weight="bold">
      Section title
    </Heading>,
  );

  const heading = screen.getByRole('heading', { name: 'Section title', level: 3 });

  expect(heading.getAttribute('data-size')).toBe('2xl');
  expect(heading.getAttribute('data-weight')).toBe('bold');
});

test('derives the default size from as, also through asChild', () => {
  render(
    <Heading as="h3" asChild>
      <h3>Composed section title</h3>
    </Heading>,
  );

  const heading = screen.getByRole('heading', { name: 'Composed section title', level: 3 });

  expect(heading.getAttribute('data-size')).toBe('lg');
});