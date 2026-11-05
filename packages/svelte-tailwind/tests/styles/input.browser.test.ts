import { page } from '@rstest/browser';
import { expect, test } from '@rstest/core';
import { render, screen } from '@testing-library/svelte';
import InputOverride from './InputOverride.svelte';
import InputState from './InputState.svelte';

test('preserves native field state and component-owned styling hooks', async () => {
  render(InputState);

  const input = screen.getByRole('textbox', { name: 'Email' });

  const textbox = page.getByRole('textbox', { name: 'Email' });
  await expect.element(textbox).toBeDisabled();
  await expect.element(textbox).toHaveAttribute('aria-invalid', 'true');
  await expect.element(textbox).toHaveAttribute('readonly');
  expect(input.hasAttribute('required')).toBe(true);
  expect(input.dataset).toMatchObject({
    part: 'input',
    scope: 'field',
    size: 'md',
    slot: 'input-root',
  });
  await expect.element(textbox).toHaveAttribute('size', '8');
  expect(input.classList.contains('consumer-class')).toBe(true);
});

test('lets consumer utilities replace component defaults', () => {
  render(InputOverride);

  const input = screen.getByRole('textbox', { name: 'Project key' });
  expect([...input.classList]).toEqual(
    expect.arrayContaining([
      'w-80',
      'max-w-sm',
      'min-h-20',
      'rounded-lg',
      'bg-muted',
      'px-0',
      'py-0',
      'leading-5',
    ]),
  );
  expect(getComputedStyle(input)).toMatchObject({
    minHeight: '80px',
    width: '320px',
    paddingLeft: '0px',
    paddingRight: '0px',
    paddingTop: '0px',
    paddingBottom: '0px',
    lineHeight: '20px',
  });
});