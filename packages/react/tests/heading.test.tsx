import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Heading } from '../src';

test('renders an h1 with the default styling hooks and forwarded ref', () => {
  const ref = createRef<HTMLHeadingElement>();

  render(
    <Heading ref={ref} data-testid="heading">
      Build reliable interfaces
    </Heading>,
  );

  const heading = screen.getByRole('heading', { name: 'Build reliable interfaces', level: 1 });

  expect(ref.current).toBe(heading);
  expect(heading).toHaveAttribute('data-scope', 'heading');
  expect(heading).toHaveAttribute('data-part', 'root');
  expect(heading).toHaveAttribute('data-slot', 'heading-root');
  expect(heading).toHaveAttribute('data-weight', 'semibold');
  expect(heading).not.toHaveAttribute('data-size');
});

test('renders every supported semantic level', () => {
  const levels = [
    ['h1', 1],
    ['h2', 2],
    ['h3', 3],
    ['h4', 4],
    ['h5', 5],
    ['h6', 6],
  ] as const;

  for (const [as, level] of levels) {
    const { unmount } = render(<Heading as={as}>{as}</Heading>);

    expect(screen.getByRole('heading', { name: as, level })).toHaveAttribute(
      'data-weight',
      'semibold',
    );

    unmount();
  }
});

test('keeps explicit visual props separate from heading semantics', () => {
  render(
    <Heading as="h3" size="2xl" weight="bold">
      Section title
    </Heading>,
  );

  const heading = screen.getByRole('heading', { name: 'Section title', level: 3 });

  expect(heading).toHaveAttribute('data-size', '2xl');
  expect(heading).toHaveAttribute('data-weight', 'bold');
});

test('preserves component-owned styling hooks when data attributes collide', () => {
  render(
    <Heading
      data-scope="custom-scope"
      data-part="custom-part"
      data-slot="custom-slot"
      data-size="xs"
      data-weight="bold"
    >
      Page title
    </Heading>,
  );

  const heading = screen.getByRole('heading', { name: 'Page title', level: 1 });

  expect(heading).toHaveAttribute('data-scope', 'heading');
  expect(heading).toHaveAttribute('data-part', 'root');
  expect(heading).toHaveAttribute('data-slot', 'heading-root');
  expect(heading).not.toHaveAttribute('data-size');
  expect(heading).toHaveAttribute('data-weight', 'semibold');
});

test('forwards props and refs through a semantic asChild host', () => {
  const ref = createRef<HTMLHeadingElement>();

  render(
    <Heading asChild ref={ref} size="xl" weight="medium" className="custom-heading">
      <h2>Factory-composed heading</h2>
    </Heading>,
  );

  const heading = screen.getByRole('heading', { name: 'Factory-composed heading', level: 2 });

  expect(ref.current).toBe(heading);
  expect(heading).toHaveClass('custom-heading');
  expect(heading).toHaveAttribute('data-size', 'xl');
  expect(heading).toHaveAttribute('data-weight', 'medium');
  expect(heading).toHaveAttribute('data-part', 'root');
});