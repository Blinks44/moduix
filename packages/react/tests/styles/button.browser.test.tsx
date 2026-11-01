import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef, type CSSProperties } from 'react';
import { Button } from '@/index';

test('renders a native button with safe defaults, stable hooks, and a forwarded ref', async () => {
  const ref = createRef<HTMLButtonElement>();

  render(
    <Button ref={ref} data-testid="button">
      Save changes
    </Button>,
  );

  const button = screen.getByTestId('button');

  expect(ref.current).toBe(button);
  await expect.element(page.getByTestId('button')).toHaveAttribute('type', 'button');
  expect(button.dataset).toMatchObject({
    scope: 'button',
    part: 'root',
    slot: 'button-root',
    variant: 'default',
    size: 'md',
  });
});

test('lets the public variables override variant and size defaults', () => {
  render(
    <>
      <Button
        variant="outline"
        style={
          {
            '--moduix-button-bg': 'rgb(1, 2, 3)',
            '--moduix-button-height': '50px',
          } as CSSProperties
        }
      >
        Themed
      </Button>
      <Button
        aria-label="Square"
        size="icon-lg"
        style={{ '--moduix-button-height': '44px' } as CSSProperties}
      >
        ×
      </Button>
    </>,
  );

  const themed = screen.getByRole('button', { name: 'Themed' });
  const square = screen.getByRole('button', { name: 'Square' });

  expect(getComputedStyle(themed).backgroundColor).toBe('rgb(1, 2, 3)');
  expect(themed.offsetHeight).toBe(50);
  expect([square.offsetWidth, square.offsetHeight]).toEqual([44, 44]);
});