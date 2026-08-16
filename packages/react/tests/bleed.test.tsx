import { expect, test } from '@rstest/core';
import { render } from '@testing-library/react';
import { createRef } from 'react';
import { Bleed } from '../src';

test('renders the default full-bleed root with stable hooks', () => {
  const { getByTestId } = render(<Bleed data-testid="bleed" />);
  const bleed = getByTestId('bleed');

  expect(bleed).toHaveAttribute('data-scope', 'bleed');
  expect(bleed).toHaveAttribute('data-part', 'root');
  expect(bleed).toHaveAttribute('data-slot', 'bleed-root');
  expect(bleed).toHaveAttribute('data-inline', 'full');
  expect(bleed).toHaveAttribute('data-block', 'none');
});

test('forwards an HTMLElement ref and props to an asChild element', () => {
  const ref = createRef<HTMLElement>();
  const { getByRole } = render(
    <Bleed asChild ref={ref} inline="md" block="sm">
      <figure aria-label="Full-width map" />
    </Bleed>,
  );
  const figure = getByRole('figure', { name: 'Full-width map' });

  expect(ref.current).toBe(figure);
  expect(figure).toHaveAttribute('data-inline', 'md');
  expect(figure).toHaveAttribute('data-block', 'sm');
});

test('keeps root hooks and merges className through the namespace form', () => {
  const { getByTestId } = render(
    <Bleed.Root
      data-testid="bleed"
      data-scope="custom"
      data-part="custom"
      data-slot="custom"
      inline="xs"
      block="lg"
      className="consumer-class"
    />,
  );
  const bleed = getByTestId('bleed');

  expect(bleed).toHaveAttribute('data-scope', 'bleed');
  expect(bleed).toHaveAttribute('data-part', 'root');
  expect(bleed).toHaveAttribute('data-slot', 'bleed-root');
  expect(bleed).toHaveAttribute('data-inline', 'xs');
  expect(bleed).toHaveAttribute('data-block', 'lg');
  expect(bleed).toHaveClass('consumer-class');
  expect(bleed.className).not.toBe('consumer-class');
});