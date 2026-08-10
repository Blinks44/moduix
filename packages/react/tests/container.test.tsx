import { expect, test } from '@rstest/core';
import { render } from '@testing-library/react';
import { createRef } from 'react';
import { Container } from '../src';

test('renders the default root with stable hooks', () => {
  const { getByTestId } = render(<Container data-testid="container" />);
  const container = getByTestId('container');

  expect(container).toHaveAttribute('data-scope', 'container');
  expect(container).toHaveAttribute('data-part', 'root');
  expect(container).toHaveAttribute('data-slot', 'container-root');
  expect(container).toHaveAttribute('data-size', 'lg');
  expect(container).toHaveAttribute('data-gutter', 'md');
});

test.each(['xs', 'sm', 'md', 'lg', 'xl', 'full'] as const)('renders the %s size preset', (size) => {
  const { getByTestId } = render(<Container data-testid="container" size={size} />);

  expect(getByTestId('container')).toHaveAttribute('data-size', size);
});

test.each(['none', 'sm', 'md', 'lg'] as const)('renders the %s gutter preset', (gutter) => {
  const { getByTestId } = render(<Container data-testid="container" gutter={gutter} />);

  expect(getByTestId('container')).toHaveAttribute('data-gutter', gutter);
});

test('retains its public root hooks when consumer props conflict', () => {
  const { getByTestId } = render(
    <Container
      data-testid="container"
      data-scope="custom"
      data-part="custom"
      data-slot="custom"
      data-size="custom"
      data-gutter="custom"
      className="consumer-class"
    />,
  );
  const container = getByTestId('container');

  expect(container).toHaveAttribute('data-scope', 'container');
  expect(container).toHaveAttribute('data-part', 'root');
  expect(container).toHaveAttribute('data-slot', 'container-root');
  expect(container).toHaveAttribute('data-size', 'lg');
  expect(container).toHaveAttribute('data-gutter', 'md');
  expect(container).toHaveClass('consumer-class');
});

test('forwards refs and props to an asChild element', () => {
  const ref = createRef<HTMLDivElement>();
  const { getByRole } = render(
    <Container asChild ref={ref} size="md" gutter="lg">
      <main aria-label="Page content" />
    </Container>,
  );
  const main = getByRole('main', { name: 'Page content' });

  expect(ref.current).toBe(main);
  expect(main).toHaveAttribute('data-size', 'md');
  expect(main).toHaveAttribute('data-gutter', 'lg');
});