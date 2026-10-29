import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { CloseButton } from '@/index';

test('renders an accessible native button with safe defaults and a forwarded ref', async () => {
  const ref = createRef<HTMLButtonElement>();

  render(<CloseButton ref={ref} data-testid="close-button" />);

  const button = screen.getByTestId('close-button');

  expect(ref.current).toBe(button);
  await expect.element(page.getByTestId('close-button')).toHaveAttribute('type', 'button');
  expect(screen.getByRole('button', { name: 'Close' })).toBe(button);
  expect(button.dataset).toMatchObject({
    scope: 'close-button',
    part: 'root',
    slot: 'close-button-root',
  });
});

test('lets consumer Tailwind classes override conflicting defaults', () => {
  render(
    <CloseButton
      className="size-10 rounded-full bg-primary text-primary-foreground"
      data-testid="close-button"
    />,
  );

  const button = screen.getByTestId('close-button');

  expect([...button!.classList]).toEqual(
    expect.arrayContaining(['size-10', 'rounded-full', 'bg-primary', 'text-primary-foreground']),
  );
});