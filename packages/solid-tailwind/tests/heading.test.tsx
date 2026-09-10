import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { Heading } from '../src';

test('renders an h1 with native defaults, stable hooks, and forwarded ref', () => {
  let ref!: HTMLHeadingElement;

  render(() => (
    <Heading ref={(element) => (ref = element)} data-testid="heading">
      Build reliable interfaces
    </Heading>
  ));

  const heading = screen.getByRole('heading', { name: 'Build reliable interfaces', level: 1 });

  expect(ref).toBe(heading);
  expect(heading).toHaveAttribute('data-scope', 'heading');
  expect(heading).toHaveAttribute('data-part', 'root');
  expect(heading).toHaveAttribute('data-slot', 'heading-root');
  expect(heading).toHaveAttribute('data-weight', 'semibold');
  expect(heading).not.toHaveAttribute('data-size');
  expect(heading).toHaveClass(
    'm-0',
    'text-3xl',
    'font-semibold',
    'text-foreground',
    'tracking-normal',
    'text-balance',
    'wrap-anywhere',
  );
});

test('renders every supported semantic level with its default visual size', () => {
  const levels = [
    ['h1', 1, 'text-3xl'],
    ['h2', 2, 'text-2xl'],
    ['h3', 3, 'text-xl'],
    ['h4', 4, 'text-lg'],
    ['h5', 5, 'text-md'],
    ['h6', 6, 'text-sm'],
  ] as const;

  for (const [as, level, sizeClass] of levels) {
    const { unmount } = render(() => <Heading as={as}>{as}</Heading>);

    expect(screen.getByRole('heading', { name: as, level })).toHaveClass(sizeClass);
    unmount();
  }
});

test('keeps explicit visual props separate from heading semantics', () => {
  render(() => (
    <Heading as="h3" size="2xl" weight="bold">
      Section title
    </Heading>
  ));

  const heading = screen.getByRole('heading', { name: 'Section title', level: 3 });

  expect(heading).toHaveAttribute('data-size', '2xl');
  expect(heading).toHaveAttribute('data-weight', 'bold');
  expect(heading).toHaveClass('text-3xl', 'font-bold');
  expect(heading).not.toHaveClass('text-xl', 'font-semibold');
});

test('preserves component-owned styling hooks when data attributes collide', () => {
  render(() => (
    <Heading
      data-scope="custom-scope"
      data-part="custom-part"
      data-slot="custom-slot"
      data-size="xs"
      data-weight="bold"
    >
      Page title
    </Heading>
  ));

  const heading = screen.getByRole('heading', { name: 'Page title', level: 1 });

  expect(heading).toHaveAttribute('data-scope', 'heading');
  expect(heading).toHaveAttribute('data-part', 'root');
  expect(heading).toHaveAttribute('data-slot', 'heading-root');
  expect(heading).not.toHaveAttribute('data-size');
  expect(heading).toHaveAttribute('data-weight', 'semibold');
});

test('lets consumer utilities override the native defaults', () => {
  render(() => (
    <Heading class="text-lg font-normal text-primary" data-testid="heading">
      Page title
    </Heading>
  ));

  const heading = screen.getByTestId('heading');

  expect(heading).toHaveClass('text-lg', 'font-normal', 'text-primary');
  expect(heading).not.toHaveClass('text-3xl', 'font-semibold', 'text-foreground');
});

test('forwards props through a semantic asChild host without forwarding refs', () => {
  let ref: HTMLHeadingElement | undefined;

  render(() => (
    <Heading
      asChild={(props) => <h2 {...props()}>Factory-composed heading</h2>}
      ref={(element) => (ref = element)}
      size="xl"
      weight="medium"
      class="custom-heading"
    />
  ));

  const heading = screen.getByRole('heading', { name: 'Factory-composed heading', level: 2 });

  expect(ref).toBeUndefined();
  expect(heading).toHaveClass('custom-heading', 'text-2xl', 'font-medium');
  expect(heading).toHaveAttribute('data-size', 'xl');
  expect(heading).toHaveAttribute('data-weight', 'medium');
  expect(heading).toHaveAttribute('data-part', 'root');
});