import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Stack } from '../src';

test('renders a flex root with stable styling hooks', () => {
  render(<Stack data-part="custom" data-scope="custom" data-slot="custom" data-testid="stack" />);

  const stack = screen.getByTestId('stack');

  expect(stack).toHaveAttribute('data-scope', 'stack');
  expect(stack).toHaveAttribute('data-part', 'root');
  expect(stack).toHaveAttribute('data-slot', 'stack-root');
});

test('writes flex props and reverse directions as root styles', () => {
  render(
    <Stack
      align="center"
      direction={{ mobile: 'column-reverse', desktop: 'row-reverse' }}
      fill
      gap={12}
      justify="space-between"
      wrap="wrap"
      data-testid="stack"
    />,
  );

  const stack = screen.getByTestId('stack');

  expect(stack.style.getPropertyValue('--moduix-stack-direction-mobile')).toBe('column-reverse');
  expect(stack.style.getPropertyValue('--moduix-stack-direction-desktop')).toBe('row-reverse');
  expect(stack.style.getPropertyValue('--moduix-stack-flex')).toBe('1 1 0');
  expect(stack).toHaveStyle({
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '12px',
    justifyContent: 'space-between',
  });
});

test('forwards an HTMLElement ref and root props to an asChild element', () => {
  const ref = createRef<HTMLElement>();

  render(
    <Stack asChild ref={ref} gap={12}>
      <section aria-label="Project updates" />
    </Stack>,
  );

  const section = screen.getByRole('region', { name: 'Project updates' });

  expect(ref.current).toBe(section);
  expect(section.style.gap).toBe('12px');
  expect(section).toHaveAttribute('data-slot', 'stack-root');
});