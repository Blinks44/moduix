import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@solidjs/testing-library';
import { CloseButton } from '@/index';

test('renders an accessible native button with safe defaults and a forwarded ref', async () => {
  let ref!: HTMLButtonElement;

  render(() => <CloseButton ref={(element) => (ref = element)} data-testid="close-button" />);

  const button = screen.getByTestId('close-button');

  expect(ref).toBe(button);
  await expect.element(page.getByTestId('close-button')).toHaveAttribute('type', 'button');
  expect(screen.getByRole('button', { name: 'Close' })).toBe(button);
  expect(button.querySelector('svg')).not.toBeNull();
  expect(button.dataset).toMatchObject({
    scope: 'close-button',
    part: 'root',
    slot: 'close-button-root',
  });
});