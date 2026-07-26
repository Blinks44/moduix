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