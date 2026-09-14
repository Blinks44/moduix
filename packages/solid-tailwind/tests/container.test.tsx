import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { Container } from '../src';

test('renders the default root with stable hooks and visible layout utilities', () => {
  render(() => <Container data-testid="container" />);
  const container = screen.getByTestId('container');

  expect(container).toHaveAttribute('data-scope', 'container');
  expect(container).toHaveAttribute('data-part', 'root');
  expect(container).toHaveAttribute('data-slot', 'container-root');
  expect(container).toHaveAttribute('data-size', 'lg');
  expect(container).toHaveAttribute('data-gutter', 'md');
  expect(container).toHaveClass('w-full', 'min-w-0', 'mx-auto');
});

test.each(['xs', 'sm', 'md', 'lg', 'xl', 'full'] as const)('renders the %s size preset', (size) => {
  render(() => <Container data-testid="container" size={size} />);

  expect(screen.getByTestId('container')).toHaveAttribute('data-size', size);
});

test.each(['none', 'sm', 'md', 'lg'] as const)('renders the %s gutter preset', (gutter) => {
  render(() => <Container data-testid="container" gutter={gutter} />);

  expect(screen.getByTestId('container')).toHaveAttribute('data-gutter', gutter);
});

test('retains its public root hooks when consumer props conflict', () => {
  render(() => (
    <Container
      data-testid="container"
      data-scope="custom"
      data-part="custom"
      data-slot="custom"
      data-size="custom"
      data-gutter="custom"
      class="consumer-class"
    />
  ));
  const container = screen.getByTestId('container');

  expect(container).toHaveAttribute('data-scope', 'container');
  expect(container).toHaveAttribute('data-part', 'root');
  expect(container).toHaveAttribute('data-slot', 'container-root');
  expect(container).toHaveAttribute('data-size', 'lg');
  expect(container).toHaveAttribute('data-gutter', 'md');
  expect(container).toHaveClass('consumer-class');
});

test('lets consumer Tailwind utilities override conflicting defaults', () => {
  render(() => <Container data-testid="container" class="w-1/2 max-w-sm px-2" />);
  const container = screen.getByTestId('container');

  expect(container).toHaveClass('w-1/2', 'max-w-sm', 'px-2');
  expect(container).not.toHaveClass('w-full');
  expect(container.className).not.toContain('max-w-[calc');
  expect(container.className).not.toContain('px-[clamp');
});

test('forwards refs through the ordinary Ark Solid root path', () => {
  let rootRef!: HTMLDivElement;

  render(() => <Container ref={(element) => (rootRef = element)} />);

  expect(rootRef).toHaveAttribute('data-slot', 'container-root');
});

test('preserves semantic root composition with native Ark Solid asChild', () => {
  render(() => (
    <Container
      asChild={(props) => <main {...props()} aria-label="Page content" />}
      size="md"
      gutter="lg"
    />
  ));
  const main = screen.getByRole('main', { name: 'Page content' });

  expect(main).toHaveAttribute('data-scope', 'container');
  expect(main).toHaveAttribute('data-part', 'root');
  expect(main).toHaveAttribute('data-slot', 'container-root');
  expect(main).toHaveAttribute('data-size', 'md');
  expect(main).toHaveAttribute('data-gutter', 'lg');
});

test('does not forward refs through native Ark Solid asChild composition', () => {
  let rootRef: HTMLDivElement | undefined;

  render(() => (
    <Container
      ref={(element) => (rootRef = element)}
      asChild={(props) => <main {...props()} aria-label="Page content" />}
    />
  ));

  expect(rootRef).toBeUndefined();
});